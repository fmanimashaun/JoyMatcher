source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.1.2"
# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft"
# Use postgresql as the database for Active Record
gem "pg", "~> 1.6"
# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 7.2"
# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails"
# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails", "~> 2.0"
# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"
# Use Tailwind CSS [https://github.com/rails/tailwindcss-rails]
gem "tailwindcss-rails"
# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem "bcrypt", "~> 3.1.21"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem "solid_cache"
gem "solid_queue", "~> 1.3"
gem "solid_cable"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", "~> 1.22", require: false

# Deploy this application anywhere as a Docker container [https://kamal-deploy.org]
gem "kamal", require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem "thruster", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"

# AWS SDK for file storage (profile photos, documents)
gem "aws-sdk-s3", "~> 1.176", require: false

# Forms made easy for Rails [https://github.com/heartcombo/simple_form]
gem "simple_form"

# Authorization — role-based access control (RBAC)
gem "cancancan", "~> 3.6"

# Pagination
gem "pagy"

# State machines — tier progression, VIP workflow, subscription states
gem "aasm", "~> 5.5"

# CSV export for admin reports
gem "csv"

# ISO country data — currency detection (₦ vs $) and locale support
gem "countries", "~> 8.1"

# Security: Rate limiting for authentication and sensitive endpoints
gem "rack-attack"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"

  # Test framework
  gem "rspec-rails"

  # ERB linting
  gem "erb_lint", require: false

  # Test data factories and fake data
  gem "factory_bot_rails"
  gem "faker"

  # Controller testing helpers
  gem "rails-controller-testing"

  # Audits gems for known security defects
  gem "bundler-audit", require: false

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem "brakeman", "~> 8.0", require: false

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem "rubocop-rails-omakase", require: false
  gem "rubocop-rspec", "~> 3.9", require: false

  # N+1 query detection
  gem "bullet"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Preview emails in browser instead of sending
  gem "letter_opener_web"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver", "~> 4.40"

  # Code coverage analysis
  gem "simplecov", require: false

  # HTTP request stubbing (for external APIs, SMTP)
  gem "webmock", require: false

  # Database cleaning strategies between tests
  gem "database_cleaner-active_record"
end
