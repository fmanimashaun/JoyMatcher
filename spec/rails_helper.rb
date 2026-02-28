require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'

# Load all support files
Rails.root.glob('spec/support/**/*.rb').sort_by(&:to_s).each { |f| require f }

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end

RSpec.configure do |config|
  # Use FactoryBot shorthand (create, build, build_stubbed)
  config.include FactoryBot::Syntax::Methods

  # Infer spec type from file location
  config.infer_spec_type_from_file_location!

  # Filter Rails gem lines from backtraces
  config.filter_rails_from_backtrace!

  # Use DatabaseCleaner instead of transactional fixtures
  config.use_transactional_fixtures = false

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning { example.run }
  end

  config.around(:each, type: :system) do |example|
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.cleaning { example.run }
    DatabaseCleaner.strategy = :transaction
  end
end
