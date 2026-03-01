# frozen_string_literal: true

module Admin
  module Moderation
    class PhotosController < Admin::BaseController
      def index; end
      def show; end
      def update; redirect_to admin_moderation_photo_path(params[:id]); end
    end
  end
end
