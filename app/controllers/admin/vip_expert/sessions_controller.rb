# frozen_string_literal: true

module Admin
  module VipExpert
    class SessionsController < Admin::BaseController
      def index; end
      def new; end
      def create; redirect_to admin_vip_expert_sessions_path; end
    end
  end
end
