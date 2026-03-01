# frozen_string_literal: true
module App
  class VipController < App::BaseController
    def application; end
    def application_status; end
    def verification; end
    def intake; end
    def introductions; end
    def sessions; end
    def settings; end
    def submit_application
      redirect_to app_vip_application_status_path, notice: 'Application submitted.'
    end
  end
end
