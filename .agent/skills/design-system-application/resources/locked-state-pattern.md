# Locked State Pattern

Visual pattern for displaying locked tiers and features.

## Pattern

All locked content must show:
1. **Gray Overlay** - opacity-50 on content
2. **Lock Icon** - Centered visual indicator
3. **Clear Message** - "Upgrade to [tier] to unlock"
4. **Upgrade CTA** - Prominent button

## React Implementation (Prototype)

```jsx
<div className="relative">
  <div className="opacity-50 blur-sm">
    {/* Locked content */}
  </div>
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/90 p-6">
    <LockIcon className="w-12 h-12 text-jm-purple-deep mb-4" />
    <p className="text-gray-900 font-semibold mb-2">This tier is locked</p>
    <p className="text-gray-600 text-sm mb-4">Upgrade to Premium to unlock Tier 3</p>
    <Button variant="primary">Upgrade Now</Button>
  </div>
</div>
```

## Rails Implementation (Production with Hotwire)

```erb
<!-- app/views/profiles/_tier_section.html.erb -->
<div class="relative">
  <% if locked %>
    <div class="opacity-50 blur-sm">
      <%= render partial: "profiles/tier_#{tier}_content", locals: { profile: profile } %>
    </div>

    <div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/90 p-6">
      <%= render "shared/icons/lock", class: "w-12 h-12 text-jm-purple-deep mb-4" %>
      <p class="text-gray-900 font-semibold mb-2">This tier is locked</p>
      <p class="text-gray-600 text-sm mb-4"><%= locked_message %></p>

      <%= link_to "Upgrade Now",
          upgrade_path,
          class: "btn btn-primary",
          data: { turbo_frame: "upgrade_modal" } %>
    </div>
  <% else %>
    <%= render partial: "profiles/tier_#{tier}_content", locals: { profile: profile } %>
  <% end %>
</div>
```

## Stimulus Controller (Production)

```javascript
// app/javascript/controllers/locked_tier_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content", "overlay", "upgradeButton"]

  connect() {
    this.updateLockedState()
  }

  updateLockedState() {
    const isLocked = this.element.dataset.locked === "true"

    if (isLocked) {
      this.contentTarget.classList.add("opacity-50", "blur-sm")
      this.overlayTarget.classList.remove("hidden")
    } else {
      this.contentTarget.classList.remove("opacity-50", "blur-sm")
      this.overlayTarget.classList.add("hidden")
    }
  }

  upgrade(event) {
    event.preventDefault()
    // Turbo Frame navigation to upgrade modal
    Turbo.visit(this.upgradeButtonTarget.href, { frame: "upgrade_modal" })
  }
}
```

## Turbo Frame for Upgrade Modal

```erb
<!-- app/views/layouts/application.html.erb -->
<turbo-frame id="upgrade_modal"></turbo-frame>

<!-- app/views/subscriptions/upgrade_modal.html.erb -->
<turbo-frame id="upgrade_modal">
  <div data-controller="modal">
    <div class="modal-content">
      <h2>Upgrade to Premium</h2>
      <p>Unlock Tier 3 and 4 with Premium subscription</p>

      <%= form_with url: subscriptions_path,
          method: :post,
          data: { turbo: true, action: "turbo:submit-end->modal#close" } do |f| %>
        <%= f.hidden_field :plan, value: "premium" %>
        <%= f.submit "Subscribe for ₦18,000/month", class: "btn btn-primary" %>
      <% end %>
    </div>
  </div>
</turbo-frame>
```

## Usage Notes

- **Prototype (React):** Use for visual reference only
- **Production (Rails 8):** Use Hotwire/Turbo/Stimulus patterns
- **DO NOT** port React code directly to Rails
- Use Turbo Frames for modals
- Use Stimulus for interactivity
- Use ViewComponents for reusable locked state component
