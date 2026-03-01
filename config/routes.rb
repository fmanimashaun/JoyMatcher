# frozen_string_literal: true

Rails.application.routes.draw do
  # ===========================================================
  # Health Check (Rails 8)
  # ===========================================================
  get "up" => "rails/health#show", as: :rails_health_check

  # ===========================================================
  # Authentication (Rails 8 built-in)
  # ===========================================================
  resource  :session,      only: %i[new create destroy]
  resources :passwords,    only: %i[new create edit update], param: :token
  resource  :registration, only: %i[new create]

  # Email verification & unsubscribe
  get "/verify-email/:token",  to: "email_verifications#show",  as: :verify_email
  get "/unsubscribe/:token",   to: "unsubscribes#show",         as: :unsubscribe

  # ===========================================================
  # Public Marketing Pages
  # ===========================================================
  root to: "home#index"

  get "/how-it-works",    to: "pages#how_it_works",    as: :how_it_works
  get "/pricing",         to: "pages#pricing",          as: :pricing
  get "/safety",          to: "pages#safety",            as: :safety_page
  get "/about",           to: "pages#about",             as: :about
  get "/faq",             to: "pages#faq",               as: :faq
  get "/contact",         to: "pages#contact",           as: :contact

  # Success Stories
  resources :success_stories, only: %i[index show], path: "success-stories"

  # Blog
  get "/blog",                      to: "blog#index",    as: :blog
  get "/blog/category/:category",   to: "blog#category", as: :blog_category
  get "/blog/:slug",                to: "blog#show",     as: :blog_post

  # VIP landing page (public marketing)
  get "/vip", to: "pages#vip", as: :vip_landing

  # ===========================================================
  # Legal & Compliance Pages
  # ===========================================================
  scope "/legal", module: "legal", as: "legal" do
    get "/terms-of-service",        to: "pages#terms_of_service",       as: :terms
    get "/privacy-policy",          to: "pages#privacy_policy",         as: :privacy
    get "/cookie-policy",           to: "pages#cookie_policy",          as: :cookie
    get "/community-guidelines",    to: "pages#community_guidelines",   as: :community_guidelines
    get "/data-protection",         to: "pages#data_protection",        as: :data_protection
    get "/right-to-deletion",       to: "pages#right_to_deletion",      as: :right_to_deletion
    get "/accessibility-statement", to: "pages#accessibility_statement",as: :accessibility
    get "/vip-terms",               to: "pages#vip_terms",              as: :vip_terms
    get "/testimonial-terms",       to: "pages#testimonial_terms",      as: :testimonial_terms
    get "/dispute-resolution",      to: "pages#dispute_resolution",     as: :dispute_resolution
  end

  # ===========================================================
  # Onboarding (Authenticated — Tier Completion)
  # ===========================================================
  scope "/onboarding", module: "onboarding", as: "onboarding" do
    get   "/tier-1",   to: "tiers#tier1",        as: :tier1
    patch "/tier-1",   to: "tiers#update_tier1", as: :update_tier1

    get   "/tier-2",   to: "tiers#tier2",        as: :tier2
    patch "/tier-2",   to: "tiers#update_tier2", as: :update_tier2

    get   "/tier-3",   to: "tiers#tier3",        as: :tier3
    patch "/tier-3",   to: "tiers#update_tier3", as: :update_tier3

    get   "/tier-4",   to: "tiers#tier4",        as: :tier4
    patch "/tier-4",   to: "tiers#update_tier4", as: :update_tier4

    get   "/tier-5",   to: "tiers#tier5",        as: :tier5
    patch "/tier-5",   to: "tiers#update_tier5", as: :update_tier5
  end

  # ===========================================================
  # Authenticated App (User Application)
  # ===========================================================
  namespace :app do
    # Dashboard
    get "dashboard", to: "dashboard#index", as: :dashboard

    # Discover
    get "discover", to: "discover#index", as: :discover

    # Profiles
    get   "profile/me",      to: "profiles#me",     as: :my_profile
    get   "profile/me/edit", to: "profiles#edit",   as: :edit_my_profile
    patch "profile/me",      to: "profiles#update", as: :update_my_profile
    get   "profile/:id",     to: "profiles#show",   as: :profile

    # Show Interest
    get "interests",          to: "interests#index",    as: :interests
    get "interests/sent",     to: "interests#sent",     as: :interests_sent
    get "interests/received", to: "interests#received", as: :interests_received
    get "interests/accepted", to: "interests#accepted", as: :interests_accepted

    # Messages (Conversations)
    resources :messages, only: %i[index show create], path: "messages"

    # Notifications
    get "notifications", to: "notifications#index", as: :notifications

    # Settings & Help
    get "settings", to: "settings#index", as: :settings
    get "help",     to: "help#index",     as: :help

    # Account Management
    scope "/account", as: :account do
      get  "/tiers",          to: "account#tiers",         as: :tiers
      get  "/subscription",   to: "account#subscription",  as: :subscription
      get  "/upgrade",        to: "account#upgrade",       as: :upgrade
      get  "/disclosures",    to: "account#disclosures",   as: :disclosures
      get  "/billing",        to: "account#billing",       as: :billing
      get  "/privacy",        to: "account#privacy",       as: :privacy
      get  "/security",       to: "account#security",      as: :security
      get  "/blocked-users",  to: "account#blocked_users", as: :blocked_users
      get  "/data-export",    to: "account#data_export",   as: :data_export
      get  "/delete-account", to: "account#delete_account",as: :delete_account
      get  "/pause-account",  to: "account#pause_account", as: :pause_account
    end

    # Safety Features
    scope "/safety", as: :safety do
      get  "/report",         to: "safety#report",         as: :report
      get  "/report-success", to: "safety#report_success", as: :report_success
      get  "/blocked",        to: "safety#blocked",        as: :blocked
      post "/report",         to: "safety#create_report",  as: :create_report
    end

    # Success & Exit Flows
    scope "/success", as: :success do
      get "/found-match",     to: "success#found_match",     as: :found_match
      get "/marriage-intent", to: "success#marriage_intent", as: :marriage_intent
      get "/feedback",        to: "success#feedback",        as: :feedback
    end

    # VIP-Specific (gated by subscription in controller)
    scope "/vip", as: :vip do
      get  "/application",        to: "vip#application",        as: :application
      get  "/application-status", to: "vip#application_status", as: :application_status
      get  "/verification",       to: "vip#verification",       as: :verification
      get  "/intake",             to: "vip#intake",             as: :intake
      get  "/introductions",      to: "vip#introductions",      as: :introductions
      get  "/sessions",           to: "vip#sessions",           as: :sessions
      get  "/settings",           to: "vip#settings",           as: :vip_settings
      post "/application",        to: "vip#submit_application", as: :submit_application
    end
  end

  # ===========================================================
  # Admin Panel
  # ===========================================================
  namespace :admin do
    root to: "dashboard#index"
    get "dashboard", to: "dashboard#index", as: :dashboard

    # User Management
    resources :users do
      member do
        get  :tiers
        get  :activity
        get  :reports
        post :suspend
        post :unsuspend
        post :ban
      end
    end

    # VIP Management
    namespace :vip do
      resources :applications, only: %i[index show update]
      resources :verifications, only: %i[index show update]
      resources :experts
      resources :assignments, only: %i[index create destroy]
      resources :payments, only: %i[index show]
      get "active", to: "active#index", as: :active_clients
    end

    # Content Moderation
    namespace :moderation do
      resources :reports
      resources :photos, only: %i[index show update]
      resources :profiles, only: %i[index show update]
      resources :messages, only: %i[index show], path: "flagged-messages"
    end

    # Trust & Safety
    namespace :safety do
      root to: "dashboard#index"
      get :patterns
      get :blocked_pairs, path: "blocked-pairs"
      get :appeals
      get :fraud
    end

    # Data Management (Data Protection Officer)
    namespace :data do
      resources :deletion_requests,  only: %i[index show update], path: "deletion-requests"
      resources :export_requests,    only: %i[index show update], path: "export-requests"
      get :anonymization
      get :retention
    end

    # Analytics
    namespace :analytics do
      root to: "dashboard#index"
      get :conversion
      get :engagement
      get :revenue
      get :success
    end

    # System Settings
    namespace :settings do
      root to: "general#index"
      get :pricing
      get :features
      get :email
      get :notifications
      resources :admins
    end

    # Content Publishing
    namespace :content do
      resources :testimonials, only: %i[index show update]
      namespace :blog do
        resources :posts
      end
    end

    # VIP Expert Portal (Isolated)
    namespace :vip_expert do
      root to: "dashboard#index"
      resources :clients, only: %i[index show]
      resources :introductions
      resources :sessions
      get :performance
      get :earnings
    end
  end

  # ===========================================================
  # Error Pages
  # ===========================================================
  match "/404", to: "errors#not_found",    via: :all
  match "/403", to: "errors#forbidden",    via: :all
  match "/500", to: "errors#server_error", via: :all
  match "/503", to: "errors#maintenance",  via: :all
end
