# frozen_string_literal: true

module Admin
  class UsersController < Admin::BaseController
    def index; end
    def show; end
    def edit; end
    def update; redirect_to admin_user_path(params[:id]); end
    def tiers; end
    def activity; end
    def reports; end
    def suspend; redirect_to admin_user_path(params[:id]), notice: 'User suspended.'; end
    def unsuspend; redirect_to admin_user_path(params[:id]), notice: 'User unsuspended.'; end
    def ban; redirect_to admin_users_path, notice: 'User banned.'; end
  end
end
