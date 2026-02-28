---
name: Rails 8 Development
description: Build JoyMatcher with Rails 8 + Hotwire (Turbo + Stimulus), ViewComponents, and Tailwind CSS. React prototype is documentation/visual reference only.
---

# Rails 8 Development Skill

## Goal

Build JoyMatcher using Rails 8 with Hotwire stack. React prototype is documentation and visual reference - we're building Rails app from scratch.

## When to Trigger

- Building any Rails feature
- Creating controllers/models/views
- Implementing Turbo Frames/Streams
- Writing Stimulus controllers
- Designing Rails architecture

## Critical Understanding

**What We Have:**
- ✅ Comprehensive documentation in `/docs/` (70+ files)
- ✅ React prototype for visual reference
- ✅ Documented business rules and logic

**What We're Building:**
- ✅ Rails 8 application from scratch
- ✅ Using Hotwire (NOT React)
- ✅ Following documented business rules
- ❌ NOT migrating/porting React code

## Rails 8 Stack

### Core
- **Ruby on Rails 8.1.2** (rails ~> 8.1.2)
- **Ruby 3.3+**
- **PostgreSQL** (pg ~> 1.6)
- **Puma** (>= 5.0) - Web server

### Frontend (Hotwire)
- **Turbo** (turbo-rails) - SPA-like without JavaScript frameworks
  - Turbo Drive - Page navigation
  - Turbo Frames - Partial updates
  - Turbo Streams - Real-time updates
- **Stimulus** (stimulus-rails) - Lightweight JavaScript
- **Importmap** (importmap-rails) - JavaScript with ESM
- **Propshaft** - Modern asset pipeline
- **Tailwind CSS v4** (tailwindcss-rails) - Same tokens as prototype
- **ViewComponents** - Reusable components
- **SimpleForm** (simple_form) - Forms made easy

### Backend (Rails 8 Solid Stack)
- **ActiveRecord** - ORM + business logic
- **Solid Queue** (solid_queue) - Background jobs (replaces Sidekiq)
- **Solid Cache** (solid_cache) - Database-backed cache
- **Solid Cable** (solid_cable) - WebSockets
- **Mission Control Jobs** (mission_control-jobs) - UI for monitoring jobs
- **ActiveStorage** - File uploads
- **Image Processing** (image_processing ~> 1.2) - Image transformations

### Auth & Authorization
- **BCrypt** (bcrypt ~> 3.1.21) - has_secure_password
- **CanCanCan** (cancancan ~> 3.6) - Authorization (admin RBAC)

### API & Data
- **JSONAPI Serializer** (jsonapi-serializer) - JSON:API serialization
- **JSONAPI Rails** (jsonapi-rails) - JSON:API standards enforcement
- **HTTParty** (httparty) - HTTP client

### Charts & Analytics
- **Chartkick** (chartkick) - JavaScript charts
- **Groupdate** (groupdate) - Time-series grouping

### State Machine & Data
- **AASM** (aasm ~> 5.5) - State machines
- **Pagy** (pagy) - Pagination
- **CSV** (csv) - CSV processing

### Internationalization & Holidays
- **Countries** (countries) - ISO country data (names, codes, currencies)
- **Holidays** (holidays) - National holidays for 100+ countries

### Security & Observability
- **Rack Attack** (rack-attack) - Rate limiting
- **Lograge** (lograge) - Structured logging
- **OpenTelemetry** - Observability (traces, metrics, logs)
  - opentelemetry-sdk ~> 1.10
  - opentelemetry-exporter-otlp ~> 0.31
  - opentelemetry-metrics-sdk ~> 0.12
  - opentelemetry-logs-sdk ~> 0.4
  - opentelemetry-instrumentation-all ~> 0.90

### AWS & Storage
- **AWS S3** (aws-sdk-s3 ~> 1.176) - Audit log archival

### Deployment
- **Kamal** (kamal) - Docker deployment
- **Thruster** (thruster) - HTTP asset caching/compression

## Rails Component Library (Production-Ready)

**Location:** `/rails_components/`
**Status:** 64 components complete (100%)

### Quick Setup

```bash
# Copy components to Rails app
cp -r rails_components/forms app/views/forms
cp -r rails_components/ui app/views/ui

# Copy Stimulus controllers
cp -r rails_components/stimulus_controllers/* app/javascript/controllers/
```

### Component Usage

```erb
<%# Button %>
<%= render 'ui/button', text: 'Sign Up', variant: 'primary', size: 'large' %>

<%# Tier-Locked Card %>
<%= render 'ui/card', locked: true, tier_required: 3 do %>
  <h3>Family Background</h3>
  <p>This information is locked until you complete Tier 3.</p>
<% end %>

<%# Form Input %>
<%= render 'forms/text_input',
  name: 'user[name]',
  label: 'Full Name',
  placeholder: 'Enter your full name',
  required: true,
  icon_left: 'lucide:user'
%>

<%# Progress Bar %>
<%= render 'ui/progress_bar',
  value: @user.tier_completion_percentage,
  label: 'Profile Completion',
  variant: 'premium'
%>

<%# Tabs (Interests page) %>
<%= render 'ui/tabs',
  tabs: [
    { id: 'sent', label: 'Sent', count: 5 },
    { id: 'received', label: 'Received', count: 12 }
  ],
  active: 'sent'
do |tab_id| %>
  <%# Content for each tab %>
<% end %>

<%# Toast Notification (via Stimulus) %>
<script>
  const toastController = document.querySelector('[data-controller="toast"]')
  toastController.toast.show({
    variant: 'success',
    message: 'Profile updated successfully!',
    duration: 5000
  })
</script>
```

### Component Inventory

**Forms (12):** text_input, textarea, select, checkbox, radio_group, switch, file_upload, slider, date_picker, search, tag_input, form_group

**UI (37):** button, card, accordion, modal, toast, alert, badge, avatar, progress_bar, breadcrumbs, pagination, tabs, steps, dropdown, tooltip, skip_link, spinner, skeleton, list, description_list, stat, tag, chip, timeline, kbd, empty_state, divider, drawer, collapsible, stack, grid, icon_button, button_group, image, icon, status_indicator, verification_badge

**Stimulus (15):** accordion, modal, toast, switch, character_count, dismissible, file_upload, slider, search, tag_input, tabs, dropdown, tooltip, drawer, collapsible

### Design System Compliance

ALL components follow JoyMatcher's design system:
- ✅ Georgia serif font (NO sans-serif except labels)
- ✅ Purple-tinted shadows (rgba(77,0,82,0.XX))
- ✅ HSLA backgrounds (320 hue)
- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation (Tab, Enter, ESC, Arrows)
- ✅ Focus visible (never `outline: none`)
- ✅ Screen reader support
- ✅ 44x44px minimum touch targets
- ✅ WCAG 2.1 AA compliant

### Documentation

- README: `/rails_components/README.md` (450 lines)
- Component Index: `/rails_components/COMPONENT_INDEX.md` (250 lines)
- Final Summary: `/rails_components/FINAL_SUMMARY.md`
- Implementation Memory: `/brain/component-library-implementation.md`
- Design Audit: `/brain/design-system-audit.md`

## Instructions

### 1. Implement Business Logic in Models

**From documentation:**
```
docs/Global Context/edt_specification.md:
EDT = min(yourCompleted, theirCompleted, youShared, theyShared)
```

**To Rails model:**
```ruby
# app/models/user.rb
class User < ApplicationRecord
  enum subscription: { free: 0, premium: 1, vip: 2 }

  # Tier ceiling based on subscription
  def max_completable_tier
    { free: 2, premium: 4, vip: 5 }[subscription.to_sym]
  end

  # Calculate EDT with another user
  def calculate_edt(other_user, relationship)
    [
      completed_tier,
      other_user.completed_tier,
      relationship.shared_tier_by_current_user,
      relationship.shared_tier_by_other_user
    ].min
  end

  # Check if can complete tier
  def can_complete_tier?(tier)
    tier <= max_completable_tier &&
    tier == completed_tier + 1  # Sequential completion
  end
end
```

### 2. Build Views with Turbo Frames

```erb
<!-- app/views/profiles/show.html.erb -->
<div data-controller="profile" data-profile-edt-value="<%= @edt %>">
  <h1><%= @profile.name %></h1>

  <% (1..5).each do |tier| %>
    <%= turbo_frame_tag dom_id(@profile, "tier_#{tier}") do %>
      <%= render Profiles::TierSectionComponent.new(
            tier: tier,
            locked: tier > @edt,
            profile: @profile
          ) %>
    <% end %>
  <% end %>
</div>
```

### 3. Add Interactivity with Stimulus

```javascript
// app/javascript/controllers/profile_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { edt: Number }

  connect() {
    console.log("Profile EDT:", this.edtValue)
    this.updateVisibility()
  }

  updateVisibility() {
    this.element.querySelectorAll('[data-tier]').forEach(tier => {
      const tierNum = parseInt(tier.dataset.tier)
      tier.classList.toggle('locked', tierNum > this.edtValue)
    })
  }
}
```

### 4. Real-time with Turbo Streams

```ruby
# app/models/show_interest.rb
class ShowInterest < ApplicationRecord
  after_create_commit -> { broadcast_notification }

  private

  def broadcast_notification
    broadcast_append_to "user_#{recipient_id}_notifications",
      target: "notifications",
      partial: "notifications/show_interest",
      locals: { show_interest: self }
  end
end
```

### 5. ViewComponents for Reusable UI

```ruby
# app/components/ui/button_component.rb
class Ui::ButtonComponent < ViewComponent::Base
  def initialize(variant: :primary, size: :medium, **html_options)
    @variant = variant
    @size = size
    @html_options = html_options
  end

  def call
    tag.button(content, **button_attributes)
  end

  private

  def button_attributes
    @html_options.merge(class: button_classes)
  end

  def button_classes
    base = "btn"
    variant_class = {
      primary: "btn-primary bg-jm-purple-deep",
      secondary: "btn-secondary bg-jm-coral",
      outline: "btn-outline border-jm-purple-deep"
    }[@variant]

    "#{base} #{variant_class} #{size_class}"
  end

  def size_class
    { small: "btn-sm", medium: "btn-md", large: "btn-lg" }[@size]
  end
end
```

### 6. Authorization with CanCanCan

```ruby
# app/models/ability.rb
class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    if user.super_admin?
      can :manage, :all
    elsif user.moderator?
      can :manage, Report
      can :manage, ContentModeration
      can :read, User
    elsif user.vip_coordinator?
      can :manage, VipApplication
      can :manage, VipAssignment
      can :manage, TierVerification
    elsif user.vip_expert?
      # CRITICAL: VIP Expert can ONLY access assigned clients
      can :read, VipAssignment, expert_id: user.id
      can :read, User, id: user.assigned_client_ids
      can :manage, Introduction, expert_id: user.id
      cannot :search, User # Absolute prohibition
      cannot :browse, User # Absolute prohibition
    elsif user.support_agent?
      can :read, User
      can :manage, SupportTicket
    end

    # All users can manage their own profile
    can :manage, User, id: user.id
  end
end

# app/controllers/vip_assignments_controller.rb
class VipAssignmentsController < ApplicationController
  load_and_authorize_resource

  def index
    # CanCanCan automatically scopes to current_user's assignments
    @assignments = @vip_assignments
  end

  def show
    # CanCanCan enforces expert isolation
    @assignment = @vip_assignment
  end
end
```

  def index?
    # Only show assignments for THIS expert
    user.vip_expert?
  end
end

# app/controllers/vip_assignments_controller.rb
class VipAssignmentsController < ApplicationController
  def index
    @assignments = policy_scope(VipAssignment)
    # Returns ONLY assignments for current expert
  end

  def show
    @assignment = VipAssignment.find(params[:id])
    authorize @assignment  # Enforces expert isolation
  end
end
```

## Examples

### Example 1: Tier Completion Form

```erb
<%= turbo_frame_tag "tier_completion" do %>
  <%= form_with model: @tier_completion,
      data: { turbo: true, controller: "tier-form" } do |f| %>

    <%= f.hidden_field :tier, value: @tier %>

    <% case @tier %>
    <% when 2 %>
      <%= f.label :faith %>
      <%= f.select :faith, faith_options, {}, class: "form-select" %>

      <%= f.label :hobbies %>
      <%= f.text_area :hobbies, class: "form-textarea" %>
    <% when 3 %>
      <%= f.label :marriage_timeline %>
      <%= f.select :marriage_timeline, timeline_options, {}, class: "form-select" %>
    <% end %>

    <%= f.submit "Complete Tier #{@tier}", class: "btn btn-primary" %>
  <% end %>
<% end %>
```

### Example 2: Show Interest with Real-Time Status

```ruby
# app/controllers/show_interests_controller.rb
class ShowInterestsController < ApplicationController
  def create
    @show_interest = current_user.show_interests.build(show_interest_params)

    if @show_interest.save
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to profile_path(@show_interest.recipient) }
      end
    end
  end
end
```

```erb
<!-- app/views/show_interests/create.turbo_stream.erb -->
<%= turbo_stream.replace "show_interest_button" do %>
  <div class="text-sm text-gray-600">
    Show Interest sent. Awaiting response...
  </div>
<% end %>

<%= turbo_stream.prepend "notifications" do %>
  <%= render "notifications/item",
      notification: @show_interest.notification %>
<% end %>
```

## Constraints

### MUST DO:
- ✅ Build with Rails 8 + Hotwire from scratch
- ✅ Use documentation as source of truth
- ✅ Use prototype for visual reference
- ✅ Implement business logic in Models
- ✅ Use Turbo for interactivity
- ✅ Use Stimulus for JavaScript
- ✅ Use ViewComponents for reusable UI
- ✅ Use CanCanCan for authorization

### MUST NOT DO:
- ❌ Port/migrate React code
- ❌ Use React/Vue/Angular
- ❌ Ignore Hotwire patterns
- ❌ Copy JavaScript state patterns
- ❌ Build Rails as API-only backend

## References

- Documentation: `docs/` (70+ files)
- Prototype: `prototype/` (visual reference only)
- Rails Guides: https://guides.rubyonrails.org/
- Hotwire: https://hotwired.dev/
- Stimulus: https://stimulus.hotwired.dev/
- ViewComponent: https://viewcomponent.org/
- CanCanCan: https://github.com/CanCanCommunity/cancancan
