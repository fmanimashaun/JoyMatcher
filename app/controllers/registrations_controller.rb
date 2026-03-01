# frozen_string_literal: true

class RegistrationsController < ApplicationController
  allow_unauthenticated_access only: %i[new create]

  def new
    redirect_to after_authentication_url if authenticated?
    @user = User.new
  end

  def create
    @user = User.new(registration_params)

    if @user.save
      start_new_session_for(@user)
      redirect_to root_path, notice: 'Welcome to JoyMatcher! Please complete your profile to get started.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def registration_params
    params.require(:user).permit(
      :email_address,
      :password,
      :password_confirmation,
      :first_name,
      :last_name,
      :country_code,
      :subscription
    )
  end
end
