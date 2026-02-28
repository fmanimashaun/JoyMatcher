# Hotwire Patterns for JoyMatcher

Common Hotwire patterns for building JoyMatcher features.

## Pattern 1: Turbo Frame for Tier Sections

**Use case:** Update tier section without full page reload

```erb
<!-- app/views/profiles/show.html.erb -->
<turbo-frame id="tier_<%= @tier %>_section">
  <%= render "profiles/tier_section", tier: @tier, locked: @locked %>
</turbo-frame>
```

## Pattern 2: Turbo Stream for Real-Time Notifications

**Use case:** Show Interest notification appears instantly

```ruby
# app/models/show_interest.rb
after_create_commit do
  broadcast_append_to "user_#{recipient_id}_notifications",
    target: "notifications",
    partial: "notifications/show_interest"
end
```

## Pattern 3: Stimulus for EDT Recalculation

**Use case:** Dynamically update visible tiers

```javascript
// app/javascript/controllers/edt_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { edt: Number }

  edtValueChanged() {
    this.updateTierVisibility()
  }

  updateTierVisibility() {
    // Lock/unlock tiers based on EDT
  }
}
```

## Pattern 4: ViewComponent for Reusable Locked State

**Use case:** Consistent locked tier UI across app

```ruby
# app/components/locked_tier_component.rb
class LockedTierComponent < ViewComponent::Base
  def initialize(tier:, upgrade_path:)
    @tier = tier
    @upgrade_path = upgrade_path
  end
end
```

## Pattern 5: Pundit for Expert Isolation

**Use case:** VIP Expert can ONLY see assigned clients

```ruby
# app/policies/vip_assignment_policy.rb
class VipAssignmentPolicy < ApplicationPolicy
  def show?
    user.vip_expert? && record.expert_id == user.id
  end
end
```

## More Patterns

See Hotwire documentation: https://hotwired.dev/
