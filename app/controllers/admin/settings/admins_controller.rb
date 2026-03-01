# frozen_string_literal: true

module Admin
  module Settings
    class AdminsController < Admin::BaseController
      def index; end
      def new; end
      def create; redirect_to admin_settings_admins_path; end
      def edit; end
      def update; redirect_to admin_settings_admins_path; end
      def destroy; redirect_to admin_settings_admins_path; end
    end
  end
end
