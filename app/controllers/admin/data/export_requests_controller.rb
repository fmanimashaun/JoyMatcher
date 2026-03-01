# frozen_string_literal: true

module Admin
  module Data
    class ExportRequestsController < Admin::BaseController
      def index; end
      def show; end
      def update; redirect_to admin_data_export_requests_path; end
    end
  end
end
