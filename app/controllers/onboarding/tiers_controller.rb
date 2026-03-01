# frozen_string_literal: true

module Onboarding
  class TiersController < ApplicationController
    def tier1; end
    def update_tier1; redirect_to onboarding_tier2_path; end

    def tier2; end
    def update_tier2; redirect_to onboarding_tier3_path; end

    def tier3; end
    def update_tier3; redirect_to onboarding_tier4_path; end

    def tier4; end
    def update_tier4; redirect_to onboarding_tier5_path; end

    def tier5; end
    def update_tier5; redirect_to app_dashboard_path, notice: 'Profile complete!'; end
  end
end
