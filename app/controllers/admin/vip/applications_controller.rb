# frozen_string_literal: true

module Admin
  module Vip
    class ApplicationsController < Admin::BaseController
      def index; end
      def show; end
      def update; redirect_to admin_vip_application_path(params[:id]); end
    end
  end
end
