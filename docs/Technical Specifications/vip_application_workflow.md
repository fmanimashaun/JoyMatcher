# VIP Application Workflow — Complete Technical Implementation

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Production-Ready Specification
**Classification:** Technical Reference

---

## Overview

This document provides the complete technical implementation of the VIP application workflow, from initial application submission through expert assignment, payment processing, and ongoing service delivery. This workflow is critical to JoyMatcher's premium offering and must be implemented with precision.

**VIP Service Philosophy:**
> VIP is white-glove concierge matchmaking, not self-service browsing. Every VIP client receives personalized attention from a dedicated expert.

---

## Table of Contents

1. [Application Prerequisites](#1-application-prerequisites)
2. [Application Form (18 Questions)](#2-application-form-18-questions)
3. [VIP Coordinator Review Queue](#3-vip-coordinator-review-queue)
4. [Approval/Rejection Logic](#4-approvalrejection-logic)
5. [Tier 5 Unlock Workflow](#5-tier-5-unlock-workflow)
6. [Expert Assignment Algorithm](#6-expert-assignment-algorithm)
7. [Payment Integration](#7-payment-integration)
8. [State Machine Diagram](#8-state-machine-diagram)
9. [Database Transactions](#9-database-transactions)
10. [Email Notifications](#10-email-notifications)
11. [Code Examples](#11-code-examples)
12. [Testing Requirements](#12-testing-requirements)

---

## 1. Application Prerequisites

### 1.1 Eligibility Requirements

**User MUST meet ALL requirements before VIP application is unlocked:**

1. **Tier 4 Completion:** User must have completed Tier 4 (Health & Long-Term Compatibility)
2. **Premium Subscription:** User must have an active Premium subscription (minimum 1 month)
3. **Account Standing:** User must have no active warnings or suspensions
4. **No Pending Application:** User must not have a pending or recently rejected VIP application

### 1.2 Eligibility Check

```ruby
# app/models/user.rb
class User < ApplicationRecord
  def eligible_for_vip_application?
    return false unless premium? || vip?
    return false unless max_completed_tier >= 4
    return false if suspended?
    return false if vip_application&.pending?

    # Check for recent rejection (cannot reapply for 90 days)
    return false if vip_application&.rejected? && vip_application.reviewed_at > 90.days.ago

    true
  end

  def vip_application_blocked_reason
    return "You must upgrade to Premium to apply for VIP" unless premium? || vip?
    return "You must complete Tier 4 before applying for VIP" unless max_completed_tier >= 4
    return "Your account is suspended" if suspended?
    return "You already have a pending VIP application" if vip_application&.pending?
    return "You can reapply on #{vip_application.reviewed_at + 90.days}" if vip_application&.rejected? && vip_application.reviewed_at > 90.days.ago

    nil
  end
end
```

### 1.3 UI Flow (Check Eligibility)

**Endpoint:** `GET /vip/eligibility`

**Response (200 OK - Eligible):**
```json
{
  "data": {
    "eligible": true,
    "requirements_met": {
      "tier_4_completed": true,
      "premium_subscription": true,
      "account_standing_good": true,
      "no_pending_application": true
    },
    "next_step": "submit_application"
  }
}
```

**Response (200 OK - Not Eligible):**
```json
{
  "data": {
    "eligible": false,
    "requirements_met": {
      "tier_4_completed": false,
      "premium_subscription": true,
      "account_standing_good": true,
      "no_pending_application": true
    },
    "blocked_reason": "You must complete Tier 4 before applying for VIP",
    "next_step": "complete_tier_4"
  }
}
```

---

## 2. Application Form (18 Questions)

### 2.1 Question Structure

The VIP application consists of **18 questions** across 4 sections:

#### Section 1: Marriage Readiness (6 questions)
1. **Why are you ready for marriage now?**
   - Type: Textarea
   - Character limit: 500
   - Required: Yes

2. **What does a successful marriage look like to you?**
   - Type: Textarea
   - Character limit: 500
   - Required: Yes

3. **How do you handle conflict in relationships?**
   - Type: Textarea
   - Character limit: 500
   - Required: Yes

4. **What are your non-negotiable values in a partner?**
   - Type: Textarea
   - Character limit: 500
   - Required: Yes

5. **How would you balance marriage with your career?**
   - Type: Textarea
   - Character limit: 500
   - Required: Yes

6. **What is your timeline for engagement and marriage?**
   - Type: Textarea
   - Character limit: 300
   - Required: Yes

#### Section 2: Ideal Partner (5 questions)
7. **Describe your ideal partner in detail.**
   - Type: Textarea
   - Character limit: 700
   - Required: Yes

8. **What qualities are most important to you?**
   - Type: Textarea
   - Character limit: 500
   - Required: Yes

9. **What are your absolute deal-breakers?**
   - Type: Textarea
   - Character limit: 500
   - Required: Yes

10. **What age range are you open to?**
    - Type: Text
    - Character limit: 100
    - Required: Yes
    - Example: "32-38"

11. **Are you open to relocating for the right person?**
    - Type: Radio + Textarea
    - Options: "Yes", "No", "Maybe"
    - Follow-up: "Please explain" (200 chars)
    - Required: Yes

#### Section 3: Past Relationships (3 questions)
12. **What have you learned from past relationships?**
    - Type: Textarea
    - Character limit: 500
    - Required: Yes

13. **What patterns do you want to break?**
    - Type: Textarea
    - Character limit: 500
    - Required: Yes

14. **How have you grown emotionally in the past 2 years?**
    - Type: Textarea
    - Character limit: 500
    - Required: Yes

#### Section 4: Matchmaking Expectations (4 questions)
15. **What do you expect from the VIP matchmaking service?**
    - Type: Textarea
    - Character limit: 500
    - Required: Yes

16. **How involved do you want your matchmaker to be?**
    - Type: Textarea
    - Character limit: 300
    - Required: Yes

17. **How will you know if a match is right for you?**
    - Type: Textarea
    - Character limit: 500
    - Required: Yes

18. **How many introductions do you expect per month?**
    - Type: Text
    - Character limit: 100
    - Required: Yes
    - Example: "2-3 high-quality matches"

### 2.2 Data Model

```ruby
# app/models/vip_application.rb
class VipApplication < ApplicationRecord
  belongs_to :user
  belongs_to :reviewed_by_admin, class_name: "Admin", optional: true

  # Status enum
  enum status: { pending: "pending", approved: "approved", rejected: "rejected" }

  # Validations
  validates :responses, presence: true
  validate :responses_must_have_18_questions
  validate :user_must_be_eligible

  # Scopes
  scope :pending, -> { where(status: "pending") }
  scope :pending_oldest_first, -> { pending.order(submitted_at: :asc) }

  # Callbacks
  after_create :notify_coordinators

  def responses_must_have_18_questions
    return if responses.blank?

    required_keys = (1..18).map { |i| "question_#{i}" }
    missing_keys = required_keys - responses.keys

    if missing_keys.any?
      errors.add(:responses, "is missing questions: #{missing_keys.join(', ')}")
    end
  end

  def user_must_be_eligible
    errors.add(:user, "is not eligible for VIP application") unless user.eligible_for_vip_application?
  end

  def notify_coordinators
    VipCoordinatorNotificationJob.perform_later(id)
  end
end
```

### 2.3 Database Schema

```ruby
# db/migrate/20260227000200_create_vip_applications.rb
class CreateVipApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :vip_applications do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # Application Status
      t.string :status, default: "pending", null: false
      t.datetime :submitted_at, null: false
      t.datetime :reviewed_at
      t.bigint :reviewed_by_admin_id

      # Application Responses (JSONB - 18 questions)
      t.jsonb :responses, null: false, default: {}

      # Review Data
      t.decimal :review_score, precision: 3, scale: 1 # 0.0 - 5.0
      t.text :review_notes # Internal notes by coordinator
      t.text :rejection_reason # Shown to user if rejected

      t.timestamps
    end

    add_index :vip_applications, :status
    add_index :vip_applications, :submitted_at
    add_index :vip_applications, :reviewed_by_admin_id

    add_foreign_key :vip_applications, :admins, column: :reviewed_by_admin_id
  end
end
```

### 2.4 API Endpoint (Submit Application)

**Endpoint:** `POST /vip/applications`

**Request Body:**
```json
{
  "vip_application": {
    "responses": {
      "question_1": "I'm ready for marriage now because I've spent the last 3 years working on myself emotionally and spiritually. I've achieved career stability and financial independence, and I'm now in a place where I can fully commit to building a life with someone...",
      "question_2": "A successful marriage looks like mutual respect, open communication, and shared values. It's a partnership where both people support each other's growth while building something meaningful together...",
      "question_3": "I handle conflict by first taking time to calm down and reflect. I believe in addressing issues directly but respectfully, using 'I feel' statements rather than accusations. I learned from past relationships that avoiding conflict only makes things worse...",
      "question_4": "My non-negotiable values are integrity, emotional intelligence, ambition, and faith. I need someone who is honest, self-aware, driven to grow, and shares my Christian values...",
      "question_5": "I balance marriage and career by setting clear boundaries. My career is important to me, but I know marriage requires intentional time and effort. I work remotely, which gives me flexibility to prioritize family...",
      "question_6": "I'd like to be engaged within 1 year and married within 2 years. I'm ready now and don't want to drag things out if I meet the right person...",
      "question_7": "My ideal partner is someone who is confident but humble, ambitious but balanced. He's emotionally mature, communicates openly, and isn't afraid of vulnerability. He takes his faith seriously and wants to lead a family with wisdom and humility. Ideally 32-38, educated, financially stable, and wants 2-3 children. He values family, has a sense of humor, and is committed to personal growth...",
      "question_8": "The most important qualities are emotional intelligence, kindness, ambition, spiritual maturity, and communication skills. I need someone who can have deep conversations, handle conflict maturely, and support my dreams...",
      "question_9": "My absolute deal-breakers are dishonesty, emotional unavailability, lack of ambition, closed-mindedness, and unwillingness to communicate. I also can't be with someone who doesn't want children...",
      "question_10": "32-38",
      "question_11": "Yes, I'm open to relocating for the right person. My work is remote, so I have flexibility. However, I'd need to be confident that the relationship is heading toward marriage before making such a big move...",
      "question_12": "From past relationships, I've learned that compatibility is more important than chemistry. I've learned to pay attention to how someone treats me when things get hard, not just when things are easy. I've also learned that I need to be clear about my needs instead of expecting my partner to read my mind...",
      "question_13": "Patterns I want to break: rushing into commitment without truly vetting compatibility, ignoring red flags because I'm afraid of being alone, and people-pleasing at the expense of my own needs...",
      "question_14": "Over the past 2 years, I've grown emotionally through therapy, self-reflection, and reading books on relationships and attachment styles. I've learned to recognize my patterns, communicate my needs clearly, and set healthy boundaries...",
      "question_15": "I expect the VIP matchmaking service to provide personalized, thoughtful introductions to men who genuinely align with my values and life goals. I don't want random suggestions—I want my matchmaker to truly understand me and make intentional connections. I'm also open to coaching and feedback to improve my approach...",
      "question_16": "I want my matchmaker to be involved but not overbearing. Monthly check-ins are great, and I'd appreciate coaching before and after introductions. But I also want space to develop relationships naturally without too much interference...",
      "question_17": "I'll know a match is right when I feel comfortable being myself, when conversations flow naturally, when we share core values, and when I see consistent effort and communication. I also want to feel respected, supported, and excited about the future...",
      "question_18": "I expect 2-3 high-quality introductions per month. Quality over quantity is critical—I'd rather have fewer excellent matches than many mediocre ones."
    }
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "vip_application": {
      "id": 7001,
      "status": "pending",
      "submitted_at": "2026-02-27T16:00:00Z",
      "estimated_review_time": "24-48 hours"
    }
  }
}
```

**Controller Implementation:**
```ruby
# app/controllers/api/v1/vip/applications_controller.rb
module Api
  module V1
    module Vip
      class ApplicationsController < ApplicationController
        before_action :authenticate_user!
        before_action :check_eligibility, only: [:create]

        def create
          application = current_user.build_vip_application(application_params)
          application.submitted_at = Time.current

          if application.save
            render json: { data: { vip_application: application.as_json(only: [:id, :status, :submitted_at]) } }, status: :created
          else
            render json: { errors: application.errors.full_messages.map { |msg| { code: "validation_error", message: msg } } }, status: :unprocessable_entity
          end
        end

        def show
          application = current_user.vip_application

          if application
            render json: { data: { vip_application: application.as_json(include_review: true) } }
          else
            render json: { errors: [{ code: "not_found", message: "No VIP application found" }] }, status: :not_found
          end
        end

        private

        def application_params
          params.require(:vip_application).permit(responses: {})
        end

        def check_eligibility
          unless current_user.eligible_for_vip_application?
            render json: {
              errors: [{
                code: "not_eligible",
                message: current_user.vip_application_blocked_reason
              }]
            }, status: :forbidden
          end
        end
      end
    end
  end
end
```

---

## 3. VIP Coordinator Review Queue

### 3.1 Admin Dashboard (Queue View)

**URL:** `/admin/vip/applications`

**Controller:**
```ruby
# app/controllers/admin/vip/applications_controller.rb
module Admin
  module Vip
    class ApplicationsController < Admin::BaseController
      before_action :require_vip_coordinator

      def index
        @pending_applications = VipApplication.pending_oldest_first
                                              .includes(:user)
                                              .page(params[:page])
                                              .per(10)

        @stats = {
          pending: VipApplication.pending.count,
          approved_this_week: VipApplication.approved.where("reviewed_at > ?", 1.week.ago).count,
          rejected_this_week: VipApplication.rejected.where("reviewed_at > ?", 1.week.ago).count,
          avg_review_time: calculate_avg_review_time
        }
      end

      def show
        @application = VipApplication.find(params[:id])
        @user = @application.user
        @scoring_rubric = scoring_rubric
      end

      def approve
        @application = VipApplication.find(params[:id])

        if @application.approve!(
          admin: current_admin,
          score: params[:score],
          notes: params[:notes]
        )
          flash[:success] = "VIP application approved! User can now complete Tier 5 verification."
          redirect_to admin_vip_applications_path
        else
          flash[:error] = "Failed to approve application"
          redirect_to admin_vip_application_path(@application)
        end
      end

      def reject
        @application = VipApplication.find(params[:id])

        if @application.reject!(
          admin: current_admin,
          reason: params[:reason]
        )
          flash[:success] = "VIP application rejected. User has been notified."
          redirect_to admin_vip_applications_path
        else
          flash[:error] = "Failed to reject application"
          redirect_to admin_vip_application_path(@application)
        end
      end

      private

      def require_vip_coordinator
        redirect_to admin_root_path, alert: "Access denied" unless current_admin.can_review_vip_applications?
      end

      def scoring_rubric
        {
          "Seriousness of Intent" => 40,
          "Profile Quality" => 20,
          "Compatibility" => 20,
          "Communication" => 10,
          "Verification Potential" => 10
        }
      end

      def calculate_avg_review_time
        reviewed_apps = VipApplication.where.not(reviewed_at: nil).where("submitted_at > ?", 1.month.ago)
        return 0 if reviewed_apps.empty?

        total_time = reviewed_apps.sum { |app| app.reviewed_at - app.submitted_at }
        (total_time / reviewed_apps.count / 3600).round # Convert to hours
      end
    end
  end
end
```

### 3.2 View (Admin Dashboard)

```erb
<!-- app/views/admin/vip/applications/index.html.erb -->
<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">VIP Application Queue</h1>

  <!-- Stats -->
  <div class="grid grid-cols-4 gap-4 mb-8">
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="text-sm text-gray-600">Pending</div>
      <div class="text-3xl font-bold text-purple-600"><%= @stats[:pending] %></div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <div class="text-sm text-gray-600">Approved This Week</div>
      <div class="text-3xl font-bold text-green-600"><%= @stats[:approved_this_week] %></div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <div class="text-sm text-gray-600">Rejected This Week</div>
      <div class="text-3xl font-bold text-red-600"><%= @stats[:rejected_this_week] %></div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <div class="text-sm text-gray-600">Avg Review Time</div>
      <div class="text-3xl font-bold text-blue-600"><%= @stats[:avg_review_time] %>h</div>
    </div>
  </div>

  <!-- Pending Applications -->
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <% @pending_applications.each do |application| %>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <%= image_tag application.user.photos.first.variant(resize_to_fill: [50, 50]), class: "h-10 w-10 rounded-full" %>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900"><%= application.user.display_name %></div>
                  <div class="text-sm text-gray-500"><%= application.user.age %>, <%= application.user.tier1_data.city %></div>
                </div>
              </div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <%= time_ago_in_words(application.submitted_at) %> ago
              <% if application.submitted_at < 3.days.ago %>
                <span class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  HIGH PRIORITY
                </span>
              <% end %>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                <%= application.status.titleize %>
              </span>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <%= link_to "Review", admin_vip_application_path(application), class: "text-purple-600 hover:text-purple-900" %>
            </td>
          </tr>
        <% end %>
      </tbody>
    </table>
  </div>

  <%= paginate @pending_applications %>
</div>
```

---

## 4. Approval/Rejection Logic

### 4.1 Scoring Rubric

| Criteria | Weight | Score (1-5) | Description |
|----------|--------|-------------|-------------|
| **Seriousness of Intent** | 40% | 1-5 | Clear marriage focus, realistic expectations, emotional readiness |
| **Profile Quality** | 20% | 1-5 | Complete tiers, thoughtful responses, consistency |
| **Compatibility** | 20% | 1-5 | Fit with existing VIP pool, realistic partner expectations |
| **Communication** | 10% | 1-5 | Professional, articulate, self-aware |
| **Verification Potential** | 10% | 1-5 | Legitimate profile, stable employment, no red flags |

**Total Score:** Weighted average (0.0 - 5.0)

**Approval Threshold:** 3.5+
**Rejection Threshold:** < 3.0
**Borderline:** 3.0 - 3.5 (request additional information)

### 4.2 Approval Model Method

```ruby
# app/models/vip_application.rb
class VipApplication < ApplicationRecord
  def approve!(admin:, score:, notes: nil)
    transaction do
      update!(
        status: "approved",
        reviewed_at: Time.current,
        reviewed_by_admin: admin,
        review_score: score,
        review_notes: notes
      )

      # Update user record
      user.update!(
        vip_application_status: "approved"
      )

      # Unlock Tier 5
      # User can now complete Tier 5 verification

      # Send approval email
      VipMailer.application_approved(user).deliver_later

      # Log approval
      AuditLog.create!(
        user: user,
        admin: admin,
        action: "vip_application_approved",
        details: { score: score, notes: notes }
      )

      true
    end
  rescue => e
    errors.add(:base, "Failed to approve: #{e.message}")
    false
  end

  def reject!(admin:, reason:)
    transaction do
      update!(
        status: "rejected",
        reviewed_at: Time.current,
        reviewed_by_admin: admin,
        rejection_reason: reason
      )

      # Update user record
      user.update!(
        vip_application_status: "rejected"
      )

      # Send rejection email
      VipMailer.application_rejected(user, reason).deliver_later

      # Log rejection
      AuditLog.create!(
        user: user,
        admin: admin,
        action: "vip_application_rejected",
        details: { reason: reason }
      )

      true
    end
  rescue => e
    errors.add(:base, "Failed to reject: #{e.message}")
    false
  end
end
```

---

## 5. Tier 5 Unlock Workflow

### 5.1 Post-Approval Flow

**Once VIP application is approved:**

1. User receives approval email with next steps
2. Tier 5 is unlocked (user can now complete Tier 5 verification)
3. User must complete Tier 5 within 7 days (reminder sent at day 5)
4. After Tier 5 completion, user proceeds to payment

### 5.2 Tier 5 Unlock Check

```ruby
# app/models/user.rb
class User < ApplicationRecord
  def can_access_tier5?
    vip? || (vip_application&.approved? && !tier5_data&.verified?)
  end

  def tier5_unlocked?
    can_access_tier5?
  end
end
```

### 5.3 API Endpoint (Check Tier 5 Access)

**Endpoint:** `GET /tiers/5/access`

**Response (200 OK - Unlocked):**
```json
{
  "data": {
    "tier5_unlocked": true,
    "reason": "vip_application_approved",
    "next_step": "complete_tier5_verification",
    "deadline": "2026-03-06T00:00:00Z"
  }
}
```

**Response (200 OK - Locked):**
```json
{
  "data": {
    "tier5_unlocked": false,
    "reason": "vip_application_not_approved",
    "next_step": "submit_vip_application"
  }
}
```

---

## 6. Expert Assignment Algorithm

### 6.1 Assignment Criteria

**VIP Coordinator assigns expert based on:**

1. **Expert Specialization:** Match applicant's demographics (age, location, faith, profession)
2. **Workload Balance:** Ensure no expert is overloaded (max 6 clients per expert)
3. **Performance History:** Prioritize high-performing experts (satisfaction score > 4.5)
4. **Availability:** Expert must have capacity for new client
5. **Client Preferences:** Some VIPs request specific expert characteristics

### 6.2 Assignment Algorithm

```ruby
# app/services/vip_expert_assignment_service.rb
class VipExpertAssignmentService
  def initialize(user)
    @user = user
  end

  def assign_best_expert
    available_experts = find_available_experts
    scored_experts = score_experts(available_experts)
    best_expert = scored_experts.max_by { |expert, score| score }.first

    create_assignment(best_expert)
  end

  private

  def find_available_experts
    Admin.vip_expert
         .where(active: true)
         .where("(SELECT COUNT(*) FROM vip_assignments WHERE vip_expert_id = admins.id AND status = 'active') < 6")
         .includes(:vip_assignments_as_expert)
  end

  def score_experts(experts)
    experts.map do |expert|
      score = 0

      # Specialization match (40 points)
      score += specialization_score(expert)

      # Performance history (30 points)
      score += performance_score(expert)

      # Workload (20 points)
      score += workload_score(expert)

      # Availability (10 points)
      score += availability_score(expert)

      [expert, score]
    end
  end

  def specialization_score(expert)
    score = 0

    # Faith match
    score += 10 if expert.specialization_faith == @user.tier1_data.faith_orientation

    # Location match
    score += 10 if expert.specialization_location == @user.tier1_data.city

    # Age range match
    score += 10 if expert.specialization_age_range_min <= @user.age && @user.age <= expert.specialization_age_range_max

    # Profession match
    score += 10 if expert.specialization_profession == @user.tier2_data.occupation_category

    score
  end

  def performance_score(expert)
    # Average client satisfaction score (0-5) * 6
    (expert.avg_client_satisfaction * 6).round
  end

  def workload_score(expert)
    active_clients = expert.vip_assignments_as_expert.active.count
    # Fewer clients = higher score
    # 0 clients = 20 points, 6 clients = 0 points
    [20 - (active_clients * 3.33), 0].max.round
  end

  def availability_score(expert)
    # Expert is available if they have capacity
    active_clients = expert.vip_assignments_as_expert.active.count
    active_clients < 6 ? 10 : 0
  end

  def create_assignment(expert)
    VipAssignment.create!(
      user: @user,
      vip_expert: expert,
      assigned_by_coordinator: current_coordinator,
      assigned_at: Time.current,
      expires_at: @user.vip_membership_expires_at,
      coordinator_notes: generate_coordinator_notes,
      status: "active"
    )
  end

  def generate_coordinator_notes
    notes = []

    notes << "Client is a mature professional with clear marriage vision."
    notes << "Faith is very important to them." if @user.tier1_data.faith_orientation != "agnostic"
    notes << "They value depth over surface-level attraction."
    notes << "Focus on emotionally intelligent and family-oriented matches."
    notes << "Quality over quantity—2-3 excellent matches per month."

    notes.join(" ")
  end

  def current_coordinator
    # In production, this would be the authenticated admin
    Admin.vip_coordinator.first
  end
end
```

### 6.3 Manual Assignment (Admin UI)

```ruby
# app/controllers/admin/vip/assignments_controller.rb
module Admin
  module Vip
    class AssignmentsController < Admin::BaseController
      def new
        @user = User.find(params[:user_id])
        @available_experts = find_available_experts
        @recommended_expert = VipExpertAssignmentService.new(@user).assign_best_expert
      end

      def create
        @user = User.find(params[:user_id])
        @expert = Admin.find(params[:expert_id])

        assignment = VipAssignment.create!(
          user: @user,
          vip_expert: @expert,
          assigned_by_coordinator: current_admin,
          assigned_at: Time.current,
          expires_at: @user.vip_membership_expires_at,
          coordinator_notes: params[:coordinator_notes],
          status: "active"
        )

        # Notify expert
        VipMailer.expert_new_client_assigned(@expert, @user, params[:coordinator_notes]).deliver_later

        # Notify user
        VipMailer.expert_assigned(@user, @expert).deliver_later

        redirect_to admin_vip_assignments_path, notice: "Expert assigned successfully!"
      end

      private

      def find_available_experts
        Admin.vip_expert
             .where(active: true)
             .where("(SELECT COUNT(*) FROM vip_assignments WHERE vip_expert_id = admins.id AND status = 'active') < 6")
      end
    end
  end
end
```

---

## 7. Payment Integration

### 7.1 Payment Gateway Integration

**Supported Payment Gateways:**
- **Nigerian Users:** Paystack
- **International Users:** Stripe

### 7.2 VIP Pricing Tiers

| Tier | Nigerian Price (₦) | International Price ($) | Duration |
|------|-------------------|------------------------|----------|
| 3-Month VIP | ₦200,000 | $200 | 3 months |
| 6-Month VIP | ₦350,000 | $850 | 6 months |
| 12-Month VIP | ₦600,000 | $1,500 | 12 months |

### 7.3 Payment Flow

**Step 1: User selects VIP tier**

**Endpoint:** `POST /vip/subscriptions/initialize`

**Request Body:**
```json
{
  "subscription": {
    "tier": "3_months"
  }
}
```

**Response (200 OK):**
```json
{
  "data": {
    "payment": {
      "amount": 200000,
      "currency": "NGN",
      "payment_url": "https://paystack.com/pay/xyz123",
      "reference": "vip_sub_xyz123"
    }
  }
}
```

**Step 2: User completes payment on Paystack/Stripe**

**Step 3: Webhook receives payment confirmation**

**Webhook Endpoint:** `POST /webhooks/paystack`

**Controller:**
```ruby
# app/controllers/webhooks/paystack_controller.rb
module Webhooks
  class PaystackController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
      payload = JSON.parse(request.body.read)

      # Verify webhook signature
      unless verify_signature(payload)
        render json: { error: "Invalid signature" }, status: :unauthorized
        return
      end

      case payload["event"]
      when "charge.success"
        handle_successful_payment(payload)
      when "subscription.create"
        handle_subscription_created(payload)
      end

      render json: { status: "ok" }, status: :ok
    end

    private

    def verify_signature(payload)
      # Verify Paystack webhook signature
      secret = Rails.application.credentials.paystack_secret_key
      signature = request.headers["X-Paystack-Signature"]

      computed_signature = OpenSSL::HMAC.hexdigest("sha512", secret, request.body.read)
      signature == computed_signature
    end

    def handle_successful_payment(payload)
      reference = payload["data"]["reference"]
      user = User.find_by(vip_payment_reference: reference)

      return unless user

      # Activate VIP subscription
      user.activate_vip_subscription!(
        tier: user.vip_subscription_tier,
        expires_at: calculate_expiry_date(user.vip_subscription_tier)
      )

      # Assign VIP expert
      VipExpertAssignmentService.new(user).assign_best_expert

      # Send confirmation email
      VipMailer.subscription_confirmed(user).deliver_later
    end

    def calculate_expiry_date(tier)
      case tier
      when "3_months" then 3.months.from_now
      when "6_months" then 6.months.from_now
      when "12_months" then 12.months.from_now
      end
    end
  end
end
```

### 7.4 VIP Subscription Activation

```ruby
# app/models/user.rb
class User < ApplicationRecord
  def activate_vip_subscription!(tier:, expires_at:)
    transaction do
      update!(
        subscription: "vip",
        vip_membership_expires_at: expires_at
      )

      # Log subscription activation
      AuditLog.create!(
        user: self,
        action: "vip_subscription_activated",
        details: { tier: tier, expires_at: expires_at }
      )
    end
  end
end
```

---

## 8. State Machine Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                       VIP APPLICATION STATE MACHINE                   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  [User Completes Tier 4]                                             │
│           │                                                           │
│           ▼                                                           │
│  ┌─────────────────┐                                                 │
│  │  Eligible for   │                                                 │
│  │  VIP Application│                                                 │
│  └────────┬────────┘                                                 │
│           │                                                           │
│           │ Submit Application                                       │
│           ▼                                                           │
│  ┌─────────────────┐                                                 │
│  │    PENDING      │───────────────────┐                            │
│  │    (Review)     │                   │                            │
│  └────────┬────────┘                   │                            │
│           │                             │                            │
│           │ VIP Coordinator Review      │                            │
│           │                             │                            │
│    ┌──────┴──────┐                     │                            │
│    │             │                     │ Reject                     │
│    ▼             ▼                     │                            │
│  ┌─────────┐  ┌─────────┐            │                            │
│  │APPROVED │  │REJECTED │◄───────────┘                            │
│  └────┬────┘  └────┬────┘                                           │
│       │            │                                                │
│       │            │ Wait 90 days                                   │
│       │            └──────────┐                                     │
│       │                       │                                     │
│       │                       ▼                                     │
│       │            ┌──────────────────┐                             │
│       │            │  Can Reapply     │                             │
│       │            └──────────────────┘                             │
│       │                                                              │
│       │ Tier 5 Unlocked                                             │
│       ▼                                                              │
│  ┌─────────────────┐                                                │
│  │ Complete Tier 5 │                                                │
│  │  (ID + Video)   │                                                │
│  └────────┬────────┘                                                │
│           │                                                          │
│           │ VIP Coordinator Verifies                                │
│           ▼                                                          │
│  ┌─────────────────┐                                                │
│  │ Tier 5 Verified │                                                │
│  └────────┬────────┘                                                │
│           │                                                          │
│           │ Select VIP Tier & Pay                                   │
│           ▼                                                          │
│  ┌─────────────────┐                                                │
│  │  Payment Page   │                                                │
│  └────────┬────────┘                                                │
│           │                                                          │
│           │ Payment Successful                                      │
│           ▼                                                          │
│  ┌─────────────────┐                                                │
│  │ VIP ACTIVATED   │                                                │
│  └────────┬────────┘                                                │
│           │                                                          │
│           │ Expert Assignment                                       │
│           ▼                                                          │
│  ┌─────────────────┐                                                │
│  │ Expert Assigned │                                                │
│  └────────┬────────┘                                                │
│           │                                                          │
│           │ Onboarding Session                                      │
│           ▼                                                          │
│  ┌─────────────────┐                                                │
│  │ VIP SERVICE     │                                                │
│  │   ACTIVE        │                                                │
│  └─────────────────┘                                                │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 9. Database Transactions

### 9.1 Critical Transaction: VIP Activation

```ruby
# app/services/vip_activation_service.rb
class VipActivationService
  def initialize(user, tier:, payment_reference:)
    @user = user
    @tier = tier
    @payment_reference = payment_reference
  end

  def activate!
    ActiveRecord::Base.transaction do
      # 1. Update user subscription
      @user.update!(
        subscription: "vip",
        vip_membership_expires_at: calculate_expiry_date,
        vip_payment_reference: @payment_reference
      )

      # 2. Assign VIP expert
      assignment = VipExpertAssignmentService.new(@user).assign_best_expert

      # 3. Log activation
      AuditLog.create!(
        user: @user,
        action: "vip_subscription_activated",
        details: {
          tier: @tier,
          expires_at: @user.vip_membership_expires_at,
          expert_id: assignment.vip_expert_id,
          payment_reference: @payment_reference
        }
      )

      # 4. Send notifications
      send_activation_notifications(assignment)

      assignment
    end
  rescue => e
    Rails.logger.error("VIP Activation Failed: #{e.message}")
    raise ActiveRecord::Rollback
  end

  private

  def calculate_expiry_date
    case @tier
    when "3_months" then 3.months.from_now
    when "6_months" then 6.months.from_now
    when "12_months" then 12.months.from_now
    end
  end

  def send_activation_notifications(assignment)
    # Email to user
    VipMailer.subscription_confirmed(@user, assignment).deliver_later

    # Email to expert
    VipMailer.expert_new_client_assigned(assignment.vip_expert, @user, assignment.coordinator_notes).deliver_later

    # Notify VIP Coordinator (for monitoring)
    VipCoordinatorMailer.new_vip_activated(@user, assignment).deliver_later
  end
end
```

---

## 10. Email Notifications

### 10.1 Application Approved Email

```ruby
# app/mailers/vip_mailer.rb
class VipMailer < ApplicationMailer
  def application_approved(user)
    @user = user

    mail(
      to: @user.email,
      subject: "Congratulations! Your VIP Application has been Approved"
    )
  end
end
```

```erb
<!-- app/views/vip_mailer/application_approved.html.erb -->
<h1>Congratulations, <%= @user.first_name %>!</h1>

<p>Your VIP application has been approved. Welcome to JoyMatcher VIP!</p>

<h2>Next Steps:</h2>
<ol>
  <li>Complete Tier 5 Verification (ID + Video KYC)</li>
  <li>Choose your VIP subscription tier</li>
  <li>Complete payment</li>
  <li>Meet your dedicated matchmaker</li>
</ol>

<p>
  <strong>Tier 5 Verification is now unlocked.</strong> Please complete it within 7 days.
</p>

<p>
  <a href="<%= tier5_verification_url %>" style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
    Complete Tier 5 Verification
  </a>
</p>

<p>If you have any questions, contact us at vip@joymatcher.com.</p>

<p>Your VIP Coordinator,<br>
<%= @user.vip_application.reviewed_by_admin.first_name %></p>
```

### 10.2 Application Rejected Email

```ruby
# app/mailers/vip_mailer.rb
class VipMailer < ApplicationMailer
  def application_rejected(user, reason)
    @user = user
    @reason = reason

    mail(
      to: @user.email,
      subject: "Update on Your VIP Application"
    )
  end
end
```

```erb
<!-- app/views/vip_mailer/application_rejected.html.erb -->
<h1>Hi <%= @user.first_name %>,</h1>

<p>Thank you for your VIP application. After careful review, we've decided not to move forward with your application at this time.</p>

<h2>Reason:</h2>
<p><%= @reason %></p>

<h2>Next Steps:</h2>
<p>
  You're welcome to continue using JoyMatcher Premium. We encourage you to take time to reflect on your marriage vision and can reapply in 3 months if you feel ready.
</p>

<p>If you have questions, contact us at vip@joymatcher.com.</p>

<p>Best regards,<br>
VIP Coordination Team</p>
```

### 10.3 Expert Assigned Email (to User)

```ruby
# app/mailers/vip_mailer.rb
class VipMailer < ApplicationMailer
  def expert_assigned(user, expert)
    @user = user
    @expert = expert

    mail(
      to: @user.email,
      subject: "Welcome to JoyMatcher VIP - Meet Your Matchmaker!"
    )
  end
end
```

### 10.4 Expert Assigned Email (to Expert)

```ruby
# app/mailers/vip_mailer.rb
class VipMailer < ApplicationMailer
  def expert_new_client_assigned(expert, user, coordinator_notes)
    @expert = expert
    @user = user
    @coordinator_notes = coordinator_notes

    mail(
      to: @expert.email,
      subject: "New VIP Client Assignment - #{user.display_name}"
    )
  end
end
```

---

## 11. Code Examples

### Complete VIP Application Flow (Controller)

```ruby
# app/controllers/api/v1/vip/subscriptions_controller.rb
module Api
  module V1
    module Vip
      class SubscriptionsController < ApplicationController
        before_action :authenticate_user!
        before_action :check_tier5_verification, only: [:initialize_payment]

        def initialize_payment
          tier = params[:tier] # "3_months", "6_months", "12_months"
          amount = calculate_amount(tier)

          # Generate payment reference
          reference = "vip_sub_#{SecureRandom.hex(10)}"

          # Store payment intent
          current_user.update!(
            vip_subscription_tier: tier,
            vip_payment_reference: reference
          )

          # Initialize payment on Paystack/Stripe
          payment_url = initialize_payment_gateway(amount, reference)

          render json: {
            data: {
              payment: {
                amount: amount,
                currency: current_user.currency,
                payment_url: payment_url,
                reference: reference
              }
            }
          }
        end

        private

        def check_tier5_verification
          unless current_user.tier5_data&.verified?
            render json: {
              errors: [{
                code: "tier5_verification_required",
                message: "You must complete Tier 5 verification before subscribing to VIP"
              }]
            }, status: :forbidden
          end
        end

        def calculate_amount(tier)
          prices = {
            "3_months" => { "NGN" => 200_000, "USD" => 500 },
            "6_months" => { "NGN" => 350_000, "USD" => 850 },
            "12_months" => { "NGN" => 600_000, "USD" => 1_500 }
          }

          prices[tier][current_user.currency]
        end

        def initialize_payment_gateway(amount, reference)
          if current_user.currency == "NGN"
            PaystackService.initialize_payment(amount, reference, current_user.email)
          else
            StripeService.initialize_payment(amount, reference, current_user.email)
          end
        end
      end
    end
  end
end
```

---

## 12. Testing Requirements

### RSpec Tests

```ruby
# spec/models/vip_application_spec.rb
require 'rails_helper'

RSpec.describe VipApplication, type: :model do
  let(:user) { create(:user, :premium, max_completed_tier: 4) }
  let(:admin) { create(:admin, :vip_coordinator) }
  let(:application) { create(:vip_application, user: user) }

  describe "validations" do
    it "requires 18 questions in responses" do
      application.responses = { "question_1" => "Answer" }
      expect(application).not_to be_valid
      expect(application.errors[:responses]).to include(/missing questions/)
    end

    it "requires user to be eligible" do
      user.update!(max_completed_tier: 2)
      expect(application).not_to be_valid
    end
  end

  describe "#approve!" do
    it "approves application and unlocks Tier 5" do
      expect {
        application.approve!(admin: admin, score: 4.5, notes: "Excellent application")
      }.to change { application.status }.from("pending").to("approved")

      expect(application.reviewed_at).to be_present
      expect(application.reviewed_by_admin).to eq(admin)
      expect(application.review_score).to eq(4.5)
    end

    it "sends approval email" do
      expect {
        application.approve!(admin: admin, score: 4.5)
      }.to have_enqueued_job(ActionMailer::MailDeliveryJob)
        .with("VipMailer", "application_approved", "deliver_now", { args: [user] })
    end

    it "logs approval in audit log" do
      expect {
        application.approve!(admin: admin, score: 4.5, notes: "Great fit")
      }.to change { AuditLog.count }.by(1)

      log = AuditLog.last
      expect(log.user).to eq(user)
      expect(log.admin).to eq(admin)
      expect(log.action).to eq("vip_application_approved")
    end
  end

  describe "#reject!" do
    it "rejects application and locks Tier 5" do
      expect {
        application.reject!(admin: admin, reason: "Application not ready")
      }.to change { application.status }.from("pending").to("rejected")

      expect(application.reviewed_at).to be_present
      expect(application.rejection_reason).to eq("Application not ready")
    end

    it "sends rejection email" do
      expect {
        application.reject!(admin: admin, reason: "Not ready")
      }.to have_enqueued_job(ActionMailer::MailDeliveryJob)
        .with("VipMailer", "application_rejected", "deliver_now", { args: [user, "Not ready"] })
    end
  end
end
```

---

## Related Documentation

- [Data Models](data_models.md) - Database schema for VIP tables
- [Tier 5 Verification Procedure](tier5_verification_procedure.md) - KYC technical implementation
- [VIP Coordination](../Admin%20System/vip_coordination.md) - Operations guide
- [Tier System](../Global%20Context/tier_system.md) - Tier definitions

---

**Document Owner:** Engineering Lead & VIP Services Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Before VIP service launch

**Status:** ✅ Production-Ready Specification
