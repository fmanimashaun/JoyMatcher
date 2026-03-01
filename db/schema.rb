# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_02_28_222052) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "ip_address"
    t.datetime "updated_at", null: false
    t.string "user_agent"
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.boolean "active", default: true, null: false
    t.string "country_code", limit: 2, default: "NG"
    t.datetime "created_at", null: false
    t.string "currency", default: "NGN"
    t.date "date_of_birth"
    t.string "display_name", default: "", null: false
    t.string "email_address", null: false
    t.string "first_name", default: "", null: false
    t.string "gender"
    t.datetime "last_active_at"
    t.string "last_name", default: "", null: false
    t.integer "max_completed_tier", default: 0, null: false
    t.string "password_digest", null: false
    t.boolean "profile_visible", default: true, null: false
    t.integer "role", default: 0, null: false
    t.integer "subscription", default: 0, null: false
    t.boolean "suspended", default: false, null: false
    t.datetime "suspended_at"
    t.string "suspension_reason"
    t.datetime "updated_at", null: false
    t.boolean "verified", default: false, null: false
    t.integer "violation_count", default: 0, null: false
    t.string "vip_application_status"
    t.datetime "vip_membership_expires_at"
    t.index ["active", "suspended"], name: "index_users_on_active_and_suspended"
    t.index ["country_code"], name: "index_users_on_country_code"
    t.index ["email_address"], name: "index_users_on_email_address", unique: true
    t.index ["last_active_at"], name: "index_users_on_last_active_at"
    t.index ["role"], name: "index_users_on_role"
    t.index ["subscription"], name: "index_users_on_subscription"
  end

  add_foreign_key "sessions", "users"
end
