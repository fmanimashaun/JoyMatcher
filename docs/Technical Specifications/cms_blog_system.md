# CMS & Blog System — Technical Specification

**Version:** 1.0.0
**Last Updated:** 2026-03-01
**Status:** Planned (Phase 5)

---

## Overview

JoyMatcher's content management system (CMS) powers the public-facing blog, success stories, and educational content. The system uses **Tiptap** (ProseMirror-based) as the rich text editor, replacing Rails' default Trix editor.

---

## Architecture

### Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Editor | Tiptap v2 (ProseMirror) | Extensible, floating menus, slash commands |
| Storage | ActiveStorage (AWS S3 in prod) | Image uploads with direct upload |
| Output | JSON (Tiptap) → HTML on render | Portable, queryable, renderable |
| Admin | `Admin::Content::Blog::PostsController` | RBAC — super_admin + moderator only |
| Public | `BlogController` | Public-facing, published posts only |

---

## Data Models

### Post

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :author, class_name: "User"
  belongs_to :category, class_name: "PostCategory", optional: true

  has_one_attached :cover_image

  enum :status, { draft: 0, published: 1, archived: 2 }

  # Tiptap stores JSON, rendered as HTML on display
  # content: :text (JSON string from Tiptap)

  validates :title, presence: true, length: { maximum: 200 }
  validates :slug, presence: true, uniqueness: true
  validates :content, presence: true
  validates :status, presence: true

  before_validation :generate_slug, if: -> { slug.blank? && title.present? }

  scope :published, -> { where(status: :published) }
  scope :recent,    -> { order(published_at: :desc) }
  scope :by_category, ->(cat) { where(category: cat) }

  def self.featured
    published.where(featured: true).limit(3)
  end

  private

  def generate_slug
    self.slug = title.parameterize
  end
end
```

### PostCategory

```ruby
# app/models/post_category.rb
class PostCategory < ApplicationRecord
  has_many :posts, class_name: "Post", foreign_key: :category_id
  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true
end
```

---

## Migration

```ruby
# db/migrate/YYYYMMDDHHMMSS_create_posts.rb
class CreatePosts < ActiveRecord::Migration[8.1]
  def change
    create_table :post_categories do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.text   :description
      t.timestamps
    end
    add_index :post_categories, :slug, unique: true

    create_table :posts do |t|
      t.string     :title,        null: false
      t.string     :slug,         null: false
      t.text       :content                        # Tiptap JSON
      t.text       :excerpt
      t.integer    :status,       null: false, default: 0
      t.boolean    :featured,     null: false, default: false
      t.datetime   :published_at
      t.references :author,       null: false, foreign_key: { to_table: :users }
      t.references :category,     foreign_key: { to_table: :post_categories }
      t.timestamps
    end
    add_index :posts, :slug,          unique: true
    add_index :posts, :status
    add_index :posts, :published_at
    add_index :posts, :featured
  end
end
```

---

## Controllers

### Admin Posts Controller

```ruby
# app/controllers/admin/content/blog/posts_controller.rb
class Admin::Content::Blog::PostsController < Admin::BaseController
  before_action :set_post, only: %i[show edit update destroy publish archive]

  def index
    @pagy, @posts = pagy(Post.includes(:author, :category).order(created_at: :desc))
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params.merge(author: current_user))
    if @post.save
      redirect_to admin_content_blog_post_path(@post), notice: "Post saved as draft."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @post.update(post_params)
      redirect_to admin_content_blog_post_path(@post), notice: "Post updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    redirect_to admin_content_blog_posts_path, notice: "Post deleted."
  end

  def publish
    @post.update!(status: :published, published_at: Time.current)
    redirect_to admin_content_blog_post_path(@post), notice: "Post published."
  end

  def archive
    @post.update!(status: :archived)
    redirect_to admin_content_blog_posts_path, notice: "Post archived."
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(
      :title, :slug, :content, :excerpt, :featured,
      :category_id, :cover_image, :published_at
    )
  end
end
```

### Public Blog Controller

```ruby
# app/controllers/blog_controller.rb
class BlogController < ApplicationController
  allow_unauthenticated_access

  def index
    @pagy, @posts = pagy(Post.published.recent.includes(:author, :category))
    @featured_posts = Post.featured
    @categories = PostCategory.joins(:posts).merge(Post.published).distinct
  end

  def show
    @post = Post.published.find_by!(slug: params[:slug])
    @related_posts = Post.published.where(category: @post.category)
                         .where.not(id: @post.id).limit(3)
  end

  def category
    @category = PostCategory.find_by!(slug: params[:category_slug])
    @pagy, @posts = pagy(Post.published.by_category(@category).recent)
  end
end
```

---

## Tiptap Editor Integration

### Stimulus Controller

```javascript
// app/javascript/controllers/editor_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "editor"]

  async connect() {
    // Dynamically import Tiptap (importmap-compatible)
    const { Editor } = await import("@tiptap/core")
    const { StarterKit } = await import("@tiptap/starter-kit")
    const { Image } = await import("@tiptap/extension-image")
    const { Link } = await import("@tiptap/extension-link")
    const { Placeholder } = await import("@tiptap/extension-placeholder")

    const existingContent = this.inputTarget.value
      ? JSON.parse(this.inputTarget.value)
      : null

    this.editor = new Editor({
      element: this.editorTarget,
      extensions: [
        StarterKit,
        Image.configure({ inline: false, allowBase64: false }),
        Link.configure({ openOnClick: false }),
        Placeholder.configure({
          placeholder: "Start writing your post… Use / for commands"
        })
      ],
      content: existingContent,
      onUpdate: ({ editor }) => {
        // Sync JSON to hidden input for form submission
        this.inputTarget.value = JSON.stringify(editor.getJSON())
      }
    })
  }

  disconnect() {
    this.editor?.destroy()
  }

  // Upload image via ActiveStorage direct upload
  async uploadImage(file) {
    const { DirectUpload } = await import("@rails/activestorage")
    const upload = new DirectUpload(file, "/rails/active_storage/direct_uploads")

    return new Promise((resolve, reject) => {
      upload.create((error, blob) => {
        if (error) {
          reject(error)
        } else {
          const url = `/rails/active_storage/blobs/redirect/${blob.signed_id}/${blob.filename}`
          resolve(url)
        }
      })
    })
  }
}
```

### importmap Configuration

Add to `config/importmap.rb`:

```ruby
# Tiptap (loaded via CDN — use esm.sh for ESM-compatible builds)
pin "@tiptap/core",                   to: "https://esm.sh/@tiptap/core@2"
pin "@tiptap/starter-kit",            to: "https://esm.sh/@tiptap/starter-kit@2"
pin "@tiptap/extension-image",        to: "https://esm.sh/@tiptap/extension-image@2"
pin "@tiptap/extension-link",         to: "https://esm.sh/@tiptap/extension-link@2"
pin "@tiptap/extension-placeholder",  to: "https://esm.sh/@tiptap/extension-placeholder@2"
```

---

## Views

### Editor Form Partial

```erb
<%# app/views/admin/content/blog/posts/_form.html.erb %>
<%= form_with model: [:admin, :content, :blog, post] do |f| %>
  <%# Title %>
  <div class="form-group">
    <%= f.label :title, class: "form-label" %>
    <%= f.text_field :title, class: "form-input", placeholder: "Post title..." %>
  </div>

  <%# Tiptap Editor %>
  <div data-controller="editor">
    <div class="form-label">Content</div>
    <div data-editor-target="editor"
         class="border border-jm-border rounded-lg min-h-64 p-4 prose max-w-none"
         style="font-family: Georgia, serif;">
    </div>
    <%# Hidden field synced by Stimulus controller %>
    <%= f.hidden_field :content, data: { editor_target: "input" } %>
  </div>

  <%# Cover Image %>
  <div class="form-group">
    <%= f.label :cover_image, class: "form-label" %>
    <%= f.file_field :cover_image, class: "form-input", accept: "image/*" %>
  </div>

  <%# Category %>
  <div class="form-group">
    <%= f.label :category_id, "Category", class: "form-label" %>
    <%= f.collection_select :category_id, PostCategory.all, :id, :name,
          { include_blank: "Select category..." },
          { class: "form-input form-select" } %>
  </div>

  <%# Actions %>
  <div class="flex gap-3">
    <%= f.submit "Save Draft", class: "btn btn-secondary" %>
    <%= f.submit "Publish", name: "publish", class: "btn btn-primary" %>
  </div>
<% end %>
```

### Public Blog Index

```erb
<%# app/views/blog/index.html.erb %>
<% content_for :title, "Blog — JoyMatcher" %>

<div class="max-w-4xl mx-auto py-12 px-4">
  <%# Featured posts %>
  <% if @featured_posts.any? %>
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6" style="font-family: Georgia, serif;">Featured</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <% @featured_posts.each do |post| %>
          <%= link_to blog_post_path(post.slug), class: "card hover:shadow-lg transition-shadow" do %>
            <h3 class="font-semibold text-lg mb-2"><%= post.title %></h3>
            <p class="text-sm opacity-75"><%= post.excerpt&.truncate(120) %></p>
          <% end %>
        <% end %>
      </div>
    </section>
  <% end %>

  <%# All posts %>
  <section>
    <h2 class="text-2xl font-semibold mb-6" style="font-family: Georgia, serif;">All Posts</h2>
    <div class="space-y-6">
      <% @posts.each do |post| %>
        <article class="card">
          <div class="flex items-start justify-between">
            <div>
              <%= link_to post.title, blog_post_path(post.slug),
                    class: "text-xl font-semibold hover:underline",
                    style: "font-family: Georgia, serif; color: hsla(320, 50%, 15%, 1);" %>
              <p class="mt-2 text-sm opacity-75"><%= post.excerpt&.truncate(200) %></p>
              <p class="mt-3 text-xs opacity-60">
                By <%= post.author.display_name %> ·
                <%= post.published_at&.strftime("%B %d, %Y") %>
                <% if post.category %>
                  · <%= post.category.name %>
                <% end %>
              </p>
            </div>
          </div>
        </article>
      <% end %>
    </div>
    <%%= render 'ui/pagination', pagy: @pagy, url: blog_posts_path %>
  </section>
</div>
```

---

## Routes

```ruby
# In config/routes.rb — Blog public routes
scope path: 'blog' do
  get '/',                       to: 'blog#index',    as: :blog_posts
  get '/category/:category_slug', to: 'blog#category', as: :blog_category
  get '/:slug',                  to: 'blog#show',     as: :blog_post
end

# In admin namespace
namespace :content do
  namespace :blog do
    resources :posts do
      member do
        patch :publish
        patch :archive
      end
    end
    resources :categories
  end
end
```

---

## Content Categories

Seed categories for blog:

```ruby
[
  { name: "Relationship Advice",   slug: "relationship-advice",   description: "Expert guidance on building lasting connections" },
  { name: "Success Stories",       slug: "success-stories",       description: "Real couples who found each other on JoyMatcher" },
  { name: "Tier System Guide",     slug: "tier-system-guide",     description: "Understanding the 5-tier disclosure system" },
  { name: "Safety & Trust",        slug: "safety-trust",          description: "How we keep the platform safe and trustworthy" },
  { name: "VIP Insights",          slug: "vip-insights",          description: "Stories and insights from our VIP concierge service" },
  { name: "Diaspora Connections",  slug: "diaspora-connections",  description: "Connecting Nigerians across the world" }
].each do |attrs|
  PostCategory.find_or_create_by!(slug: attrs[:slug]) do |cat|
    cat.name        = attrs[:name]
    cat.description = attrs[:description]
  end
end
```

---

## Rendering Tiptap JSON as HTML

In views, render the stored JSON content as HTML:

```erb
<%# app/views/blog/show.html.erb %>
<article class="prose max-w-none" style="font-family: Georgia, serif;">
  <%%= raw TiptapRenderer.render(@post.content) %>
</article>
```

```ruby
# app/helpers/tiptap_renderer.rb (or app/services/tiptap_renderer.rb)
module TiptapRenderer
  # Convert Tiptap JSON to HTML
  # In Phase 5: use a proper Tiptap-to-HTML Ruby gem (e.g., tiptap-ruby)
  # For now: store content as HTML string directly from editor
  def self.render(content)
    return "" if content.blank?
    # Tiptap editor sends JSON; use ActionText-style rendering or a converter gem
    content.html_safe
  end
end
```

---

## Security Considerations

1. **Content sanitization** — Use Rails' `sanitize` helper or Loofah when rendering Tiptap HTML output
2. **File upload validation** — Only allow image MIME types (image/jpeg, image/png, image/webp)
3. **File size limits** — 10MB max per image (ActiveStorage variant processing)
4. **RBAC enforcement** — Only `super_admin` and `moderator` roles can access admin blog routes
5. **Slug uniqueness** — Enforce at DB level and application level
6. **Draft protection** — Drafts never appear in public-facing queries (always scope to `.published`)

---

## Implementation Phases

| Phase | Work | Priority |
|-------|------|----------|
| Phase 5 | Post + PostCategory models, migration | High |
| Phase 5 | Admin posts CRUD (create/edit/publish) | High |
| Phase 5 | Public blog index + show views | High |
| Phase 5 | Tiptap editor integration (importmap) | High |
| Phase 5 | ActiveStorage cover image upload | Medium |
| Phase 6 | Category management admin UI | Medium |
| Phase 6 | Featured posts system | Medium |
| Phase 7 | RSS feed | Low |
| Phase 7 | Social sharing meta tags (OG/Twitter) | Low |
| Phase 7 | Blog search | Low |

---

## Admin Access Control

Per `docs/Admin System/admin_architecture.md`:

| Role | Blog Access |
|------|-------------|
| Super Admin | Full CRUD + publish + archive |
| Moderator | Create + edit + publish (own posts) |
| VIP Coordinator | Read only |
| VIP Expert | No access |
| Support Agent | No access |
| Regular User | No access |

---

## References

- **Prototype pages:** `prototype/src/pages/` (no blog prototype built yet)
- **Routes:** `config/routes.rb` — blog scope + admin content namespace
- **Admin controller stub:** `app/controllers/admin/content/blog/posts_controller.rb`
- **Public controller stub:** `app/controllers/blog_controller.rb`
- **Tiptap docs:** https://tiptap.dev/docs
- **ActiveStorage:** https://guides.rubyonrails.org/active_storage_overview.html
