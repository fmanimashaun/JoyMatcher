# Database Schema & Data Models — Complete Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Production-Ready Specification
**Classification:** Technical Reference

---

## Overview

This document provides the complete database schema for JoyMatcher's production Rails application. All models, tables, relationships, indexes, constraints, and migrations are specified here. This schema supports the tier system, EDT calculation, VIP coordination, and all core platform features.

**Technology Stack:**
- **Database:** PostgreSQL 16+
- **ORM:** Active Record (Rails 8)
- **File Storage:** Active Storage (S3-compatible)
- **Full-Text Search:** PostgreSQL `pg_search` gem

---

## Core Principles

### 1. Data Privacy & Security
- **Tier data is isolated** — Each tier has its own table for granular access control
- **Sensitive data encrypted** — Health data (Tier 4) and ID documents (Tier 5) encrypted at rest
- **Audit logging** — All tier access, EDT changes, and revocations logged
- **GDPR compliant** — User data exportable and deletable

### 2. EDT Enforcement
- **Relationship table** — Central table storing EDT between every pair of users
- **Real-time recalculation** — EDT updated immediately on tier completion or revocation
- **Denormalized for performance** — EDT cached in `relationships` table

### 3. Scalability
- **Proper indexing** — All foreign keys and frequently queried columns indexed
- **Partitioning (future)** — Messages table partitioned by date for scale
- **Efficient queries** — N+1 queries prevented with `includes()` and caching

---

## Entity Relationship Diagram (ERD)

```
┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
│    Users     │◄───────►│  Relationships   │◄───────►│    Users     │
│              │         │   (EDT Engine)   │         │              │
│ - email      │         │ - user1_id       │         │              │
│ - subscription│         │ - user2_id       │         │              │
│ - max_tier   │         │ - edt            │         │              │
└──────┬───────┘         │ - shared_tier_1  │         └──────────────┘
       │                 │ - shared_tier_2  │
       │                 └──────────────────┘
       │
       ├─────► TierData::Tier1
       ├─────► TierData::Tier2
       ├─────► TierData::Tier3 (Premium+)
       ├─────► TierData::Tier4 (Premium+)
       └─────► TierData::Tier5 (VIP only)
       │
       ├─────► Interests (Show Interest)
       ├─────► Conversations
       ├─────► Messages
       ├─────► VipApplications
       ├─────► VipAssignments
       └─────► AuditLogs
```

---

## 1. Users Table

### Purpose
Core user authentication and profile data. This is the central table for all user-related data.

### Schema

```ruby
# db/migrate/20260227000001_create_users.rb
class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      # Authentication (Devise)
      t.string :email, null: false
      t.string :encrypted_password, null: false
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.integer :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string :current_sign_in_ip
      t.string :last_sign_in_ip
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string :unconfirmed_email
      t.integer :failed_attempts, default: 0, null: false
      t.string :unlock_token
      t.datetime :locked_at

      # Core Profile
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :display_name, null: false
      t.date :date_of_birth, null: false
      t.string :gender, null: false # "male", "female", "other"

      # Subscription & Tier Progress
      t.integer :subscription, default: 0, null: false # 0: free, 1: premium, 2: vip
      t.integer :max_completed_tier, default: 0, null: false # 0-5
      t.boolean :verified, default: false # Tier 5 verified

      # Location & Currency
      t.string :country_code, default: "NG", null: false # ISO 3166-1 alpha-2
      t.string :currency, default: "NGN", null: false # "NGN" or "USD"

      # Account Status
      t.boolean :active, default: true, null: false
      t.boolean :suspended, default: false
      t.string :suspension_reason
      t.datetime :suspended_at

      # VIP Status
      t.boolean :vip_application_submitted, default: false
      t.string :vip_application_status # "pending", "approved", "rejected"
      t.datetime :vip_membership_expires_at

      # Profile Visibility (VIP feature)
      t.boolean :profile_visible, default: true # VIP can hide profile

      # Timestamps
      t.timestamps
      t.datetime :last_active_at
    end

    # Indexes
    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique: true
    add_index :users, :confirmation_token, unique: true
    add_index :users, :unlock_token, unique: true
    add_index :users, :subscription
    add_index :users, :max_completed_tier
    add_index :users, :verified
    add_index :users, :country_code
    add_index :users, [:subscription, :max_completed_tier] # Discovery queries
    add_index :users, :last_active_at # Active users
  end
end
```

### Model

```ruby
# app/models/user.rb
class User < ApplicationRecord
  # Devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable, :timeoutable, :trackable

  # Enums
  enum subscription: { free: 0, premium: 1, vip: 2 }
  enum gender: { male: "male", female: "female", other: "other" }

  # Associations
  has_many :tier_completions, dependent: :destroy

  # Tier Data (one-to-one)
  has_one :tier1_data, class_name: "TierData::Tier1", dependent: :destroy
  has_one :tier2_data, class_name: "TierData::Tier2", dependent: :destroy
  has_one :tier3_data, class_name: "TierData::Tier3", dependent: :destroy
  has_one :tier4_data, class_name: "TierData::Tier4", dependent: :destroy
  has_one :tier5_data, class_name: "TierData::Tier5", dependent: :destroy

  # Relationships
  has_many :relationships_as_user1, class_name: "Relationship", foreign_key: "user1_id", dependent: :destroy
  has_many :relationships_as_user2, class_name: "Relationship", foreign_key: "user2_id", dependent: :destroy

  # Interests
  has_many :interests_sent, class_name: "Interest", foreign_key: "sender_id", dependent: :destroy
  has_many :interests_received, class_name: "Interest", foreign_key: "receiver_id", dependent: :destroy

  # Conversations & Messages
  has_many :conversations_as_user1, class_name: "Conversation", foreign_key: "user1_id", dependent: :destroy
  has_many :conversations_as_user2, class_name: "Conversation", foreign_key: "user2_id", dependent: :destroy
  has_many :messages, foreign_key: "sender_id", dependent: :destroy

  # VIP
  has_one :vip_application, dependent: :destroy
  has_one :vip_assignment, dependent: :destroy
  has_many :vip_check_ins, dependent: :destroy

  # Photos (Active Storage)
  has_many_attached :photos

  # Audit Logs
  has_many :audit_logs, foreign_key: "user_id", dependent: :destroy

  # Validations
  validates :first_name, :last_name, :display_name, presence: true
  validates :date_of_birth, presence: true
  validates :gender, presence: true, inclusion: { in: %w[male female other] }
  validates :photos, presence: true, length: { minimum: 1, maximum: 6 }
  validates :country_code, presence: true, length: { is: 2 }
  validates :currency, presence: true, inclusion: { in: %w[NGN USD] }

  validate :age_must_be_at_least_18

  # Scopes
  scope :active, -> { where(active: true, suspended: false) }
  scope :verified, -> { where(verified: true) }
  scope :premium_or_vip, -> { where(subscription: [:premium, :vip]) }
  scope :vip_only, -> { where(subscription: :vip) }
  scope :recently_active, -> { where("last_active_at > ?", 7.days.ago) }

  # Instance Methods
  def age
    return nil unless date_of_birth
    now = Time.zone.now.to_date
    now.year - date_of_birth.year - ((now.month > date_of_birth.month || (now.month == date_of_birth.month && now.day >= date_of_birth.day)) ? 0 : 1)
  end

  def max_accessible_tier
    case subscription.to_sym
    when :free then 2
    when :premium then 4
    when :vip then 5
    else 0
    end
  end

  def can_access_tier?(tier_number)
    tier_number <= max_accessible_tier && tier_number <= max_completed_tier
  end

  def tier_completed?(tier_number)
    tier_completions.exists?(tier_number: tier_number)
  end

  def conversations
    Conversation.where("user1_id = ? OR user2_id = ?", id, id)
  end

  def relationship_with(other_user)
    Relationship.find_by(user1: self, user2: other_user) ||
    Relationship.find_by(user1: other_user, user2: self)
  end

  def edt_with(other_user)
    relationship_with(other_user)&.edt || 0
  end

  def touch_last_active!
    update_column(:last_active_at, Time.current)
  end

  private

  def age_must_be_at_least_18
    return unless date_of_birth
    errors.add(:date_of_birth, "must be at least 18 years old") if age < 18
  end
end
```

---

## 2. Tier Data Tables

### Purpose
Each tier has a separate table to store tier-specific data. This allows:
- Granular access control (only users with proper EDT can query tier tables)
- Clear data isolation
- Easy auditing of tier access

### 2.1 TierData::Tier1 (Identity & Intent)

```ruby
# db/migrate/20260227000010_create_tier_data_tier1s.rb
class CreateTierDataTier1s < ActiveRecord::Migration[8.0]
  def change
    create_table :tier_data_tier1s do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # Identity
      t.string :display_name, null: false
      t.date :date_of_birth, null: false
      t.string :gender, null: false # "male", "female", "other"

      # Location
      t.string :city, null: false
      t.string :state_province, null: false
      t.string :country, null: false

      # Faith & Intent
      t.string :faith_orientation, null: false # "christian", "muslim", "spiritual", "agnostic", "atheist", "other"
      t.string :relationship_intent, null: false # "marriage_1_2_years", "long_term_leading_to_marriage"

      # Primary Photo (Active Storage attachment)
      # has_one_attached :primary_photo (in model)

      # Liveness Check
      t.boolean :liveness_check_passed, default: false, null: false
      t.datetime :liveness_checked_at

      t.timestamps
    end

    add_index :tier_data_tier1s, :gender
    add_index :tier_data_tier1s, :city
    add_index :tier_data_tier1s, :country
    add_index :tier_data_tier1s, :faith_orientation
  end
end
```

```ruby
# app/models/tier_data/tier1.rb
module TierData
  class Tier1 < ApplicationRecord
    self.table_name = "tier_data_tier1s"

    belongs_to :user
    has_one_attached :primary_photo

    validates :display_name, :date_of_birth, :gender, :city, :state_province, :country, presence: true
    validates :faith_orientation, :relationship_intent, presence: true
    validates :gender, inclusion: { in: %w[male female other] }
    validates :faith_orientation, inclusion: { in: %w[christian muslim spiritual agnostic atheist other] }
    validates :relationship_intent, inclusion: { in: %w[marriage_1_2_years long_term_leading_to_marriage] }
    validates :liveness_check_passed, inclusion: { in: [true, false] }
    validates :primary_photo, presence: true

    validate :user_age_must_be_18_or_older

    def age
      return nil unless date_of_birth
      now = Time.zone.now.to_date
      now.year - date_of_birth.year - ((now.month > date_of_birth.month || (now.month == date_of_birth.month && now.day >= date_of_birth.day)) ? 0 : 1)
    end

    private

    def user_age_must_be_18_or_older
      errors.add(:date_of_birth, "must be at least 18 years old") if age && age < 18
    end
  end
end
```

### 2.2 TierData::Tier2 (Lifestyle Compatibility)

```ruby
# db/migrate/20260227000020_create_tier_data_tier2s.rb
class CreateTierDataTier2s < ActiveRecord::Migration[8.0]
  def change
    create_table :tier_data_tier2s do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # Physical Attributes
      t.integer :height_cm, null: false # Height in centimeters
      t.string :body_type, null: false # "slim", "athletic", "average", "curvy", "plus_size"

      # Education
      t.string :education_level, null: false # "high_school", "bachelors", "masters", "phd", "other"
      t.string :field_of_study

      # Employment
      t.string :employment_status, null: false # "employed", "self_employed", "student", "between_jobs"
      t.string :occupation_category, null: false # "tech", "healthcare", "finance", "education", "legal", etc.
      t.string :industry
      t.string :work_mode, null: false # "onsite", "remote", "hybrid"

      # Lifestyle
      t.string :smoking, null: false # "never", "occasionally", "regularly", "prefer_not_to_say"
      t.string :alcohol, null: false # "never", "socially", "regularly", "prefer_not_to_say"
      t.string :exercise_frequency, null: false # "never", "1_2_week", "3_5_week", "daily"

      # Languages (JSON array)
      t.jsonb :languages, default: [], null: false # ["english", "yoruba", "igbo", "hausa", "french", "spanish"]

      t.timestamps
    end

    add_index :tier_data_tier2s, :body_type
    add_index :tier_data_tier2s, :education_level
    add_index :tier_data_tier2s, :employment_status
    add_index :tier_data_tier2s, :occupation_category
    add_index :tier_data_tier2s, :work_mode
    add_index :tier_data_tier2s, :languages, using: :gin # GIN index for JSONB array queries
  end
end
```

```ruby
# app/models/tier_data/tier2.rb
module TierData
  class Tier2 < ApplicationRecord
    self.table_name = "tier_data_tier2s"

    belongs_to :user

    validates :height_cm, presence: true, numericality: { greater_than: 100, less_than: 250 }
    validates :body_type, presence: true, inclusion: { in: %w[slim athletic average curvy plus_size] }
    validates :education_level, presence: true
    validates :employment_status, presence: true
    validates :occupation_category, presence: true
    validates :work_mode, presence: true, inclusion: { in: %w[onsite remote hybrid] }
    validates :smoking, presence: true
    validates :alcohol, presence: true
    validates :exercise_frequency, presence: true
    validates :languages, presence: true

    validate :languages_must_be_array

    def height_in_feet_and_inches
      total_inches = (height_cm / 2.54).round
      feet = total_inches / 12
      inches = total_inches % 12
      "#{feet}' #{inches}\""
    end

    private

    def languages_must_be_array
      errors.add(:languages, "must be an array") unless languages.is_a?(Array) && languages.any?
    end
  end
end
```

### 2.3 TierData::Tier3 (Relationship & Family Readiness)

**Subscription Required:** Premium or VIP

```ruby
# db/migrate/20260227000030_create_tier_data_tier3s.rb
class CreateTierDataTier3s < ActiveRecord::Migration[8.0]
  def change
    create_table :tier_data_tier3s do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # Marital History
      t.string :marital_history, null: false # "never_married", "divorced", "widowed", "separated"

      # Children
      t.integer :number_of_children, default: 0, null: false
      t.string :custody_status # "full_custody", "shared_custody", "no_custody" (if children > 0)
      t.boolean :children_living_with_you # true, false (if children > 0)

      # Future Children
      t.string :willingness_to_have_children, null: false # "want_children", "have_children_want_more", "open_to_discussion", "child_free_by_choice"

      # Marriage Timeline
      t.string :marriage_timeline_expectation, null: false # "within_1_2_years", "3_5_years", "flexible", "need_to_discuss"

      # Family Expectations (text fields)
      t.text :family_involvement_expectations, null: false # 500 char max
      t.text :family_deal_breakers, null: false # 500 char max

      t.timestamps
    end

    add_index :tier_data_tier3s, :marital_history
    add_index :tier_data_tier3s, :number_of_children
    add_index :tier_data_tier3s, :willingness_to_have_children
  end
end
```

```ruby
# app/models/tier_data/tier3.rb
module TierData
  class Tier3 < ApplicationRecord
    self.table_name = "tier_data_tier3s"

    belongs_to :user

    validates :marital_history, presence: true, inclusion: { in: %w[never_married divorced widowed separated] }
    validates :number_of_children, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :willingness_to_have_children, presence: true
    validates :marriage_timeline_expectation, presence: true
    validates :family_involvement_expectations, presence: true, length: { maximum: 500 }
    validates :family_deal_breakers, presence: true, length: { maximum: 500 }

    validate :custody_status_required_if_children
    validate :children_living_with_you_required_if_children

    private

    def custody_status_required_if_children
      if number_of_children > 0 && custody_status.blank?
        errors.add(:custody_status, "is required when you have children")
      end
    end

    def children_living_with_you_required_if_children
      if number_of_children > 0 && children_living_with_you.nil?
        errors.add(:children_living_with_you, "is required when you have children")
      end
    end
  end
end
```

### 2.4 TierData::Tier4 (Health & Long-Term Compatibility)

**Subscription Required:** Premium or VIP

**IMPORTANT:** Health data is **self-declared** and **not medically verified**. Platform is not liable for accuracy.

```ruby
# db/migrate/20260227000040_create_tier_data_tier4s.rb
class CreateTierDataTier4s < ActiveRecord::Migration[8.0]
  def change
    create_table :tier_data_tier4s do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # Genetic Health
      t.string :genotype, null: false # "AA", "AS", "SS", "AC", "SC", "CC", "prefer_not_to_say"
      t.string :blood_group, null: false # "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "unknown"

      # Health Conditions (JSON array)
      t.jsonb :health_conditions, default: [], null: false # ["none", "hypertension", "diabetes", "asthma", "other"]
      t.text :health_conditions_details # If "other" selected

      # Fertility
      t.string :fertility_related_disclosures, null: false # "no_known_issues", "disclosed_in_profile", "prefer_to_discuss_privately"

      # Health Lifestyle (JSON array)
      t.jsonb :health_lifestyle_factors, default: [], null: false # ["regular_checkups", "active_lifestyle", "managing_chronic_condition", "prefer_not_to_say"]

      # Non-Negotiables
      t.string :non_negotiable_religion, null: false # "must_share_same_faith", "open_to_interfaith", "flexible"
      t.string :non_negotiable_relocation, null: false # "must_stay_current_city", "open_to_relocation", "partner_must_relocate", "flexible"
      t.string :non_negotiable_children, null: false # "must_have_children", "open_to_discussion", "must_not_have_children"

      # Disclaimers Accepted
      t.boolean :health_disclaimer_accepted, default: false, null: false
      t.datetime :health_disclaimer_accepted_at

      t.timestamps
    end

    add_index :tier_data_tier4s, :genotype
    add_index :tier_data_tier4s, :blood_group
  end
end
```

```ruby
# app/models/tier_data/tier4.rb
module TierData
  class Tier4 < ApplicationRecord
    self.table_name = "tier_data_tier4s"

    belongs_to :user

    validates :genotype, presence: true, inclusion: { in: %w[AA AS SS AC SC CC prefer_not_to_say] }
    validates :blood_group, presence: true, inclusion: { in: %w[A+ A- B+ B- O+ O- AB+ AB- unknown] }
    validates :health_conditions, presence: true
    validates :fertility_related_disclosures, presence: true
    validates :health_lifestyle_factors, presence: true
    validates :non_negotiable_religion, :non_negotiable_relocation, :non_negotiable_children, presence: true
    validates :health_disclaimer_accepted, inclusion: { in: [true] }

    validate :health_conditions_must_be_array
    validate :health_lifestyle_factors_must_be_array

    # Check genotype compatibility
    def genotype_compatible_with?(other_tier4)
      return nil if genotype == "prefer_not_to_say" || other_tier4.genotype == "prefer_not_to_say"

      # AS + AS = Incompatible (risk of SS children)
      # AS + SS = Incompatible
      # SS + SS = Incompatible
      incompatible_combinations = [
        %w[AS AS],
        %w[AS SS],
        %w[SS SS]
      ]

      pair = [genotype, other_tier4.genotype].sort
      !incompatible_combinations.include?(pair)
    end

    private

    def health_conditions_must_be_array
      errors.add(:health_conditions, "must be an array") unless health_conditions.is_a?(Array) && health_conditions.any?
    end

    def health_lifestyle_factors_must_be_array
      errors.add(:health_lifestyle_factors, "must be an array") unless health_lifestyle_factors.is_a?(Array) && health_lifestyle_factors.any?
    end
  end
end
```

### 2.5 TierData::Tier5 (Verified Identity - KYC)

**Subscription Required:** VIP only

**CRITICAL:** Tier 5 data is **NEVER shared peer-to-peer**. Only visible to authorized admins (Super Admin, VIP Coordinator, Data Protection Officer).

```ruby
# db/migrate/20260227000050_create_tier_data_tier5s.rb
class CreateTierDataTier5s < ActiveRecord::Migration[8.0]
  def change
    create_table :tier_data_tier5s do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # ID Verification
      t.string :id_type, null: false # "national_id", "passport", "drivers_license"
      t.string :id_number_encrypted, null: false # Encrypted
      t.string :id_country_of_issue, null: false
      t.date :id_expiry_date, null: false

      # Active Storage attachments:
      # has_one_attached :id_document_front
      # has_one_attached :id_document_back
      # has_one_attached :video_verification

      # Verification Status
      t.string :verification_status, default: "pending", null: false # "pending", "approved", "rejected"
      t.text :rejection_reason
      t.datetime :verified_at
      t.bigint :verified_by_admin_id # Foreign key to admins table

      # Face Match Scores (automated)
      t.decimal :photo_to_id_match_score, precision: 5, scale: 2 # 0.00 - 100.00
      t.decimal :photo_to_video_match_score, precision: 5, scale: 2

      # Liveness Challenge
      t.string :liveness_challenge_code, null: false # 6-digit code shown in video
      t.boolean :liveness_challenge_passed, default: false

      # Truth Declaration
      t.boolean :truth_declaration_signed, default: false, null: false
      t.string :truth_declaration_signature # Typed full name
      t.datetime :truth_declaration_signed_at

      # Manual Review Notes (admin only)
      t.text :admin_review_notes

      t.timestamps
    end

    add_index :tier_data_tier5s, :verification_status
    add_index :tier_data_tier5s, :verified_by_admin_id
  end
end
```

```ruby
# app/models/tier_data/tier5.rb
module TierData
  class Tier5 < ApplicationRecord
    self.table_name = "tier_data_tier5s"

    belongs_to :user
    belongs_to :verified_by_admin, class_name: "Admin", optional: true

    has_one_attached :id_document_front
    has_one_attached :id_document_back
    has_one_attached :video_verification

    attr_encrypted :id_number, key: Rails.application.credentials.tier5_encryption_key

    validates :id_type, presence: true, inclusion: { in: %w[national_id passport drivers_license] }
    validates :id_number_encrypted, presence: true
    validates :id_country_of_issue, presence: true
    validates :id_expiry_date, presence: true
    validates :liveness_challenge_code, presence: true, length: { is: 6 }
    validates :truth_declaration_signed, inclusion: { in: [true] }
    validates :truth_declaration_signature, presence: true
    validates :id_document_front, presence: true
    validates :video_verification, presence: true

    validate :id_not_expired

    scope :pending_review, -> { where(verification_status: "pending") }
    scope :approved, -> { where(verification_status: "approved") }
    scope :rejected, -> { where(verification_status: "rejected") }

    def approve!(admin:, notes: nil)
      transaction do
        update!(
          verification_status: "approved",
          verified_at: Time.current,
          verified_by_admin: admin,
          admin_review_notes: notes
        )

        user.update!(verified: true)

        # Log approval
        AuditLog.create!(
          user: user,
          admin: admin,
          action: "tier5_approved",
          details: { notes: notes }
        )
      end
    end

    def reject!(admin:, reason:)
      transaction do
        update!(
          verification_status: "rejected",
          rejection_reason: reason,
          verified_by_admin: admin
        )

        # Log rejection
        AuditLog.create!(
          user: user,
          admin: admin,
          action: "tier5_rejected",
          details: { reason: reason }
        )
      end
    end

    private

    def id_not_expired
      errors.add(:id_expiry_date, "ID document has expired") if id_expiry_date && id_expiry_date < Date.current
    end
  end
end
```

---

## 3. Relationships Table (EDT Engine)

### Purpose
Central table that stores the **Effective Disclosure Tier (EDT)** between every pair of users. This is the backbone of the tier system.

### Schema

```ruby
# db/migrate/20260227000100_create_relationships.rb
class CreateRelationships < ActiveRecord::Migration[8.0]
  def change
    create_table :relationships do |t|
      # User Pair
      t.references :user1, null: false, foreign_key: { to_table: :users }, index: true
      t.references :user2, null: false, foreign_key: { to_table: :users }, index: true

      # Completion Tracking (denormalized for performance)
      t.integer :user1_max_completed_tier, default: 0, null: false
      t.integer :user2_max_completed_tier, default: 0, null: false

      # Shared Tiers (what each user has explicitly shared with the other)
      t.integer :shared_tier_by_user1, default: 0, null: false # What user1 shares with user2
      t.integer :shared_tier_by_user2, default: 0, null: false # What user2 shares with user1

      # Effective Disclosure Tier (calculated, cached)
      t.integer :edt, default: 0, null: false

      # Relationship State
      t.string :status, default: "none", null: false # "none", "interest_pending", "connected", "blocked"

      # Timestamps
      t.timestamps
      t.datetime :edt_last_calculated_at
    end

    # Composite unique index (ensure only one relationship per pair)
    add_index :relationships, [:user1_id, :user2_id], unique: true

    # Index for EDT queries
    add_index :relationships, :edt
    add_index :relationships, :status

    # Index for reverse lookups
    add_index :relationships, [:user2_id, :user1_id]
  end
end
```

### Model

```ruby
# app/models/relationship.rb
class Relationship < ApplicationRecord
  belongs_to :user1, class_name: "User"
  belongs_to :user2, class_name: "User"

  validates :user1_id, uniqueness: { scope: :user2_id }
  validate :users_must_be_different
  validate :shared_tiers_within_bounds

  enum status: { none: "none", interest_pending: "interest_pending", connected: "connected", blocked: "blocked" }

  before_save :calculate_and_cache_edt
  after_save :broadcast_edt_change, if: :saved_change_to_edt?

  # Calculate EDT
  def calculate_edt
    [
      user1_max_completed_tier,
      user2_max_completed_tier,
      shared_tier_by_user1,
      shared_tier_by_user2
    ].min
  end

  def edt
    # Recalculate if cached value is stale (older than 1 hour)
    if edt_last_calculated_at.nil? || edt_last_calculated_at < 1.hour.ago
      update_edt!
    end

    read_attribute(:edt)
  end

  def update_edt!
    new_edt = calculate_edt
    update_columns(edt: new_edt, edt_last_calculated_at: Time.current)

    # Log EDT change
    AuditLog.create!(
      user: user1,
      action: "edt_updated",
      details: {
        user1_id: user1_id,
        user2_id: user2_id,
        old_edt: edt_was,
        new_edt: new_edt
      }
    )

    new_edt
  end

  # User1 shares a tier with User2
  def user1_shares_tier!(tier_number)
    return false unless user1.max_completed_tier >= tier_number

    transaction do
      update!(shared_tier_by_user1: tier_number)
      update_edt!
    end
  end

  # User2 shares a tier with User1
  def user2_shares_tier!(tier_number)
    return false unless user2.max_completed_tier >= tier_number

    transaction do
      update!(shared_tier_by_user2: tier_number)
      update_edt!
    end
  end

  # User1 revokes a tier from User2
  def user1_revokes_tier!(tier_number)
    transaction do
      update!(shared_tier_by_user1: [shared_tier_by_user1, tier_number - 1].max(0))
      update_edt!
    end
  end

  # User2 revokes a tier from User1
  def user2_revokes_tier!(tier_number)
    transaction do
      update!(shared_tier_by_user2: [shared_tier_by_user2, tier_number - 1].max(0))
      update_edt!
    end
  end

  # Refresh completion tiers from users (called when user completes a tier)
  def refresh_completion_tiers!
    transaction do
      update!(
        user1_max_completed_tier: user1.max_completed_tier,
        user2_max_completed_tier: user2.max_completed_tier
      )
      update_edt!
    end
  end

  # Get the other user in this relationship
  def other_user(current_user)
    current_user == user1 ? user2 : user1
  end

  private

  def users_must_be_different
    errors.add(:user2_id, "cannot be the same as user1_id") if user1_id == user2_id
  end

  def shared_tiers_within_bounds
    errors.add(:shared_tier_by_user1, "cannot exceed user1's max completed tier") if shared_tier_by_user1 > user1_max_completed_tier
    errors.add(:shared_tier_by_user2, "cannot exceed user2's max completed tier") if shared_tier_by_user2 > user2_max_completed_tier
  end

  def calculate_and_cache_edt
    self.edt = calculate_edt
    self.edt_last_calculated_at = Time.current
  end

  def broadcast_edt_change
    # Broadcast real-time EDT update via Turbo Stream
    Turbo::StreamsChannel.broadcast_update_to(
      "relationship:#{id}",
      target: "edt",
      partial: "relationships/edt",
      locals: { edt: edt }
    )
  end
end
```

---

## 4. Interests Table (Show Interest)

### Purpose
Tracks "Show Interest" requests between users. Enforces cooldown period (3 months).

### Schema

```ruby
# db/migrate/20260227000110_create_interests.rb
class CreateInterests < ActiveRecord::Migration[8.0]
  def change
    create_table :interests do |t|
      t.references :sender, null: false, foreign_key: { to_table: :users }, index: true
      t.references :receiver, null: false, foreign_key: { to_table: :users }, index: true

      t.string :status, default: "pending", null: false # "pending", "accepted", "declined"

      # Tier Awareness (captured at time of sending)
      t.integer :sender_max_tier_at_send, null: false
      t.integer :receiver_max_tier_at_send, null: false
      t.boolean :tier_warning_acknowledged, default: false, null: false

      # Timestamps
      t.timestamps
      t.datetime :responded_at
    end

    # Composite unique index (one interest per sender-receiver pair within cooldown period)
    add_index :interests, [:sender_id, :receiver_id, :created_at], name: "index_interests_on_sender_receiver_time"

    add_index :interests, :status
    add_index :interests, :receiver_id, where: "status = 'pending'"
  end
end
```

### Model

```ruby
# app/models/interest.rb
class Interest < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"

  enum status: { pending: "pending", accepted: "accepted", declined: "declined" }

  validates :sender_id, uniqueness: { scope: :receiver_id, message: "can only send one interest at a time" }
  validate :cooldown_period_check, on: :create
  validate :subscription_eligibility_check, on: :create
  validate :users_must_be_different

  before_create :capture_tier_snapshot
  after_create_commit :send_notification
  after_update_commit :handle_response, if: :saved_change_to_status?

  scope :pending, -> { where(status: "pending") }
  scope :accepted, -> { where(status: "accepted") }
  scope :declined, -> { where(status: "declined") }
  scope :recent, -> { where("created_at > ?", 3.months.ago) }

  def accept!
    transaction do
      update!(status: "accepted", responded_at: Time.current)

      # Create or update relationship
      relationship = Relationship.find_or_create_by!(user1: sender, user2: receiver)
      relationship.update!(status: "connected")

      # Create conversation
      Conversation.create!(user1: sender, user2: receiver)

      # Send acceptance notification
      SendInterestAcceptedJob.perform_later(id)
    end
  end

  def decline!
    transaction do
      update!(status: "declined", responded_at: Time.current)

      # No conversation created
      # Sender cannot retry for 3 months
    end
  end

  def can_retry?
    declined? && created_at < 3.months.ago
  end

  private

  def cooldown_period_check
    recent_interest = Interest.where(
      sender_id: sender_id,
      receiver_id: receiver_id
    ).where("created_at > ?", 3.months.ago).first

    if recent_interest
      if recent_interest.pending?
        errors.add(:base, "You already have a pending interest with this user")
      elsif recent_interest.declined?
        errors.add(:base, "You must wait 3 months before showing interest again")
      end
    end
  end

  def subscription_eligibility_check
    # Free users can only send to other Free users
    # Premium users can send to Free and Premium users
    # VIP users can send to anyone

    return if sender.vip?

    if sender.free? && !receiver.free?
      errors.add(:base, "Free users can only send interest to other Free users")
    elsif sender.premium? && receiver.vip?
      errors.add(:base, "Premium users cannot send interest to VIP users")
    end
  end

  def users_must_be_different
    errors.add(:receiver_id, "cannot be the same as sender") if sender_id == receiver_id
  end

  def capture_tier_snapshot
    self.sender_max_tier_at_send = sender.max_completed_tier
    self.receiver_max_tier_at_send = receiver.max_completed_tier
  end

  def send_notification
    SendInterestNotificationJob.perform_later(id)
  end

  def handle_response
    if accepted?
      accept!
    elsif declined?
      decline!
    end
  end
end
```

---

## 5. Conversations & Messages Tables

### Purpose
Real-time messaging between matched users (after Show Interest acceptance).

### Schema

```ruby
# db/migrate/20260227000120_create_conversations.rb
class CreateConversations < ActiveRecord::Migration[8.0]
  def change
    create_table :conversations do |t|
      t.references :user1, null: false, foreign_key: { to_table: :users }, index: true
      t.references :user2, null: false, foreign_key: { to_table: :users }, index: true

      t.datetime :last_message_at
      t.integer :unread_count_user1, default: 0, null: false
      t.integer :unread_count_user2, default: 0, null: false

      t.timestamps
    end

    add_index :conversations, [:user1_id, :user2_id], unique: true
    add_index :conversations, :last_message_at
  end
end

# db/migrate/20260227000130_create_messages.rb
class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.references :conversation, null: false, foreign_key: true, index: true
      t.references :sender, null: false, foreign_key: { to_table: :users }, index: true

      t.text :content, null: false

      t.datetime :read_at
      t.datetime :delivered_at

      t.timestamps
    end

    add_index :messages, [:conversation_id, :created_at]
    add_index :messages, :created_at
  end
end
```

### Models

```ruby
# app/models/conversation.rb
class Conversation < ApplicationRecord
  belongs_to :user1, class_name: "User"
  belongs_to :user2, class_name: "User"
  has_many :messages, dependent: :destroy

  validates :user1_id, uniqueness: { scope: :user2_id }
  validate :users_must_be_different

  after_create_commit :broadcast_new_conversation

  def participants
    [user1, user2]
  end

  def other_participant(current_user)
    current_user == user1 ? user2 : user1
  end

  def latest_message
    messages.order(created_at: :desc).first
  end

  def unread_count_for(user)
    user == user1 ? unread_count_user1 : unread_count_user2
  end

  def mark_as_read!(user)
    if user == user1
      update!(unread_count_user1: 0)
    elsif user == user2
      update!(unread_count_user2: 0)
    end
  end

  def increment_unread_for!(user)
    if user == user1
      increment!(:unread_count_user1)
    elsif user == user2
      increment!(:unread_count_user2)
    end
  end

  private

  def users_must_be_different
    errors.add(:user2_id, "cannot be the same as user1") if user1_id == user2_id
  end

  def broadcast_new_conversation
    Turbo::StreamsChannel.broadcast_append_to(
      "conversations:#{user1_id}",
      target: "conversations",
      partial: "conversations/conversation",
      locals: { conversation: self }
    )

    Turbo::StreamsChannel.broadcast_append_to(
      "conversations:#{user2_id}",
      target: "conversations",
      partial: "conversations/conversation",
      locals: { conversation: self }
    )
  end
end

# app/models/message.rb
class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :sender, class_name: "User"

  validates :content, presence: true, length: { minimum: 1, maximum: 1000 }

  after_create_commit :broadcast_message, :update_conversation, :send_notification

  private

  def broadcast_message
    # Broadcast via Turbo Stream (real-time)
    broadcast_append_to(
      conversation,
      target: "messages",
      partial: "messages/message",
      locals: { message: self }
    )
  end

  def update_conversation
    conversation.update!(last_message_at: created_at)

    # Increment unread count for recipient
    recipient = conversation.other_participant(sender)
    conversation.increment_unread_for!(recipient)
  end

  def send_notification
    # Send background job for email/push notification (if recipient is offline)
    recipient = conversation.other_participant(sender)
    SendMessageNotificationJob.perform_later(id) unless recipient_online?
  end

  def recipient_online?
    # Check if recipient is subscribed to conversation channel
    # Implementation depends on presence tracking (Action Cable)
    false # Default: assume offline, send notification
  end
end
```

---

## 6. VIP Tables

### 6.1 VipApplications Table

```ruby
# db/migrate/20260227000200_create_vip_applications.rb
class CreateVipApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :vip_applications do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # Application Status
      t.string :status, default: "pending", null: false # "pending", "approved", "rejected"
      t.datetime :submitted_at, null: false
      t.datetime :reviewed_at
      t.bigint :reviewed_by_admin_id # Foreign key to admins table

      # Application Responses (JSON - 18 questions)
      t.jsonb :responses, null: false

      # Review
      t.decimal :review_score, precision: 3, scale: 1 # 0.0 - 5.0
      t.text :review_notes # Internal notes by coordinator
      t.text :rejection_reason # Shown to user if rejected

      t.timestamps
    end

    add_index :vip_applications, :status
    add_index :vip_applications, :submitted_at
    add_index :vip_applications, :reviewed_by_admin_id
  end
end
```

```ruby
# app/models/vip_application.rb
class VipApplication < ApplicationRecord
  belongs_to :user
  belongs_to :reviewed_by_admin, class_name: "Admin", optional: true

  validates :responses, presence: true
  validates :status, presence: true, inclusion: { in: %w[pending approved rejected] }

  validate :user_must_have_tier_4_completed
  validate :responses_must_have_18_questions

  scope :pending, -> { where(status: "pending") }
  scope :approved, -> { where(status: "approved") }
  scope :rejected, -> { where(status: "rejected") }

  def approve!(admin:, score:, notes: nil)
    transaction do
      update!(
        status: "approved",
        reviewed_at: Time.current,
        reviewed_by_admin: admin,
        review_score: score,
        review_notes: notes
      )

      user.update!(vip_application_status: "approved")

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
    end
  end

  def reject!(admin:, reason:)
    transaction do
      update!(
        status: "rejected",
        reviewed_at: Time.current,
        reviewed_by_admin: admin,
        rejection_reason: reason
      )

      user.update!(vip_application_status: "rejected")

      # Send rejection email
      VipMailer.application_rejected(user, reason).deliver_later

      # Log rejection
      AuditLog.create!(
        user: user,
        admin: admin,
        action: "vip_application_rejected",
        details: { reason: reason }
      )
    end
  end

  private

  def user_must_have_tier_4_completed
    errors.add(:user, "must have completed Tier 4 before applying for VIP") unless user.max_completed_tier >= 4
  end

  def responses_must_have_18_questions
    errors.add(:responses, "must contain exactly 18 questions") unless responses.is_a?(Hash) && responses.keys.count == 18
  end
end
```

### 6.2 VipAssignments Table (Expert Assignment)

```ruby
# db/migrate/20260227000210_create_vip_assignments.rb
class CreateVipAssignments < ActiveRecord::Migration[8.0]
  def change
    create_table :vip_assignments do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.references :vip_expert, null: false, foreign_key: { to_table: :admins }, index: true
      t.bigint :assigned_by_coordinator_id, null: false # Foreign key to admins table (VIP Coordinator)

      # Assignment Details
      t.datetime :assigned_at, null: false
      t.datetime :expires_at, null: false # VIP membership end date
      t.text :coordinator_notes # Notes for expert

      # Onboarding
      t.boolean :onboarding_completed, default: false
      t.datetime :onboarding_completed_at

      # Status
      t.string :status, default: "active", null: false # "active", "paused", "completed", "transferred"

      t.timestamps
    end

    add_index :vip_assignments, :assigned_by_coordinator_id
    add_index :vip_assignments, :expires_at
    add_index :vip_assignments, :status
  end
end
```

```ruby
# app/models/vip_assignment.rb
class VipAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :vip_expert, class_name: "Admin"
  belongs_to :assigned_by_coordinator, class_name: "Admin"

  validates :assigned_at, :expires_at, presence: true
  validates :status, presence: true, inclusion: { in: %w[active paused completed transferred] }

  scope :active, -> { where(status: "active") }
  scope :expiring_soon, -> { where("expires_at < ?", 7.days.from_now).where(status: "active") }

  def transfer_to!(new_expert:, reason:, coordinator:)
    transaction do
      old_expert = vip_expert

      update!(
        vip_expert: new_expert,
        status: "active"
      )

      # Log transfer
      AuditLog.create!(
        user: user,
        admin: coordinator,
        action: "vip_expert_transferred",
        details: {
          old_expert_id: old_expert.id,
          new_expert_id: new_expert.id,
          reason: reason
        }
      )

      # Notify old expert
      VipMailer.expert_client_transferred(old_expert, user, new_expert, reason).deliver_later

      # Notify new expert
      VipMailer.expert_new_client_assigned(new_expert, user, coordinator_notes).deliver_later

      # Notify user
      VipMailer.expert_changed(user, new_expert).deliver_later
    end
  end

  def complete_onboarding!
    update!(
      onboarding_completed: true,
      onboarding_completed_at: Time.current
    )
  end

  def active?
    status == "active" && Time.current < expires_at
  end

  def expired?
    Time.current >= expires_at
  end
end
```

### 6.3 VipCheckIns Table (Monthly Check-Ins)

```ruby
# db/migrate/20260227000220_create_vip_check_ins.rb
class CreateVipCheckIns < ActiveRecord::Migration[8.0]
  def change
    create_table :vip_check_ins do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.bigint :coordinator_id, null: false # Foreign key to admins table

      # Check-In Data
      t.integer :satisfaction_score, null: false # 1-5
      t.integer :introduction_quality_score, null: false # 1-5
      t.text :feedback
      t.text :concerns

      # Follow-Up
      t.boolean :follow_up_required, default: false
      t.text :coordinator_notes

      t.timestamps
    end

    add_index :vip_check_ins, :coordinator_id
    add_index :vip_check_ins, :created_at
    add_index :vip_check_ins, :satisfaction_score
  end
end
```

---

## 7. Admin Tables

### 7.1 Admins Table

```ruby
# db/migrate/20260227000300_create_admins.rb
class CreateAdmins < ActiveRecord::Migration[8.0]
  def change
    create_table :admins do |t|
      # Authentication (Devise)
      t.string :email, null: false
      t.string :encrypted_password, null: false
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at

      # Profile
      t.string :first_name, null: false
      t.string :last_name, null: false

      # Role
      t.string :role, null: false # "super_admin", "vip_coordinator", "vip_expert", "support_agent", "data_protection_officer"

      # Status
      t.boolean :active, default: true, null: false
      t.datetime :last_sign_in_at

      t.timestamps
    end

    add_index :admins, :email, unique: true
    add_index :admins, :reset_password_token, unique: true
    add_index :admins, :role
  end
end
```

```ruby
# app/models/admin.rb
class Admin < ApplicationRecord
  devise :database_authenticatable, :rememberable, :validatable, :trackable

  enum role: {
    super_admin: "super_admin",
    vip_coordinator: "vip_coordinator",
    vip_expert: "vip_expert",
    support_agent: "support_agent",
    data_protection_officer: "data_protection_officer"
  }

  validates :first_name, :last_name, :role, presence: true

  # Associations
  has_many :vip_applications_reviewed, class_name: "VipApplication", foreign_key: "reviewed_by_admin_id"
  has_many :vip_assignments_as_expert, class_name: "VipAssignment", foreign_key: "vip_expert_id"
  has_many :vip_assignments_as_coordinator, class_name: "VipAssignment", foreign_key: "assigned_by_coordinator_id"
  has_many :audit_logs, foreign_key: "admin_id"

  # Permissions
  def can_review_vip_applications?
    super_admin? || vip_coordinator?
  end

  def can_verify_tier5?
    super_admin? || vip_coordinator?
  end

  def can_assign_vip_experts?
    super_admin? || vip_coordinator?
  end

  def can_access_tier5_data?
    super_admin? || vip_coordinator? || data_protection_officer?
  end

  def can_manage_users?
    super_admin? || support_agent?
  end

  def active_vip_clients
    return [] unless vip_expert?
    vip_assignments_as_expert.active.includes(:user)
  end
end
```

---

## 8. Audit Logs Table

### Purpose
Comprehensive audit trail for all sensitive actions (tier access, EDT changes, VIP actions, admin actions).

### Schema

```ruby
# db/migrate/20260227000400_create_audit_logs.rb
class CreateAuditLogs < ActiveRecord::Migration[8.0]
  def change
    create_table :audit_logs do |t|
      # Who (user or admin)
      t.references :user, foreign_key: true, index: true
      t.references :admin, foreign_key: true, index: true

      # What
      t.string :action, null: false # "tier_completed", "tier_accessed", "edt_updated", "tier_revoked", etc.
      t.jsonb :details, default: {}, null: false # Additional context

      # When
      t.datetime :created_at, null: false

      # Where (IP address)
      t.string :ip_address
      t.string :user_agent
    end

    add_index :audit_logs, :action
    add_index :audit_logs, :created_at
    add_index :audit_logs, [:user_id, :action]
    add_index :audit_logs, [:admin_id, :action]
  end
end
```

```ruby
# app/models/audit_log.rb
class AuditLog < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :admin, optional: true

  validates :action, presence: true
  validate :user_or_admin_present

  scope :recent, -> { order(created_at: :desc) }
  scope :for_user, ->(user) { where(user: user) }
  scope :for_admin, ->(admin) { where(admin: admin) }
  scope :action_type, ->(action) { where(action: action) }

  private

  def user_or_admin_present
    errors.add(:base, "Either user or admin must be present") if user.nil? && admin.nil?
  end
end
```

### Example Usage

```ruby
# Log tier completion
AuditLog.create!(
  user: current_user,
  action: "tier_completed",
  details: { tier_number: 3 },
  ip_address: request.remote_ip,
  user_agent: request.user_agent
)

# Log tier access
AuditLog.create!(
  user: current_user,
  action: "tier_accessed",
  details: {
    accessed_user_id: other_user.id,
    tier_number: 4,
    edt: relationship.edt
  },
  ip_address: request.remote_ip,
  user_agent: request.user_agent
)

# Log VIP application approval
AuditLog.create!(
  user: vip_applicant,
  admin: current_admin,
  action: "vip_application_approved",
  details: { score: 4.8, notes: "Excellent application" },
  ip_address: request.remote_ip,
  user_agent: request.user_agent
)
```

---

## 9. Database Indexes & Performance Optimization

### Critical Indexes

```ruby
# Composite indexes for common queries

# Discovery queries (find matches by subscription + tier + location)
add_index :users, [:subscription, :max_completed_tier, :country_code]

# EDT lookups
add_index :relationships, [:user1_id, :user2_id, :edt]
add_index :relationships, [:user2_id, :user1_id, :edt]

# Conversation lookups
add_index :conversations, [:user1_id, :last_message_at]
add_index :conversations, [:user2_id, :last_message_at]

# Message pagination
add_index :messages, [:conversation_id, :created_at]

# Interest cooldown checks
add_index :interests, [:sender_id, :receiver_id, :created_at]

# VIP queues
add_index :vip_applications, [:status, :submitted_at]
add_index :vip_assignments, [:vip_expert_id, :status, :expires_at]

# Audit log searches
add_index :audit_logs, [:user_id, :action, :created_at]
add_index :audit_logs, [:admin_id, :action, :created_at]
```

### Database Views (for complex queries)

```ruby
# db/migrate/20260227000500_create_active_conversations_view.rb
class CreateActiveConversationsView < ActiveRecord::Migration[8.0]
  def up
    execute <<-SQL
      CREATE VIEW active_conversations AS
      SELECT
        c.*,
        u1.display_name AS user1_name,
        u2.display_name AS user2_name,
        m.content AS latest_message_content,
        m.created_at AS latest_message_time
      FROM conversations c
      INNER JOIN users u1 ON c.user1_id = u1.id
      INNER JOIN users u2 ON c.user2_id = u2.id
      LEFT JOIN LATERAL (
        SELECT content, created_at
        FROM messages
        WHERE conversation_id = c.id
        ORDER BY created_at DESC
        LIMIT 1
      ) m ON true
      WHERE c.last_message_at > NOW() - INTERVAL '30 days'
      ORDER BY c.last_message_at DESC;
    SQL
  end

  def down
    execute "DROP VIEW IF EXISTS active_conversations;"
  end
end
```

---

## 10. Data Retention & GDPR Compliance

### Retention Policies

```ruby
# app/services/data_retention_service.rb
class DataRetentionService
  # Delete Tier 5 documents 90 days after VIP membership expires
  def self.cleanup_expired_tier5_documents
    expired_vip_users = User.where("vip_membership_expires_at < ?", 90.days.ago)

    expired_vip_users.find_each do |user|
      tier5 = user.tier5_data
      next unless tier5

      # Purge attachments
      tier5.id_document_front.purge if tier5.id_document_front.attached?
      tier5.id_document_back.purge if tier5.id_document_back.attached?
      tier5.video_verification.purge if tier5.video_verification.attached?

      # Delete encrypted ID number
      tier5.update!(id_number_encrypted: nil)

      # Log deletion
      AuditLog.create!(
        user: user,
        action: "tier5_documents_deleted",
        details: { reason: "90-day retention policy" }
      )
    end
  end

  # Delete inactive user data (GDPR right to be forgotten)
  def self.delete_user_data(user)
    ActiveRecord::Base.transaction do
      # Delete tier data
      user.tier1_data&.destroy
      user.tier2_data&.destroy
      user.tier3_data&.destroy
      user.tier4_data&.destroy
      user.tier5_data&.destroy

      # Delete relationships
      user.relationships_as_user1.destroy_all
      user.relationships_as_user2.destroy_all

      # Delete interests
      user.interests_sent.destroy_all
      user.interests_received.destroy_all

      # Anonymize messages (keep conversation history for other user)
      user.messages.update_all(content: "[deleted]", sender_id: nil)

      # Delete conversations where user is the only participant
      user.conversations.each do |conv|
        conv.destroy if conv.messages.where.not(sender_id: user.id).count.zero?
      end

      # Delete VIP data
      user.vip_application&.destroy
      user.vip_assignment&.destroy

      # Purge photos
      user.photos.purge

      # Anonymize user record
      user.update!(
        email: "deleted_#{user.id}@deleted.com",
        encrypted_password: "",
        first_name: "Deleted",
        last_name: "User",
        display_name: "Deleted User",
        active: false
      )

      # Log deletion
      AuditLog.create!(
        user: user,
        action: "user_data_deleted",
        details: { reason: "GDPR right to be forgotten" }
      )
    end
  end
end
```

---

## 11. Example Migrations

### Complete Tier System Setup

```ruby
# db/migrate/20260227000001_setup_tier_system.rb
class SetupTierSystem < ActiveRecord::Migration[8.0]
  def change
    # Create all tables in correct order (users first, then dependent tables)

    # 1. Users
    create_users_table

    # 2. Tier Data Tables
    create_tier_data_tables

    # 3. Relationships (EDT Engine)
    create_relationships_table

    # 4. Interests (Show Interest)
    create_interests_table

    # 5. Conversations & Messages
    create_conversations_and_messages_tables

    # 6. VIP Tables
    create_vip_tables

    # 7. Admin Tables
    create_admin_tables

    # 8. Audit Logs
    create_audit_logs_table
  end

  private

  def create_users_table
    # (See Users Table schema above)
  end

  def create_tier_data_tables
    # (See Tier Data Tables schema above)
  end

  # ... (other table creation methods)
end
```

---

## 12. Testing Requirements

### Model Tests (RSpec)

```ruby
# spec/models/relationship_spec.rb
require 'rails_helper'

RSpec.describe Relationship, type: :model do
  let(:user1) { create(:user, max_completed_tier: 3) }
  let(:user2) { create(:user, max_completed_tier: 4) }
  let(:relationship) { create(:relationship, user1: user1, user2: user2) }

  describe "#calculate_edt" do
    it "calculates EDT as minimum of all four values" do
      relationship.user1_max_completed_tier = 3
      relationship.user2_max_completed_tier = 4
      relationship.shared_tier_by_user1 = 2
      relationship.shared_tier_by_user2 = 3

      expect(relationship.calculate_edt).to eq(2)
    end

    it "recalculates EDT when shared tier changes" do
      relationship.update!(shared_tier_by_user1: 3, shared_tier_by_user2: 3)
      expect(relationship.edt).to eq(3)
    end
  end

  describe "#user1_shares_tier!" do
    it "updates shared tier and recalculates EDT" do
      expect {
        relationship.user1_shares_tier!(3)
      }.to change { relationship.edt }.from(0).to(3)
    end

    it "does not allow sharing tier above completion" do
      expect(relationship.user1_shares_tier!(5)).to be_falsey
    end
  end

  describe "#user1_revokes_tier!" do
    it "downgrades shared tier and recalculates EDT" do
      relationship.update!(shared_tier_by_user1: 3, shared_tier_by_user2: 3, edt: 3)

      expect {
        relationship.user1_revokes_tier!(3)
      }.to change { relationship.edt }.from(3).to(2)
    end
  end
end
```

---

## Related Documentation

- [Tier System](../Global%20Context/tier_system.md) - Complete tier definitions
- [EDT Specification](../Global%20Context/edt_specification.md) - EDT calculation rules
- [Rails Architecture](rails_architecture.md) - Rails 8 implementation guide
- [API Specifications](api_specifications.md) - RESTful API design
- [VIP Application Workflow](vip_application_workflow.md) - VIP application technical flow

---

**Document Owner:** Engineering Lead
**Database Architect:** Senior Backend Engineer
**Last Reviewed:** 2026-02-27
**Next Review:** Before production database setup

**Status:** ✅ Production-Ready Specification
