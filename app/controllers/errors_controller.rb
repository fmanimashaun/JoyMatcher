# frozen_string_literal: true

class ErrorsController < ApplicationController
  allow_unauthenticated_access

  def not_found
    render status: :not_found
  end

  def forbidden
    render status: :forbidden
  end

  def server_error
    render status: :internal_server_error
  end

  def maintenance
    render status: :service_unavailable
  end
end
