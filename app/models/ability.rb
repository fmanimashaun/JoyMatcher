# frozen_string_literal: true

class Ability
  include CanCan::Ability

  # =========================================================
  # JoyMatcher RBAC — CanCanCan Authorization Rules
  #
  # Role hierarchy (on User model):
  #   0 = user (regular)
  #   1 = moderator
  #   2 = vip_coordinator
  #   3 = vip_expert         ← ISOLATED to assigned clients only
  #   4 = data_protection_officer
  #   5 = support_agent
  #   6 = super_admin
  #
  # CRITICAL: VIP Expert isolation is enforced here (Layer 2).
  #           Database constraints are Layer 1.
  #           UI restrictions are Layer 3.
  # =========================================================

  def initialize(user)
    user ||= User.new # guest (unauthenticated)

    case user.role&.to_sym
    when :super_admin
      super_admin_abilities

    when :moderator
      moderator_abilities(user)

    when :vip_coordinator
      vip_coordinator_abilities(user)

    when :vip_expert
      vip_expert_abilities(user)

    when :data_protection_officer
      data_protection_officer_abilities(user)

    when :support_agent
      support_agent_abilities(user)

    else
      regular_user_abilities(user)
    end
  end

  private

  def super_admin_abilities
    # Full access to everything
    can :manage, :all
  end

  def moderator_abilities(user)
    # Content safety: Free + Premium users only (not VIP, not admins)
    can :read,   User, role: User.roles[:user],
                       subscription: [ User.subscriptions[:free], User.subscriptions[:premium] ]
    can :update, User, role: User.roles[:user],
                       subscription: [ User.subscriptions[:free], User.subscriptions[:premium] ]

    # Cannot access VIP users
    cannot :read,   User, subscription: User.subscriptions[:vip]
    cannot :update, User, subscription: User.subscriptions[:vip]

    # Own profile management
    can :manage, User, id: user.id
  end

  def vip_coordinator_abilities(user)
    # VIP lifecycle: manage VIP applications, assignments, and verify KYC
    can :manage, :vip_applications
    can :manage, :vip_assignments
    can :manage, :tier5_verifications

    # Can read and update VIP users only
    can :read,   User, subscription: User.subscriptions[:vip]
    can :update, User, subscription: User.subscriptions[:vip]

    # Cannot access Free/Premium regular users
    cannot :read,   User, role: User.roles[:user],
                          subscription: [ User.subscriptions[:free], User.subscriptions[:premium] ]

    # Own profile management
    can :manage, User, id: user.id
  end

  def vip_expert_abilities(user)
    # ABSOLUTE ISOLATION — only assigned VIP clients
    # This is Layer 2 of the 3-layer isolation enforcement
    assigned_ids = user.assigned_vip_client_ids

    if assigned_ids.any?
      can :read, User, id: assigned_ids, subscription: User.subscriptions[:vip]
      can :manage, :vip_check_ins   # Own check-ins with assigned clients
      can :create, :introductions   # Introduce matches to assigned clients
    end

    # Explicitly cannot access non-VIP users or unassigned VIP users
    cannot :read,   User, subscription: [ User.subscriptions[:free], User.subscriptions[:premium] ]
    cannot :search, User # No platform-wide search
    cannot :browse, User # No browsing/discovery

    # Own profile management
    can :manage, User, id: user.id
  end

  def data_protection_officer_abilities(user)
    # GDPR/NDPR compliance only
    can :read,   :audit_logs
    can :manage, :data_deletion_requests
    can :manage, :data_export_requests
    can :manage, :data_retention_policies

    # Can read user data for compliance (not modify)
    can :read, User

    # Own profile management
    can :manage, User, id: user.id
  end

  def support_agent_abilities(user)
    # Customer support: read-only Tier 1 data
    # Tier 1 access is enforced via controller scopes (not just CanCanCan)
    can :read, User, role: User.roles[:user]

    # Own profile management
    can :manage, User, id: user.id
  end

  def regular_user_abilities(user)
    # Own profile: full control
    can :manage, User, id: user.id

    # Other users: read public Tier 1 data (active, non-suspended, regular users)
    can :read, User, role: User.roles[:user], active: true, suspended: false

    # Cannot read admin profiles
    cannot :read, User, { active: true, suspended: false, role: User.roles.except(:user).values }
  end
end
