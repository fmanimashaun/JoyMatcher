# Rails 8 Architecture & Technical Stack

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Specification Complete
**Target:** Production Implementation (NOT Prototype)

---

## Overview

JoyMatcher production application will be built using **Rails 8** (latest version) with modern features including real-time messaging, Hotwire (Turbo + Stimulus), and Tailwind CSS v4. This document specifies the complete technical architecture for production implementation.

**Important:** This specification is for the **production application**, NOT the HTML prototype. The prototype serves as a visual/UX reference only.

---

## Technology Stack

### Core Framework
- **Ruby:** 3.3+ (latest stable)
- **Rails:** 8.0+ (latest)
- **Database:** PostgreSQL 16+
- **Cache:** Redis 7+
- **Background Jobs:** Solid Queue (Rails 8 default)
- **WebSocket:** Action Cable (Rails 8 built-in)

### Frontend
- **CSS Framework:** Tailwind CSS v4 (latest)
- **JavaScript:** Hotwire (Turbo + Stimulus)
- **Real-Time Updates:** Turbo Streams over Action Cable
- **Build Tool:** Propshaft (Rails 8 default asset pipeline)

### Infrastructure
- **Web Server:** Puma (Rails default)
- **Application Server:** Puma + Solid Queue
- **File Storage:** Active Storage (S3-compatible)
- **Search:** PostgreSQL Full-Text Search (initially), ElasticSearch (later)
- **Email:** Action Mailer + SendGrid/Postmark

### Testing & Quality
- **Testing Framework:** RSpec + Capybara
- **Code Quality:** RuboCop, Brakeman (security)
- **Coverage:** SimpleCov
- **Performance:** Bullet, Rack Mini Profiler

---

## Rails 8 Key Features Utilized

### 1. Solid Queue (Background Jobs)

**Replaces:** Sidekiq, Resque, Delayed Job

**Use Cases:**
- Email sending (async)
- Tier completion notifications
- VIP application review notifications
- Expert assignment notifications
- Subscription renewal reminders
- Data export generation

**Configuration:**
```ruby
# config/application.rb
config.active_job.queue_adapter = :solid_queue

# config/queue.yml
production:
  dispatchers:
    - polling_interval: 1
      batch_size: 500
  workers:
    - queues: "*"
      threads: 3
      processes: 3
      polling_interval: 0.1
```

**Example Job:**
```ruby
# app/jobs/send_interest_notification_job.rb
class SendInterestNotificationJob < ApplicationJob
  queue_as :notifications

  def perform(interest_id)
    interest = Interest.find(interest_id)
    UserMailer.interest_received(interest.receiver_id).deliver_now

    # Broadcast real-time notification via Turbo Stream
    Turbo::StreamsChannel.broadcast_append_to(
      "notifications:#{interest.receiver_id}",
      target: "notifications",
      partial: "notifications/interest_received",
      locals: { interest: interest }
    )
  end
end
```

---

### 2. Action Cable + Turbo Streams (Real-Time Messaging)

**Real-Time Features:**
- ✅ **Messaging:** Real-time chat between matched users
- ✅ **Notifications:** Interest received, message received, tier access granted
- ✅ **Presence:** Online/offline status indicators
- ✅ **Typing Indicators:** "User is typing..." in conversations

#### 2.1 Real-Time Messaging Architecture

```ruby
# app/channels/conversation_channel.rb
class ConversationChannel < ApplicationCable::Channel
  def subscribed
    conversation = Conversation.find(params[:conversation_id])

    # Ensure user is authorized to access this conversation
    if current_user.conversations.include?(conversation)
      stream_for conversation

      # Broadcast presence (user joined)
      ConversationChannel.broadcast_to(
        conversation,
        type: "presence",
        user_id: current_user.id,
        status: "online"
      )
    else
      reject
    end
  end

  def unsubscribed
    conversation = Conversation.find(params[:conversation_id])

    # Broadcast presence (user left)
    ConversationChannel.broadcast_to(
      conversation,
      type: "presence",
      user_id: current_user.id,
      status: "offline"
    )
  end

  def receive(data)
    conversation = Conversation.find(params[:conversation_id])

    # Handle typing indicators
    if data["type"] == "typing"
      ConversationChannel.broadcast_to(
        conversation,
        type: "typing",
        user_id: current_user.id,
        typing: data["typing"]
      )
    end
  end

  def speak(data)
    conversation = Conversation.find(params[:conversation_id])
    message = conversation.messages.create!(
      sender: current_user,
      content: data["content"]
    )

    # Broadcast new message via Turbo Stream
    broadcast_append_to(
      conversation,
      target: "messages",
      partial: "messages/message",
      locals: { message: message, current_user: current_user }
    )

    # Send background job for email notification (if recipient is offline)
    SendMessageNotificationJob.perform_later(message.id) unless recipient_online?
  end

  private

  def recipient_online?
    # Check if recipient is subscribed to this channel
    # Implementation depends on presence tracking
  end
end
```

#### 2.2 Message Model

```ruby
# app/models/message.rb
class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :sender, class_name: "User"

  validates :content, presence: true, length: { maximum: 1000 }

  after_create_commit :broadcast_message

  private

  def broadcast_message
    # Broadcast to conversation participants via Turbo Stream
    broadcast_append_to(
      conversation,
      target: "messages",
      partial: "messages/message",
      locals: { message: self }
    )
  end
end

# app/models/conversation.rb
class Conversation < ApplicationRecord
  has_many :messages, dependent: :destroy
  belongs_to :user1, class_name: "User"
  belongs_to :user2, class_name: "User"

  validates :user1_id, uniqueness: { scope: :user2_id }

  def participants
    [user1, user2]
  end

  def other_participant(user)
    user == user1 ? user2 : user1
  end
end
```

#### 2.3 Message View (Turbo Frame)

```erb
<!-- app/views/conversations/show.html.erb -->
<%= turbo_stream_from @conversation %>

<div id="messages" class="space-y-4 overflow-y-auto h-[calc(100vh-200px)]">
  <%= render @messages %>
</div>

<!-- Typing Indicator -->
<div id="typing-indicator" class="text-sm text-gray-500 italic hidden">
  <span id="typing-user-name"></span> is typing...
</div>

<!-- Message Input Form -->
<%= form_with(
  model: [@conversation, Message.new],
  url: conversation_messages_path(@conversation),
  data: {
    controller: "message-form",
    action: "keydown->message-form#handleTyping"
  },
  class: "mt-4"
) do |form| %>
  <%= form.text_area(
    :content,
    placeholder: "Type a message...",
    rows: 3,
    class: "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200",
    data: { message_form_target: "input" }
  ) %>

  <%= form.submit "Send", class: "mt-2 bg-gradient-to-r from-purple-600 to-coral-500 text-white font-semibold px-6 py-3 rounded-lg" %>
<% end %>
```

#### 2.4 Message Form Controller (Stimulus)

```javascript
// app/javascript/controllers/message_form_controller.js
import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static targets = ["input"]

  connect() {
    this.consumer = createConsumer()
    this.typingTimeout = null
    this.isTyping = false

    // Subscribe to conversation channel
    this.channel = this.consumer.subscriptions.create(
      {
        channel: "ConversationChannel",
        conversation_id: this.element.dataset.conversationId
      },
      {
        received: (data) => {
          if (data.type === "typing") {
            this.handleTypingIndicator(data)
          }
        }
      }
    )
  }

  disconnect() {
    if (this.channel) {
      this.channel.unsubscribe()
    }
  }

  handleTyping(event) {
    // Don't trigger on Enter key (submits form)
    if (event.key === "Enter" && !event.shiftKey) {
      return
    }

    // Send typing indicator
    if (!this.isTyping) {
      this.isTyping = true
      this.channel.perform("receive", {
        type: "typing",
        typing: true
      })
    }

    // Clear previous timeout
    clearTimeout(this.typingTimeout)

    // Stop typing indicator after 3 seconds of inactivity
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false
      this.channel.perform("receive", {
        type: "typing",
        typing: false
      })
    }, 3000)
  }

  handleTypingIndicator(data) {
    const indicator = document.getElementById("typing-indicator")
    const userName = document.getElementById("typing-user-name")

    if (data.typing) {
      userName.textContent = data.user_name || "User"
      indicator.classList.remove("hidden")
    } else {
      indicator.classList.add("hidden")
    }
  }
}
```

---

### 3. Turbo Frames & Turbo Streams

**Use Cases:**
- ✅ Profile cards (lazy loaded, infinite scroll)
- ✅ Modal overlays (tier request, upgrade prompts)
- ✅ Notifications (real-time updates)
- ✅ Tier completion progress (live updates)
- ✅ Messages (real-time chat)

**Example: Show Interest Modal (Turbo Frame)**
```erb
<!-- app/views/profiles/show.html.erb -->
<%= turbo_frame_tag "show_interest_modal" do %>
  <%= link_to "Show Interest",
    new_interest_path(receiver_id: @profile.id),
    data: { turbo_frame: "show_interest_modal" },
    class: "btn-primary"
  %>
<% end %>

<!-- app/views/interests/new.html.erb -->
<%= turbo_frame_tag "show_interest_modal" do %>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Confirm Interest</h2>

      <!-- Tier Awareness Warning (if applicable) -->
      <% if @tier_mismatch %>
        <div class="alert alert-warning">
          <%= render "interests/tier_awareness_warning", profile: @profile %>
        </div>
      <% end %>

      <%= form_with model: @interest, data: { turbo: true } do |form| %>
        <%= form.hidden_field :receiver_id, value: @profile.id %>
        <%= form.submit "Confirm Interest", class: "btn-primary" %>
        <%= link_to "Cancel", "#", data: { turbo_frame: "_top" }, class: "btn-secondary" %>
      <% end %>
    </div>
  </div>
<% end %>
```

---

### 4. Solid Cable (Alternative to Redis for Action Cable)

**Rails 8 Feature:** Solid Cable (database-backed Action Cable adapter)

**Benefits:**
- No Redis dependency (uses PostgreSQL)
- Simpler deployment
- Lower infrastructure cost

**Configuration:**
```ruby
# config/cable.yml
production:
  adapter: solid_cable
  connects_to:
    database:
      writing: cable
      reading: cable

# config/database.yml
production:
  cable:
    <<: *default
    database: joymatcher_cable_production
```

**Note:** For high-scale deployments (1000+ concurrent connections), Redis adapter is recommended.

---

## Database Architecture

### Core Models

```ruby
# app/models/user.rb
class User < ApplicationRecord
  # Devise authentication (Rails standard)
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable, :timeoutable

  # Subscriptions
  enum subscription: { free: 0, premium: 1, vip: 2 }

  # Tier completion
  has_many :tier_completions, dependent: :destroy
  has_many :tier_responses, dependent: :destroy

  # Relationships
  has_many :interests_sent, class_name: "Interest", foreign_key: "sender_id"
  has_many :interests_received, class_name: "Interest", foreign_key: "receiver_id"

  has_many :conversations_as_user1, class_name: "Conversation", foreign_key: "user1_id"
  has_many :conversations_as_user2, class_name: "Conversation", foreign_key: "user2_id"

  # Tier data models
  has_one :tier1_data, class_name: "TierData::Tier1", dependent: :destroy
  has_one :tier2_data, class_name: "TierData::Tier2", dependent: :destroy
  has_one :tier3_data, class_name: "TierData::Tier3", dependent: :destroy
  has_one :tier4_data, class_name: "TierData::Tier4", dependent: :destroy
  has_one :tier5_data, class_name: "TierData::Tier5", dependent: :destroy

  # Photos (Active Storage)
  has_many_attached :photos

  validates :photos, presence: true, length: { minimum: 1, maximum: 6 }

  # Scopes
  scope :verified, -> { where(verified: true) }
  scope :premium_or_vip, -> { where(subscription: [:premium, :vip]) }

  # Instance methods
  def max_completed_tier
    tier_completions.maximum(:tier_number) || 0
  end

  def can_access_tier?(tier_number)
    case subscription.to_sym
    when :free
      tier_number <= 2
    when :premium
      tier_number <= 4
    when :vip
      tier_number <= 5
    else
      false
    end
  end

  def conversations
    Conversation.where("user1_id = ? OR user2_id = ?", id, id)
  end
end
```

```ruby
# app/models/relationship.rb
class Relationship < ApplicationRecord
  belongs_to :user1, class_name: "User"
  belongs_to :user2, class_name: "User"

  validates :user1_id, uniqueness: { scope: :user2_id }
  validate :users_must_be_different

  # EDT calculation
  def edt
    [
      user1.max_completed_tier,
      user2.max_completed_tier,
      shared_tier_by_user1,
      shared_tier_by_user2
    ].min
  end

  def update_edt!
    update!(edt: calculate_edt)
  end

  private

  def users_must_be_different
    errors.add(:user2_id, "cannot be the same as user1_id") if user1_id == user2_id
  end

  def calculate_edt
    edt
  end
end
```

```ruby
# app/models/interest.rb
class Interest < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"

  enum status: { pending: 0, accepted: 1, declined: 2 }

  validates :sender_id, uniqueness: { scope: :receiver_id }
  validate :cooldown_period_check, on: :create

  after_create_commit :send_notification
  after_update_commit :handle_acceptance, if: :saved_change_to_status?

  private

  def cooldown_period_check
    recent_interest = Interest.where(
      sender_id: sender_id,
      receiver_id: receiver_id
    ).where("created_at > ?", 3.months.ago).first

    if recent_interest
      errors.add(:base, "You must wait 3 months before showing interest again")
    end
  end

  def send_notification
    SendInterestNotificationJob.perform_later(id)
  end

  def handle_acceptance
    if accepted?
      # Create conversation
      Conversation.create!(user1: sender, user2: receiver)

      # Send acceptance notification
      SendInterestAcceptedJob.perform_later(id)
    end
  end
end
```

---

### Database Schema (Key Tables)

```ruby
# db/schema.rb (excerpt)

create_table "users", force: :cascade do |t|
  t.string "email", null: false
  t.string "encrypted_password", null: false
  t.string "first_name", null: false
  t.string "last_name", null: false
  t.integer "subscription", default: 0, null: false
  t.integer "max_completed_tier", default: 0
  t.boolean "verified", default: false
  t.string "country_code", default: "NG"
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false

  t.index ["email"], name: "index_users_on_email", unique: true
end

create_table "relationships", force: :cascade do |t|
  t.bigint "user1_id", null: false
  t.bigint "user2_id", null: false
  t.integer "user1_max_completed_tier"
  t.integer "user2_max_completed_tier"
  t.integer "shared_tier_by_user1", default: 0
  t.integer "shared_tier_by_user2", default: 0
  t.integer "edt", default: 0
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false

  t.index ["user1_id", "user2_id"], name: "index_relationships_on_user1_and_user2", unique: true
  t.index ["user1_id"], name: "index_relationships_on_user1_id"
  t.index ["user2_id"], name: "index_relationships_on_user2_id"
end

create_table "interests", force: :cascade do |t|
  t.bigint "sender_id", null: false
  t.bigint "receiver_id", null: false
  t.integer "status", default: 0, null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false

  t.index ["sender_id", "receiver_id"], name: "index_interests_on_sender_and_receiver", unique: true
  t.index ["receiver_id"], name: "index_interests_on_receiver_id"
end

create_table "conversations", force: :cascade do |t|
  t.bigint "user1_id", null: false
  t.bigint "user2_id", null: false
  t.datetime "last_message_at"
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false

  t.index ["user1_id", "user2_id"], name: "index_conversations_on_user1_and_user2", unique: true
end

create_table "messages", force: :cascade do |t|
  t.bigint "conversation_id", null: false
  t.bigint "sender_id", null: false
  t.text "content", null: false
  t.datetime "read_at"
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false

  t.index ["conversation_id"], name: "index_messages_on_conversation_id"
  t.index ["sender_id"], name: "index_messages_on_sender_id"
  t.index ["created_at"], name: "index_messages_on_created_at"
end

create_table "tier_data_tier1s", force: :cascade do |t|
  t.bigint "user_id", null: false
  t.integer "age", null: false
  t.string "gender", null: false
  t.string "city", null: false
  t.string "country", null: false
  t.string "relationship_intent", null: false
  t.string "religious_identity", null: false
  t.string "occupation_category", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false

  t.index ["user_id"], name: "index_tier_data_tier1s_on_user_id", unique: true
end

# Similar tables for tier2, tier3, tier4, tier5
```

---

## Caching Strategy

### Rails 8 Fragment Caching with Turbo

```erb
<!-- Cache profile cards -->
<% @profiles.each do |profile| %>
  <%= turbo_frame_tag dom_id(profile), loading: "lazy" do %>
    <% cache [profile, current_user, "profile_card"] do %>
      <%= render "profiles/card", profile: profile %>
    <% end %>
  <% end %>
<% end %>
```

### Redis Caching (for hot data)

```ruby
# Cache EDT calculations
def edt
  Rails.cache.fetch([self, "edt"], expires_in: 1.hour) do
    calculate_edt
  end
end

# Cache user's conversations
def cached_conversations
  Rails.cache.fetch([self, "conversations"], expires_in: 5.minutes) do
    conversations.includes(:messages).to_a
  end
end
```

---

## API Design (Future: Mobile Apps)

### RESTful API with Active Model Serializers

```ruby
# app/serializers/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_initial, :age, :city, :country,
             :subscription, :max_completed_tier, :verified

  has_one :tier1_data, if: -> { can_access_tier?(1) }
  has_one :tier2_data, if: -> { can_access_tier?(2) }
  has_one :tier3_data, if: -> { can_access_tier?(3) }

  def last_initial
    object.last_name[0].upcase + "."
  end

  def can_access_tier?(tier_number)
    # Check EDT between current_user and object
    relationship = Relationship.find_by(
      user1: current_user,
      user2: object
    ) || Relationship.find_by(
      user1: object,
      user2: current_user
    )

    relationship&.edt.to_i >= tier_number
  end
end
```

---

## Security Considerations

### 1. Content Security Policy (Rails 8 Default)

```ruby
# config/initializers/content_security_policy.rb
Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self, :https
    policy.font_src    :self, :https, :data
    policy.img_src     :self, :https, :data, :blob
    policy.object_src  :none
    policy.script_src  :self, :https
    policy.style_src   :self, :https
    policy.connect_src :self, :https, "wss:"  # Allow WebSocket connections
  end
end
```

### 2. Rate Limiting (Rack Attack)

```ruby
# config/initializers/rack_attack.rb
Rack::Attack.throttle("interests/ip", limit: 10, period: 1.hour) do |req|
  req.ip if req.path == "/interests" && req.post?
end

Rack::Attack.throttle("messages/ip", limit: 100, period: 15.minutes) do |req|
  req.ip if req.path.start_with?("/conversations") && req.post?
end
```

### 3. Authorization (Pundit)

```ruby
# app/policies/tier_data_policy.rb
class TierDataPolicy < ApplicationPolicy
  def show?
    # Check EDT
    relationship = Relationship.find_by(
      user1: user,
      user2: record.user
    ) || Relationship.find_by(
      user1: record.user,
      user2: user
    )

    tier_number = record.class.name.split("::").last.delete_prefix("Tier").to_i
    relationship&.edt.to_i >= tier_number
  end
end
```

---

## Deployment (Rails 8 + Kamal)

**Rails 8 ships with Kamal for zero-downtime deployments:**

```yaml
# config/deploy.yml
service: joymatcher
image: joymatcher/app
servers:
  web:
    - 192.168.0.1
  worker:
    - 192.168.0.2

registry:
  server: registry.digitalocean.com
  username:
    - KAMAL_REGISTRY_USERNAME
  password:
    - KAMAL_REGISTRY_PASSWORD

env:
  secret:
    - RAILS_MASTER_KEY
  clear:
    - RAILS_ENV=production

accessories:
  postgres:
    image: postgres:16
    host: 192.168.0.3
    env:
      secret:
        - POSTGRES_PASSWORD
  redis:
    image: redis:7
    host: 192.168.0.4
```

---

## Related Documentation

- [State Management](state_management.md) - JavaScript state patterns
- [Show Interest Flow](show_interest_flow.md) - Interest submission logic
- [Request Details Flow](request_details_flow.md) - Tier request workflow
- [Subscription Tier Ceiling](subscription_tier_ceiling.md) - Subscription enforcement
- [Data Models](data_models.md) - Complete database schema (to be created)

---

**Document Owner:** Engineering Lead
**Last Updated:** 2026-02-27
**Next Review:** Before production implementation
