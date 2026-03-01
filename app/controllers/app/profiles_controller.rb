# frozen_string_literal: true
module App
  class ProfilesController < App::BaseController
    def show; end
    def me; end
    def edit; end
    def update
      redirect_to app_my_profile_path, notice: 'Profile updated.'
    end
  end
end
