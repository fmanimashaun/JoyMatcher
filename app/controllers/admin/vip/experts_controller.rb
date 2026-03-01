# frozen_string_literal: true

module Admin
  module Vip
    class ExpertsController < Admin::BaseController
      def index; end
      def show; end
      def new; end
      def create; redirect_to admin_vip_experts_path; end
      def edit; end
      def update; redirect_to admin_vip_expert_path(params[:id]); end
      def destroy; redirect_to admin_vip_experts_path; end
    end
  end
end
