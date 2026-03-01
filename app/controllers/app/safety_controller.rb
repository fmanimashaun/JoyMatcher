# frozen_string_literal: true
module App
  class SafetyController < App::BaseController
    def report; end
    def report_success; end
    def blocked; end
    def create_report
      redirect_to app_safety_report_success_path, notice: 'Report submitted.'
    end
  end
end
