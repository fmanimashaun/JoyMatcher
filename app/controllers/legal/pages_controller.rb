# frozen_string_literal: true

module Legal
  class PagesController < ApplicationController
    allow_unauthenticated_access

    def terms_of_service; end
    def privacy_policy; end
    def cookie_policy; end
    def community_guidelines; end
    def data_protection; end
    def right_to_deletion; end
    def accessibility_statement; end
    def vip_terms; end
    def testimonial_terms; end
    def dispute_resolution; end
  end
end
