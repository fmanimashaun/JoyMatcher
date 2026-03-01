# frozen_string_literal: true

class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[new create]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: 'Too many login attempts. Please try again later.' }

  def new
    # Redirect already-authenticated users
    redirect_to after_authentication_url if authenticated?
  end

  def create
    if (user = User.authenticate_by(email_address: params[:email_address], password: params[:password]))
      start_new_session_for(user)
      user.touch_last_active!
      redirect_to after_authentication_url, notice: "Welcome back, #{user.first_name.presence || 'back'}!"
    else
      redirect_to new_session_url, alert: 'Invalid email address or password.'
    end
  end

  def destroy
    terminate_session
    redirect_to new_session_url, notice: 'You have been signed out.'
  end
end
