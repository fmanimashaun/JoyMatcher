# JoyMatcher Mobile Style Guide — Android (Material Design 3)

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Production-Ready
**Target:** Android 12+ (API Level 31+)
**Framework:** Jetpack Compose + Material Design 3
**Design Language:** Material You with JoyMatcher Brand Identity

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Material Design 3 Adaptation](#2-material-design-3-adaptation)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Component Specifications](#5-component-specifications)
6. [Navigation Architecture](#6-navigation-architecture)
7. [Spacing and Layout](#7-spacing-and-layout)
8. [Elevation and Shadows](#8-elevation-and-shadows)
9. [State Layers](#9-state-layers)
10. [Dark Theme](#10-dark-theme)
11. [Accessibility](#11-accessibility)
12. [Animation and Motion](#12-animation-and-motion)
13. [Screen-Specific Layouts](#13-screen-specific-layouts)
14. [Tier System UI Patterns](#14-tier-system-ui-patterns)
15. [Show Interest Flow](#15-show-interest-flow)
16. [EDT Calculation UI](#16-edt-calculation-ui)

---

## 1. Introduction

### Purpose

This guide provides comprehensive Android-native design specifications for JoyMatcher, adapted from Material Design 3 principles while maintaining brand consistency with our trust-based matchmaking philosophy.

### Design Philosophy

**JoyMatcher is NOT a dating app.** It is structured relationship infrastructure for marriage-minded professionals. Our Android design reflects:

- **Material You Dynamic Theming** adapted for JoyMatcher's purple-to-coral gradient
- **Professional & Purposeful** UI (not playful or gamified)
- **Trust-Based Architecture** with clear tier visibility indicators
- **Premium Feel** through refined component styling
- **Accessibility First** with TalkBack optimization

### Material Design 3 Principles

1. **Expressive** — Our brand gradient integrated into Material surfaces
2. **Adaptive** — Dynamic color theming respecting user preferences
3. **Cohesive** — Consistent component behavior across Android ecosystem

---

## 2. Material Design 3 Adaptation

### JoyMatcher Brand in Material You

We adapt Material Design 3's color roles to reflect JoyMatcher's identity:

```kotlin
// Theme.kt - Material You Color Scheme adapted for JoyMatcher

@Composable
fun JoyMatcherTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false, // Disable for brand consistency
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) {
        joyMatcherDarkColorScheme
    } else {
        joyMatcherLightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = JoyMatcherTypography,
        shapes = JoyMatcherShapes,
        content = content
    )
}
```

### Design Token Mapping

| Material 3 Role | JoyMatcher Token | Hex Value | Usage |
|-----------------|------------------|-----------|-------|
| `primary` | Deep Purple | `#4D0052` | Primary actions, CTAs |
| `onPrimary` | White | `#FFFFFF` | Text/icons on primary |
| `primaryContainer` | Light Purple | `#E8E4F0` | Filled tonal buttons |
| `onPrimaryContainer` | Dark Purple | `#3A003D` | Text on primary container |
| `secondary` | Coral | `#F16A6F` | Secondary actions, FABs |
| `onSecondary` | White | `#FFFFFF` | Text/icons on secondary |
| `secondaryContainer` | Light Coral | `#FFE8E9` | Tonal coral backgrounds |
| `onSecondaryContainer` | Dark Coral | `#C74F67` | Text on secondary container |
| `tertiary` | Mid Purple | `#8B6B9D` | Tertiary actions |
| `surface` | White/Purple-tinted | `#FFFFFF` / `#F9F8FA` | Card/container backgrounds |
| `onSurface` | Deep Gray-Purple | `#261928` | Primary text |
| `surfaceVariant` | Purple-tinted Gray | `#E8E4F0` | Input backgrounds |
| `outline` | Light Purple Gray | `#D1C4DC` | Borders |
| `outlineVariant` | Very Light Purple | `#E8E4F0` | Subtle dividers |

---

## 3. Color System

### 3.1 Brand Color Palette

```kotlin
// JoyMatcherColors.kt

object JoyMatcherColors {
    // Primary Palette (Purple)
    val PurpleDeep = Color(0xFF4D0052)       // Logo start, primary base
    val PurpleDark = Color(0xFF6B0059)       // Hover, active states
    val Purple = Color(0xFF8B0061)           // Mid-tone
    val PurpleLight = Color(0xFF7D3365)      // Tinted backgrounds

    // Secondary Palette (Coral)
    val CoralDark = Color(0xFFC74F67)        // Accents
    val Coral = Color(0xFFF16A6F)            // Logo end, secondary actions
    val CoralLight = Color(0xFFF99095)       // Light accents
    val CoralVeryLight = Color(0xFFFFE8E9)   // Backgrounds

    // Neutral Palette (Purple-tinted grays)
    val Gray50 = Color(0xFFF9FAFB)
    val Gray100 = Color(0xFFF3F4F6)
    val Gray200 = Color(0xFFE5E7EB)
    val Gray300 = Color(0xFFD1D5DB)
    val Gray400 = Color(0xFF9CA3AF)
    val Gray500 = Color(0xFF6B7280)
    val Gray600 = Color(0xFF4B5563)
    val Gray700 = Color(0xFF374151)
    val Gray800 = Color(0xFF1F2937)
    val Gray900 = Color(0xFF111827)

    // Semantic Colors
    val Success = Color(0xFF10B981)          // Verification, completion
    val SuccessContainer = Color(0xFFE8E4F0) // Success backgrounds
    val Warning = Color(0xFFF59E0B)          // Tier warnings
    val WarningContainer = Color(0xFFFFF4E6)
    val Error = Color(0xFFEF4444)            // Validation errors
    val ErrorContainer = Color(0xFFFFE8E9)
    val Info = Color(0xFF3B82F6)             // Informational states
    val InfoContainer = Color(0xFFE5E0F5)

    // Brand Gradient
    val BrandGradient = Brush.linearGradient(
        colors = listOf(PurpleDeep, Coral),
        start = Offset(0f, 0f),
        end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)
    )
}
```

### 3.2 Material 3 Color Scheme Implementation

```kotlin
// ColorScheme.kt

val joyMatcherLightColorScheme = lightColorScheme(
    primary = JoyMatcherColors.PurpleDeep,
    onPrimary = Color.White,
    primaryContainer = JoyMatcherColors.PurpleLight.copy(alpha = 0.2f),
    onPrimaryContainer = Color(0xFF3A003D),

    secondary = JoyMatcherColors.Coral,
    onSecondary = Color.White,
    secondaryContainer = JoyMatcherColors.CoralVeryLight,
    onSecondaryContainer = JoyMatcherColors.CoralDark,

    tertiary = Color(0xFF8B6B9D),
    onTertiary = Color.White,
    tertiaryContainer = Color(0xFFE8E4F0),
    onTertiaryContainer = Color(0xFF5B4A8E),

    error = JoyMatcherColors.Error,
    onError = Color.White,
    errorContainer = JoyMatcherColors.ErrorContainer,
    onErrorContainer = Color(0xFFC74F67),

    background = Color(0xFFF9F8FA), // Purple-tinted white
    onBackground = Color(0xFF261928),

    surface = Color.White,
    onSurface = Color(0xFF261928),
    surfaceVariant = Color(0xFFE8E4F0),
    onSurfaceVariant = Color(0xFF4B5563),

    outline = Color(0xFFD1C4DC),
    outlineVariant = Color(0xFFE8E4F0),

    inverseSurface = Color(0xFF261928),
    inverseOnSurface = Color.White,
    inversePrimary = Color(0xFFB88FB8)
)
```

### 3.3 Subscription Tier Colors

```kotlin
// TierColors.kt

object TierColors {
    val Free = JoyMatcherColors.Gray400
    val Premium = JoyMatcherColors.PurpleDeep
    val VIP = JoyMatcherColors.Coral

    // Tier indicator backgrounds
    val FreeBg = JoyMatcherColors.Gray200
    val PremiumBg = JoyMatcherColors.PurpleLight.copy(alpha = 0.15f)
    val VIPBg = JoyMatcherColors.CoralVeryLight
}
```

---

## 4. Typography

### 4.1 Type Scale (Material 3 Adapted)

JoyMatcher uses **Georgia Serif** for headings (brand identity) and **Roboto** for body text (Material Design native).

```kotlin
// Typography.kt

private val GeorgiaFontFamily = FontFamily(
    Font(R.font.georgia_regular, FontWeight.Normal),
    Font(R.font.georgia_bold, FontWeight.Bold)
)

val JoyMatcherTypography = Typography(
    // Display - Hero headings (Georgia)
    displayLarge = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 57.sp,
        lineHeight = 64.sp,
        letterSpacing = (-0.25).sp
    ),
    displayMedium = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 45.sp,
        lineHeight = 52.sp,
        letterSpacing = 0.sp
    ),
    displaySmall = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 36.sp,
        lineHeight = 44.sp,
        letterSpacing = 0.sp
    ),

    // Headline - Section titles (Georgia)
    headlineLarge = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 32.sp,
        lineHeight = 40.sp,
        letterSpacing = 0.sp
    ),
    headlineMedium = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 28.sp,
        lineHeight = 36.sp,
        letterSpacing = 0.sp
    ),
    headlineSmall = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 24.sp,
        lineHeight = 32.sp,
        letterSpacing = 0.sp
    ),

    // Title - Card/component titles (Georgia)
    titleLarge = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 22.sp,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    ),
    titleMedium = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.15.sp
    ),
    titleSmall = TextStyle(
        fontFamily = GeorgiaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),

    // Body - Content text (Roboto)
    bodyLarge = TextStyle(
        fontFamily = FontFamily.SansSerif, // Roboto
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.25.sp
    ),
    bodySmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.4.sp
    ),

    // Label - Buttons, badges (Roboto Medium)
    labelLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),
    labelMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    ),
    labelSmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Medium,
        fontSize = 11.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    )
)
```

### 4.2 Usage Guidelines

| Type Scale | Usage | Example |
|------------|-------|---------|
| `displayLarge` | Splash screens, onboarding | "Find Your Joy" |
| `displayMedium` | Hero sections | "Welcome to JoyMatcher" |
| `headlineMedium` | Screen titles | "Discover", "Messages" |
| `titleLarge` | Profile names | "Chidinma O., 32" |
| `titleMedium` | Card titles | "Tier 1: Identity & Intent" |
| `bodyLarge` | Primary content | Profile descriptions |
| `bodyMedium` | Secondary content | Metadata, timestamps |
| `labelLarge` | Primary buttons | "Show Interest" |
| `labelMedium` | Chips, badges | "Premium", "Verified" |

---

## 5. Component Specifications

### 5.1 Buttons

#### Primary Button (Filled)

Uses gradient background (JoyMatcher brand signature).

```kotlin
@Composable
fun JMPrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    icon: ImageVector? = null
) {
    Button(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = Color.Transparent, // Gradient applied below
            contentColor = Color.White,
            disabledContainerColor = JoyMatcherColors.Gray300,
            disabledContentColor = JoyMatcherColors.Gray500
        ),
        shape = RoundedCornerShape(12.dp),
        elevation = ButtonDefaults.buttonElevation(
            defaultElevation = 2.dp,
            pressedElevation = 4.dp,
            disabledElevation = 0.dp
        ),
        contentPadding = PaddingValues(horizontal = 24.dp, vertical = 16.dp)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    brush = JoyMatcherColors.BrandGradient,
                    shape = RoundedCornerShape(12.dp)
                ),
            contentAlignment = Alignment.Center
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                icon?.let {
                    Icon(
                        imageVector = it,
                        contentDescription = null,
                        modifier = Modifier.size(20.dp)
                    )
                }
                Text(
                    text = text,
                    style = MaterialTheme.typography.labelLarge
                )
            }
        }
    }
}

// Usage
JMPrimaryButton(
    text = "Show Interest",
    onClick = { /* action */ },
    icon = Icons.Default.Favorite
)
```

#### Secondary Button (Outlined)

```kotlin
@Composable
fun JMSecondaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    icon: ImageVector? = null
) {
    OutlinedButton(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        border = BorderStroke(2.dp, JoyMatcherColors.PurpleDeep),
        colors = ButtonDefaults.outlinedButtonColors(
            contentColor = JoyMatcherColors.PurpleDeep,
            disabledContentColor = JoyMatcherColors.Gray400
        ),
        shape = RoundedCornerShape(12.dp),
        contentPadding = PaddingValues(horizontal = 24.dp, vertical = 16.dp)
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            icon?.let {
                Icon(
                    imageVector = it,
                    contentDescription = null,
                    modifier = Modifier.size(20.dp)
                )
            }
            Text(
                text = text,
                style = MaterialTheme.typography.labelLarge
            )
        }
    }
}
```

#### Tertiary Button (Text)

```kotlin
@Composable
fun JMTertiaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    icon: ImageVector? = null
) {
    TextButton(
        onClick = onClick,
        modifier = modifier,
        colors = ButtonDefaults.textButtonColors(
            contentColor = JoyMatcherColors.PurpleDeep
        ),
        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            icon?.let {
                Icon(
                    imageVector = it,
                    contentDescription = null,
                    modifier = Modifier.size(18.dp)
                )
            }
            Text(
                text = text,
                style = MaterialTheme.typography.labelMedium
            )
        }
    }
}
```

#### Floating Action Button (FAB)

```kotlin
@Composable
fun JMFloatingActionButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    icon: ImageVector = Icons.Default.Add,
    contentDescription: String
) {
    FloatingActionButton(
        onClick = onClick,
        modifier = modifier,
        containerColor = JoyMatcherColors.Coral,
        contentColor = Color.White,
        elevation = FloatingActionButtonDefaults.elevation(
            defaultElevation = 6.dp,
            pressedElevation = 12.dp
        )
    ) {
        Icon(
            imageVector = icon,
            contentDescription = contentDescription,
            modifier = Modifier.size(24.dp)
        )
    }
}
```

### 5.2 Text Fields

```kotlin
@Composable
fun JMTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier,
    placeholder: String = "",
    helperText: String = "",
    isError: Boolean = false,
    errorMessage: String = "",
    leadingIcon: ImageVector? = null,
    trailingIcon: ImageVector? = null,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    singleLine: Boolean = true
) {
    Column(modifier = modifier) {
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            label = {
                Text(
                    text = label,
                    style = MaterialTheme.typography.bodySmall
                )
            },
            placeholder = {
                Text(
                    text = placeholder,
                    style = MaterialTheme.typography.bodyMedium,
                    color = JoyMatcherColors.Gray400
                )
            },
            leadingIcon = leadingIcon?.let {
                {
                    Icon(
                        imageVector = it,
                        contentDescription = null,
                        tint = JoyMatcherColors.Gray600
                    )
                }
            },
            trailingIcon = trailingIcon?.let {
                {
                    Icon(
                        imageVector = it,
                        contentDescription = null,
                        tint = JoyMatcherColors.Gray600
                    )
                }
            },
            modifier = Modifier.fillMaxWidth(),
            textStyle = MaterialTheme.typography.bodyMedium,
            singleLine = singleLine,
            isError = isError,
            keyboardOptions = keyboardOptions,
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = JoyMatcherColors.PurpleDeep,
                unfocusedBorderColor = JoyMatcherColors.Gray300,
                errorBorderColor = JoyMatcherColors.Error,
                focusedLabelColor = JoyMatcherColors.PurpleDeep,
                cursorColor = JoyMatcherColors.PurpleDeep
            ),
            shape = RoundedCornerShape(12.dp)
        )

        Spacer(modifier = Modifier.height(4.dp))

        if (isError && errorMessage.isNotEmpty()) {
            Text(
                text = errorMessage,
                style = MaterialTheme.typography.bodySmall,
                color = JoyMatcherColors.Error,
                modifier = Modifier.padding(start = 16.dp)
            )
        } else if (helperText.isNotEmpty()) {
            Text(
                text = helperText,
                style = MaterialTheme.typography.bodySmall,
                color = JoyMatcherColors.Gray500,
                modifier = Modifier.padding(start = 16.dp)
            )
        }
    }
}
```

### 5.3 Cards

#### Profile Card

```kotlin
@Composable
fun ProfileCard(
    profile: UserProfile,
    onShowInterest: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            // Profile Image with Verified Badge
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(3f / 4f)
                    .clip(RoundedCornerShape(16.dp))
            ) {
                AsyncImage(
                    model = profile.photoURL,
                    contentDescription = "${profile.firstName}'s profile photo",
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )

                // Verified Badge
                if (profile.isVerified) {
                    Surface(
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(12.dp),
                        shape = RoundedCornerShape(12.dp),
                        color = JoyMatcherColors.Success
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Verified,
                                contentDescription = "Verified",
                                modifier = Modifier.size(12.dp),
                                tint = Color.White
                            )
                            Text(
                                text = "Verified",
                                style = MaterialTheme.typography.labelSmall,
                                color = Color.White
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Profile Info
            Text(
                text = "${profile.firstName} ${profile.lastInitial}., ${profile.age}",
                style = MaterialTheme.typography.titleLarge,
                color = JoyMatcherColors.Gray900
            )

            Spacer(modifier = Modifier.height(8.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.LocationOn,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp),
                    tint = JoyMatcherColors.Gray600
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = "${profile.city}, ${profile.country}",
                    style = MaterialTheme.typography.bodySmall,
                    color = JoyMatcherColors.Gray600
                )
            }

            Spacer(modifier = Modifier.height(4.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Work,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp),
                    tint = JoyMatcherColors.Gray600
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = profile.occupation,
                    style = MaterialTheme.typography.bodySmall,
                    color = JoyMatcherColors.Gray600
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Tier Progress
            TierProgressIndicator(
                currentTier = profile.maxCompletedTier,
                maxTier = 5
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Action Button
            JMPrimaryButton(
                text = "Show Interest",
                onClick = onShowInterest
            )
        }
    }
}
```

### 5.4 Chips

#### Subscription Badge Chip

```kotlin
@Composable
fun SubscriptionBadgeChip(
    subscription: String, // "free", "premium", "vip"
    modifier: Modifier = Modifier
) {
    val (backgroundColor, textColor, label) = when (subscription.lowercase()) {
        "premium" -> Triple(
            TierColors.PremiumBg,
            TierColors.Premium,
            "Premium"
        )
        "vip" -> Triple(
            TierColors.VIPBg,
            TierColors.VIP,
            "VIP"
        )
        else -> Triple(
            TierColors.FreeBg,
            TierColors.Free,
            "Free"
        )
    }

    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        color = backgroundColor
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = textColor,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
        )
    }
}
```

#### Tier Badge Chip

```kotlin
@Composable
fun TierBadgeChip(
    tier: Int,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        color = JoyMatcherColors.PurpleLight.copy(alpha = 0.15f),
        border = BorderStroke(1.dp, JoyMatcherColors.PurpleDeep.copy(alpha = 0.3f))
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Icon(
                imageVector = Icons.Default.Shield,
                contentDescription = null,
                modifier = Modifier.size(12.dp),
                tint = JoyMatcherColors.PurpleDeep
            )
            Text(
                text = "Tier $tier",
                style = MaterialTheme.typography.labelSmall,
                color = JoyMatcherColors.PurpleDeep
            )
        }
    }
}
```

### 5.5 Progress Indicators

#### Tier Progress Bar

```kotlin
@Composable
fun TierProgressIndicator(
    currentTier: Int,
    maxTier: Int = 5,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "Tier Progress",
                style = MaterialTheme.typography.bodySmall,
                color = JoyMatcherColors.Gray500
            )
            Text(
                text = "Tier $currentTier Complete",
                style = MaterialTheme.typography.labelSmall,
                color = JoyMatcherColors.PurpleDeep
            )
        }

        Spacer(modifier = Modifier.height(8.dp))

        LinearProgressIndicator(
            progress = currentTier / maxTier.toFloat(),
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp)),
            color = JoyMatcherColors.PurpleDeep,
            trackColor = JoyMatcherColors.Gray200
        )
    }
}
```

#### Circular Loading Indicator

```kotlin
@Composable
fun JMCircularProgress(
    modifier: Modifier = Modifier
) {
    CircularProgressIndicator(
        modifier = modifier,
        color = JoyMatcherColors.PurpleDeep,
        strokeWidth = 3.dp
    )
}
```

### 5.6 Dialogs and Bottom Sheets

#### Modal Bottom Sheet (Tier Awareness Warning)

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TierAwarenessBottomSheet(
    recipientName: String,
    recipientTier: Int,
    projectedEDT: Int,
    onDismiss: () -> Unit,
    onConfirm: () -> Unit
) {
    val sheetState = rememberModalBottomSheetState()

    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = sheetState
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp)
        ) {
            // Header with warning icon
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Warning,
                    contentDescription = null,
                    modifier = Modifier.size(32.dp),
                    tint = JoyMatcherColors.Warning
                )
                Text(
                    text = "Tier Awareness",
                    style = MaterialTheme.typography.headlineSmall,
                    color = JoyMatcherColors.Gray900
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "You are about to show interest in $recipientName who has completed Tier $recipientTier.",
                style = MaterialTheme.typography.bodyMedium,
                color = JoyMatcherColors.Gray700
            )

            Spacer(modifier = Modifier.height(16.dp))

            // EDT Projection
            Surface(
                color = JoyMatcherColors.PurpleLight.copy(alpha = 0.1f),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = "If accepted, you will see:",
                        style = MaterialTheme.typography.labelLarge,
                        color = JoyMatcherColors.Gray900
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Effective Disclosure Tier (EDT)",
                            style = MaterialTheme.typography.bodySmall,
                            color = JoyMatcherColors.Gray600
                        )
                        Text(
                            text = "Tier 1-$projectedEDT",
                            style = MaterialTheme.typography.labelLarge,
                            color = JoyMatcherColors.PurpleDeep
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    LinearProgressIndicator(
                        progress = projectedEDT / 5f,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(6.dp)
                            .clip(RoundedCornerShape(3.dp)),
                        color = JoyMatcherColors.PurpleDeep,
                        trackColor = JoyMatcherColors.Gray300
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Acknowledgment checkbox
            var acknowledged by remember { mutableStateOf(false) }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.clickable { acknowledged = !acknowledged }
            ) {
                Checkbox(
                    checked = acknowledged,
                    onCheckedChange = { acknowledged = it },
                    colors = CheckboxDefaults.colors(
                        checkedColor = JoyMatcherColors.PurpleDeep
                    )
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "I understand the tier limitations",
                    style = MaterialTheme.typography.bodyMedium,
                    color = JoyMatcherColors.Gray700
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Action buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                JMSecondaryButton(
                    text = "Cancel",
                    onClick = onDismiss,
                    modifier = Modifier.weight(1f)
                )
                JMPrimaryButton(
                    text = "Send Show Interest",
                    onClick = { if (acknowledged) onConfirm() },
                    enabled = acknowledged,
                    modifier = Modifier.weight(1f)
                )
            }

            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}
```

### 5.7 Snackbars

```kotlin
@Composable
fun JMSnackbar(
    snackbarData: SnackbarData,
    modifier: Modifier = Modifier
) {
    Snackbar(
        snackbarData = snackbarData,
        modifier = modifier,
        containerColor = JoyMatcherColors.PurpleDeep,
        contentColor = Color.White,
        actionColor = JoyMatcherColors.Coral,
        shape = RoundedCornerShape(12.dp)
    )
}
```

---

## 6. Navigation Architecture

### 6.1 Bottom Navigation Bar

```kotlin
@Composable
fun JMBottomNavigation(
    selectedTab: BottomNavItem,
    onTabSelected: (BottomNavItem) -> Unit,
    modifier: Modifier = Modifier
) {
    NavigationBar(
        modifier = modifier,
        containerColor = Color.White,
        contentColor = JoyMatcherColors.PurpleDeep,
        tonalElevation = 8.dp
    ) {
        BottomNavItem.values().forEach { item ->
            NavigationBarItem(
                icon = {
                    BadgedBox(
                        badge = {
                            if (item.badgeCount > 0) {
                                Badge {
                                    Text(item.badgeCount.toString())
                                }
                            }
                        }
                    ) {
                        Icon(
                            imageVector = item.icon,
                            contentDescription = item.label
                        )
                    }
                },
                label = {
                    Text(
                        text = item.label,
                        style = MaterialTheme.typography.labelSmall
                    )
                },
                selected = selectedTab == item,
                onClick = { onTabSelected(item) },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = JoyMatcherColors.PurpleDeep,
                    selectedTextColor = JoyMatcherColors.PurpleDeep,
                    indicatorColor = JoyMatcherColors.PurpleLight.copy(alpha = 0.2f),
                    unselectedIconColor = JoyMatcherColors.Gray400,
                    unselectedTextColor = JoyMatcherColors.Gray400
                )
            )
        }
    }
}

enum class BottomNavItem(
    val icon: ImageVector,
    val label: String,
    val route: String,
    val badgeCount: Int = 0
) {
    Discover(Icons.Default.Explore, "Discover", "discover"),
    Interests(Icons.Default.Favorite, "Interests", "interests", 3),
    Messages(Icons.Default.Message, "Messages", "messages"),
    Profile(Icons.Default.AccountCircle, "Profile", "profile"),
    More(Icons.Default.Menu, "More", "more")
}
```

### 6.2 Top App Bar

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun JMTopAppBar(
    title: String,
    onNavigationClick: (() -> Unit)? = null,
    actions: @Composable RowScope.() -> Unit = {},
    modifier: Modifier = Modifier
) {
    TopAppBar(
        title = {
            Text(
                text = title,
                style = MaterialTheme.typography.headlineSmall,
                color = JoyMatcherColors.Gray900
            )
        },
        navigationIcon = {
            onNavigationClick?.let {
                IconButton(onClick = it) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Navigate back",
                        tint = JoyMatcherColors.Gray900
                    )
                }
            }
        },
        actions = actions,
        modifier = modifier,
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = Color.White,
            titleContentColor = JoyMatcherColors.Gray900
        )
    )
}
```

---

## 7. Spacing and Layout

### 7.1 Spacing System (4dp Grid)

```kotlin
object Spacing {
    val xs = 4.dp      // Tight spacing (icon-text gaps)
    val sm = 8.dp      // Small spacing (chips, badges)
    val md = 12.dp     // Medium spacing (list items)
    val lg = 16.dp     // Large spacing (sections)
    val xl = 24.dp     // Extra large (card padding)
    val xxl = 32.dp    // Section dividers
    val xxxl = 48.dp   // Major page sections
}
```

### 7.2 Layout Patterns

```kotlin
// Screen container with standard padding
@Composable
fun ScreenContainer(
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = Spacing.lg)
            .verticalScroll(rememberScrollState()),
        content = content
    )
}

// Card grid layout
@Composable
fun CardGrid(
    items: List<UserProfile>,
    onItemClick: (UserProfile) -> Unit,
    modifier: Modifier = Modifier
) {
    LazyVerticalGrid(
        columns = GridCells.Adaptive(minSize = 160.dp),
        modifier = modifier,
        contentPadding = PaddingValues(Spacing.lg),
        horizontalArrangement = Arrangement.spacedBy(Spacing.md),
        verticalArrangement = Arrangement.spacedBy(Spacing.md)
    ) {
        items(items) { profile ->
            ProfileCard(
                profile = profile,
                onShowInterest = { onItemClick(profile) }
            )
        }
    }
}
```

---

## 8. Elevation and Shadows

### 8.1 Elevation Levels

```kotlin
object Elevation {
    val none = 0.dp       // Flat surfaces
    val level1 = 1.dp     // Slightly raised (input fields)
    val level2 = 3.dp     // Cards
    val level3 = 6.dp     // Floating action buttons
    val level4 = 8.dp     // Navigation bars
    val level5 = 12.dp    // Dialogs, bottom sheets
}
```

### 8.2 Shadow Usage

Material Design 3 handles shadows automatically through elevation. Use `CardDefaults.cardElevation()` and similar APIs.

```kotlin
Card(
    elevation = CardDefaults.cardElevation(
        defaultElevation = Elevation.level2,
        pressedElevation = Elevation.level3,
        hoveredElevation = Elevation.level3
    )
)
```

---

## 9. State Layers

### 9.1 Interactive State Overlays

Material Design 3 applies state layers automatically. Custom implementations:

```kotlin
@Composable
fun InteractiveCard(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()

    Card(
        onClick = onClick,
        modifier = modifier,
        interactionSource = interactionSource
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    color = if (isPressed) {
                        JoyMatcherColors.PurpleDeep.copy(alpha = 0.08f)
                    } else {
                        Color.Transparent
                    }
                )
        ) {
            content()
        }
    }
}
```

### 9.2 State Layer Opacity Values

| State | Opacity |
|-------|---------|
| Pressed | 8% |
| Focused | 12% |
| Hovered | 8% |
| Dragged | 16% |

---

## 10. Dark Theme

### 10.1 Dark Color Scheme

```kotlin
val joyMatcherDarkColorScheme = darkColorScheme(
    primary = Color(0xFFB88FB8),
    onPrimary = Color(0xFF3A003D),
    primaryContainer = Color(0xFF4D0052),
    onPrimaryContainer = Color(0xFFE8E4F0),

    secondary = Color(0xFFE88A8F),
    onSecondary = Color(0xFF5A1F23),
    secondaryContainer = Color(0xFF732B30),
    onSecondaryContainer = Color(0xFFFFE8E9),

    tertiary = Color(0xFFB8B0C8),
    onTertiary = Color(0xFF2E2839),
    tertiaryContainer = Color(0xFF45394F),
    onTertiaryContainer = Color(0xFFE8E4F0),

    error = Color(0xFFFFB4AB),
    onError = Color(0xFF690005),
    errorContainer = Color(0xFF93000A),
    onErrorContainer = Color(0xFFFFDAD6),

    background = Color(0xFF1A1218),
    onBackground = Color(0xFFE8E0E5),

    surface = Color(0xFF1A1218),
    onSurface = Color(0xFFE8E0E5),
    surfaceVariant = Color(0xFF4B454D),
    onSurfaceVariant = Color(0xFFCCC4CF),

    outline = Color(0xFF958E99),
    outlineVariant = Color(0xFF4B454D),

    inverseSurface = Color(0xFFE8E0E5),
    inverseOnSurface = Color(0xFF322930),
    inversePrimary = Color(0xFF6B0059)
)
```

### 10.2 Dark Theme Usage

```kotlin
@Composable
fun JoyMatcherApp() {
    val darkTheme = isSystemInDarkTheme()

    JoyMatcherTheme(darkTheme = darkTheme) {
        // App content
    }
}
```

---

## 11. Accessibility

### 11.1 Touch Targets

Minimum 48dp for all interactive elements (Material Design standard).

```kotlin
IconButton(
    onClick = { /* action */ },
    modifier = Modifier.size(48.dp) // Minimum touch target
) {
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "Like",
        modifier = Modifier.size(24.dp) // Visual size
    )
}
```

### 11.2 TalkBack Support

```kotlin
@Composable
fun AccessibleButton(
    text: String,
    onClick: () -> Unit,
    contentDescription: String? = null
) {
    Button(
        onClick = onClick,
        modifier = Modifier.semantics {
            this.contentDescription = contentDescription ?: text
            this.role = Role.Button
        }
    ) {
        Text(text)
    }
}
```

### 11.3 Contrast Ratios

All text meets WCAG 2.1 AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

### 11.4 Dynamic Type

Use `sp` units for all text sizes to respect user font size preferences:

```kotlin
Text(
    text = "Profile Name",
    style = MaterialTheme.typography.titleLarge,
    maxLines = 2,
    overflow = TextOverflow.Ellipsis
)
```

---

## 12. Animation and Motion

### 12.1 Material Motion System

```kotlin
// Standard spring animation
val animatedProgress by animateFloatAsState(
    targetValue = progress,
    animationSpec = spring(
        dampingRatio = Spring.DampingRatioMediumBouncy,
        stiffness = Spring.StiffnessLow
    )
)

// Fade in animation
AnimatedVisibility(
    visible = visible,
    enter = fadeIn(animationSpec = tween(300)),
    exit = fadeOut(animationSpec = tween(300))
) {
    // Content
}

// Slide in/out
AnimatedVisibility(
    visible = visible,
    enter = slideInVertically(
        initialOffsetY = { it },
        animationSpec = tween(300, easing = EaseOut)
    ),
    exit = slideOutVertically(
        targetOffsetY = { it },
        animationSpec = tween(300, easing = EaseIn)
    )
) {
    // Content
}
```

### 12.2 Duration Guidelines

```kotlin
object AnimationDuration {
    const val Fast = 150     // Quick state changes
    const val Medium = 250   // Standard transitions
    const val Slow = 350     // Complex animations
}
```

---

## 13. Screen-Specific Layouts

### 13.1 Discover Screen

```kotlin
@Composable
fun DiscoverScreen(
    viewModel: DiscoverViewModel = hiltViewModel()
) {
    val profiles by viewModel.profiles.collectAsState()

    Scaffold(
        topBar = {
            JMTopAppBar(
                title = "Discover",
                actions = {
                    IconButton(onClick = { /* filter */ }) {
                        Icon(
                            imageVector = Icons.Default.FilterList,
                            contentDescription = "Filter"
                        )
                    }
                }
            )
        },
        floatingActionButton = {
            JMFloatingActionButton(
                onClick = { /* quick action */ },
                icon = Icons.Default.Search,
                contentDescription = "Advanced search"
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            contentPadding = PaddingValues(vertical = Spacing.lg),
            verticalArrangement = Arrangement.spacedBy(Spacing.lg)
        ) {
            items(profiles) { profile ->
                ProfileCard(
                    profile = profile,
                    onShowInterest = { viewModel.showInterest(profile.id) }
                )
            }
        }
    }
}
```

### 13.2 Profile View Screen

```kotlin
@Composable
fun ProfileViewScreen(
    profileId: String,
    viewModel: ProfileViewModel = hiltViewModel()
) {
    val profile by viewModel.profile.collectAsState()
    val edt by viewModel.edt.collectAsState()

    Scaffold(
        topBar = {
            JMTopAppBar(
                title = "",
                onNavigationClick = { /* navigate back */ },
                actions = {
                    IconButton(onClick = { /* report */ }) {
                        Icon(Icons.Default.MoreVert, "More options")
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Profile header with photo
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(500.dp)
                ) {
                    AsyncImage(
                        model = profile.photoURL,
                        contentDescription = "Profile photo",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )

                    // Gradient overlay for text readability
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                Brush.verticalGradient(
                                    colors = listOf(
                                        Color.Transparent,
                                        Color.Black.copy(alpha = 0.7f)
                                    )
                                )
                            )
                    )

                    // Profile info overlay
                    Column(
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .padding(24.dp)
                    ) {
                        Text(
                            text = "${profile.firstName} ${profile.lastInitial}., ${profile.age}",
                            style = MaterialTheme.typography.headlineMedium,
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            SubscriptionBadgeChip(subscription = profile.subscription)
                            TierBadgeChip(tier = profile.maxCompletedTier)
                            if (profile.isVerified) {
                                VerifiedBadge()
                            }
                        }
                    }
                }
            }

            // EDT Status Banner
            item {
                EDTStatusBanner(
                    currentEDT = edt,
                    maxPossibleEDT = profile.maxCompletedTier,
                    onRequestDetails = { viewModel.requestDetails() }
                )
            }

            // Profile sections (tier-gated)
            item {
                ProfileSections(
                    profile = profile,
                    visibleTiers = edt
                )
            }

            // Show Interest button
            item {
                Column(
                    modifier = Modifier.padding(Spacing.xl)
                ) {
                    JMPrimaryButton(
                        text = "Show Interest",
                        onClick = { viewModel.showInterest() },
                        icon = Icons.Default.Favorite
                    )
                }
            }
        }
    }
}
```

### 13.3 Messages Screen

```kotlin
@Composable
fun MessagesScreen(
    viewModel: MessagesViewModel = hiltViewModel()
) {
    val conversations by viewModel.conversations.collectAsState()

    Scaffold(
        topBar = {
            JMTopAppBar(
                title = "Messages",
                actions = {
                    IconButton(onClick = { /* search */ }) {
                        Icon(Icons.Default.Search, "Search messages")
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            items(conversations) { conversation ->
                ConversationListItem(
                    conversation = conversation,
                    onClick = { viewModel.openConversation(conversation.id) }
                )
            }
        }
    }
}

@Composable
fun ConversationListItem(
    conversation: Conversation,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .padding(Spacing.lg)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(Spacing.md)
        ) {
            // Avatar
            AsyncImage(
                model = conversation.otherUserPhoto,
                contentDescription = "${conversation.otherUserName}'s photo",
                modifier = Modifier
                    .size(56.dp)
                    .clip(CircleShape),
                contentScale = ContentScale.Crop
            )

            // Message preview
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = conversation.otherUserName,
                        style = MaterialTheme.typography.titleMedium,
                        color = JoyMatcherColors.Gray900
                    )
                    Text(
                        text = conversation.lastMessageTime,
                        style = MaterialTheme.typography.bodySmall,
                        color = JoyMatcherColors.Gray500
                    )
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = conversation.lastMessage,
                    style = MaterialTheme.typography.bodyMedium,
                    color = JoyMatcherColors.Gray600,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
            }

            // Unread badge
            if (conversation.unreadCount > 0) {
                Badge {
                    Text(conversation.unreadCount.toString())
                }
            }
        }
    }
    Divider(color = JoyMatcherColors.Gray200)
}
```

---

## 14. Tier System UI Patterns

### 14.1 Tier Completion Indicator

```kotlin
@Composable
fun TierCompletionRow(
    completedTiers: List<Int>,
    maxTier: Int = 5,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceEvenly
    ) {
        repeat(maxTier) { index ->
            val tier = index + 1
            val isCompleted = completedTiers.contains(tier)

            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(
                            if (isCompleted) {
                                JoyMatcherColors.PurpleDeep
                            } else {
                                JoyMatcherColors.Gray300
                            }
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    if (isCompleted) {
                        Icon(
                            imageVector = Icons.Default.Check,
                            contentDescription = "Tier $tier complete",
                            tint = Color.White,
                            modifier = Modifier.size(20.dp)
                        )
                    } else {
                        Text(
                            text = tier.toString(),
                            style = MaterialTheme.typography.labelMedium,
                            color = JoyMatcherColors.Gray500
                        )
                    }
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "T$tier",
                    style = MaterialTheme.typography.labelSmall,
                    color = if (isCompleted) {
                        JoyMatcherColors.PurpleDeep
                    } else {
                        JoyMatcherColors.Gray400
                    }
                )
            }
        }
    }
}
```

### 14.2 Locked Tier Section

```kotlin
@Composable
fun LockedTierSection(
    tierNumber: Int,
    tierName: String,
    onUnlock: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = JoyMatcherColors.Gray100
        ),
        border = BorderStroke(2.dp, JoyMatcherColors.Gray300)
    ) {
        Column(
            modifier = Modifier.padding(Spacing.xl),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(Spacing.md)
        ) {
            Icon(
                imageVector = Icons.Default.Lock,
                contentDescription = "Locked",
                modifier = Modifier.size(48.dp),
                tint = JoyMatcherColors.Gray400
            )

            Text(
                text = "Tier $tierNumber: $tierName",
                style = MaterialTheme.typography.titleMedium,
                color = JoyMatcherColors.Gray700
            )

            Text(
                text = "Complete Tier $tierNumber to unlock this information",
                style = MaterialTheme.typography.bodySmall,
                color = JoyMatcherColors.Gray500,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(Spacing.sm))

            JMSecondaryButton(
                text = "Complete Tier $tierNumber",
                onClick = onUnlock,
                icon = Icons.Default.ArrowForward
            )
        }
    }
}
```

---

## 15. Show Interest Flow

### 15.1 Show Interest Button States

```kotlin
@Composable
fun ShowInterestButton(
    state: ShowInterestState,
    onShowInterest: () -> Unit,
    modifier: Modifier = Modifier
) {
    when (state) {
        is ShowInterestState.Eligible -> {
            JMPrimaryButton(
                text = "Show Interest",
                onClick = onShowInterest,
                icon = Icons.Default.Favorite,
                modifier = modifier
            )
        }
        is ShowInterestState.Sent -> {
            JMSecondaryButton(
                text = "Interest Sent",
                onClick = {},
                enabled = false,
                icon = Icons.Default.HourglassEmpty,
                modifier = modifier
            )
        }
        is ShowInterestState.Cooldown -> {
            Column(
                modifier = modifier,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                JMSecondaryButton(
                    text = "Interest Declined",
                    onClick = {},
                    enabled = false,
                    icon = Icons.Default.Block
                )
                Spacer(modifier = Modifier.height(Spacing.sm))
                Text(
                    text = "Available again on ${state.availableDate}",
                    style = MaterialTheme.typography.bodySmall,
                    color = JoyMatcherColors.Gray500
                )
            }
        }
        is ShowInterestState.SubscriptionRequired -> {
            JMPrimaryButton(
                text = "Upgrade to ${state.requiredSubscription}",
                onClick = onShowInterest,
                icon = Icons.Default.Star,
                modifier = modifier
            )
        }
    }
}

sealed class ShowInterestState {
    object Eligible : ShowInterestState()
    object Sent : ShowInterestState()
    data class Cooldown(val availableDate: String) : ShowInterestState()
    data class SubscriptionRequired(val requiredSubscription: String) : ShowInterestState()
}
```

---

## 16. EDT Calculation UI

### 16.1 EDT Status Banner

```kotlin
@Composable
fun EDTStatusBanner(
    currentEDT: Int,
    maxPossibleEDT: Int,
    onRequestDetails: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(Spacing.lg),
        colors = CardDefaults.cardColors(
            containerColor = JoyMatcherColors.PurpleLight.copy(alpha = 0.1f)
        ),
        border = BorderStroke(1.dp, JoyMatcherColors.PurpleDeep.copy(alpha = 0.2f))
    ) {
        Column(
            modifier = Modifier.padding(Spacing.lg)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Effective Disclosure Tier (EDT)",
                        style = MaterialTheme.typography.labelLarge,
                        color = JoyMatcherColors.Gray700
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "You're both seeing Tier 1-$currentEDT information",
                        style = MaterialTheme.typography.bodySmall,
                        color = JoyMatcherColors.Gray600
                    )
                }

                Text(
                    text = "$currentEDT / $maxPossibleEDT",
                    style = MaterialTheme.typography.headlineSmall,
                    color = JoyMatcherColors.PurpleDeep
                )
            }

            Spacer(modifier = Modifier.height(Spacing.md))

            LinearProgressIndicator(
                progress = currentEDT / maxPossibleEDT.toFloat(),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(8.dp)
                    .clip(RoundedCornerShape(4.dp)),
                color = JoyMatcherColors.PurpleDeep,
                trackColor = JoyMatcherColors.Gray300
            )

            if (currentEDT < maxPossibleEDT) {
                Spacer(modifier = Modifier.height(Spacing.md))
                JMTertiaryButton(
                    text = "Request More Details",
                    onClick = onRequestDetails,
                    icon = Icons.Default.ArrowForward
                )
            }
        }
    }
}
```

### 16.2 EDT Projection Indicator

```kotlin
@Composable
fun EDTProjectionIndicator(
    yourTier: Int,
    theirTier: Int,
    projectedEDT: Int,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(
                color = JoyMatcherColors.InfoContainer,
                shape = RoundedCornerShape(12.dp)
            )
            .padding(Spacing.lg)
    ) {
        Text(
            text = "EDT Projection",
            style = MaterialTheme.typography.titleSmall,
            color = JoyMatcherColors.Gray900
        )

        Spacer(modifier = Modifier.height(Spacing.md))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            EDTUserColumn(
                label = "You",
                tier = yourTier
            )

            Icon(
                imageVector = Icons.Default.ArrowForward,
                contentDescription = null,
                tint = JoyMatcherColors.Gray400
            )

            EDTUserColumn(
                label = "Them",
                tier = theirTier
            )

            Icon(
                imageVector = Icons.Default.ArrowForward,
                contentDescription = null,
                tint = JoyMatcherColors.Gray400
            )

            EDTResultColumn(
                edt = projectedEDT
            )
        }
    }
}

@Composable
fun EDTUserColumn(
    label: String,
    tier: Int
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = JoyMatcherColors.Gray600
        )
        Spacer(modifier = Modifier.height(4.dp))
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(CircleShape)
                .background(JoyMatcherColors.PurpleLight.copy(alpha = 0.3f)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "T$tier",
                style = MaterialTheme.typography.labelLarge,
                color = JoyMatcherColors.PurpleDeep
            )
        }
    }
}

@Composable
fun EDTResultColumn(
    edt: Int
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "EDT",
            style = MaterialTheme.typography.bodySmall,
            color = JoyMatcherColors.Gray600
        )
        Spacer(modifier = Modifier.height(4.dp))
        Box(
            modifier = Modifier
                .size(48.dp)
                .clip(CircleShape)
                .background(JoyMatcherColors.PurpleDeep),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "T$edt",
                style = MaterialTheme.typography.titleMedium,
                color = Color.White
            )
        }
    }
}
```

---

## Related Documentation

- [Mobile Design System](mobile_design_system.md) - Cross-platform overview
- [iOS Style Guide](mobile_style_guide_ios.md) - iOS-specific implementation
- [Tier System](../Global%20Context/tier_system.md) - Tier architecture
- [EDT Specification](../Global%20Context/edt_specification.md) - EDT calculation logic
- [Show Interest Flow](../Technical%20Specifications/show_interest_flow.md) - Technical flow

---

**Document Owner:** Android Lead & Mobile Design Lead
**Technical Reviewer:** Senior Android Engineer
**Last Reviewed:** 2026-02-27
**Next Review:** 2026-05-27 (Quarterly)
