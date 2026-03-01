# frozen_string_literal: true
module App
  class MessagesController < App::BaseController
    def index; end
    def show; end
    def create
      redirect_to app_messages_path
    end
  end
end
