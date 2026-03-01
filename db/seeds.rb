# frozen_string_literal: true

# =============================================================
# JoyMatcher Demo Seed Data
# =============================================================
# Idempotent: uses find_or_create_by! on email_address
# Password for all demo users: Password123!
#
# Usage:
#   rails db:seed
#   rails db:seed:replant  (truncate + reseed)
# =============================================================

puts "\n🌱 Seeding JoyMatcher demo data...\n\n"

DEMO_PASSWORD = "Password123!".freeze

def create_user(attrs)
  base_attrs = attrs.except(:password)
  user = User.find_or_initialize_by(email_address: attrs[:email_address])
  user.assign_attributes(base_attrs)
  user.password = DEMO_PASSWORD
  user.password_confirmation = DEMO_PASSWORD
  if user.save
    status = user.previously_new_record? ? "✅ Created" : "♻️  Updated"
    puts "  #{status}: #{user.email_address} (#{user.role} / #{user.subscription})"
  else
    puts "  ❌ Failed: #{user.email_address} — #{user.errors.full_messages.join(', ')}"
  end
  user
end

# =============================================================
# ADMIN USERS
# =============================================================

puts "👑 Admin Users"
puts "-" * 50

create_user(
  email_address:   "super@joymatcher.com",
  first_name:      "Adaeze",
  last_name:       "Okonkwo",
  display_name:    "Adaeze O.",
  role:            :super_admin,
  subscription:    :free,
  country_code:    "NG",
  active:          true
)

create_user(
  email_address:   "moderator@joymatcher.com",
  first_name:      "Emeka",
  last_name:       "Chukwu",
  display_name:    "Emeka C.",
  role:            :moderator,
  subscription:    :free,
  country_code:    "NG",
  active:          true
)

create_user(
  email_address:   "vip.coordinator@joymatcher.com",
  first_name:      "Fatima",
  last_name:       "Abubakar",
  display_name:    "Fatima A.",
  role:            :vip_coordinator,
  subscription:    :free,
  country_code:    "NG",
  active:          true
)

create_user(
  email_address:   "vip.expert@joymatcher.com",
  first_name:      "Sola",
  last_name:       "Adeyemi",
  display_name:    "Dr. Sola A.",
  role:            :vip_expert,
  subscription:    :free,
  country_code:    "NG",
  active:          true
)

create_user(
  email_address:   "dpo@joymatcher.com",
  first_name:      "Ngozi",
  last_name:       "Eze",
  display_name:    "Ngozi E.",
  role:            :data_protection_officer,
  subscription:    :free,
  country_code:    "NG",
  active:          true
)

create_user(
  email_address:   "support@joymatcher.com",
  first_name:      "Tunde",
  last_name:       "Bello",
  display_name:    "Tunde B.",
  role:            :support_agent,
  subscription:    :free,
  country_code:    "NG",
  active:          true
)

# =============================================================
# REGULAR USERS — FREE SUBSCRIPTION
# =============================================================

puts "\n🆓 Free Users (Nigerian)"
puts "-" * 50

create_user(
  email_address:        "chioma@demo.com",
  first_name:           "Chioma",
  last_name:            "Obi",
  display_name:         "Chioma O.",
  role:                 :user,
  subscription:         :free,
  gender:               "female",
  date_of_birth:        Date.new(1997, 6, 15),
  country_code:         "NG",
  max_completed_tier:   1,
  active:               true,
  profile_visible:      true
)

create_user(
  email_address:        "kwame@demo.com",
  first_name:           "Kwame",
  last_name:            "Mensah",
  display_name:         "Kwame M.",
  role:                 :user,
  subscription:         :free,
  gender:               "male",
  date_of_birth:        Date.new(1992, 9, 22),
  country_code:         "NG",
  max_completed_tier:   2,
  active:               true,
  profile_visible:      true
)

# =============================================================
# REGULAR USERS — PREMIUM SUBSCRIPTION
# =============================================================

puts "\n💎 Premium Users (Nigerian)"
puts "-" * 50

create_user(
  email_address:        "amara@demo.com",
  first_name:           "Amara",
  last_name:            "Nwosu",
  display_name:         "Amara N.",
  role:                 :user,
  subscription:         :premium,
  gender:               "female",
  date_of_birth:        Date.new(1995, 3, 10),
  country_code:         "NG",
  max_completed_tier:   3,
  verified:             true,
  active:               true,
  profile_visible:      true
)

create_user(
  email_address:        "chidi@demo.com",
  first_name:           "Chidi",
  last_name:            "Okafor",
  display_name:         "Chidi O.",
  role:                 :user,
  subscription:         :premium,
  gender:               "male",
  date_of_birth:        Date.new(1990, 7, 18),
  country_code:         "NG",
  max_completed_tier:   4,
  verified:             true,
  active:               true,
  profile_visible:      true
)

# =============================================================
# REGULAR USERS — VIP SUBSCRIPTION
# =============================================================

puts "\n👑 VIP Users (Nigerian)"
puts "-" * 50

create_user(
  email_address:              "ifeoma@demo.com",
  first_name:                 "Ifeoma",
  last_name:                  "Adeleke",
  display_name:               "Ifeoma A.",
  role:                       :user,
  subscription:               :vip,
  gender:                     "female",
  date_of_birth:              Date.new(1993, 11, 5),
  country_code:               "NG",
  max_completed_tier:         5,
  verified:                   true,
  vip_application_status:     "approved",
  vip_membership_expires_at:  1.year.from_now,
  active:                     true,
  profile_visible:            true
)

create_user(
  email_address:              "kunle@demo.com",
  first_name:                 "Kunle",
  last_name:                  "Fashola",
  display_name:               "Kunle F.",
  role:                       :user,
  subscription:               :vip,
  gender:                     "male",
  date_of_birth:              Date.new(1987, 4, 29),
  country_code:               "NG",
  max_completed_tier:         5,
  verified:                   true,
  vip_application_status:     "approved",
  vip_membership_expires_at:  6.months.from_now,
  active:                     true,
  profile_visible:            true
)

# =============================================================
# SUSPENDED USER
# =============================================================

puts "\n🚫 Suspended Users"
puts "-" * 50

create_user(
  email_address:       "suspended@demo.com",
  first_name:          "Test",
  last_name:           "Suspended",
  display_name:        "Test S.",
  role:                :user,
  subscription:        :free,
  gender:              "male",
  date_of_birth:       Date.new(2000, 1, 1),
  country_code:        "NG",
  suspended:           true,
  suspension_reason:   "Repeated policy violations — anti-gravity rule breach",
  suspended_at:        3.days.ago,
  active:              true,
  profile_visible:     false
)

# =============================================================
# INTERNATIONAL USERS (Non-Nigerian)
# =============================================================

puts "\n🌍 International Users (USD)"
puts "-" * 50

create_user(
  email_address:        "ada@demo.com",
  first_name:           "Ada",
  last_name:            "Mensah",
  display_name:         "Ada M.",
  role:                 :user,
  subscription:         :premium,
  gender:               "female",
  date_of_birth:        Date.new(1996, 8, 20),
  country_code:         "US",
  max_completed_tier:   2,
  active:               true,
  profile_visible:      true
)

create_user(
  email_address:        "kofi@demo.com",
  first_name:           "Kofi",
  last_name:            "Boateng",
  display_name:         "Kofi B.",
  role:                 :user,
  subscription:         :free,
  gender:               "male",
  date_of_birth:        Date.new(1989, 12, 15),
  country_code:         "GB",
  max_completed_tier:   1,
  active:               true,
  profile_visible:      true
)

# =============================================================
# Summary
# =============================================================

puts "\n" + "=" * 50
puts "✅ Seeding complete!"
puts "=" * 50
puts "\nDemo credentials (all passwords: Password123!):"
puts "  Super Admin:  super@joymatcher.com"
puts "  Moderator:    moderator@joymatcher.com"
puts "  VIP Coord:    vip.coordinator@joymatcher.com"
puts "  VIP Expert:   vip.expert@joymatcher.com"
puts "  DPO:          dpo@joymatcher.com"
puts "  Support:      support@joymatcher.com"
puts "  Free User:    chioma@demo.com"
puts "  Premium User: amara@demo.com"
puts "  VIP User:     ifeoma@demo.com"
puts ""
puts "Total users: #{User.count}"
puts ""
