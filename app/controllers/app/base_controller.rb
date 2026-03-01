# frozen_string_literal: true

module App
  class BaseController < ApplicationController
    # All app/* routes require authentication
    # (require_authentication is inherited from ApplicationController via Authentication concern)
  end
end
