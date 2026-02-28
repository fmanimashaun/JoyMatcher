# frozen_string_literal: true
#
# RSpec Core Configuration — JoyMatcher
#
# SimpleCov must be started BEFORE loading Rails
# to ensure accurate coverage tracking.
#

# =========================================================
# Code Coverage (SimpleCov) — test environment only
# =========================================================
if ENV['COVERAGE'] || ENV['CI']
  require 'simplecov'

  SimpleCov.start 'rails' do
    project_name 'JoyMatcher'
    minimum_coverage 80

    # Group reports by layer
    add_group 'Models',      'app/models'
    add_group 'Controllers', 'app/controllers'
    add_group 'Helpers',     'app/helpers'
    add_group 'Mailers',     'app/mailers'
    add_group 'Jobs',        'app/jobs'
    add_group 'Channels',    'app/channels'
    add_group 'Policies',    'app/policies'

    # Exclude files that don't need coverage
    add_filter 'spec/'
    add_filter 'config/'
    add_filter 'db/'
    add_filter 'vendor/'
    add_filter 'bin/'

    # Track files that have no specs yet
    track_files 'app/**/*.rb'
  end
end

# =========================================================
# RSpec Configuration
# =========================================================
RSpec.configure do |config|
  # Use modern expectations (default in RSpec 4)
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  # Verify partial doubles — prevents mocking non-existent methods
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  # Shared context metadata inheritance (RSpec 4 default)
  config.shared_context_metadata_behavior = :apply_to_host_groups

  # Run focused examples only when tagged with :focus
  config.filter_run_when_matching :focus

  # Persist example status for --only-failures / --next-failure
  config.example_status_persistence_file_path = 'spec/examples.txt'

  # No monkey patching (clean global namespace)
  config.disable_monkey_patching!

  # Use doc formatter when running a single file
  config.default_formatter = 'doc' if config.files_to_run.one?

  # Profile slowest examples
  config.profile_examples = 10 if ENV['PROFILE_SPECS']

  # Random ordering (caught in .rspec file too)
  config.order = :random
  Kernel.srand config.seed
end

# =========================================================
# WebMock — HTTP Stubbing (test + CI only)
# =========================================================
require 'webmock/rspec'

WebMock.disable_net_connect!(
  allow_localhost: true,   # Allow localhost (Rails, Capybara)
  allow: [
    'chromedriver.storage.googleapis.com'  # Allow Selenium driver download
  ]
)
