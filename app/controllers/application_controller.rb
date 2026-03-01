# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Authentication
  include Pagy::Method

  # Only allow modern browsers
  allow_browser versions: :modern

  # Invalidate cached pages when importmap changes
  stale_when_importmap_changes

  # CanCanCan: rescue AccessDenied from explicit authorize! calls
  # NOTE: check_authorization (global enforcement) added in Phase 3
  # when all controllers have proper authorization implemented.
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.html { redirect_to root_path, alert: exception.message }
      format.json { render json: { error: exception.message }, status: :forbidden }
      format.turbo_stream { redirect_to root_path, alert: exception.message }
    end
  end

  private

  def current_ability
    @current_ability ||= Ability.new(current_user)
  end
end
