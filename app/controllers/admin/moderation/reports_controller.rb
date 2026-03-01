# frozen_string_literal: true

module Admin
  module Moderation
    class ReportsController < Admin::BaseController
      def index; end
      def show; end
      def update; redirect_to admin_moderation_report_path(params[:id]); end
      def destroy; redirect_to admin_moderation_reports_path; end
    end
  end
end
