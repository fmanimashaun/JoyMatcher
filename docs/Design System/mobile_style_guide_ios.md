# JoyMatcher Mobile Style Guide — iOS (Human Interface Guidelines)

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Production-Ready
**Target:** iOS 15+ (iPhone, iPad)
**Framework:** SwiftUI + UIKit
**Design Language:** Human Interface Guidelines with JoyMatcher Brand Identity

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Human Interface Guidelines Adaptation](#2-human-interface-guidelines-adaptation)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Component Specifications](#5-component-specifications)
6. [Navigation Architecture](#6-navigation-architecture)
7. [Spacing and Layout](#7-spacing-and-layout)
8. [Safe Areas and Insets](#8-safe-areas-and-insets)
9. [Haptic Feedback](#9-haptic-feedback)
10. [SF Symbols](#10-sf-symbols)
11. [Dark Mode](#11-dark-mode)
12. [Accessibility](#12-accessibility)
13. [Animation and Transitions](#13-animation-and-transitions)
14. [Screen-Specific Layouts](#14-screen-specific-layouts)
15. [Tier System UI Patterns](#15-tier-system-ui-patterns)
16. [Show Interest Flow](#16-show-interest-flow)
17. [EDT Calculation UI](#17-edt-calculation-ui)

---

## 1. Introduction

### Purpose

This guide provides comprehensive iOS-native design specifications for JoyMatcher, adapted from Apple's Human Interface Guidelines while maintaining brand consistency with our trust-based matchmaking philosophy.

### Design Philosophy

**JoyMatcher is NOT a dating app.** It is structured relationship infrastructure for marriage-minded professionals. Our iOS design reflects:

- **Native iOS Patterns** with Apple platform conventions
- **Professional & Purposeful** UI (not playful or gamified)
- **Trust-Based Architecture** with clear tier visibility indicators
- **Premium Feel** through refined typography and spacing
- **Accessibility First** with VoiceOver and Dynamic Type support

### Human Interface Guidelines Principles

1. **Clarity** — Clear hierarchy and obvious touchable elements
2. **Deference** — Content takes priority over UI chrome
3. **Depth** — Visual layers convey hierarchy and functionality

---

## 2. Human Interface Guidelines Adaptation

### JoyMatcher Brand in iOS Ecosystem

We adapt iOS native patterns to reflect JoyMatcher's identity while respecting platform conventions.

```swift
// Theme.swift - iOS Color Scheme adapted for JoyMatcher

import SwiftUI

struct JoyMatcherTheme {
    // Apply theme to entire app
    static func configure() {
        // Navigation Bar Appearance
        let navigationBarAppearance = UINavigationBarAppearance()
        navigationBarAppearance.configureWithOpaqueBackground()
        navigationBarAppearance.backgroundColor = UIColor(JoyMatcherColors.background)
        navigationBarAppearance.titleTextAttributes = [
            .foregroundColor: UIColor(JoyMatcherColors.textPrimary),
            .font: UIFont(name: "Georgia-Bold", size: 17)!
        ]
        navigationBarAppearance.largeTitleTextAttributes = [
            .foregroundColor: UIColor(JoyMatcherColors.textPrimary),
            .font: UIFont(name: "Georgia-Bold", size: 34)!
        ]

        UINavigationBar.appearance().standardAppearance = navigationBarAppearance
        UINavigationBar.appearance().scrollEdgeAppearance = navigationBarAppearance
        UINavigationBar.appearance().compactAppearance = navigationBarAppearance

        // Tab Bar Appearance
        let tabBarAppearance = UITabBarAppearance()
        tabBarAppearance.configureWithOpaqueBackground()
        tabBarAppearance.backgroundColor = UIColor(JoyMatcherColors.surface)

        UITabBar.appearance().standardAppearance = tabBarAppearance
        UITabBar.appearance().scrollEdgeAppearance = tabBarAppearance

        // Tint Colors
        UIView.appearance(whenContainedInInstancesOf: [UIAlertController.self]).tintColor = UIColor(JoyMatcherColors.purpleDeep)
    }
}
```

### Design Token Mapping

| iOS Semantic Color | JoyMatcher Token | Hex Value | Usage |
|-------------------|------------------|-----------|-------|
| `tintColor` | Deep Purple | `#4D0052` | Primary actions, links |
| `label` | Deep Gray-Purple | `#261928` | Primary text |
| `secondaryLabel` | Medium Gray-Purple | `#6B7280` | Secondary text |
| `tertiaryLabel` | Light Gray-Purple | `#9CA3AF` | Tertiary text |
| `systemBackground` | White/Purple-tinted | `#FFFFFF` / `#F9F8FA` | Main backgrounds |
| `secondarySystemBackground` | Purple-tinted | `#F3F4F6` | Grouped backgrounds |
| `systemFill` | Light Purple | `#E8E4F0` | Fill elements |

---

## 3. Color System

### 3.1 Brand Color Palette

```swift
// JoyMatcherColors.swift

import SwiftUI

struct JoyMatcherColors {
    // Primary Palette (Purple)
    static let purpleDeep = Color(hex: "4D0052")       // Logo start, primary base
    static let purpleDark = Color(hex: "6B0059")       // Hover, active states
    static let purple = Color(hex: "8B0061")           // Mid-tone
    static let purpleLight = Color(hex: "7D3365")      // Tinted backgrounds

    // Secondary Palette (Coral)
    static let coralDark = Color(hex: "C74F67")        // Accents
    static let coral = Color(hex: "F16A6F")            // Logo end, secondary actions
    static let coralLight = Color(hex: "F99095")       // Light accents
    static let coralVeryLight = Color(hex: "FFE8E9")   // Backgrounds

    // Neutral Palette (Purple-tinted grays)
    static let gray50 = Color(hex: "F9FAFB")
    static let gray100 = Color(hex: "F3F4F6")
    static let gray200 = Color(hex: "E5E7EB")
    static let gray300 = Color(hex: "D1D5DB")
    static let gray400 = Color(hex: "9CA3AF")
    static let gray500 = Color(hex: "6B7280")
    static let gray600 = Color(hex: "4B5563")
    static let gray700 = Color(hex: "374151")
    static let gray800 = Color(hex: "1F2937")
    static let gray900 = Color(hex: "111827")

    // Semantic Colors
    static let success = Color(hex: "10B981")          // Verification, completion
    static let successContainer = Color(hex: "E8E4F0") // Success backgrounds
    static let warning = Color(hex: "F59E0B")          // Tier warnings
    static let warningContainer = Color(hex: "FFF4E6")
    static let error = Color(hex: "EF4444")            // Validation errors
    static let errorContainer = Color(hex: "FFE8E9")
    static let info = Color(hex: "3B82F6")             // Informational states
    static let infoContainer = Color(hex: "E5E0F5")

    // iOS Semantic Colors (Light Mode)
    static let background = Color(hex: "F9F8FA")       // Purple-tinted white
    static let surface = Color.white
    static let textPrimary = Color(hex: "261928")      // Deep purple-black
    static let textSecondary = Color(hex: "6B7280")    // Medium gray
    static let textTertiary = Color(hex: "9CA3AF")     // Light gray

    // Brand Gradient
    static let brandGradient = LinearGradient(
        gradient: Gradient(colors: [purpleDeep, coral]),
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}

// Color extension for hex initialization
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
```

### 3.2 iOS Semantic Color Assets

Create color assets in `Assets.xcassets` for automatic dark mode support:

```
Colors.xcassets/
├── Primary/
│   └── Contents.json (Any: #4D0052, Dark: #B88FB8)
├── Secondary/
│   └── Contents.json (Any: #F16A6F, Dark: #E88A8F)
├── Background/
│   └── Contents.json (Any: #F9F8FA, Dark: #1A1218)
├── Surface/
│   └── Contents.json (Any: #FFFFFF, Dark: #1A1218)
└── TextPrimary/
    └── Contents.json (Any: #261928, Dark: #E8E0E5)
```

### 3.3 Subscription Tier Colors

```swift
// TierColors.swift

struct TierColors {
    static let free = JoyMatcherColors.gray400
    static let premium = JoyMatcherColors.purpleDeep
    static let vip = JoyMatcherColors.coral

    // Tier indicator backgrounds
    static let freeBg = JoyMatcherColors.gray200
    static let premiumBg = JoyMatcherColors.purpleLight.opacity(0.15)
    static let vipBg = JoyMatcherColors.coralVeryLight
}
```

---

## 4. Typography

### 4.1 Type Scale (iOS Native + Georgia)

JoyMatcher uses **Georgia Serif** for headings (brand identity) and **SF Pro** for body text (iOS native).

```swift
// JoyMatcherTypography.swift

import SwiftUI

struct JoyMatcherTypography {
    // Display - Hero headings (Georgia)
    static let displayLarge = Font.custom("Georgia-Bold", size: 57)
    static let displayMedium = Font.custom("Georgia-Bold", size: 45)
    static let displaySmall = Font.custom("Georgia-Bold", size: 36)

    // Headline - Section titles (Georgia)
    static let headlineLarge = Font.custom("Georgia-Bold", size: 32)
    static let headlineMedium = Font.custom("Georgia-Bold", size: 28)
    static let headlineSmall = Font.custom("Georgia-Bold", size: 24)

    // Title - Card/component titles (Georgia)
    static let titleLarge = Font.custom("Georgia-Bold", size: 22)
    static let titleMedium = Font.custom("Georgia-Bold", size: 16)
    static let titleSmall = Font.custom("Georgia", size: 14).weight(.medium)

    // Body - Content text (SF Pro - iOS system font)
    static let bodyLarge = Font.system(size: 17, weight: .regular)    // iOS standard body
    static let bodyMedium = Font.system(size: 15, weight: .regular)
    static let bodySmall = Font.system(size: 13, weight: .regular)

    // Label - Buttons, badges (SF Pro)
    static let labelLarge = Font.system(size: 17, weight: .semibold)
    static let labelMedium = Font.system(size: 15, weight: .semibold)
    static let labelSmall = Font.system(size: 13, weight: .medium)

    // Caption - Metadata (SF Pro)
    static let caption1 = Font.system(size: 12, weight: .regular)
    static let caption2 = Font.system(size: 11, weight: .regular)

    // Footnote (SF Pro)
    static let footnote = Font.system(size: 13, weight: .regular)

    // Callout (SF Pro)
    static let callout = Font.system(size: 16, weight: .regular)
}

// UIKit versions
struct JoyMatcherUIFonts {
    static let displayLarge = UIFont(name: "Georgia-Bold", size: 57)!
    static let headlineMedium = UIFont(name: "Georgia-Bold", size: 28)!
    static let titleLarge = UIFont(name: "Georgia-Bold", size: 22)!
    static let bodyLarge = UIFont.systemFont(ofSize: 17, weight: .regular)
    static let labelLarge = UIFont.systemFont(ofSize: 17, weight: .semibold)
}
```

### 4.2 Dynamic Type Support

All text should scale with user preferences:

```swift
// Dynamic Type scaling
Text("Profile Name")
    .font(JoyMatcherTypography.titleLarge)
    .dynamicTypeSize(.large...(.xxxLarge)) // Limit scaling range
    .lineLimit(2)
    .truncationMode(.tail)
```

### 4.3 Usage Guidelines

| Type Scale | Usage | Example |
|------------|-------|---------|
| `displayLarge` | Splash screens, onboarding | "Find Your Joy" |
| `displayMedium` | Hero sections | "Welcome to JoyMatcher" |
| `headlineMedium` | Screen titles | "Discover", "Messages" |
| `titleLarge` | Profile names | "Chidinma O., 32" |
| `titleMedium` | Card titles | "Tier 1: Identity & Intent" |
| `bodyLarge` | Primary content (17pt iOS standard) | Profile descriptions |
| `bodyMedium` | Secondary content | Metadata, timestamps |
| `labelLarge` | Primary buttons | "Show Interest" |
| `caption1` | Captions, helper text | "Updated 2 hours ago" |

---

## 5. Component Specifications

### 5.1 Buttons

#### Primary Button (Filled with Gradient)

```swift
// JMPrimaryButton.swift

import SwiftUI

struct JMPrimaryButton: View {
    let text: String
    let action: () -> Void
    var icon: String? = nil
    var isEnabled: Bool = true

    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 17, weight: .semibold))
                }
                Text(text)
                    .font(JoyMatcherTypography.labelLarge)
            }
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .frame(height: 50)
            .background(
                JoyMatcherColors.brandGradient
                    .opacity(isEnabled ? 1.0 : 0.5)
            )
            .cornerRadius(12)
            .shadow(color: Color.black.opacity(0.1), radius: 4, y: 2)
        }
        .disabled(!isEnabled)
        .buttonStyle(PressableButtonStyle())
    }
}

// Pressable button style for iOS feedback
struct PressableButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .opacity(configuration.isPressed ? 0.9 : 1.0)
            .animation(.easeOut(duration: 0.1), value: configuration.isPressed)
    }
}

// Usage
JMPrimaryButton(
    text: "Show Interest",
    action: { showInterest() },
    icon: "heart.fill"
)
```

#### Secondary Button (Outlined)

```swift
struct JMSecondaryButton: View {
    let text: String
    let action: () -> Void
    var icon: String? = nil
    var isEnabled: Bool = true

    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 17, weight: .semibold))
                }
                Text(text)
                    .font(JoyMatcherTypography.labelLarge)
            }
            .foregroundColor(isEnabled ? JoyMatcherColors.purpleDeep : JoyMatcherColors.gray400)
            .frame(maxWidth: .infinity)
            .frame(height: 50)
            .background(Color.white)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(isEnabled ? JoyMatcherColors.purpleDeep : JoyMatcherColors.gray300, lineWidth: 2)
            )
        }
        .disabled(!isEnabled)
        .buttonStyle(PressableButtonStyle())
    }
}
```

#### Tertiary Button (Text Only)

```swift
struct JMTertiaryButton: View {
    let text: String
    let action: () -> Void
    var icon: String? = nil

    var body: some View {
        Button(action: action) {
            HStack(spacing: 6) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 15, weight: .medium))
                }
                Text(text)
                    .font(JoyMatcherTypography.labelMedium)
            }
            .foregroundColor(JoyMatcherColors.purpleDeep)
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
        }
        .buttonStyle(PlainButtonStyle())
    }
}
```

### 5.2 Text Fields

```swift
// JMTextField.swift

struct JMTextField: View {
    let label: String
    @Binding var text: String
    var placeholder: String = ""
    var helperText: String = ""
    var errorMessage: String = ""
    var isError: Bool = false
    var icon: String? = nil
    var keyboardType: UIKeyboardType = .default

    @FocusState private var isFocused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(label)
                .font(JoyMatcherTypography.bodySmall)
                .foregroundColor(JoyMatcherColors.textSecondary)

            HStack {
                if let icon = icon {
                    Image(systemName: icon)
                        .foregroundColor(JoyMatcherColors.gray600)
                }

                TextField(placeholder, text: $text)
                    .font(JoyMatcherTypography.bodyLarge)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .keyboardType(keyboardType)
                    .focused($isFocused)
            }
            .padding()
            .background(Color.white)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(
                        isError ? JoyMatcherColors.error :
                        isFocused ? JoyMatcherColors.purpleDeep :
                        JoyMatcherColors.gray300,
                        lineWidth: 2
                    )
            )

            if isError && !errorMessage.isEmpty {
                Text(errorMessage)
                    .font(JoyMatcherTypography.caption1)
                    .foregroundColor(JoyMatcherColors.error)
            } else if !helperText.isEmpty {
                Text(helperText)
                    .font(JoyMatcherTypography.caption1)
                    .foregroundColor(JoyMatcherColors.textTertiary)
            }
        }
    }
}

// Usage
@State private var email = ""

JMTextField(
    label: "Email Address",
    text: $email,
    placeholder: "you@example.com",
    helperText: "We'll never share your email",
    icon: "envelope",
    keyboardType: .emailAddress
)
```

### 5.3 Cards

#### Profile Card

```swift
// ProfileCard.swift

struct ProfileCard: View {
    let profile: UserProfile
    let onShowInterest: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Profile Image
            ZStack(alignment: .topTrailing) {
                AsyncImage(url: URL(string: profile.photoURL)) { image in
                    image
                        .resizable()
                        .aspectRatio(3/4, contentMode: .fill)
                        .clipped()
                } placeholder: {
                    Color.gray.opacity(0.2)
                }
                .frame(height: 400)
                .cornerRadius(16)

                // Verified Badge
                if profile.isVerified {
                    HStack(spacing: 4) {
                        Image(systemName: "checkmark.seal.fill")
                            .font(.system(size: 10))
                        Text("Verified")
                            .font(JoyMatcherTypography.caption2)
                    }
                    .foregroundColor(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(JoyMatcherColors.success)
                    .cornerRadius(12)
                    .padding(12)
                }
            }

            // Profile Info
            VStack(alignment: .leading, spacing: 8) {
                Text("\(profile.firstName) \(profile.lastInitial)., \(profile.age)")
                    .font(JoyMatcherTypography.titleLarge)
                    .foregroundColor(JoyMatcherColors.textPrimary)

                HStack(spacing: 4) {
                    Image(systemName: "location.fill")
                        .font(.system(size: 12))
                        .foregroundColor(JoyMatcherColors.textSecondary)
                    Text("\(profile.city), \(profile.country)")
                        .font(JoyMatcherTypography.bodySmall)
                        .foregroundColor(JoyMatcherColors.textSecondary)
                }

                HStack(spacing: 4) {
                    Image(systemName: "briefcase.fill")
                        .font(.system(size: 12))
                        .foregroundColor(JoyMatcherColors.textSecondary)
                    Text(profile.occupation)
                        .font(JoyMatcherTypography.bodySmall)
                        .foregroundColor(JoyMatcherColors.textSecondary)
                }
            }
            .padding(.horizontal, 12)

            // Tier Progress
            TierProgressIndicator(
                currentTier: profile.maxCompletedTier,
                maxTier: 5
            )
            .padding(.horizontal, 12)

            // Action Button
            JMPrimaryButton(
                text: "Show Interest",
                action: onShowInterest
            )
            .padding(.horizontal, 12)
        }
        .padding(12)
        .background(Color.white)
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.1), radius: 8, y: 4)
    }
}
```

### 5.4 Badges and Chips

#### Subscription Badge

```swift
struct SubscriptionBadge: View {
    let subscription: String // "free", "premium", "vip"

    var badgeInfo: (backgroundColor: Color, textColor: Color, label: String) {
        switch subscription.lowercased() {
        case "premium":
            return (TierColors.premiumBg, TierColors.premium, "Premium")
        case "vip":
            return (TierColors.vipBg, TierColors.vip, "VIP")
        default:
            return (TierColors.freeBg, TierColors.free, "Free")
        }
    }

    var body: some View {
        Text(badgeInfo.label)
            .font(JoyMatcherTypography.caption2)
            .foregroundColor(badgeInfo.textColor)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(badgeInfo.backgroundColor)
            .cornerRadius(12)
    }
}
```

#### Tier Badge

```swift
struct TierBadge: View {
    let tier: Int

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: "shield.fill")
                .font(.system(size: 10))
            Text("Tier \(tier)")
                .font(JoyMatcherTypography.caption2)
        }
        .foregroundColor(JoyMatcherColors.purpleDeep)
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
        .background(JoyMatcherColors.purpleLight.opacity(0.15))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(JoyMatcherColors.purpleDeep.opacity(0.3), lineWidth: 1)
        )
    }
}
```

### 5.5 Progress Indicators

#### Tier Progress Bar

```swift
struct TierProgressIndicator: View {
    let currentTier: Int
    let maxTier: Int = 5

    var body: some View {
        VStack(spacing: 8) {
            HStack {
                Text("Tier Progress")
                    .font(JoyMatcherTypography.caption1)
                    .foregroundColor(JoyMatcherColors.textTertiary)
                Spacer()
                Text("Tier \(currentTier) Complete")
                    .font(JoyMatcherTypography.caption1)
                    .foregroundColor(JoyMatcherColors.purpleDeep)
            }

            ProgressView(value: Double(currentTier), total: Double(maxTier))
                .tint(JoyMatcherColors.purpleDeep)
                .frame(height: 8)
        }
    }
}
```

#### Loading Spinner

```swift
struct JMLoadingSpinner: View {
    var body: some View {
        ProgressView()
            .progressViewStyle(CircularProgressViewStyle(tint: JoyMatcherColors.purpleDeep))
            .scaleEffect(1.2)
    }
}
```

### 5.6 Sheets and Alerts

#### Bottom Sheet (Tier Awareness Warning)

```swift
// TierAwarenessSheet.swift

struct TierAwarenessSheet: View {
    let recipientName: String
    let recipientTier: Int
    let projectedEDT: Int
    let onConfirm: () -> Void
    let onDismiss: () -> Void

    @State private var acknowledged = false

    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                // Header
                HStack(spacing: 12) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .font(.system(size: 32))
                        .foregroundColor(JoyMatcherColors.warning)

                    Text("Tier Awareness")
                        .font(JoyMatcherTypography.headlineSmall)
                        .foregroundColor(JoyMatcherColors.textPrimary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)

                // Body
                Text("You are about to show interest in \(recipientName) who has completed Tier \(recipientTier).")
                    .font(JoyMatcherTypography.bodyMedium)
                    .foregroundColor(JoyMatcherColors.textSecondary)
                    .frame(maxWidth: .infinity, alignment: .leading)

                // EDT Projection
                VStack(spacing: 12) {
                    Text("If accepted, you will see:")
                        .font(JoyMatcherTypography.labelMedium)
                        .foregroundColor(JoyMatcherColors.textPrimary)
                        .frame(maxWidth: .infinity, alignment: .leading)

                    HStack {
                        Text("Effective Disclosure Tier (EDT)")
                            .font(JoyMatcherTypography.bodySmall)
                            .foregroundColor(JoyMatcherColors.textSecondary)
                        Spacer()
                        Text("Tier 1-\(projectedEDT)")
                            .font(JoyMatcherTypography.labelLarge)
                            .foregroundColor(JoyMatcherColors.purpleDeep)
                    }

                    ProgressView(value: Double(projectedEDT), total: 5.0)
                        .tint(JoyMatcherColors.purpleDeep)
                        .frame(height: 6)
                }
                .padding()
                .background(JoyMatcherColors.purpleLight.opacity(0.1))
                .cornerRadius(12)

                // Acknowledgment
                Toggle(isOn: $acknowledged) {
                    Text("I understand the tier limitations")
                        .font(JoyMatcherTypography.bodyMedium)
                        .foregroundColor(JoyMatcherColors.textSecondary)
                }
                .tint(JoyMatcherColors.purpleDeep)

                Spacer()

                // Action Buttons
                VStack(spacing: 12) {
                    JMPrimaryButton(
                        text: "Send Show Interest",
                        action: {
                            if acknowledged {
                                onConfirm()
                            }
                        },
                        isEnabled: acknowledged
                    )

                    JMSecondaryButton(
                        text: "Cancel",
                        action: onDismiss
                    )
                }
            }
            .padding(24)
            .navigationBarHidden(true)
        }
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
    }
}

// Usage
.sheet(isPresented: $showTierWarning) {
    TierAwarenessSheet(
        recipientName: "Chidinma",
        recipientTier: 3,
        projectedEDT: 2,
        onConfirm: { sendShowInterest() },
        onDismiss: { showTierWarning = false }
    )
}
```

#### Context Menu (Long Press)

```swift
// Context menu on profile card
ProfileCard(profile: profile)
    .contextMenu {
        Button {
            // Report action
        } label: {
            Label("Report User", systemImage: "exclamationmark.triangle")
        }

        Button(role: .destructive) {
            // Block action
        } label: {
            Label("Block User", systemImage: "hand.raised")
        }
    }
```

---

## 6. Navigation Architecture

### 6.1 Tab Bar (Bottom Navigation)

```swift
// MainTabView.swift

struct MainTabView: View {
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            DiscoverView()
                .tabItem {
                    Label("Discover", systemImage: "person.2.fill")
                }
                .tag(0)

            InterestsView()
                .tabItem {
                    Label("Interests", systemImage: "heart.fill")
                }
                .badge(3) // Notification badge
                .tag(1)

            MessagesView()
                .tabItem {
                    Label("Messages", systemImage: "message.fill")
                }
                .tag(2)

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.crop.circle.fill")
                }
                .tag(3)

            MoreView()
                .tabItem {
                    Label("More", systemImage: "ellipsis")
                }
                .tag(4)
        }
        .accentColor(JoyMatcherColors.purpleDeep)
    }
}
```

### 6.2 Navigation Bar

```swift
// JMNavigationBar.swift

struct JMNavigationBar: View {
    let title: String
    var onBack: (() -> Void)? = nil
    var actions: [NavBarAction] = []

    var body: some View {
        HStack {
            if let onBack = onBack {
                Button(action: onBack) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundColor(JoyMatcherColors.purpleDeep)
                }
            }

            Text(title)
                .font(JoyMatcherTypography.headlineSmall)
                .foregroundColor(JoyMatcherColors.textPrimary)

            Spacer()

            HStack(spacing: 16) {
                ForEach(actions) { action in
                    Button(action: action.action) {
                        Image(systemName: action.icon)
                            .font(.system(size: 17, weight: .semibold))
                            .foregroundColor(JoyMatcherColors.purpleDeep)
                    }
                }
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(Color.white)
    }
}

struct NavBarAction: Identifiable {
    let id = UUID()
    let icon: String
    let action: () -> Void
}

// Usage
NavigationView {
    VStack {
        JMNavigationBar(
            title: "Profile",
            onBack: { dismiss() },
            actions: [
                NavBarAction(icon: "ellipsis", action: { showMenu() })
            ]
        )

        // Content
    }
    .navigationBarHidden(true)
}
```

### 6.3 Large Title Navigation (iOS Native)

```swift
NavigationView {
    ScrollView {
        // Content
    }
    .navigationTitle("Discover")
    .navigationBarTitleDisplayMode(.large)
    .toolbar {
        ToolbarItem(placement: .navigationBarTrailing) {
            Button(action: { showFilters() }) {
                Image(systemName: "slider.horizontal.3")
                    .foregroundColor(JoyMatcherColors.purpleDeep)
            }
        }
    }
}
```

---

## 7. Spacing and Layout

### 7.1 Spacing System (8pt Grid)

```swift
// Spacing.swift

struct Spacing {
    static let xs: CGFloat = 4      // Extra tight
    static let sm: CGFloat = 8      // Tight spacing
    static let md: CGFloat = 12     // Small spacing
    static let lg: CGFloat = 16     // Standard spacing
    static let xl: CGFloat = 24     // Large spacing
    static let xxl: CGFloat = 32    // Extra large
    static let xxxl: CGFloat = 48   // Major sections
}
```

### 7.2 Layout Patterns

```swift
// Screen container with standard padding
struct ScreenContainer<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: Spacing.lg) {
                content
            }
            .padding(.horizontal, Spacing.lg)
            .padding(.vertical, Spacing.lg)
        }
    }
}

// Usage
ScreenContainer {
    Text("Welcome")
        .font(JoyMatcherTypography.headlineMedium)

    ProfileCard(profile: profile)
}
```

### 7.3 Grid Layout (iOS 16+)

```swift
// Card grid using LazyVGrid
ScrollView {
    LazyVGrid(
        columns: [
            GridItem(.adaptive(minimum: 160, maximum: 200))
        ],
        spacing: Spacing.lg
    ) {
        ForEach(profiles) { profile in
            ProfileCard(profile: profile, onShowInterest: {})
        }
    }
    .padding(Spacing.lg)
}
```

---

## 8. Safe Areas and Insets

### 8.1 Safe Area Handling

```swift
// Respect safe areas for notch and home indicator
VStack {
    // Content
}
.ignoresSafeArea(edges: .top) // Only ignore top if needed for full-bleed images
.safeAreaInset(edge: .bottom) {
    // Fixed bottom content (respects home indicator)
    JMPrimaryButton(text: "Continue", action: {})
        .padding()
        .background(Color.white)
}
```

### 8.2 Keyboard Avoidance

```swift
// Automatic keyboard avoidance
Form {
    // Text fields
}
.scrollDismissesKeyboard(.interactively) // iOS 16+

// Manual keyboard handling (iOS 15)
@FocusState private var focusedField: Field?

VStack {
    TextField("Email", text: $email)
        .focused($focusedField, equals: .email)
}
.toolbar {
    ToolbarItemGroup(placement: .keyboard) {
        Spacer()
        Button("Done") {
            focusedField = nil
        }
    }
}
```

---

## 9. Haptic Feedback

### 9.1 Haptic Patterns

```swift
// HapticManager.swift

import UIKit

class HapticManager {
    static let shared = HapticManager()

    private init() {}

    // Success haptic (tier completion, verification)
    func success() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }

    // Warning haptic (tier awareness, subscription gate)
    func warning() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.warning)
    }

    // Error haptic (validation errors, declined interest)
    func error() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.error)
    }

    // Selection haptic (button press, tab change)
    func selection() {
        let generator = UISelectionFeedbackGenerator()
        generator.selectionChanged()
    }

    // Impact haptic (card dismiss, sheet presentation)
    func impact(style: UIImpactFeedbackGenerator.FeedbackStyle = .medium) {
        let generator = UIImpactFeedbackGenerator(style: style)
        generator.impactOccurred()
    }
}

// Usage
Button("Show Interest") {
    HapticManager.shared.selection()
    showInterest()
}
```

### 9.2 Haptic Guidelines

| Action | Haptic Type | Usage |
|--------|-------------|-------|
| Button tap | Selection | All interactive buttons |
| Tier completed | Success | Tier completion confirmation |
| Show Interest sent | Impact (light) | Successful action |
| Show Interest declined | Warning | Negative feedback |
| Form error | Error | Validation failures |
| Sheet open/close | Impact (medium) | Modal transitions |
| Tab change | Selection | Bottom nav |

---

## 10. SF Symbols

### 10.1 Symbol Usage

```swift
// Standard SF Symbols
Image(systemName: "heart.fill")          // Show Interest
Image(systemName: "message.fill")        // Messages
Image(systemName: "person.2.fill")       // Discover
Image(systemName: "shield.fill")         // Tier verification
Image(systemName: "checkmark.seal.fill") // Verified badge
Image(systemName: "lock.fill")           // Locked tier
Image(systemName: "star.fill")           // Premium/VIP
Image(systemName: "location.fill")       // Location
Image(systemName: "briefcase.fill")      // Occupation
Image(systemName: "exclamationmark.triangle.fill") // Warning
```

### 10.2 Symbol Sizing

```swift
// Consistent sizing
Image(systemName: "heart.fill")
    .font(.system(size: 20, weight: .semibold))
    .foregroundColor(JoyMatcherColors.coral)

// Multicolor symbols (iOS 15+)
Image(systemName: "checkmark.seal.fill")
    .symbolRenderingMode(.multicolor)
    .font(.system(size: 24))
```

### 10.3 Custom Symbols

Create custom SF Symbols for brand-specific icons using SF Symbols app.

---

## 11. Dark Mode

### 11.1 Dark Color Scheme

```swift
// JoyMatcherColors+Dark.swift

extension JoyMatcherColors {
    // Dark mode specific colors
    static let darkBackground = Color(hex: "1A1218")
    static let darkSurface = Color(hex: "1A1218")
    static let darkTextPrimary = Color(hex: "E8E0E5")
    static let darkTextSecondary = Color(hex: "CCC4CF")

    // Adaptive color using Color Assets
    static let adaptiveBackground = Color("Background") // From Assets
    static let adaptiveSurface = Color("Surface")
    static let adaptiveTextPrimary = Color("TextPrimary")
}
```

### 11.2 Dark Mode Detection

```swift
@Environment(\.colorScheme) var colorScheme

var backgroundColor: Color {
    colorScheme == .dark ? JoyMatcherColors.darkBackground : JoyMatcherColors.background
}
```

### 11.3 Color Asset Configuration

Create color sets in `Assets.xcassets`:

```json
// Background.colorset/Contents.json
{
  "colors" : [
    {
      "color" : {
        "color-space" : "srgb",
        "components" : {
          "alpha" : "1.000",
          "blue" : "0.980",
          "green" : "0.973",
          "red" : "0.976"
        }
      },
      "idiom" : "universal"
    },
    {
      "appearances" : [
        {
          "appearance" : "luminosity",
          "value" : "dark"
        }
      ],
      "color" : {
        "color-space" : "srgb",
        "components" : {
          "alpha" : "1.000",
          "blue" : "0.094",
          "green" : "0.071",
          "red" : "0.102"
        }
      },
      "idiom" : "universal"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
```

---

## 12. Accessibility

### 12.1 Touch Targets

Minimum 44x44pt for all interactive elements (Apple standard).

```swift
Button("Like") {
    // Action
}
.frame(minWidth: 44, minHeight: 44)
```

### 12.2 VoiceOver Support

```swift
// Descriptive labels
Image(systemName: "heart.fill")
    .accessibilityLabel("Show interest")
    .accessibilityHint("Double tap to send interest to this profile")

// Custom actions
Button("Profile") {
    // action
}
.accessibilityLabel("View profile of Chidinma, age 32")
.accessibilityAddTraits(.isButton)

// Hide decorative elements
Image("decoration")
    .accessibilityHidden(true)
```

### 12.3 Dynamic Type Support

```swift
Text("Profile Name")
    .font(JoyMatcherTypography.titleLarge)
    .dynamicTypeSize(.large...(.xxxLarge)) // Limit scaling
    .lineLimit(2)
    .minimumScaleFactor(0.8) // Allow slight shrinking if needed
```

### 12.4 Color Contrast

All text meets WCAG 2.1 AA:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

### 12.5 Reduce Motion

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

var animation: Animation? {
    reduceMotion ? nil : .spring(response: 0.3, dampingFraction: 0.6)
}

Circle()
    .animation(animation, value: isAnimated)
```

---

## 13. Animation and Transitions

### 13.1 Spring Animations (iOS Native)

```swift
// Standard spring
withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
    opacity = 1.0
}

// Bouncy spring
withAnimation(.spring(response: 0.4, dampingFraction: 0.5)) {
    scale = 1.0
}

// Gentle spring
withAnimation(.spring(response: 0.5, dampingFraction: 0.8)) {
    offset = 0
}
```

### 13.2 View Transitions

```swift
// Fade transition
if showContent {
    ContentView()
        .transition(.opacity)
}

// Slide transition
if showSheet {
    SheetView()
        .transition(.move(edge: .bottom))
}

// Scale transition (modal)
if showModal {
    ModalView()
        .transition(.scale)
}

// Combined transition
ContentView()
    .transition(
        .asymmetric(
            insertion: .move(edge: .trailing).combined(with: .opacity),
            removal: .move(edge: .leading).combined(with: .opacity)
        )
    )
```

### 13.3 Animation Timing

```swift
struct AnimationDuration {
    static let fast: Double = 0.15      // Quick state changes
    static let medium: Double = 0.25    // Standard transitions
    static let slow: Double = 0.35      // Complex animations
}
```

---

## 14. Screen-Specific Layouts

### 14.1 Discover Screen

```swift
// DiscoverView.swift

struct DiscoverView: View {
    @StateObject private var viewModel = DiscoverViewModel()

    var body: some View {
        NavigationView {
            ScrollView {
                LazyVStack(spacing: Spacing.lg) {
                    ForEach(viewModel.profiles) { profile in
                        ProfileCard(
                            profile: profile,
                            onShowInterest: {
                                viewModel.showInterest(profile: profile)
                            }
                        )
                    }
                }
                .padding(Spacing.lg)
            }
            .navigationTitle("Discover")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        viewModel.showFilters()
                    } label: {
                        Image(systemName: "slider.horizontal.3")
                            .foregroundColor(JoyMatcherColors.purpleDeep)
                    }
                }
            }
        }
    }
}
```

### 14.2 Profile View Screen

```swift
// ProfileViewScreen.swift

struct ProfileViewScreen: View {
    let profile: UserProfile
    @State private var showTierWarning = false
    @StateObject private var viewModel: ProfileViewModel

    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header with photo
                ZStack(alignment: .bottom) {
                    AsyncImage(url: URL(string: profile.photoURL)) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Color.gray.opacity(0.2)
                    }
                    .frame(height: 500)
                    .clipped()

                    // Gradient overlay
                    LinearGradient(
                        gradient: Gradient(colors: [
                            Color.clear,
                            Color.black.opacity(0.7)
                        ]),
                        startPoint: .top,
                        endPoint: .bottom
                    )

                    // Profile info overlay
                    VStack(alignment: .leading, spacing: 8) {
                        Text("\(profile.firstName) \(profile.lastInitial)., \(profile.age)")
                            .font(JoyMatcherTypography.headlineMedium)
                            .foregroundColor(.white)

                        HStack(spacing: 8) {
                            SubscriptionBadge(subscription: profile.subscription)
                            TierBadge(tier: profile.maxCompletedTier)
                            if profile.isVerified {
                                VerifiedBadge()
                            }
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(24)
                }
                .ignoresSafeArea(edges: .top)

                VStack(spacing: Spacing.xl) {
                    // EDT Status
                    EDTStatusBanner(
                        currentEDT: viewModel.currentEDT,
                        maxPossibleEDT: profile.maxCompletedTier,
                        onRequestDetails: {
                            viewModel.requestDetails()
                        }
                    )

                    // Profile sections (tier-gated)
                    ProfileSections(
                        profile: profile,
                        visibleTiers: viewModel.currentEDT
                    )

                    // Show Interest button
                    JMPrimaryButton(
                        text: "Show Interest",
                        action: {
                            showTierWarning = true
                        },
                        icon: "heart.fill"
                    )
                    .padding(.horizontal, Spacing.lg)
                }
                .padding(.vertical, Spacing.xl)
            }
        }
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showTierWarning) {
            TierAwarenessSheet(
                recipientName: profile.firstName,
                recipientTier: profile.maxCompletedTier,
                projectedEDT: viewModel.projectedEDT,
                onConfirm: {
                    viewModel.sendShowInterest()
                    showTierWarning = false
                },
                onDismiss: {
                    showTierWarning = false
                }
            )
        }
    }
}
```

### 14.3 Messages Screen

```swift
// MessagesView.swift

struct MessagesView: View {
    @StateObject private var viewModel = MessagesViewModel()

    var body: some View {
        NavigationView {
            List {
                ForEach(viewModel.conversations) { conversation in
                    NavigationLink(destination: ChatView(conversation: conversation)) {
                        ConversationRow(conversation: conversation)
                    }
                }
            }
            .listStyle(InsetGroupedListStyle())
            .navigationTitle("Messages")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        viewModel.searchMessages()
                    } label: {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(JoyMatcherColors.purpleDeep)
                    }
                }
            }
        }
    }
}

struct ConversationRow: View {
    let conversation: Conversation

    var body: some View {
        HStack(spacing: Spacing.md) {
            // Avatar
            AsyncImage(url: URL(string: conversation.otherUserPhoto)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray.opacity(0.2)
            }
            .frame(width: 56, height: 56)
            .clipShape(Circle())

            // Message preview
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(conversation.otherUserName)
                        .font(JoyMatcherTypography.bodyLarge)
                        .foregroundColor(JoyMatcherColors.textPrimary)
                    Spacer()
                    Text(conversation.lastMessageTime)
                        .font(JoyMatcherTypography.caption1)
                        .foregroundColor(JoyMatcherColors.textTertiary)
                }

                Text(conversation.lastMessage)
                    .font(JoyMatcherTypography.bodyMedium)
                    .foregroundColor(JoyMatcherColors.textSecondary)
                    .lineLimit(2)
            }

            // Unread badge
            if conversation.unreadCount > 0 {
                Circle()
                    .fill(JoyMatcherColors.coral)
                    .frame(width: 20, height: 20)
                    .overlay(
                        Text("\(conversation.unreadCount)")
                            .font(JoyMatcherTypography.caption2)
                            .foregroundColor(.white)
                    )
            }
        }
        .padding(.vertical, 4)
    }
}
```

---

## 15. Tier System UI Patterns

### 15.1 Tier Completion Row

```swift
struct TierCompletionRow: View {
    let completedTiers: [Int]
    let maxTier: Int = 5

    var body: some View {
        HStack(spacing: 12) {
            ForEach(1...maxTier, id: \.self) { tier in
                TierCircle(
                    tier: tier,
                    isCompleted: completedTiers.contains(tier)
                )
            }
        }
    }
}

struct TierCircle: View {
    let tier: Int
    let isCompleted: Bool

    var body: some View {
        ZStack {
            Circle()
                .fill(isCompleted ? JoyMatcherColors.purpleDeep : JoyMatcherColors.gray300)
                .frame(width: 40, height: 40)

            if isCompleted {
                Image(systemName: "checkmark")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(.white)
            } else {
                Text("\(tier)")
                    .font(JoyMatcherTypography.labelMedium)
                    .foregroundColor(JoyMatcherColors.textTertiary)
            }
        }
    }
}
```

### 15.2 Locked Tier Section

```swift
struct LockedTierSection: View {
    let tierNumber: Int
    let tierName: String
    let onUnlock: () -> Void

    var body: some View {
        VStack(spacing: Spacing.lg) {
            Image(systemName: "lock.fill")
                .font(.system(size: 48))
                .foregroundColor(JoyMatcherColors.gray400)

            VStack(spacing: Spacing.sm) {
                Text("Tier \(tierNumber): \(tierName)")
                    .font(JoyMatcherTypography.titleMedium)
                    .foregroundColor(JoyMatcherColors.textPrimary)

                Text("Complete Tier \(tierNumber) to unlock this information")
                    .font(JoyMatcherTypography.bodySmall)
                    .foregroundColor(JoyMatcherColors.textSecondary)
                    .multilineTextAlignment(.center)
            }

            JMSecondaryButton(
                text: "Complete Tier \(tierNumber)",
                action: onUnlock,
                icon: "arrow.right"
            )
        }
        .padding(Spacing.xl)
        .frame(maxWidth: .infinity)
        .background(JoyMatcherColors.gray100)
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(JoyMatcherColors.gray300, lineWidth: 2)
        )
    }
}
```

---

## 16. Show Interest Flow

### 16.1 Show Interest Button States

```swift
enum ShowInterestState {
    case eligible
    case sent
    case cooldown(availableDate: String)
    case subscriptionRequired(subscription: String)
}

struct ShowInterestButton: View {
    let state: ShowInterestState
    let onShowInterest: () -> Void

    var body: some View {
        switch state {
        case .eligible:
            JMPrimaryButton(
                text: "Show Interest",
                action: onShowInterest,
                icon: "heart.fill"
            )

        case .sent:
            JMSecondaryButton(
                text: "Interest Sent",
                action: {},
                icon: "hourglass",
                isEnabled: false
            )

        case .cooldown(let date):
            VStack(spacing: Spacing.sm) {
                JMSecondaryButton(
                    text: "Interest Declined",
                    action: {},
                    icon: "hand.raised",
                    isEnabled: false
                )

                Text("Available again on \(date)")
                    .font(JoyMatcherTypography.caption1)
                    .foregroundColor(JoyMatcherColors.textTertiary)
            }

        case .subscriptionRequired(let subscription):
            JMPrimaryButton(
                text: "Upgrade to \(subscription)",
                action: onShowInterest,
                icon: "star.fill"
            )
        }
    }
}
```

---

## 17. EDT Calculation UI

### 17.1 EDT Status Banner

```swift
struct EDTStatusBanner: View {
    let currentEDT: Int
    let maxPossibleEDT: Int
    let onRequestDetails: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: Spacing.md) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Effective Disclosure Tier (EDT)")
                        .font(JoyMatcherTypography.labelMedium)
                        .foregroundColor(JoyMatcherColors.textSecondary)

                    Text("You're both seeing Tier 1-\(currentEDT) information")
                        .font(JoyMatcherTypography.caption1)
                        .foregroundColor(JoyMatcherColors.textTertiary)
                }

                Spacer()

                Text("\(currentEDT) / \(maxPossibleEDT)")
                    .font(JoyMatcherTypography.headlineSmall)
                    .foregroundColor(JoyMatcherColors.purpleDeep)
            }

            ProgressView(value: Double(currentEDT), total: Double(maxPossibleEDT))
                .tint(JoyMatcherColors.purpleDeep)
                .frame(height: 8)

            if currentEDT < maxPossibleEDT {
                JMTertiaryButton(
                    text: "Request More Details",
                    action: onRequestDetails,
                    icon: "arrow.right"
                )
            }
        }
        .padding(Spacing.lg)
        .background(JoyMatcherColors.purpleLight.opacity(0.1))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(JoyMatcherColors.purpleDeep.opacity(0.2), lineWidth: 1)
        )
        .padding(.horizontal, Spacing.lg)
    }
}
```

### 17.2 EDT Projection Indicator

```swift
struct EDTProjectionIndicator: View {
    let yourTier: Int
    let theirTier: Int
    let projectedEDT: Int

    var body: some View {
        HStack(spacing: Spacing.lg) {
            EDTColumn(label: "You", tier: yourTier)

            Image(systemName: "arrow.right")
                .foregroundColor(JoyMatcherColors.gray400)

            EDTColumn(label: "Them", tier: theirTier)

            Image(systemName: "arrow.right")
                .foregroundColor(JoyMatcherColors.gray400)

            EDTResultColumn(edt: projectedEDT)
        }
        .padding(Spacing.lg)
        .background(JoyMatcherColors.infoContainer)
        .cornerRadius(12)
    }
}

struct EDTColumn: View {
    let label: String
    let tier: Int

    var body: some View {
        VStack(spacing: 4) {
            Text(label)
                .font(JoyMatcherTypography.caption1)
                .foregroundColor(JoyMatcherColors.textSecondary)

            Circle()
                .fill(JoyMatcherColors.purpleLight.opacity(0.3))
                .frame(width: 40, height: 40)
                .overlay(
                    Text("T\(tier)")
                        .font(JoyMatcherTypography.labelMedium)
                        .foregroundColor(JoyMatcherColors.purpleDeep)
                )
        }
    }
}

struct EDTResultColumn: View {
    let edt: Int

    var body: some View {
        VStack(spacing: 4) {
            Text("EDT")
                .font(JoyMatcherTypography.caption1)
                .foregroundColor(JoyMatcherColors.textSecondary)

            Circle()
                .fill(JoyMatcherColors.purpleDeep)
                .frame(width: 48, height: 48)
                .overlay(
                    Text("T\(edt)")
                        .font(JoyMatcherTypography.titleMedium)
                        .foregroundColor(.white)
                )
        }
    }
}
```

---

## Related Documentation

- [Mobile Design System](mobile_design_system.md) - Cross-platform overview
- [Android Style Guide](mobile_style_guide_android.md) - Android-specific implementation
- [Tier System](../Global%20Context/tier_system.md) - Tier architecture
- [EDT Specification](../Global%20Context/edt_specification.md) - EDT calculation logic
- [Show Interest Flow](../Technical%20Specifications/show_interest_flow.md) - Technical flow

---

**Document Owner:** iOS Lead & Mobile Design Lead
**Technical Reviewer:** Senior iOS Engineer
**Last Reviewed:** 2026-02-27
**Next Review:** 2026-05-27 (Quarterly)
