# frozen_string_literal: true

module Admin
  module Moderation
    class ProfilesController < Admin::BaseController
      def index; end
      def show; end
      def update; redirect_to admin_moderation_profile_path(params[:id]); end
    end
  end
end
