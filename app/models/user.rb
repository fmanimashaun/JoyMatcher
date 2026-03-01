# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy

  # =========================================================
  # Enums
  # =========================================================

  enum :role, {
    user:                    0,
    moderator:               1,
    vip_coordinator:         2,
    vip_expert:              3,
    data_protection_officer: 4,
    support_agent:           5,
    super_admin:             6
  }, prefix: :role

  enum :subscription, {
    free:    0,
    premium: 1,
    vip:     2
  }, prefix: :subscription

  enum :gender, {
    male:   'male',
    female: 'female',
    other:  'other'
  }

  # =========================================================
  # Normalizations (Rails 8)
  # =========================================================

  normalizes :email_address, with: ->(e) { e.strip.downcase }
  normalizes :country_code,  with: ->(c) { c.strip.upcase }
  normalizes :first_name,    with: ->(n) { n.strip }
  normalizes :last_name,     with: ->(n) { n.strip }
  normalizes :display_name,  with: ->(n) { n.strip }

  # =========================================================
  # Callbacks
  # =========================================================

  before_validation :set_currency_from_country, if: :country_code_changed?
  before_validation :set_display_name_from_name, if: :display_name_blank?

  # =========================================================
  # Associations (stubs — full models added in later phases)
  # =========================================================

  # Phase 3: Tier System
  # has_one  :tier1_data,  class_name: 'TierData::Tier1',  dependent: :destroy
  # has_one  :tier2_data,  class_name: 'TierData::Tier2',  dependent: :destroy
  # has_one  :tier3_data,  class_name: 'TierData::Tier3',  dependent: :destroy
  # has_one  :tier4_data,  class_name: 'TierData::Tier4',  dependent: :destroy
  # has_one  :tier5_data,  class_name: 'TierData::Tier5',  dependent: :destroy

  # Phase 4: Show Interest
  # has_many :interests_sent,     class_name: 'Interest', foreign_key: :sender_id,   dependent: :destroy
  # has_many :interests_received, class_name: 'Interest', foreign_key: :receiver_id, dependent: :destroy

  # Phase 4: Messaging
  # has_many :conversations_as_user1, class_name: 'Conversation', foreign_key: :user1_id
  # has_many :conversations_as_user2, class_name: 'Conversation', foreign_key: :user2_id
  # has_many :messages, foreign_key: :sender_id, dependent: :destroy

  # Phase 5: VIP
  # has_one  :vip_application, dependent: :destroy
  # has_one  :vip_assignment,  foreign_key: :vip_user_id, dependent: :destroy
  # has_many :vip_check_ins,   foreign_key: :vip_user_id, dependent: :destroy
  # has_many :expert_assignments, class_name: 'VipAssignment', foreign_key: :expert_id

  # =========================================================
  # Validations
  # =========================================================

  validates :email_address,
            presence: true,
            uniqueness: { case_sensitive: false },
            format: { with: URI::MailTo::EMAIL_REGEXP, message: 'is not a valid email address' }

  validates :first_name, :last_name,
            length: { maximum: 100 },
            allow_blank: true

  validates :display_name,
            length: { maximum: 100 },
            allow_blank: true

  validates :gender,
            inclusion: { in: %w[male female other], message: 'must be male, female, or other' },
            allow_nil: true

  validates :country_code,
            length: { is: 2, message: 'must be a 2-character ISO country code' },
            allow_nil: true

  validates :currency,
            inclusion: { in: %w[NGN USD], message: 'must be NGN or USD' },
            allow_nil: true

  validates :max_completed_tier,
            numericality: { only_integer: true, in: 0..5 }

  validates :violation_count,
            numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  validate :age_must_be_at_least_18, if: -> { date_of_birth.present? }

  # =========================================================
  # Scopes
  # =========================================================

  scope :active,          -> { where(active: true, suspended: false) }
  scope :suspended,       -> { where(suspended: true) }
  scope :verified,        -> { where(verified: true) }
  scope :premium_or_vip,  -> { where(subscription: [ subscriptions[:premium], subscriptions[:vip] ]) }
  scope :vip_only,        -> { where(subscription: subscriptions[:vip]) }
  scope :recently_active, -> { where('last_active_at > ?', 7.days.ago) }
  scope :admins,          -> { where.not(role: roles[:user]) }
  scope :regular_users,   -> { where(role: roles[:user]) }
  scope :nigerian,        -> { where(country_code: 'NG') }
  scope :international,   -> { where.not(country_code: 'NG') }

  # =========================================================
  # Business Logic
  # =========================================================

  def full_name
    "#{first_name} #{last_name}".strip
  end

  def age
    return nil unless date_of_birth.present?
    ((Date.today - date_of_birth) / 365.25).to_i
  end

  def uses_naira?
    country_code == 'NG'
  end

  def currency_symbol
    uses_naira? ? '₦' : '$'
  end

  def admin?
    !role_user?
  end

  def touch_last_active!
    update_column(:last_active_at, Time.current)
  end

  # Subscription ceiling: max tier a user can complete based on their subscription
  def subscription_tier_ceiling
    case subscription
    when 'free'    then 2
    when 'premium' then 4
    when 'vip'     then 5
    else 0
    end
  end

  # Whether the user's subscription allows completing a given tier
  def can_complete_tier?(tier_number)
    tier_number.to_i <= subscription_tier_ceiling
  end

  # Whether the user has actually completed a given tier
  def tier_completed?(tier_number)
    max_completed_tier >= tier_number.to_i
  end

  # VIP Expert: returns IDs of assigned VIP clients
  # Stub — will query VipAssignment in Phase 5
  def assigned_vip_client_ids
    [] # TODO: VipAssignment.where(expert_id: id, status: :active).pluck(:vip_user_id)
  end

  # =========================================================
  # Private
  # =========================================================

  private

  def age_must_be_at_least_18
    return unless age
    errors.add(:date_of_birth, 'must be at least 18 years old') if age < 18
  end

  def set_currency_from_country
    self.currency = country_code == 'NG' ? 'NGN' : 'USD'
  end

  def set_display_name_from_name
    return unless first_name.present? && last_name.present?
    self.display_name = "#{first_name} #{last_name.first}."
  end

  def display_name_blank?
    display_name.blank?
  end
end
