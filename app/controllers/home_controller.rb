# frozen_string_literal: true

class HomeController < ApplicationController
  allow_unauthenticated_access only: :index

  def index
    redirect_to app_dashboard_path if authenticated?
  end
end
