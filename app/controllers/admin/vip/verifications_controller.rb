# frozen_string_literal: true

module Admin
  module Vip
    class VerificationsController < Admin::BaseController
      def index; end
      def show; end
      def update; redirect_to admin_vip_verification_path(params[:id]); end
    end
  end
end
