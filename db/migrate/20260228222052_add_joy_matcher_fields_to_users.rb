class AddJoyMatcherFieldsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :first_name,                :string,   null: false, default: ''
    add_column :users, :last_name,                 :string,   null: false, default: ''
    add_column :users, :display_name,              :string,   null: false, default: ''
    add_column :users, :date_of_birth,             :date
    add_column :users, :gender,                    :string
    add_column :users, :role,                      :integer,  null: false, default: 0
    add_column :users, :subscription,              :integer,  null: false, default: 0
    add_column :users, :max_completed_tier,        :integer,  null: false, default: 0
    add_column :users, :verified,                  :boolean,  null: false, default: false
    add_column :users, :country_code,              :string,   limit: 2,    default: 'NG'
    add_column :users, :currency,                  :string,   default: 'NGN'
    add_column :users, :active,                    :boolean,  null: false, default: true
    add_column :users, :suspended,                 :boolean,  null: false, default: false
    add_column :users, :suspension_reason,         :string
    add_column :users, :suspended_at,              :datetime
    add_column :users, :profile_visible,           :boolean,  null: false, default: true
    add_column :users, :vip_application_status,    :string
    add_column :users, :vip_membership_expires_at, :datetime
    add_column :users, :last_active_at,            :datetime
    add_column :users, :violation_count,           :integer,  null: false, default: 0

    add_index :users, :role
    add_index :users, :subscription
    add_index :users, %i[active suspended]
    add_index :users, :last_active_at
    add_index :users, :country_code
  end
end
