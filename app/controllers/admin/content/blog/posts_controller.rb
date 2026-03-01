# frozen_string_literal: true

module Admin
  module Content
    module Blog
      class PostsController < Admin::BaseController
        def index; end
        def new; end
        def create; redirect_to admin_content_blog_posts_path; end
        def edit; end
        def update; redirect_to admin_content_blog_post_path(params[:id]); end
        def destroy; redirect_to admin_content_blog_posts_path; end
      end
    end
  end
end
