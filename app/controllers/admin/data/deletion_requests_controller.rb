# frozen_string_literal: true

module Admin
  module Data
    class DeletionRequestsController < Admin::BaseController
      def index; end
      def show; end
      def update; redirect_to admin_data_deletion_requests_path; end
    end
  end
end
