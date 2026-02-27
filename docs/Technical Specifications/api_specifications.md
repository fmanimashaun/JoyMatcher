# RESTful API Specifications — Mobile App & Third-Party Integration

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Production-Ready Specification
**Classification:** Technical Reference

---

## Overview

This document specifies the complete RESTful API for JoyMatcher's mobile applications (iOS and Android) and potential third-party integrations. The API follows REST principles, uses JSON for data exchange, and implements JWT-based authentication.

**Base URL:**
- **Production:** `https://api.joymatcher.com/v1`
- **Staging:** `https://api.staging.joymatcher.com/v1`
- **Development:** `http://localhost:3000/v1`

---

## API Design Principles

### 1. RESTful Resource Design
- **Resources are nouns** (not verbs): `/users`, `/interests`, `/conversations`
- **HTTP methods for actions:** GET (read), POST (create), PATCH (update), DELETE (delete)
- **Nested resources:** `/conversations/:id/messages`
- **Versioning:** `/v1/` prefix for all endpoints

### 2. Response Format
- **JSON only** (no XML)
- **Consistent structure:**
  ```json
  {
    "data": { ... },
    "meta": { "page": 1, "total": 100 },
    "errors": []
  }
  ```

### 3. Error Handling
- **Standard HTTP status codes**
- **Consistent error format:**
  ```json
  {
    "errors": [
      {
        "code": "validation_error",
        "message": "Email has already been taken",
        "field": "email"
      }
    ]
  }
  ```

### 4. Security
- **JWT authentication** (Bearer token)
- **HTTPS only** (no HTTP in production)
- **Rate limiting** (per IP and per user)
- **CORS enabled** (for web apps)

---

## Authentication

### JWT Token Authentication

**All API requests (except auth endpoints) require a JWT token in the `Authorization` header:**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Structure

```json
{
  "user_id": 12345,
  "email": "user@example.com",
  "subscription": "premium",
  "max_completed_tier": 3,
  "exp": 1709596800,
  "iat": 1709510400
}
```

**Token Expiry:**
- **Access Token:** 24 hours
- **Refresh Token:** 30 days

---

## 1. Authentication Endpoints

### 1.1 Sign Up (Create User)

**Endpoint:** `POST /auth/signup`

**Description:** Creates a new user account.

**Request Body:**
```json
{
  "user": {
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "password_confirmation": "SecurePassword123!",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "1990-05-15",
    "gender": "male",
    "country_code": "NG"
  }
}
```

**Validation Rules:**
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
- `password_confirmation`: Must match password
- `first_name`, `last_name`: Required, 2-50 characters
- `date_of_birth`: Required, user must be 18+
- `gender`: Required, one of ["male", "female", "other"]
- `country_code`: Required, valid ISO 3166-1 alpha-2 code

**Response (201 Created):**
```json
{
  "data": {
    "user": {
      "id": 12345,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "display_name": "John D.",
      "age": 35,
      "gender": "male",
      "subscription": "free",
      "max_completed_tier": 0,
      "verified": false,
      "country_code": "NG",
      "currency": "NGN",
      "created_at": "2026-02-27T10:30:00Z"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 86400
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
      "message": "Email has already been taken",
      "field": "email"
    },
    {
      "code": "validation_error",
      "message": "Password is too short (minimum is 8 characters)",
      "field": "password"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X POST https://api.joymatcher.com/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "user@example.com",
      "password": "SecurePassword123!",
      "password_confirmation": "SecurePassword123!",
      "first_name": "John",
      "last_name": "Doe",
      "date_of_birth": "1990-05-15",
      "gender": "male",
      "country_code": "NG"
    }
  }'
```

---

### 1.2 Sign In (Login)

**Endpoint:** `POST /auth/login`

**Description:** Authenticates a user and returns JWT tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "user": {
      "id": 12345,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "display_name": "John D.",
      "subscription": "premium",
      "max_completed_tier": 3,
      "verified": false,
      "last_active_at": "2026-02-27T10:30:00Z"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 86400
    }
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "errors": [
    {
      "code": "invalid_credentials",
      "message": "Invalid email or password"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X POST https://api.joymatcher.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```

---

### 1.3 Refresh Token

**Endpoint:** `POST /auth/refresh`

**Description:** Refreshes an expired access token using a refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "data": {
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 86400
    }
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "errors": [
    {
      "code": "invalid_refresh_token",
      "message": "Refresh token is invalid or expired"
    }
  ]
}
```

---

### 1.4 Logout

**Endpoint:** `DELETE /auth/logout`

**Description:** Invalidates the current access token.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (204 No Content):**
```
(Empty response body)
```

---

## 2. Profile Endpoints

### 2.1 Get Current User Profile

**Endpoint:** `GET /profile`

**Description:** Returns the authenticated user's complete profile.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "data": {
    "user": {
      "id": 12345,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "display_name": "John D.",
      "age": 35,
      "gender": "male",
      "subscription": "premium",
      "max_completed_tier": 3,
      "verified": false,
      "country_code": "NG",
      "currency": "NGN",
      "profile_visible": true,
      "last_active_at": "2026-02-27T10:30:00Z",
      "created_at": "2025-12-01T08:00:00Z",
      "photos": [
        {
          "id": 1,
          "url": "https://cdn.joymatcher.com/photos/12345/photo1.jpg",
          "thumbnail_url": "https://cdn.joymatcher.com/photos/12345/photo1_thumb.jpg",
          "primary": true
        },
        {
          "id": 2,
          "url": "https://cdn.joymatcher.com/photos/12345/photo2.jpg",
          "thumbnail_url": "https://cdn.joymatcher.com/photos/12345/photo2_thumb.jpg",
          "primary": false
        }
      ],
      "tier1_data": {
        "display_name": "John D.",
        "age": 35,
        "gender": "male",
        "city": "Lagos",
        "state_province": "Lagos State",
        "country": "Nigeria",
        "faith_orientation": "christian",
        "relationship_intent": "marriage_1_2_years"
      },
      "tier2_data": {
        "height_cm": 180,
        "body_type": "athletic",
        "education_level": "masters",
        "field_of_study": "Computer Science",
        "employment_status": "employed",
        "occupation_category": "tech",
        "industry": "Software Development",
        "work_mode": "remote",
        "smoking": "never",
        "alcohol": "socially",
        "exercise_frequency": "3_5_week",
        "languages": ["english", "yoruba"]
      },
      "tier3_data": {
        "marital_history": "never_married",
        "number_of_children": 0,
        "willingness_to_have_children": "want_children",
        "marriage_timeline_expectation": "within_1_2_years",
        "family_involvement_expectations": "I value family but believe in healthy boundaries...",
        "family_deal_breakers": "Must respect my partner's autonomy..."
      }
    }
  }
}
```

**cURL Example:**
```bash
curl -X GET https://api.joymatcher.com/v1/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 2.2 Update Profile

**Endpoint:** `PATCH /profile`

**Description:** Updates the authenticated user's profile (non-tier fields only).

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "user": {
    "display_name": "John Doe",
    "profile_visible": false
  }
}
```

**Updatable Fields:**
- `display_name`
- `profile_visible` (VIP only)

**Response (200 OK):**
```json
{
  "data": {
    "user": {
      "id": 12345,
      "display_name": "John Doe",
      "profile_visible": false,
      "updated_at": "2026-02-27T11:00:00Z"
    }
  }
}
```

---

### 2.3 Get Other User Profile

**Endpoint:** `GET /users/:id`

**Description:** Returns another user's profile, respecting EDT visibility rules.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "data": {
    "user": {
      "id": 67890,
      "display_name": "Jane S.",
      "age": 32,
      "gender": "female",
      "subscription": "premium",
      "verified": false,
      "last_active_at": "2026-02-27T09:00:00Z",
      "photos": [
        {
          "id": 10,
          "url": "https://cdn.joymatcher.com/photos/67890/photo1.jpg",
          "thumbnail_url": "https://cdn.joymatcher.com/photos/67890/photo1_thumb.jpg",
          "primary": true
        }
      ],
      "tier1_data": {
        "display_name": "Jane S.",
        "age": 32,
        "gender": "female",
        "city": "Abuja",
        "country": "Nigeria",
        "faith_orientation": "christian",
        "relationship_intent": "long_term_leading_to_marriage"
      },
      "tier2_data": null,
      "tier3_data": null,
      "relationship": {
        "edt": 1,
        "shared_tier_by_me": 1,
        "shared_tier_by_them": 1,
        "status": "none"
      }
    }
  }
}
```

**Note:** `tier2_data` and `tier3_data` are `null` because EDT = 1. User must request tier access to see deeper data.

**Error Response (404 Not Found):**
```json
{
  "errors": [
    {
      "code": "not_found",
      "message": "User not found"
    }
  ]
}
```

---

### 2.4 Upload Photos

**Endpoint:** `POST /profile/photos`

**Description:** Uploads a profile photo (multipart form data).

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body:**
```
photo: (binary file data)
primary: true
```

**Response (201 Created):**
```json
{
  "data": {
    "photo": {
      "id": 3,
      "url": "https://cdn.joymatcher.com/photos/12345/photo3.jpg",
      "thumbnail_url": "https://cdn.joymatcher.com/photos/12345/photo3_thumb.jpg",
      "primary": true,
      "created_at": "2026-02-27T11:30:00Z"
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
      "message": "Maximum 6 photos allowed",
      "field": "photos"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X POST https://api.joymatcher.com/v1/profile/photos \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "photo=@/path/to/photo.jpg" \
  -F "primary=true"
```

---

## 3. Tier Completion Endpoints

### 3.1 Get Tier Progress

**Endpoint:** `GET /tiers/progress`

**Description:** Returns the user's tier completion progress.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "data": {
    "progress": {
      "max_completed_tier": 3,
      "max_accessible_tier": 4,
      "subscription": "premium",
      "tiers": [
        {
          "tier_number": 1,
          "completed": true,
          "completed_at": "2025-12-01T10:00:00Z",
          "accessible": true
        },
        {
          "tier_number": 2,
          "completed": true,
          "completed_at": "2025-12-15T14:30:00Z",
          "accessible": true
        },
        {
          "tier_number": 3,
          "completed": true,
          "completed_at": "2026-01-20T09:15:00Z",
          "accessible": true
        },
        {
          "tier_number": 4,
          "completed": false,
          "completed_at": null,
          "accessible": true
        },
        {
          "tier_number": 5,
          "completed": false,
          "completed_at": null,
          "accessible": false
        }
      ]
    }
  }
}
```

---

### 3.2 Complete Tier 1

**Endpoint:** `POST /tiers/1/complete`

**Description:** Completes Tier 1 (Identity & Intent).

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "tier1": {
    "display_name": "John D.",
    "date_of_birth": "1990-05-15",
    "gender": "male",
    "city": "Lagos",
    "state_province": "Lagos State",
    "country": "Nigeria",
    "faith_orientation": "christian",
    "relationship_intent": "marriage_1_2_years",
    "liveness_check_video_url": "https://cdn.joymatcher.com/liveness/12345.mp4"
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "tier1": {
      "completed": true,
      "completed_at": "2026-02-27T12:00:00Z",
      "data": {
        "display_name": "John D.",
        "age": 35,
        "gender": "male",
        "city": "Lagos",
        "country": "Nigeria",
        "faith_orientation": "christian",
        "relationship_intent": "marriage_1_2_years"
      }
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
      "message": "Liveness check failed",
      "field": "liveness_check"
    }
  ]
}
```

---

### 3.3 Complete Tier 2

**Endpoint:** `POST /tiers/2/complete`

**Description:** Completes Tier 2 (Lifestyle Compatibility).

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "tier2": {
    "height_cm": 180,
    "body_type": "athletic",
    "education_level": "masters",
    "field_of_study": "Computer Science",
    "employment_status": "employed",
    "occupation_category": "tech",
    "industry": "Software Development",
    "work_mode": "remote",
    "smoking": "never",
    "alcohol": "socially",
    "exercise_frequency": "3_5_week",
    "languages": ["english", "yoruba"]
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "tier2": {
      "completed": true,
      "completed_at": "2026-02-27T12:30:00Z"
    }
  }
}
```

---

### 3.4 Complete Tier 3

**Endpoint:** `POST /tiers/3/complete`

**Description:** Completes Tier 3 (Relationship & Family Readiness). **Requires Premium or VIP subscription.**

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "tier3": {
    "marital_history": "never_married",
    "number_of_children": 0,
    "willingness_to_have_children": "want_children",
    "marriage_timeline_expectation": "within_1_2_years",
    "family_involvement_expectations": "I value family but believe in healthy boundaries...",
    "family_deal_breakers": "Must respect my partner's autonomy..."
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "tier3": {
      "completed": true,
      "completed_at": "2026-02-27T13:00:00Z"
    }
  }
}
```

**Error Response (403 Forbidden):**
```json
{
  "errors": [
    {
      "code": "subscription_required",
      "message": "Premium or VIP subscription required to complete Tier 3",
      "required_subscription": "premium"
    }
  ]
}
```

---

### 3.5 Complete Tier 4

**Endpoint:** `POST /tiers/4/complete`

**Description:** Completes Tier 4 (Health & Long-Term Compatibility). **Requires Premium or VIP subscription.**

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "tier4": {
    "genotype": "AA",
    "blood_group": "O+",
    "health_conditions": ["none"],
    "fertility_related_disclosures": "no_known_issues",
    "health_lifestyle_factors": ["regular_checkups", "active_lifestyle"],
    "non_negotiable_religion": "open_to_interfaith",
    "non_negotiable_relocation": "open_to_relocation",
    "non_negotiable_children": "must_have_children",
    "health_disclaimer_accepted": true
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "tier4": {
      "completed": true,
      "completed_at": "2026-02-27T13:30:00Z"
    }
  }
}
```

---

## 4. Interest Endpoints (Show Interest)

### 4.1 Get Received Interests

**Endpoint:** `GET /interests/received`

**Description:** Returns interests received by the authenticated user.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
- `status` (optional): Filter by status ("pending", "accepted", "declined")
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Results per page (default: 20, max: 100)

**Response (200 OK):**
```json
{
  "data": {
    "interests": [
      {
        "id": 1001,
        "sender": {
          "id": 67890,
          "display_name": "Jane S.",
          "age": 32,
          "gender": "female",
          "city": "Abuja",
          "country": "Nigeria",
          "verified": false,
          "photos": [
            {
              "url": "https://cdn.joymatcher.com/photos/67890/photo1.jpg",
              "thumbnail_url": "https://cdn.joymatcher.com/photos/67890/photo1_thumb.jpg"
            }
          ]
        },
        "status": "pending",
        "created_at": "2026-02-27T10:00:00Z",
        "tier_warning": {
          "sender_max_tier": 2,
          "receiver_max_tier": 3,
          "edt_if_accepted": 2
        }
      }
    ]
  },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 5,
    "total_pages": 1
  }
}
```

**cURL Example:**
```bash
curl -X GET "https://api.joymatcher.com/v1/interests/received?status=pending&page=1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 4.2 Get Sent Interests

**Endpoint:** `GET /interests/sent`

**Description:** Returns interests sent by the authenticated user.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
- `status` (optional): Filter by status ("pending", "accepted", "declined")
- `page` (optional): Page number
- `per_page` (optional): Results per page

**Response (200 OK):**
```json
{
  "data": {
    "interests": [
      {
        "id": 2001,
        "receiver": {
          "id": 11111,
          "display_name": "Sarah M.",
          "age": 30,
          "city": "Lagos",
          "verified": true
        },
        "status": "accepted",
        "created_at": "2026-02-20T08:00:00Z",
        "responded_at": "2026-02-21T14:30:00Z"
      }
    ]
  },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 3,
    "total_pages": 1
  }
}
```

---

### 4.3 Send Show Interest

**Endpoint:** `POST /interests`

**Description:** Sends a "Show Interest" request to another user.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "interest": {
    "receiver_id": 67890,
    "tier_warning_acknowledged": true
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "interest": {
      "id": 3001,
      "receiver": {
        "id": 67890,
        "display_name": "Jane S."
      },
      "status": "pending",
      "created_at": "2026-02-27T14:00:00Z",
      "tier_warning": {
        "sender_max_tier": 3,
        "receiver_max_tier": 2,
        "edt_if_accepted": 2
      }
    }
  }
}
```

**Error Response (403 Forbidden):**
```json
{
  "errors": [
    {
      "code": "cooldown_active",
      "message": "You must wait 3 months before showing interest again",
      "retry_after": "2026-05-27T14:00:00Z"
    }
  ]
}
```

**Error Response (422 Unprocessable Entity):**
```json
{
  "errors": [
    {
      "code": "subscription_mismatch",
      "message": "Premium users cannot send interest to VIP users"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X POST https://api.joymatcher.com/v1/interests \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "interest": {
      "receiver_id": 67890,
      "tier_warning_acknowledged": true
    }
  }'
```

---

### 4.4 Accept Interest

**Endpoint:** `PATCH /interests/:id/accept`

**Description:** Accepts a received interest. Creates a conversation.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "data": {
    "interest": {
      "id": 1001,
      "status": "accepted",
      "responded_at": "2026-02-27T14:30:00Z"
    },
    "conversation": {
      "id": 5001,
      "participants": [12345, 67890],
      "created_at": "2026-02-27T14:30:00Z"
    }
  }
}
```

---

### 4.5 Decline Interest

**Endpoint:** `PATCH /interests/:id/decline`

**Description:** Declines a received interest. Enforces 3-month cooldown for sender.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "data": {
    "interest": {
      "id": 1001,
      "status": "declined",
      "responded_at": "2026-02-27T14:30:00Z"
    }
  }
}
```

---

## 5. Conversation & Messaging Endpoints

### 5.1 Get Conversations

**Endpoint:** `GET /conversations`

**Description:** Returns all conversations for the authenticated user.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
- `page` (optional): Page number
- `per_page` (optional): Results per page

**Response (200 OK):**
```json
{
  "data": {
    "conversations": [
      {
        "id": 5001,
        "other_participant": {
          "id": 67890,
          "display_name": "Jane S.",
          "age": 32,
          "photos": [
            {
              "url": "https://cdn.joymatcher.com/photos/67890/photo1_thumb.jpg"
            }
          ]
        },
        "latest_message": {
          "id": 10001,
          "content": "Hi! Thanks for accepting my interest.",
          "sender_id": 67890,
          "created_at": "2026-02-27T14:35:00Z",
          "read_at": null
        },
        "unread_count": 1,
        "last_message_at": "2026-02-27T14:35:00Z",
        "created_at": "2026-02-27T14:30:00Z"
      }
    ]
  },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 1,
    "total_pages": 1
  }
}
```

**cURL Example:**
```bash
curl -X GET "https://api.joymatcher.com/v1/conversations?page=1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 5.2 Get Conversation Messages

**Endpoint:** `GET /conversations/:id/messages`

**Description:** Returns messages for a specific conversation.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
- `page` (optional): Page number
- `per_page` (optional): Results per page (default: 50, max: 100)
- `before` (optional): Fetch messages before this timestamp (for pagination)

**Response (200 OK):**
```json
{
  "data": {
    "messages": [
      {
        "id": 10001,
        "conversation_id": 5001,
        "sender": {
          "id": 67890,
          "display_name": "Jane S."
        },
        "content": "Hi! Thanks for accepting my interest.",
        "created_at": "2026-02-27T14:35:00Z",
        "read_at": null,
        "delivered_at": "2026-02-27T14:35:01Z"
      },
      {
        "id": 10002,
        "conversation_id": 5001,
        "sender": {
          "id": 12345,
          "display_name": "John D."
        },
        "content": "Hi Jane! Nice to connect with you.",
        "created_at": "2026-02-27T14:40:00Z",
        "read_at": "2026-02-27T14:40:30Z",
        "delivered_at": "2026-02-27T14:40:01Z"
      }
    ]
  },
  "meta": {
    "page": 1,
    "per_page": 50,
    "total": 2,
    "total_pages": 1
  }
}
```

**cURL Example:**
```bash
curl -X GET "https://api.joymatcher.com/v1/conversations/5001/messages?page=1&per_page=50" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 5.3 Send Message

**Endpoint:** `POST /conversations/:id/messages`

**Description:** Sends a message in a conversation.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "message": {
    "content": "How has your day been?"
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "message": {
      "id": 10003,
      "conversation_id": 5001,
      "sender": {
        "id": 12345,
        "display_name": "John D."
      },
      "content": "How has your day been?",
      "created_at": "2026-02-27T15:00:00Z",
      "read_at": null,
      "delivered_at": "2026-02-27T15:00:01Z"
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
      "message": "Content is too long (maximum is 1000 characters)",
      "field": "content"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X POST https://api.joymatcher.com/v1/conversations/5001/messages \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "content": "How has your day been?"
    }
  }'
```

---

### 5.4 Mark Messages as Read

**Endpoint:** `PATCH /conversations/:id/mark_as_read`

**Description:** Marks all messages in a conversation as read.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "data": {
    "conversation": {
      "id": 5001,
      "unread_count": 0
    }
  }
}
```

---

## 6. VIP Endpoints

### 6.1 Submit VIP Application

**Endpoint:** `POST /vip/applications`

**Description:** Submits a VIP application (18 questions). **Requires Tier 4 completion.**

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "vip_application": {
    "responses": {
      "question_1": "I'm ready for marriage now because...",
      "question_2": "A successful marriage looks like...",
      "question_3": "I handle conflict by...",
      "question_4": "My non-negotiable values are...",
      "question_5": "I balance marriage and career by...",
      "question_6": "My timeline is engagement in 1 year, marriage in 2 years...",
      "question_7": "My ideal partner is someone who...",
      "question_8": "Most important qualities: emotional intelligence, kindness, ambition...",
      "question_9": "Deal-breakers: dishonesty, lack of ambition, closed-mindedness...",
      "question_10": "Age range: 32-38",
      "question_11": "Relocation: Yes, I'm open to relocating...",
      "question_12": "From past relationships I've learned...",
      "question_13": "Patterns I want to break: rushing into commitment without...",
      "question_14": "Emotional growth: therapy, self-reflection, reading...",
      "question_15": "I expect personalized, quality introductions...",
      "question_16": "Involvement: Monthly check-ins, coaching as needed...",
      "question_17": "I'll know a match is right when...",
      "question_18": "Introductions per month: 2-3 high-quality matches"
    }
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "vip_application": {
      "id": 7001,
      "status": "pending",
      "submitted_at": "2026-02-27T16:00:00Z",
      "estimated_review_time": "24-48 hours"
    }
  }
}
```

**Error Response (403 Forbidden):**
```json
{
  "errors": [
    {
      "code": "tier_4_required",
      "message": "You must complete Tier 4 before applying for VIP"
    }
  ]
}
```

---

### 6.2 Get VIP Application Status

**Endpoint:** `GET /vip/application`

**Description:** Returns the status of the user's VIP application.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "data": {
    "vip_application": {
      "id": 7001,
      "status": "approved",
      "submitted_at": "2026-02-27T16:00:00Z",
      "reviewed_at": "2026-02-28T10:00:00Z",
      "review_score": 4.8,
      "next_step": "complete_tier5_verification"
    }
  }
}
```

**Response (200 OK - Rejected):**
```json
{
  "data": {
    "vip_application": {
      "id": 7001,
      "status": "rejected",
      "submitted_at": "2026-02-27T16:00:00Z",
      "reviewed_at": "2026-02-28T10:00:00Z",
      "rejection_reason": "Your application responses suggest you're still exploring what you want...",
      "can_reapply_at": "2026-05-28T00:00:00Z"
    }
  }
}
```

---

### 6.3 Get VIP Expert Details

**Endpoint:** `GET /vip/expert`

**Description:** Returns details of the user's assigned VIP expert.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "data": {
    "expert": {
      "id": 8001,
      "first_name": "Chiamaka",
      "last_name": "Nwosu",
      "specialization": "Christian professionals in Lagos",
      "experience_years": 3,
      "success_rate": 0.74,
      "bio": "I help serious professionals find meaningful, marriage-focused relationships...",
      "photo_url": "https://cdn.joymatcher.com/experts/8001.jpg"
    },
    "assignment": {
      "assigned_at": "2026-02-28T12:00:00Z",
      "expires_at": "2026-05-28T23:59:59Z",
      "onboarding_completed": true,
      "onboarding_completed_at": "2026-03-01T10:00:00Z"
    }
  }
}
```

---

## 7. Pagination, Filtering & Sorting

### Pagination Parameters

All list endpoints support pagination:

```
?page=1&per_page=20
```

**Response Meta:**
```json
{
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

### Filtering

Use query parameters for filtering:

```
GET /interests/received?status=pending
GET /users?subscription=premium&verified=true
```

### Sorting

Use `sort_by` and `order` parameters:

```
GET /conversations?sort_by=last_message_at&order=desc
GET /users?sort_by=created_at&order=asc
```

---

## 8. Error Responses

### Standard Error Format

```json
{
  "errors": [
    {
      "code": "error_code",
      "message": "Human-readable error message",
      "field": "field_name"
    }
  ]
}
```

### Error Codes

| HTTP Status | Code | Description |
|-------------|------|-------------|
| 400 | `bad_request` | Malformed request syntax |
| 401 | `unauthorized` | Missing or invalid authentication token |
| 401 | `invalid_credentials` | Invalid email or password |
| 401 | `token_expired` | JWT token has expired |
| 403 | `forbidden` | User does not have permission |
| 403 | `subscription_required` | Feature requires higher subscription |
| 403 | `cooldown_active` | Action blocked by cooldown period |
| 404 | `not_found` | Resource not found |
| 422 | `validation_error` | Request validation failed |
| 422 | `subscription_mismatch` | Subscription level mismatch |
| 429 | `rate_limit_exceeded` | Too many requests |
| 500 | `internal_server_error` | Server error |

---

## 9. Rate Limiting

### Rate Limit Headers

All API responses include rate limit headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1709596800
```

### Rate Limits (per hour)

| Endpoint Type | Free | Premium | VIP |
|---------------|------|---------|-----|
| Authentication | 10 | 10 | 10 |
| Profile Read | 100 | 500 | 1000 |
| Profile Update | 10 | 50 | 100 |
| Interests | 10 | 50 | Unlimited |
| Messages | 50 | 500 | Unlimited |

**Response (429 Too Many Requests):**
```json
{
  "errors": [
    {
      "code": "rate_limit_exceeded",
      "message": "Rate limit exceeded. Try again in 45 minutes.",
      "retry_after": 1709596800
    }
  ]
}
```

---

## 10. WebSocket Events (Real-Time)

### Connect to WebSocket

**URL:** `wss://api.joymatcher.com/cable`

**Authentication:**
```json
{
  "command": "subscribe",
  "identifier": "{\"channel\":\"ConversationChannel\",\"conversation_id\":5001}",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Real-Time Events

**New Message:**
```json
{
  "type": "message",
  "data": {
    "id": 10005,
    "conversation_id": 5001,
    "sender_id": 67890,
    "content": "Hello!",
    "created_at": "2026-02-27T16:00:00Z"
  }
}
```

**Typing Indicator:**
```json
{
  "type": "typing",
  "data": {
    "user_id": 67890,
    "typing": true
  }
}
```

**Presence (Online/Offline):**
```json
{
  "type": "presence",
  "data": {
    "user_id": 67890,
    "status": "online"
  }
}
```

---

## Related Documentation

- [Data Models](data_models.md) - Complete database schema
- [Rails Architecture](rails_architecture.md) - Backend implementation
- [VIP Application Workflow](vip_application_workflow.md) - VIP technical flow
- [Tier System](../Global%20Context/tier_system.md) - Tier definitions

---

**Document Owner:** API Lead Engineer
**Last Reviewed:** 2026-02-27
**Next Review:** Before mobile app development begins

**Status:** ✅ Production-Ready Specification
