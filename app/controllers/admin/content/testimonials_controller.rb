# frozen_string_literal: true

module Admin
  module Content
    class TestimonialsController < Admin::BaseController
      def index; end
      def show; end
      def update; redirect_to admin_content_testimonial_path(params[:id]); end
    end
  end
end
