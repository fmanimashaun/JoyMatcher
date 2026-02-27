# Tier 5 Verification Procedure — KYC Technical Implementation

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Production-Ready Specification
**Classification:** Technical Reference — Sensitive Security Implementation

---

## Overview

This document provides the complete technical implementation of Tier 5 (Verified Identity) KYC procedures. Tier 5 is the highest trust level on JoyMatcher and is **VIP-only**. This verification process eliminates fraud, impersonation, and fake profiles, enabling high-trust matchmaking.

**Critical Security Note:**
> Tier 5 data is **NEVER shared peer-to-peer**. Only authorized admins (Super Admin, VIP Coordinator, Data Protection Officer) can access KYC documents. Users only see a "Verified Identity" badge.

---

## Table of Contents

1. [Verification Prerequisites](#1-verification-prerequisites)
2. [ID Upload (Active Storage)](#2-id-upload-active-storage)
3. [Video Verification (Recording + Upload)](#3-video-verification-recording--upload)
4. [VIP Coordinator Review Interface](#4-vip-coordinator-review-interface)
5. [Document Verification Checks](#5-document-verification-checks)
6. [Approval/Rejection Workflow](#6-approvalrejection-workflow)
7. [Security: Encrypted Storage](#7-security-encrypted-storage)
8. [Data Retention Policy](#8-data-retention-policy)
9. [Code Examples](#9-code-examples)
10. [Testing Requirements](#10-testing-requirements)

---

## 1. Verification Prerequisites

### 1.1 Eligibility Requirements

**User MUST meet ALL requirements before Tier 5 is unlocked:**

1. **VIP Application Approved:** User's VIP application must be approved by VIP Coordinator
2. **Tier 4 Completed:** User must have completed Tier 4 (Health & Long-Term Compatibility)
3. **Premium Subscription:** User must have an active Premium subscription
4. **No Pending Verification:** User must not have a pending Tier 5 verification

### 1.2 Eligibility Check

```ruby
# app/models/user.rb
class User < ApplicationRecord
  def can_complete_tier5?
    return false unless vip_application&.approved?
    return false unless max_completed_tier >= 4
    return false unless premium? || vip?
    return false if tier5_data&.pending?

    true
  end

  def tier5_blocked_reason
    return "Your VIP application must be approved first" unless vip_application&.approved?
    return "You must complete Tier 4 first" unless max_completed_tier >= 4
    return "You must have a Premium subscription" unless premium? || vip?
    return "You have a pending Tier 5 verification" if tier5_data&.pending?

    nil
  end
end
```

### 1.3 UI Flow (Check Eligibility)

**Endpoint:** `GET /tiers/5/eligibility`

**Response (200 OK - Eligible):**
```json
{
  "data": {
    "eligible": true,
    "requirements_met": {
      "vip_application_approved": true,
      "tier_4_completed": true,
      "premium_subscription": true,
      "no_pending_verification": true
    },
    "next_step": "upload_id_document"
  }
}
```

**Response (200 OK - Not Eligible):**
```json
{
  "data": {
    "eligible": false,
    "requirements_met": {
      "vip_application_approved": false,
      "tier_4_completed": true,
      "premium_subscription": true,
      "no_pending_verification": true
    },
    "blocked_reason": "Your VIP application must be approved first",
    "next_step": "wait_for_vip_approval"
  }
}
```

---

## 2. ID Upload (Active Storage)

### 2.1 Accepted ID Types

**Supported Government-Issued IDs:**
1. **National ID Card** (front and back)
2. **International Passport** (bio-data page)
3. **Driver's License** (front and back)

**NOT Accepted:**
- Employee ID cards
- Student ID cards
- Voter's cards (unless explicitly supported in specific regions)
- Birth certificates
- Social security cards

### 2.2 ID Upload Requirements

**Image Requirements:**
- **Format:** JPEG, PNG
- **Max File Size:** 10 MB per image
- **Resolution:** Minimum 1200x800 pixels
- **Quality:** Clear, not blurry, all corners visible
- **Lighting:** Well-lit, no glare or shadows
- **Editing:** No filters, no editing (rejected if detected)

### 2.3 Data Model

```ruby
# app/models/tier_data/tier5.rb
module TierData
  class Tier5 < ApplicationRecord
    self.table_name = "tier_data_tier5s"

    belongs_to :user
    belongs_to :verified_by_admin, class_name: "Admin", optional: true

    # Active Storage attachments
    has_one_attached :id_document_front
    has_one_attached :id_document_back # Only for National ID and Driver's License
    has_one_attached :video_verification

    # Encrypted ID number
    attr_encrypted :id_number, key: Rails.application.credentials.tier5_encryption_key

    # Enums
    enum verification_status: { pending: "pending", approved: "approved", rejected: "rejected" }
    enum id_type: { national_id: "national_id", passport: "passport", drivers_license: "drivers_license" }

    # Validations
    validates :id_type, presence: true
    validates :id_number_encrypted, presence: true
    validates :id_country_of_issue, presence: true
    validates :id_expiry_date, presence: true
    validates :liveness_challenge_code, presence: true, length: { is: 6 }
    validates :truth_declaration_signed, inclusion: { in: [true] }
    validates :truth_declaration_signature, presence: true
    validates :id_document_front, presence: true
    validates :video_verification, presence: true

    validate :id_not_expired
    validate :id_document_back_required_for_national_id_and_drivers_license

    # Scopes
    scope :pending_review, -> { where(verification_status: "pending") }
    scope :approved, -> { where(verification_status: "approved") }
    scope :rejected, -> { where(verification_status: "rejected") }

    # Callbacks
    after_create :notify_vip_coordinator
    after_update :handle_verification_status_change, if: :saved_change_to_verification_status?

    def approve!(admin:, notes: nil)
      transaction do
        update!(
          verification_status: "approved",
          verified_at: Time.current,
          verified_by_admin: admin,
          admin_review_notes: notes
        )

        user.update!(verified: true, max_completed_tier: 5)

        # Log approval
        AuditLog.create!(
          user: user,
          admin: admin,
          action: "tier5_approved",
          details: { notes: notes }
        )

        # Send approval email
        TierMailer.tier5_approved(user).deliver_later
      end
    end

    def reject!(admin:, reason:)
      transaction do
        update!(
          verification_status: "rejected",
          rejection_reason: reason,
          verified_by_admin: admin
        )

        # Log rejection
        AuditLog.create!(
          user: user,
          admin: admin,
          action: "tier5_rejected",
          details: { reason: reason }
        )

        # Send rejection email
        TierMailer.tier5_rejected(user, reason).deliver_later
      end
    end

    private

    def id_not_expired
      errors.add(:id_expiry_date, "ID document has expired") if id_expiry_date && id_expiry_date < Date.current
    end

    def id_document_back_required_for_national_id_and_drivers_license
      if (national_id? || drivers_license?) && !id_document_back.attached?
        errors.add(:id_document_back, "is required for National ID and Driver's License")
      end
    end

    def notify_vip_coordinator
      Tier5VerificationNotificationJob.perform_later(id)
    end

    def handle_verification_status_change
      if approved?
        approve_verification_callback
      elsif rejected?
        reject_verification_callback
      end
    end

    def approve_verification_callback
      # Already handled in approve! method
    end

    def reject_verification_callback
      # Already handled in reject! method
    end
  end
end
```

### 2.4 Database Schema

```ruby
# db/migrate/20260227000050_create_tier_data_tier5s.rb
class CreateTierDataTier5s < ActiveRecord::Migration[8.0]
  def change
    create_table :tier_data_tier5s do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # ID Verification
      t.string :id_type, null: false # "national_id", "passport", "drivers_license"
      t.string :id_number_encrypted, null: false # Encrypted
      t.string :id_country_of_issue, null: false
      t.date :id_expiry_date, null: false

      # Active Storage attachments (defined in model):
      # has_one_attached :id_document_front
      # has_one_attached :id_document_back
      # has_one_attached :video_verification

      # Verification Status
      t.string :verification_status, default: "pending", null: false # "pending", "approved", "rejected"
      t.text :rejection_reason
      t.datetime :verified_at
      t.bigint :verified_by_admin_id # Foreign key to admins table

      # Face Match Scores (automated)
      t.decimal :photo_to_id_match_score, precision: 5, scale: 2 # 0.00 - 100.00
      t.decimal :photo_to_video_match_score, precision: 5, scale: 2

      # Liveness Challenge
      t.string :liveness_challenge_code, null: false # 6-digit code shown in video
      t.boolean :liveness_challenge_passed, default: false

      # Truth Declaration
      t.boolean :truth_declaration_signed, default: false, null: false
      t.string :truth_declaration_signature # Typed full name
      t.datetime :truth_declaration_signed_at

      # Manual Review Notes (admin only)
      t.text :admin_review_notes

      t.timestamps
    end

    add_index :tier_data_tier5s, :verification_status
    add_index :tier_data_tier5s, :verified_by_admin_id

    add_foreign_key :tier_data_tier5s, :admins, column: :verified_by_admin_id
  end
end
```

### 2.5 API Endpoint (Upload ID Document)

**Endpoint:** `POST /tiers/5/documents`

**Description:** Uploads ID document (front and back if applicable).

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body (multipart):**
```
id_type: "national_id"
id_number: "12345678901"
id_country_of_issue: "NG"
id_expiry_date: "2028-12-31"
id_document_front: (binary file data)
id_document_back: (binary file data)
```

**Response (201 Created):**
```json
{
  "data": {
    "tier5": {
      "id": 1001,
      "id_type": "national_id",
      "id_country_of_issue": "NG",
      "id_expiry_date": "2028-12-31",
      "verification_status": "pending",
      "next_step": "complete_video_verification",
      "liveness_challenge_code": "847392"
    }
  }
}
```

**Error Response (422 Unprocessable Entity):**
```json
{
  "errors": [
    {
      "code": "validation_error",
      "message": "ID document has expired",
      "field": "id_expiry_date"
    },
    {
      "code": "validation_error",
      "message": "Image quality is too low (blurry or pixelated)",
      "field": "id_document_front"
    }
  ]
}
```

### 2.6 Controller Implementation

```ruby
# app/controllers/api/v1/tiers/tier5_controller.rb
module Api
  module V1
    module Tiers
      class Tier5Controller < ApplicationController
        before_action :authenticate_user!
        before_action :check_eligibility, only: [:create]

        def create
          tier5 = current_user.build_tier5_data(tier5_params)

          # Generate liveness challenge code
          tier5.liveness_challenge_code = generate_liveness_code

          if tier5.save
            render json: {
              data: {
                tier5: tier5.as_json(only: [:id, :id_type, :id_country_of_issue, :id_expiry_date, :verification_status, :liveness_challenge_code])
              }
            }, status: :created
          else
            render json: {
              errors: tier5.errors.full_messages.map { |msg| { code: "validation_error", message: msg } }
            }, status: :unprocessable_entity
          end
        end

        def show
          tier5 = current_user.tier5_data

          if tier5
            render json: { data: { tier5: tier5.as_json(public_view: true) } }
          else
            render json: { errors: [{ code: "not_found", message: "Tier 5 not found" }] }, status: :not_found
          end
        end

        private

        def tier5_params
          params.permit(
            :id_type,
            :id_number,
            :id_country_of_issue,
            :id_expiry_date,
            :id_document_front,
            :id_document_back,
            :truth_declaration_signed,
            :truth_declaration_signature
          )
        end

        def check_eligibility
          unless current_user.can_complete_tier5?
            render json: {
              errors: [{
                code: "not_eligible",
                message: current_user.tier5_blocked_reason
              }]
            }, status: :forbidden
          end
        end

        def generate_liveness_code
          SecureRandom.random_number(900000) + 100000 # 6-digit code (100000-999999)
        end
      end
    end
  end
end
```

### 2.7 Image Quality Check (Automated)

**Service:** `ImageQualityCheckService`

```ruby
# app/services/image_quality_check_service.rb
class ImageQualityCheckService
  def initialize(image_blob)
    @image_blob = image_blob
  end

  def check_quality
    errors = []

    # Check resolution
    if resolution_too_low?
      errors << "Image resolution is too low (minimum 1200x800 pixels)"
    end

    # Check file size
    if file_size_too_large?
      errors << "Image file size is too large (maximum 10 MB)"
    end

    # Check blur (using ImageMagick/MiniMagick)
    if image_blurry?
      errors << "Image is blurry or out of focus"
    end

    # Check brightness/darkness
    if image_too_dark_or_bright?
      errors << "Image is too dark or too bright"
    end

    errors
  end

  private

  def resolution_too_low?
    image = MiniMagick::Image.read(@image_blob.download)
    image.width < 1200 || image.height < 800
  end

  def file_size_too_large?
    @image_blob.byte_size > 10.megabytes
  end

  def image_blurry?
    # Use ImageMagick's Laplacian operator to detect blur
    image = MiniMagick::Image.read(@image_blob.download)
    result = image.run_command("identify", "-verbose", "-format", "%[fx:standard_deviation]")
    blur_score = result.to_f

    blur_score < 50 # Threshold for blur detection
  end

  def image_too_dark_or_bright?
    image = MiniMagick::Image.read(@image_blob.download)
    result = image.run_command("identify", "-verbose", "-format", "%[fx:mean]")
    brightness = result.to_f

    brightness < 0.2 || brightness > 0.9
  end
end
```

---

## 3. Video Verification (Recording + Upload)

### 3.1 Video Requirements

**Technical Requirements:**
- **Format:** MP4, MOV, WebM
- **Max File Size:** 50 MB
- **Duration:** 15-30 seconds
- **Resolution:** Minimum 720p (1280x720)
- **Audio:** Required (must hear user speak)
- **Recording:** Real-time (not pre-recorded)

**Content Requirements:**
1. User must clearly say their **full name**
2. User must clearly say **today's date**
3. User must clearly say the **6-digit liveness challenge code** (shown on screen)
4. User's face must be **clearly visible** throughout the video
5. User must **turn head left and right** (or blink twice) for liveness check

### 3.2 Liveness Challenge

**Purpose:** Prevent users from uploading pre-recorded videos or using deepfakes.

**Implementation:**
1. System generates a random **6-digit code** (e.g., 847392) when user uploads ID
2. User must display this code on screen while recording video
3. User must clearly say the code in the video
4. Code expires after 24 hours (user must re-upload ID if expired)

**Example Video Script:**
> "My name is John Doe. Today's date is February 27, 2026. My verification code is 8-4-7-3-9-2."

### 3.3 API Endpoint (Upload Video Verification)

**Endpoint:** `POST /tiers/5/video`

**Description:** Uploads video verification.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body (multipart):**
```
video_verification: (binary file data)
```

**Response (201 Created):**
```json
{
  "data": {
    "tier5": {
      "id": 1001,
      "verification_status": "pending",
      "video_uploaded": true,
      "estimated_review_time": "24-48 hours",
      "next_step": "wait_for_verification"
    }
  }
}
```

**Error Response (422 Unprocessable Entity):**
```json
{
  "errors": [
    {
      "code": "validation_error",
      "message": "Video duration is too short (minimum 15 seconds)",
      "field": "video_verification"
    },
    {
      "code": "validation_error",
      "message": "Video quality is too low (minimum 720p)",
      "field": "video_verification"
    }
  ]
}
```

### 3.4 Video Quality Check (Automated)

**Service:** `VideoQualityCheckService`

```ruby
# app/services/video_quality_check_service.rb
class VideoQualityCheckService
  def initialize(video_blob)
    @video_blob = video_blob
  end

  def check_quality
    errors = []

    # Check duration
    if duration_too_short_or_long?
      errors << "Video duration must be between 15 and 30 seconds"
    end

    # Check file size
    if file_size_too_large?
      errors << "Video file size is too large (maximum 50 MB)"
    end

    # Check resolution
    if resolution_too_low?
      errors << "Video resolution is too low (minimum 720p)"
    end

    # Check audio presence
    if no_audio?
      errors << "Video must have audio (we need to hear you speak)"
    end

    errors
  end

  private

  def duration_too_short_or_long?
    video = FFMPEG::Movie.new(@video_blob.download)
    video.duration < 15 || video.duration > 30
  end

  def file_size_too_large?
    @video_blob.byte_size > 50.megabytes
  end

  def resolution_too_low?
    video = FFMPEG::Movie.new(@video_blob.download)
    video.width < 1280 || video.height < 720
  end

  def no_audio?
    video = FFMPEG::Movie.new(@video_blob.download)
    video.audio_streams.empty?
  end
end
```

### 3.5 Face Match Score (Automated - Optional)

**Service:** `FaceMatchService` (using AWS Rekognition or Face++ API)

```ruby
# app/services/face_match_service.rb
class FaceMatchService
  def initialize(tier5)
    @tier5 = tier5
  end

  def calculate_match_scores
    # Photo to ID match
    photo_to_id_score = compare_faces(
      @tier5.user.photos.first,
      @tier5.id_document_front
    )

    # Photo to Video match
    photo_to_video_score = compare_faces(
      @tier5.user.photos.first,
      extract_video_frame(@tier5.video_verification)
    )

    @tier5.update!(
      photo_to_id_match_score: photo_to_id_score,
      photo_to_video_match_score: photo_to_video_score
    )

    {
      photo_to_id: photo_to_id_score,
      photo_to_video: photo_to_video_score
    }
  end

  private

  def compare_faces(source_image, target_image)
    # Use AWS Rekognition CompareFaces API
    rekognition = Aws::Rekognition::Client.new(
      region: 'us-east-1',
      credentials: Aws::Credentials.new(
        Rails.application.credentials.aws_access_key_id,
        Rails.application.credentials.aws_secret_access_key
      )
    )

    response = rekognition.compare_faces(
      source_image: { bytes: source_image.download },
      target_image: { bytes: target_image.download },
      similarity_threshold: 80
    )

    response.face_matches.any? ? response.face_matches.first.similarity : 0.0
  end

  def extract_video_frame(video_blob)
    # Extract frame at 5 seconds using FFMPEG
    video = FFMPEG::Movie.new(video_blob.download)
    screenshot_path = "/tmp/video_frame_#{SecureRandom.hex}.jpg"

    video.screenshot(screenshot_path, seek_time: 5)

    File.read(screenshot_path)
  end
end
```

---

## 4. VIP Coordinator Review Interface

### 4.1 Admin Dashboard (Tier 5 Queue)

**URL:** `/admin/tier5/verifications`

**Controller:**
```ruby
# app/controllers/admin/tier5/verifications_controller.rb
module Admin
  module Tier5
    class VerificationsController < Admin::BaseController
      before_action :require_tier5_verification_permission

      def index
        @pending_verifications = TierData::Tier5.pending_review
                                                 .includes(:user)
                                                 .order(created_at: :asc)
                                                 .page(params[:page])
                                                 .per(10)

        @stats = {
          pending: TierData::Tier5.pending_review.count,
          approved_this_week: TierData::Tier5.approved.where("verified_at > ?", 1.week.ago).count,
          rejected_this_week: TierData::Tier5.rejected.where("created_at > ?", 1.week.ago).count,
          avg_review_time: calculate_avg_review_time
        }
      end

      def show
        @tier5 = TierData::Tier5.find(params[:id])
        @user = @tier5.user

        # Calculate face match scores (if not already done)
        if @tier5.photo_to_id_match_score.nil?
          FaceMatchService.new(@tier5).calculate_match_scores
          @tier5.reload
        end
      end

      def approve
        @tier5 = TierData::Tier5.find(params[:id])

        if @tier5.approve!(admin: current_admin, notes: params[:notes])
          flash[:success] = "Tier 5 verification approved! User is now verified."
          redirect_to admin_tier5_verifications_path
        else
          flash[:error] = "Failed to approve verification"
          redirect_to admin_tier5_verification_path(@tier5)
        end
      end

      def reject
        @tier5 = TierData::Tier5.find(params[:id])

        if @tier5.reject!(admin: current_admin, reason: params[:reason])
          flash[:success] = "Tier 5 verification rejected. User has been notified."
          redirect_to admin_tier5_verifications_path
        else
          flash[:error] = "Failed to reject verification"
          redirect_to admin_tier5_verification_path(@tier5)
        end
      end

      private

      def require_tier5_verification_permission
        unless current_admin.can_verify_tier5?
          redirect_to admin_root_path, alert: "Access denied"
        end
      end

      def calculate_avg_review_time
        verified = TierData::Tier5.where.not(verified_at: nil).where("created_at > ?", 1.month.ago)
        return 0 if verified.empty?

        total_time = verified.sum { |t5| (t5.verified_at || Time.current) - t5.created_at }
        (total_time / verified.count / 3600).round # Convert to hours
      end
    end
  end
end
```

### 4.2 View (Admin Review Page)

```erb
<!-- app/views/admin/tier5/verifications/show.html.erb -->
<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Tier 5 Verification Review</h1>

  <!-- User Info -->
  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">User Information</h2>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-sm text-gray-600">Name</p>
        <p class="font-medium"><%= @user.first_name %> <%= @user.last_name %></p>
      </div>
      <div>
        <p class="text-sm text-gray-600">Age</p>
        <p class="font-medium"><%= @user.age %></p>
      </div>
      <div>
        <p class="text-sm text-gray-600">Location</p>
        <p class="font-medium"><%= @user.tier1_data.city %>, <%= @user.tier1_data.country %></p>
      </div>
      <div>
        <p class="text-sm text-gray-600">Subscription</p>
        <p class="font-medium"><%= @user.subscription.titleize %></p>
      </div>
    </div>
  </div>

  <!-- ID Document Review -->
  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">ID Document Review</h2>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p class="text-sm text-gray-600">ID Type</p>
        <p class="font-medium"><%= @tier5.id_type.titleize %></p>
      </div>
      <div>
        <p class="text-sm text-gray-600">Country of Issue</p>
        <p class="font-medium"><%= @tier5.id_country_of_issue %></p>
      </div>
      <div>
        <p class="text-sm text-gray-600">ID Number</p>
        <p class="font-medium"><%= @tier5.id_number %></p>
      </div>
      <div>
        <p class="text-sm text-gray-600">Expiry Date</p>
        <p class="font-medium"><%= @tier5.id_expiry_date %></p>
        <% if @tier5.id_expiry_date < Date.current %>
          <span class="text-red-600 text-sm">⚠️ EXPIRED</span>
        <% end %>
      </div>
    </div>

    <!-- ID Images -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-sm text-gray-600 mb-2">ID Document (Front)</p>
        <%= image_tag @tier5.id_document_front, class: "w-full rounded-lg shadow" %>
      </div>

      <% if @tier5.id_document_back.attached? %>
        <div>
          <p class="text-sm text-gray-600 mb-2">ID Document (Back)</p>
          <%= image_tag @tier5.id_document_back, class: "w-full rounded-lg shadow" %>
        </div>
      <% end %>
    </div>

    <!-- Checklist -->
    <div class="mt-6">
      <h3 class="font-semibold mb-2">Verification Checklist</h3>
      <ul class="space-y-2">
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Document is government-issued (not employee/student ID)
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Document is current (not expired)
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Name matches profile name
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Date of birth matches stated age
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Photo on ID matches profile photos
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Document is not obviously fake (holograms, fonts, layout correct)
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Image quality is sufficient (not blurry, all corners visible)
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> No obvious editing or tampering
          </label>
        </li>
      </ul>
    </div>
  </div>

  <!-- Video Verification Review -->
  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">Video Verification Review</h2>

    <div class="mb-4">
      <p class="text-sm text-gray-600 mb-2">Liveness Challenge Code (user must say this in video)</p>
      <p class="text-2xl font-bold text-purple-600"><%= @tier5.liveness_challenge_code %></p>
    </div>

    <!-- Video Player -->
    <div class="mb-4">
      <video controls class="w-full rounded-lg shadow">
        <source src="<%= url_for(@tier5.video_verification) %>" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Face Match Scores (Automated) -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Photo to ID Match</p>
        <p class="text-3xl font-bold <%= @tier5.photo_to_id_match_score >= 80 ? 'text-green-600' : 'text-red-600' %>">
          <%= @tier5.photo_to_id_match_score&.round(1) || 'N/A' %>%
        </p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Photo to Video Match</p>
        <p class="text-3xl font-bold <%= @tier5.photo_to_video_match_score >= 80 ? 'text-green-600' : 'text-red-600' %>">
          <%= @tier5.photo_to_video_match_score&.round(1) || 'N/A' %>%
        </p>
      </div>
    </div>

    <!-- Checklist -->
    <div class="mt-6">
      <h3 class="font-semibold mb-2">Video Verification Checklist</h3>
      <ul class="space-y-2">
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> User says full name clearly
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Full name matches ID document
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> User says correct date
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> User says correct verification code (<%= @tier5.liveness_challenge_code %>)
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Face in video matches profile photos
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Face in video matches ID photo
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Video is clearly recorded by user (not pre-recorded/deepfake)
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> User appears to be alone (not coached)
          </label>
        </li>
        <li>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> Lighting is sufficient to see face clearly
          </label>
        </li>
      </ul>
    </div>
  </div>

  <!-- Truth Declaration -->
  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">Truth Declaration</h2>
    <p class="text-sm text-gray-600 mb-2">User signed on: <%= @tier5.truth_declaration_signed_at %></p>
    <p class="font-medium">Signature: <%= @tier5.truth_declaration_signature %></p>
  </div>

  <!-- Approve/Reject Actions -->
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Review Decision</h2>

    <%= form_with url: approve_admin_tier5_verification_path(@tier5), method: :patch, local: true do |form| %>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Review Notes (optional)</label>
        <%= form.text_area :notes, rows: 3, class: "w-full px-4 py-2 border border-gray-300 rounded-lg" %>
      </div>

      <div class="flex space-x-4">
        <%= form.submit "Approve Verification", class: "bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700", data: { confirm: "Are you sure you want to approve this verification?" } %>

        <%= link_to "Reject Verification", reject_admin_tier5_verification_path(@tier5), method: :patch, class: "bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700", data: { confirm: "Are you sure you want to reject this verification? User will need to re-upload documents." } %>
      </div>
    <% end %>
  </div>
</div>
```

---

## 5. Document Verification Checks

### 5.1 Manual Review Checklist (Admin)

**ID Document Checks:**
- [ ] Document is government-issued (not employee ID or student ID)
- [ ] Document is current (not expired)
- [ ] Name matches profile name (allow for middle names, order variations)
- [ ] Date of birth matches stated age (±1 year acceptable for rounding)
- [ ] Photo on ID matches profile photos
- [ ] Document is not obviously fake (check holograms, fonts, layout)
- [ ] Image quality is sufficient (not blurry, all corners visible)
- [ ] No obvious editing or tampering

**Video Verification Checks:**
- [ ] User says full name clearly
- [ ] Full name matches ID document
- [ ] User says correct date
- [ ] User says correct verification code
- [ ] Face in video matches profile photos
- [ ] Face in video matches ID photo
- [ ] Video is clearly recorded by user (not pre-recorded/deepfake)
- [ ] User appears to be alone (not coached)
- [ ] Lighting is sufficient to see face clearly

### 5.2 Automated Checks (Pre-Review)

**Automated checks run before manual review:**

1. **ID Expiry Check:** Reject if ID has expired
2. **Image Quality Check:** Reject if images are blurry, too dark, or too small
3. **Video Quality Check:** Reject if video is too short, no audio, or resolution too low
4. **Face Match Score:** Flag for review if score < 80%
5. **Duplicate ID Check:** Flag if same ID number exists for another user

```ruby
# app/services/tier5_automated_check_service.rb
class Tier5AutomatedCheckService
  def initialize(tier5)
    @tier5 = tier5
  end

  def run_automated_checks
    errors = []

    # 1. ID Expiry Check
    if @tier5.id_expiry_date < Date.current
      errors << "ID document has expired"
    end

    # 2. Image Quality Check
    image_errors = ImageQualityCheckService.new(@tier5.id_document_front).check_quality
    errors.concat(image_errors)

    # 3. Video Quality Check
    video_errors = VideoQualityCheckService.new(@tier5.video_verification).check_quality
    errors.concat(video_errors)

    # 4. Face Match Score
    face_match_scores = FaceMatchService.new(@tier5).calculate_match_scores
    if face_match_scores[:photo_to_id] < 80 || face_match_scores[:photo_to_video] < 80
      errors << "Face match score is below threshold (possible mismatch)"
    end

    # 5. Duplicate ID Check
    if duplicate_id_exists?
      errors << "This ID number is already registered to another user"
    end

    if errors.any?
      @tier5.reject!(
        admin: Admin.system_admin,
        reason: "Automated checks failed: #{errors.join(', ')}"
      )
      false
    else
      # Pass to manual review
      true
    end
  end

  private

  def duplicate_id_exists?
    TierData::Tier5.where(id_number_encrypted: @tier5.id_number_encrypted)
                   .where.not(user_id: @tier5.user_id)
                   .exists?
  end
end
```

---

## 6. Approval/Rejection Workflow

### 6.1 Approval Process

**When VIP Coordinator approves Tier 5 verification:**

1. **Update Tier 5 Status:** Set `verification_status` to "approved"
2. **Update User Record:** Set `verified` to `true`, `max_completed_tier` to `5`
3. **Log Approval:** Create audit log entry
4. **Send Email:** Notify user of approval
5. **Unlock VIP Payment:** User can now proceed to VIP payment page

### 6.2 Approval Implementation

```ruby
# app/models/tier_data/tier5.rb
def approve!(admin:, notes: nil)
  transaction do
    update!(
      verification_status: "approved",
      verified_at: Time.current,
      verified_by_admin: admin,
      admin_review_notes: notes,
      liveness_challenge_passed: true
    )

    user.update!(
      verified: true,
      max_completed_tier: 5
    )

    # Log approval
    AuditLog.create!(
      user: user,
      admin: admin,
      action: "tier5_approved",
      details: {
        notes: notes,
        photo_to_id_match_score: photo_to_id_match_score,
        photo_to_video_match_score: photo_to_video_match_score
      }
    )

    # Send approval email
    TierMailer.tier5_approved(user).deliver_later

    true
  end
rescue => e
  errors.add(:base, "Failed to approve: #{e.message}")
  false
end
```

### 6.3 Rejection Process

**When VIP Coordinator rejects Tier 5 verification:**

1. **Update Tier 5 Status:** Set `verification_status` to "rejected"
2. **Record Rejection Reason:** Store specific reason for rejection
3. **Log Rejection:** Create audit log entry
4. **Send Email:** Notify user of rejection with specific reason and guidance
5. **Allow Re-Upload:** User can re-upload documents after fixing issues

### 6.4 Rejection Implementation

```ruby
# app/models/tier_data/tier5.rb
def reject!(admin:, reason:)
  transaction do
    update!(
      verification_status: "rejected",
      rejection_reason: reason,
      verified_by_admin: admin
    )

    # Log rejection
    AuditLog.create!(
      user: user,
      admin: admin,
      action: "tier5_rejected",
      details: {
        reason: reason,
        photo_to_id_match_score: photo_to_id_match_score,
        photo_to_video_match_score: photo_to_video_match_score
      }
    )

    # Send rejection email
    TierMailer.tier5_rejected(user, reason).deliver_later

    true
  end
rescue => e
  errors.add(:base, "Failed to reject: #{e.message}")
  false
end
```

### 6.5 Common Rejection Reasons

**ID Document Issues:**
- "ID document has expired. Please upload a current, valid ID."
- "Photo on ID does not match your profile photos. Please ensure you upload your own ID."
- "ID image quality is too low. Please upload a clear, well-lit photo of your ID."
- "Document appears to be tampered with or edited. Please upload an unedited photo."
- "This is not a government-issued ID. Please upload a National ID, Passport, or Driver's License."

**Video Verification Issues:**
- "Face in video does not match profile photos. Please ensure the person in the video matches your profile."
- "Video quality is too low. Please record in good lighting with minimum 720p resolution."
- "Liveness challenge code was not clearly stated. Please say the 6-digit code clearly."
- "Video appears to be pre-recorded. Please record a new video in real-time."
- "Unable to verify identity. Please ensure your face is clearly visible throughout the video."

---

## 7. Security: Encrypted Storage

### 7.1 ID Number Encryption

**ID numbers are encrypted at rest using `attr_encrypted` gem:**

```ruby
# Gemfile
gem 'attr_encrypted'

# app/models/tier_data/tier5.rb
class Tier5 < ApplicationRecord
  attr_encrypted :id_number, key: Rails.application.credentials.tier5_encryption_key
end

# config/credentials.yml.enc (encrypted file)
tier5_encryption_key: [32-byte random key]
```

**Generate Encryption Key:**
```bash
rails secret # Generate 32-byte key
rails credentials:edit # Add to credentials
```

### 7.2 Active Storage Encryption

**ID documents and videos are stored encrypted in S3:**

```ruby
# config/storage.yml
amazon_tier5:
  service: S3
  access_key_id: <%= Rails.application.credentials.dig(:aws, :access_key_id) %>
  secret_access_key: <%= Rails.application.credentials.dig(:aws, :secret_access_key) %>
  region: us-east-1
  bucket: joymatcher-tier5-documents-<%= Rails.env %>
  server_side_encryption: AES256 # S3 server-side encryption
```

### 7.3 Access Control

**Only authorized admins can access Tier 5 data:**

```ruby
# app/policies/tier_data/tier5_policy.rb
module TierData
  class Tier5Policy < ApplicationPolicy
    def show?
      # Only these roles can view Tier 5 documents
      user.super_admin? || user.vip_coordinator? || user.data_protection_officer?
    end

    def approve?
      user.super_admin? || user.vip_coordinator?
    end

    def reject?
      user.super_admin? || user.vip_coordinator?
    end
  end
end
```

### 7.4 Audit Logging

**All Tier 5 access is logged:**

```ruby
# app/controllers/admin/tier5/verifications_controller.rb
def show
  @tier5 = TierData::Tier5.find(params[:id])

  # Log access
  AuditLog.create!(
    admin: current_admin,
    action: "tier5_accessed",
    details: {
      user_id: @tier5.user_id,
      tier5_id: @tier5.id
    },
    ip_address: request.remote_ip,
    user_agent: request.user_agent
  )
end
```

---

## 8. Data Retention Policy

### 8.1 Retention Rules

**Tier 5 documents are retained according to this schedule:**

1. **Active VIP Members:** Documents retained for entire VIP membership duration
2. **Expired VIP Members:** Documents retained for **90 days** after expiry
3. **After 90 Days:** Documents automatically deleted, ID number remains encrypted

### 8.2 Automated Cleanup Job

```ruby
# app/jobs/tier5_document_cleanup_job.rb
class Tier5DocumentCleanupJob < ApplicationJob
  queue_as :default

  def perform
    # Find Tier 5 records for expired VIP users (90+ days after expiry)
    expired_vip_users = User.where("vip_membership_expires_at < ?", 90.days.ago)

    expired_vip_users.find_each do |user|
      tier5 = user.tier5_data
      next unless tier5

      # Purge attachments
      tier5.id_document_front.purge if tier5.id_document_front.attached?
      tier5.id_document_back.purge if tier5.id_document_back.attached?
      tier5.video_verification.purge if tier5.video_verification.attached?

      # Keep encrypted ID number (for duplicate detection), but clear other data
      tier5.update!(
        admin_review_notes: "[REDACTED - 90-day retention policy]",
        photo_to_id_match_score: nil,
        photo_to_video_match_score: nil
      )

      # Log deletion
      AuditLog.create!(
        user: user,
        action: "tier5_documents_deleted",
        details: { reason: "90-day retention policy" }
      )

      Rails.logger.info("Deleted Tier 5 documents for user #{user.id} (90-day retention policy)")
    end
  end
end

# config/schedule.rb (using whenever gem)
every 1.day, at: '2:00 am' do
  runner "Tier5DocumentCleanupJob.perform_later"
end
```

### 8.3 GDPR Right to Be Forgotten

**Users can request complete data deletion:**

```ruby
# app/services/data_retention_service.rb
class DataRetentionService
  def self.delete_user_data(user)
    ActiveRecord::Base.transaction do
      # Delete tier data
      user.tier5_data&.destroy # This will also purge attachments

      # Anonymize user record
      user.update!(
        email: "deleted_#{user.id}@deleted.com",
        first_name: "Deleted",
        last_name: "User",
        active: false,
        verified: false
      )

      # Log deletion
      AuditLog.create!(
        user: user,
        action: "user_data_deleted",
        details: { reason: "GDPR right to be forgotten" }
      )
    end
  end
end
```

---

## 9. Code Examples

### Complete Tier 5 Workflow (End-to-End)

```ruby
# User completes Tier 5 verification
tier5 = current_user.build_tier5_data(
  id_type: "national_id",
  id_number: "12345678901",
  id_country_of_issue: "NG",
  id_expiry_date: "2028-12-31",
  truth_declaration_signed: true,
  truth_declaration_signature: "John Doe",
  truth_declaration_signed_at: Time.current
)

tier5.liveness_challenge_code = generate_liveness_code
tier5.id_document_front.attach(params[:id_document_front])
tier5.id_document_back.attach(params[:id_document_back])
tier5.video_verification.attach(params[:video_verification])

if tier5.save
  # Run automated checks
  if Tier5AutomatedCheckService.new(tier5).run_automated_checks
    # Pass to manual review
    Tier5VerificationNotificationJob.perform_later(tier5.id)
    render json: { message: "Verification submitted. Review in 24-48 hours." }
  else
    render json: { errors: tier5.errors.full_messages }, status: :unprocessable_entity
  end
else
  render json: { errors: tier5.errors.full_messages }, status: :unprocessable_entity
end
```

---

## 10. Testing Requirements

### RSpec Tests

```ruby
# spec/models/tier_data/tier5_spec.rb
require 'rails_helper'

RSpec.describe TierData::Tier5, type: :model do
  let(:user) { create(:user, :premium, max_completed_tier: 4, vip_application: create(:vip_application, :approved)) }
  let(:admin) { create(:admin, :vip_coordinator) }
  let(:tier5) { build(:tier5, user: user) }

  describe "validations" do
    it "requires ID document front" do
      tier5.id_document_front = nil
      expect(tier5).not_to be_valid
      expect(tier5.errors[:id_document_front]).to include("must be attached")
    end

    it "rejects expired ID" do
      tier5.id_expiry_date = 1.day.ago
      expect(tier5).not_to be_valid
      expect(tier5.errors[:id_expiry_date]).to include("ID document has expired")
    end

    it "requires video verification" do
      tier5.video_verification = nil
      expect(tier5).not_to be_valid
      expect(tier5.errors[:video_verification]).to include("must be attached")
    end
  end

  describe "#approve!" do
    it "approves verification and updates user" do
      tier5.save!

      expect {
        tier5.approve!(admin: admin, notes: "All checks passed")
      }.to change { tier5.verification_status }.from("pending").to("approved")

      expect(tier5.verified_at).to be_present
      expect(tier5.user.verified).to eq(true)
      expect(tier5.user.max_completed_tier).to eq(5)
    end

    it "logs approval in audit log" do
      tier5.save!

      expect {
        tier5.approve!(admin: admin, notes: "Approved")
      }.to change { AuditLog.count }.by(1)

      log = AuditLog.last
      expect(log.action).to eq("tier5_approved")
      expect(log.admin).to eq(admin)
    end
  end

  describe "#reject!" do
    it "rejects verification and notifies user" do
      tier5.save!

      expect {
        tier5.reject!(admin: admin, reason: "ID photo does not match")
      }.to change { tier5.verification_status }.from("pending").to("rejected")

      expect(tier5.rejection_reason).to eq("ID photo does not match")
    end
  end
end
```

---

## Related Documentation

- [Data Models](data_models.md) - Database schema for Tier 5
- [VIP Application Workflow](vip_application_workflow.md) - VIP application process
- [VIP Coordination](../Admin%20System/vip_coordination.md) - Operations guide
- [Tier System](../Global%20Context/tier_system.md) - Tier definitions

---

**Document Owner:** Engineering Lead & Security Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Before Tier 5 implementation

**Status:** ✅ Production-Ready Specification

**Classification:** Sensitive Security Implementation
