# Mobile Design System (iOS & Android)

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Specification Complete
**Target Platforms:** iOS 15+, Android 12+

---

## Overview

This guide provides comprehensive mobile design specifications for JoyMatcher native applications on iOS and Android. It covers platform-specific patterns, native components, and cross-platform consistency while respecting each platform's design language.

**Design Philosophy:**
- **iOS:** Human Interface Guidelines (HIG) compliance
- **Android:** Material Design 3 compliance
- **Brand Consistency:** Maintain JoyMatcher identity across platforms
- **Native Feel:** Respect platform conventions (don't make iOS look like Android or vice versa)

---

## Brand Colors

### Primary Gradient (#4D0052 → #F16A6F)

```swift
// iOS (Swift/SwiftUI)
struct JoyMatcherColors {
    // Primary brand colors (from logo gradient)
    static let purpleDeep = Color(hex: "4D0052")      // Deep purple (gradient start)
    static let purpleDark = Color(hex: "6B0059")      // Dark purple
    static let purple = Color(hex: "8B0061")           // Mid purple
    static let coralDark = Color(hex: "C74F67")        // Dark coral
    static let coral = Color(hex: "F16A6F")            // Coral (gradient end)
    static let coralLight = Color(hex: "F99095")       // Light coral

    // Neutral palette
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

    // Semantic colors
    static let success = Color(hex: "10B981")
    static let warning = Color(hex: "F59E0B")
    static let error = Color(hex: "EF4444")
    static let info = Color(hex: "3B82F6")

    // Gradients
    static let brandGradient = LinearGradient(
        gradient: Gradient(colors: [purpleDeep, coral]),
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}
```

```kotlin
// Android (Kotlin/Jetpack Compose)
object JoyMatcherColors {
    // Primary brand colors (from logo gradient)
    val PurpleDeep = Color(0xFF4D0052)      // Deep purple (gradient start)
    val PurpleDark = Color(0xFF6B0059)      // Dark purple
    val Purple = Color(0xFF8B0061)           // Mid purple
    val CoralDark = Color(0xFFC74F67)        // Dark coral
    val Coral = Color(0xFFF16A6F)            // Coral (gradient end)
    val CoralLight = Color(0xFFF99095)       // Light coral

    // Neutral palette
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

    // Semantic colors
    val Success = Color(0xFF10B981)
    val Warning = Color(0xFFF59E0B)
    val Error = Color(0xFFEF4444)
    val Info = Color(0xFF3B82F6)

    // Gradients
    val BrandGradient = Brush.linearGradient(
        colors = listOf(PurpleDeep, Coral),
        start = Offset(0f, 0f),
        end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)
    )
}
```

---

## Typography

### iOS Typography

```swift
// iOS (SwiftUI)
struct JoyMatcherTypography {
    // Heading styles (Georgia Serif)
    static let h1 = Font.custom("Georgia-Bold", size: 32)
    static let h2 = Font.custom("Georgia-Bold", size: 28)
    static let h3 = Font.custom("Georgia-Bold", size: 24)
    static let h4 = Font.custom("Georgia-Bold", size: 20)

    // Body styles (SF Pro - native iOS font)
    static let bodyLarge = Font.system(size: 17, weight: .regular)      // iOS standard body
    static let bodyDefault = Font.system(size: 15, weight: .regular)
    static let bodySmall = Font.system(size: 13, weight: .regular)
    static let caption = Font.system(size: 11, weight: .regular)

    // Button styles
    static let buttonLarge = Font.system(size: 17, weight: .semibold)
    static let buttonDefault = Font.system(size: 15, weight: .semibold)
    static let buttonSmall = Font.system(size: 13, weight: .medium)
}
```

### Android Typography

```kotlin
// Android (Jetpack Compose)
object JoyMatcherTypography {
    // Heading styles (Georgia Serif)
    val h1 = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Bold,
        fontSize = 32.sp,
        lineHeight = 40.sp
    )
    val h2 = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Bold,
        fontSize: 28.sp,
        lineHeight = 36.sp
    )
    val h3 = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Bold,
        fontSize = 24.sp,
        lineHeight = 32.sp
    )
    val h4 = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Bold,
        fontSize = 20.sp,
        lineHeight = 28.sp
    )

    // Body styles (Roboto - native Android font)
    val bodyLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp
    )
    val bodyDefault = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp
    )
    val bodySmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp
    )
    val caption = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 10.sp,
        lineHeight = 14.sp
    )

    // Button styles
    val buttonLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.SemiBold,
        fontSize = 16.sp,
        letterSpacing = 0.5.sp
    )
    val buttonDefault = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.SemiBold,
        fontSize = 14.sp,
        letterSpacing = 0.4.sp
    )
}
```

---

## Buttons

### iOS Buttons

```swift
// Primary Button (Gradient)
Button("Show Interest") {
    // Action
}
.buttonStyle(JMPrimaryButtonStyle())

struct JMPrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 17, weight: .semibold))
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(
                JoyMatcherColors.brandGradient
                    .opacity(configuration.isPressed ? 0.8 : 1.0)
            )
            .cornerRadius(12)
            .shadow(color: Color.black.opacity(0.1), radius: 4, y: 2)
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.easeOut(duration: 0.1), value: configuration.isPressed)
    }
}

// Secondary Button (Outline)
Button("Learn More") {
    // Action
}
.buttonStyle(JMSecondaryButtonStyle())

struct JMSecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 17, weight: .semibold))
            .foregroundColor(JoyMatcherColors.purple)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(Color.white)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(JoyMatcherColors.purple, lineWidth: 2)
            )
            .opacity(configuration.isPressed ? 0.7 : 1.0)
    }
}

// Tertiary Button (Ghost)
Button("Skip for Now") {
    // Action
}
.buttonStyle(JMTertiaryButtonStyle())

struct JMTertiaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 15, weight: .medium))
            .foregroundColor(JoyMatcherColors.purple)
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .background(
                configuration.isPressed ?
                    JoyMatcherColors.purple.opacity(0.1) : Color.clear
            )
            .cornerRadius(8)
    }
}
```

### Android Buttons

```kotlin
// Primary Button (Gradient)
@Composable
fun JMPrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    Button(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = Color.Transparent,
            contentColor = Color.White,
            disabledContainerColor = JoyMatcherColors.Gray300,
            disabledContentColor = JoyMatcherColors.Gray500
        ),
        shape = RoundedCornerShape(12.dp),
        elevation = ButtonDefaults.buttonElevation(
            defaultElevation = 2.dp,
            pressedElevation = 4.dp
        )
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
            Text(
                text = text,
                style = JoyMatcherTypography.buttonLarge
            )
        }
    }
}

// Secondary Button (Outline)
@Composable
fun JMSecondaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    OutlinedButton(
        onClick = onClick,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        border = BorderStroke(2.dp, JoyMatcherColors.Purple),
        colors = ButtonDefaults.outlinedButtonColors(
            contentColor = JoyMatcherColors.Purple
        ),
        shape = RoundedCornerShape(12.dp)
    ) {
        Text(
            text = text,
            style = JoyMatcherTypography.buttonLarge
        )
    }
}

// Tertiary Button (Text)
@Composable
fun JMTertiaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    TextButton(
        onClick = onClick,
        modifier = modifier,
        colors = ButtonDefaults.textButtonColors(
            contentColor = JoyMatcherColors.Purple
        )
    ) {
        Text(
            text = text,
            style = JoyMatcherTypography.buttonDefault
        )
    }
}
```

---

## Form Controls

### iOS Text Input

```swift
// iOS Text Field
@State private var email = ""
@FocusState private var emailFocused: Bool

VStack(alignment: .leading, spacing: 8) {
    Text("Email Address")
        .font(.system(size: 13, weight: .medium))
        .foregroundColor(JoyMatcherColors.gray700)

    TextField("you@example.com", text: $email)
        .font(.system(size: 17))
        .textInputAutocapitalization(.never)
        .autocorrectionDisabled()
        .keyboardType(.emailAddress)
        .focused($emailFocused)
        .padding()
        .background(Color.white)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(
                    emailFocused ? JoyMatcherColors.purple : JoyMatcherColors.gray300,
                    lineWidth: 2
                )
        )

    Text("We'll never share your email with anyone else.")
        .font(.system(size: 11))
        .foregroundColor(JoyMatcherColors.gray500)
}
```

### Android Text Input

```kotlin
// Android TextField
@Composable
fun JMTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    placeholder: String = "",
    helperText: String = "",
    isError: Boolean = false,
    errorMessage: String = "",
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier) {
        Text(
            text = label,
            style = JoyMatcherTypography.bodySmall.copy(
                fontWeight = FontWeight.Medium,
                color = JoyMatcherColors.Gray700
            )
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            placeholder = {
                Text(
                    text = placeholder,
                    style = JoyMatcherTypography.bodyDefault.copy(
                        color = JoyMatcherColors.Gray400
                    )
                )
            },
            modifier = Modifier.fillMaxWidth(),
            textStyle = JoyMatcherTypography.bodyDefault,
            singleLine = true,
            isError = isError,
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = JoyMatcherColors.Purple,
                unfocusedBorderColor = JoyMatcherColors.Gray300,
                errorBorderColor = JoyMatcherColors.Error
            ),
            shape = RoundedCornerShape(12.dp)
        )

        if (isError && errorMessage.isNotEmpty()) {
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = errorMessage,
                style = JoyMatcherTypography.bodySmall.copy(
                    color = JoyMatcherColors.Error
                ),
                modifier = Modifier.padding(start = 16.dp)
            )
        } else if (helperText.isNotEmpty()) {
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = helperText,
                style = JoyMatcherTypography.caption.copy(
                    color = JoyMatcherColors.Gray500
                ),
                modifier = Modifier.padding(start = 16.dp)
            )
        }
    }
}
```

---

## Cards

### iOS Profile Card

```swift
// iOS Profile Card
struct ProfileCard: View {
    let profile: UserProfile

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
                            .font(.system(size: 10, weight: .medium))
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
                    .font(.custom("Georgia-Bold", size: 20))
                    .foregroundColor(JoyMatcherColors.gray900)

                HStack(spacing: 4) {
                    Image(systemName: "location.fill")
                        .font(.system(size: 12))
                        .foregroundColor(JoyMatcherColors.gray600)
                    Text("\(profile.city), \(profile.country)")
                        .font(.system(size: 13))
                        .foregroundColor(JoyMatcherColors.gray600)
                }

                HStack(spacing: 4) {
                    Image(systemName: "briefcase.fill")
                        .font(.system(size: 12))
                        .foregroundColor(JoyMatcherColors.gray600)
                    Text(profile.occupation)
                        .font(.system(size: 13))
                        .foregroundColor(JoyMatcherColors.gray600)
                }
            }
            .padding(.horizontal, 12)

            // Tier Progress
            VStack(spacing: 8) {
                HStack {
                    Text("Tier Progress")
                        .font(.system(size: 11))
                        .foregroundColor(JoyMatcherColors.gray500)
                    Spacer()
                    Text("Tier \(profile.maxCompletedTier) Complete")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(JoyMatcherColors.purple)
                }

                ProgressView(value: Double(profile.maxCompletedTier), total: 5)
                    .tint(JoyMatcherColors.purple)
            }
            .padding(.horizontal, 12)

            // Action Button
            Button("Show Interest") {
                // Action
            }
            .buttonStyle(JMPrimaryButtonStyle())
            .padding(.horizontal, 12)
        }
        .padding(12)
        .background(Color.white)
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.1), radius: 8, y: 4)
    }
}
```

### Android Profile Card

```kotlin
// Android Profile Card
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
            // Profile Image
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
                                style = JoyMatcherTypography.caption.copy(
                                    color = Color.White,
                                    fontWeight = FontWeight.Medium
                                )
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Profile Info
            Text(
                text = "${profile.firstName} ${profile.lastInitial}., ${profile.age}",
                style = JoyMatcherTypography.h4.copy(color = JoyMatcherColors.Gray900)
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
                    style = JoyMatcherTypography.bodySmall.copy(
                        color = JoyMatcherColors.Gray600
                    )
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
                    style = JoyMatcherTypography.bodySmall.copy(
                        color = JoyMatcherColors.Gray600
                    )
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Tier Progress
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "Tier Progress",
                        style = JoyMatcherTypography.caption.copy(
                            color = JoyMatcherColors.Gray500
                        )
                    )
                    Text(
                        text = "Tier ${profile.maxCompletedTier} Complete",
                        style = JoyMatcherTypography.caption.copy(
                            color = JoyMatcherColors.Purple,
                            fontWeight = FontWeight.Medium
                        )
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                LinearProgressIndicator(
                    progress = profile.maxCompletedTier / 5f,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(8.dp)
                        .clip(RoundedCornerShape(4.dp)),
                    color = JoyMatcherColors.Purple,
                    trackColor = JoyMatcherColors.Gray200
                )
            }

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

---

## Navigation

### iOS Tab Bar

```swift
// iOS Tab Bar (Bottom Navigation)
TabView {
    DiscoverView()
        .tabItem {
            Label("Discover", systemImage: "person.2.fill")
        }

    InterestsView()
        .tabItem {
            Label("Interests", systemImage: "heart.fill")
        }
        .badge(3)  // Notification badge

    MessagesView()
        .tabItem {
            Label("Messages", systemImage: "message.fill")
        }

    AccountView()
        .tabItem {
            Label("Account", systemImage: "person.crop.circle.fill")
        }
}
.accentColor(JoyMatcherColors.purple)
```

### Android Bottom Navigation

```kotlin
// Android Bottom Navigation
@Composable
fun JMBottomNavigation(
    selectedTab: BottomNavItem,
    onTabSelected: (BottomNavItem) -> Unit
) {
    NavigationBar(
        containerColor = Color.White,
        contentColor = JoyMatcherColors.Purple
    ) {
        NavigationBarItem(
            icon = {
                Icon(
                    imageVector = Icons.Default.Explore,
                    contentDescription = "Discover"
                )
            },
            label = { Text("Discover") },
            selected = selectedTab == BottomNavItem.Discover,
            onClick = { onTabSelected(BottomNavItem.Discover) }
        )

        NavigationBarItem(
            icon = {
                BadgedBox(
                    badge = {
                        if (notificationCount > 0) {
                            Badge { Text(notificationCount.toString()) }
                        }
                    }
                ) {
                    Icon(
                        imageVector = Icons.Default.Favorite,
                        contentDescription = "Interests"
                    )
                }
            },
            label = { Text("Interests") },
            selected = selectedTab == BottomNavItem.Interests,
            onClick = { onTabSelected(BottomNavItem.Interests) }
        )

        NavigationBarItem(
            icon = {
                Icon(
                    imageVector = Icons.Default.Message,
                    contentDescription = "Messages"
                )
            },
            label = { Text("Messages") },
            selected = selectedTab == BottomNavItem.Messages,
            onClick = { onTabSelected(BottomNavItem.Messages) }
        )

        NavigationBarItem(
            icon = {
                Icon(
                    imageVector = Icons.Default.AccountCircle,
                    contentDescription = "Account"
                )
            },
            label = { Text("Account") },
            selected = selectedTab == BottomNavItem.Account,
            onClick = { onTabSelected(BottomNavItem.Account) }
        )
    }
}
```

---

## Modals & Sheets

### iOS Sheet

```swift
// iOS Bottom Sheet
@State private var showingModal = false

Button("Request Details") {
    showingModal = true
}
.sheet(isPresented: $showingModal) {
    VStack(spacing: 20) {
        // Handle Bar
        RoundedRectangle(cornerRadius: 2.5)
            .fill(Color.gray.opacity(0.3))
            .frame(width: 40, height: 5)
            .padding(.top, 8)

        // Modal Content
        VStack(alignment: .leading, spacing: 16) {
            Text("Request Details Access")
                .font(.custom("Georgia-Bold", size: 24))
                .foregroundColor(JoyMatcherColors.gray900)

            Text("You are requesting access to Emmanuel A.'s Tier 3 data (Relationships & Family). In return, you must grant Emmanuel access to your Tier 3 data.")
                .font(.system(size: 15))
                .foregroundColor(JoyMatcherColors.gray700)
                .fixedSize(horizontal: false, vertical: true)

            // Action Buttons
            Button("Send Request") {
                // Action
                showingModal = false
            }
            .buttonStyle(JMPrimaryButtonStyle())

            Button("Cancel") {
                showingModal = false
            }
            .buttonStyle(JMSecondaryButtonStyle())
        }
        .padding()

        Spacer()
    }
    .presentationDetents([.medium, .large])
    .presentationDragIndicator(.visible)
}
```

### Android Modal Bottom Sheet

```kotlin
// Android Modal Bottom Sheet
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RequestDetailsSheet(
    onDismiss: () -> Unit,
    onConfirm: () -> Unit
) {
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = rememberModalBottomSheetState()
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp)
        ) {
            Text(
                text = "Request Details Access",
                style = JoyMatcherTypography.h3.copy(
                    color = JoyMatcherColors.Gray900
                )
            )

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "You are requesting access to Emmanuel A.'s Tier 3 data (Relationships & Family). In return, you must grant Emmanuel access to your Tier 3 data.",
                style = JoyMatcherTypography.bodyDefault.copy(
                    color = JoyMatcherColors.Gray700
                )
            )

            Spacer(modifier = Modifier.height(24.dp))

            JMPrimaryButton(
                text = "Send Request",
                onClick = {
                    onConfirm()
                    onDismiss()
                }
            )

            Spacer(modifier = Modifier.height(12.dp))

            JMSecondaryButton(
                text = "Cancel",
                onClick = onDismiss
            )

            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}
```

---

## Spacing System

### iOS Spacing (Points)

```swift
struct Spacing {
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 12
    static let lg: CGFloat = 16
    static let xl: CGFloat = 24
    static let xxl: CGFloat = 32
    static let xxxl: CGFloat = 48
}
```

### Android Spacing (DP)

```kotlin
object Spacing {
    val xs = 4.dp
    val sm = 8.dp
    val md = 12.dp
    val lg = 16.dp
    val xl = 24.dp
    val xxl = 32.dp
    val xxxl = 48.dp
}
```

---

## Platform-Specific Patterns

### iOS-Specific Components

**1. Navigation Bar (Top)**
```swift
NavigationView {
    ScrollView {
        // Content
    }
    .navigationTitle("Discover")
    .navigationBarTitleDisplayMode(.large)
    .toolbar {
        ToolbarItem(placement: .navigationBarTrailing) {
            Button(action: {}) {
                Image(systemName: "slider.horizontal.3")
            }
        }
    }
}
```

**2. Swipe Actions**
```swift
List {
    ForEach(interests) { interest in
        InterestRow(interest: interest)
            .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                Button(role: .destructive) {
                    // Delete action
                } label: {
                    Label("Delete", systemImage: "trash")
                }
            }
    }
}
```

**3. Context Menu (Long Press)**
```swift
ProfileCard(profile: profile)
    .contextMenu {
        Button {
            // Report action
        } label: {
            Label("Report User", systemImage: "exclamationmark.triangle")
        }

        Button {
            // Block action
        } label: {
            Label("Block User", systemImage: "hand.raised")
        }
    }
```

---

### Android-Specific Components

**1. Top App Bar**
```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DiscoverTopBar(
    onFilterClick: () -> Unit
) {
    TopAppBar(
        title = { Text("Discover") },
        actions = {
            IconButton(onClick = onFilterClick) {
                Icon(
                    imageVector = Icons.Default.FilterList,
                    contentDescription = "Filter"
                )
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = Color.White,
            titleContentColor = JoyMatcherColors.Gray900
        )
    )
}
```

**2. Floating Action Button**
```kotlin
FloatingActionButton(
    onClick = { /* Action */ },
    containerColor = JoyMatcherColors.Purple,
    contentColor = Color.White
) {
    Icon(
        imageVector = Icons.Default.Add,
        contentDescription = "Add"
    )
}
```

**3. Snackbar (Android Toast Alternative)**
```kotlin
val snackbarHostState = remember { SnackbarHostState() }

LaunchedEffect(key1 = showSnackbar) {
    if (showSnackbar) {
        snackbarHostState.showSnackbar(
            message = "Interest sent successfully",
            actionLabel = "Undo",
            duration = SnackbarDuration.Short
        )
    }
}

SnackbarHost(hostState = snackbarHostState) { data ->
    Snackbar(
        snackbarData = data,
        containerColor = JoyMatcherColors.Success,
        contentColor = Color.White
    )
}
```

---

## Animation Guidelines

### iOS Animations

```swift
// Fade In Animation
withAnimation(.easeIn(duration: 0.3)) {
    opacity = 1.0
}

// Scale Animation (Button Press)
.scaleEffect(isPressed ? 0.95 : 1.0)
.animation(.spring(response: 0.3, dampingFraction: 0.6), value: isPressed)

// Slide Transition
.transition(.move(edge: .trailing))
```

### Android Animations

```kotlin
// Fade In Animation
AnimatedVisibility(
    visible = visible,
    enter = fadeIn(animationSpec = tween(300)),
    exit = fadeOut(animationSpec = tween(300))
) {
    // Content
}

// Scale Animation
val scale by animateFloatAsState(
    targetValue = if (isPressed) 0.95f else 1f,
    animationSpec = spring(dampingRatio = 0.6f)
)

modifier = Modifier.scale(scale)

// Slide Transition
AnimatedVisibility(
    visible = visible,
    enter = slideInHorizontally(
        initialOffsetX = { fullWidth -> fullWidth },
        animationSpec = tween(300)
    ),
    exit = slideOutHorizontally(
        targetOffsetX = { fullWidth -> fullWidth },
        animationSpec = tween(300)
    )
) {
    // Content
}
```

---

## Accessibility

### iOS Accessibility

```swift
// VoiceOver Support
Text("Show Interest")
    .accessibilityLabel("Show interest in Chidinma's profile")
    .accessibilityHint("Double tap to send an interest request")

// Dynamic Type Support (Respect user's text size settings)
Text("Tier 1: Identity & Intent")
    .font(.custom("Georgia-Bold", size: 20))
    .dynamicTypeSize(.large)  // Allows text to scale

// Minimum Touch Target (44x44 points)
Button(action: {}) {
    Image(systemName: "heart.fill")
}
.frame(minWidth: 44, minHeight: 44)
```

### Android Accessibility

```kotlin
// TalkBack Support
Text(
    text = "Show Interest",
    modifier = Modifier.semantics {
        contentDescription = "Show interest in Chidinma's profile"
        role = Role.Button
    }
)

// Minimum Touch Target (48x48 dp)
IconButton(
    onClick = {},
    modifier = Modifier.size(48.dp)
) {
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "Like"
    )
}

// Text Scaling Support
Text(
    text = "Tier 1: Identity & Intent",
    style = JoyMatcherTypography.h4,
    maxLines = 2,
    overflow = TextOverflow.Ellipsis
)
```

---

## Dark Mode Support

### iOS Dark Mode

```swift
// Color Sets (automatically adapt)
extension Color {
    static let jmBackground = Color("Background")  // Adapts to light/dark
    static let jmText = Color("TextPrimary")       // Adapts to light/dark
}

// Manual Override
@Environment(\.colorScheme) var colorScheme

var backgroundColor: Color {
    colorScheme == .dark ? JoyMatcherColors.gray900 : Color.white
}
```

### Android Dark Mode

```kotlin
// Theme Support
@Composable
fun JoyMatcherTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) {
        darkColorScheme(
            primary = JoyMatcherColors.Coral,
            onPrimary = Color.White,
            background = JoyMatcherColors.Gray900,
            onBackground = Color.White
        )
    } else {
        lightColorScheme(
            primary = JoyMatcherColors.Purple,
            onPrimary = Color.White,
            background = Color.White,
            onBackground = JoyMatcherColors.Gray900
        )
    }

    MaterialTheme(
        colorScheme = colors,
        typography = Typography,
        content = content
    )
}
```

---

## Performance Optimization

### Image Loading

**iOS (Using SDWebImage or Kingfisher):**
```swift
AsyncImage(url: URL(string: imageURL)) { phase in
    switch phase {
    case .empty:
        ProgressView()
    case .success(let image):
        image
            .resizable()
            .aspectRatio(contentMode: .fill)
    case .failure:
        Image(systemName: "photo")
            .foregroundColor(.gray)
    @unknown default:
        EmptyView()
    }
}
```

**Android (Using Coil):**
```kotlin
AsyncImage(
    model = ImageRequest.Builder(LocalContext.current)
        .data(imageURL)
        .crossfade(true)
        .build(),
    placeholder = painterResource(R.drawable.placeholder),
    error = painterResource(R.drawable.error),
    contentDescription = "Profile photo",
    modifier = Modifier.fillMaxSize()
)
```

---

## Related Documentation

- [Design System](design_system.md) - Overall design principles
- [HTML Implementation Guide](html_implementation_guide.md) - Web implementation
- [Component Library](component_library.md) - Component specifications
- [Accessibility Patterns](accessibility_patterns.md) - WCAG 2.1 AA compliance
- [Responsive Design](responsive_design.md) - Breakpoints and layouts

---

**Document Owner:** Mobile Design Lead & iOS/Android Leads
**Last Updated:** 2026-02-27
**Next Review:** Weekly during mobile development
