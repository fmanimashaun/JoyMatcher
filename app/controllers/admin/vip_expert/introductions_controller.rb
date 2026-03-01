# frozen_string_literal: true

module Admin
  module VipExpert
    class IntroductionsController < Admin::BaseController
      def index; end
      def new; end
      def create; redirect_to admin_vip_expert_introductions_path; end
      def show; end
    end
  end
end
