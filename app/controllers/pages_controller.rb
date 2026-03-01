# frozen_string_literal: true

class PagesController < ApplicationController
  allow_unauthenticated_access

  def how_it_works; end
  def pricing; end
  def safety; end
  def about; end
  def faq; end
  def contact; end
  def vip; end
end
