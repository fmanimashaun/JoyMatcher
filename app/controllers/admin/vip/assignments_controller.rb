# frozen_string_literal: true

module Admin
  module Vip
    class AssignmentsController < Admin::BaseController
      def index; end
      def create; redirect_to admin_vip_assignments_path; end
      def destroy; redirect_to admin_vip_assignments_path; end
    end
  end
end
