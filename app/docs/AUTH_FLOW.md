# Authentication Flow with Supabase

This document explains how authentication works in the IntervuAI app, particularly focusing on email verification and deep linking.

## Overview

The app uses Supabase for authentication, which requires email verification by default. To support this, we've implemented deep linking to handle the verification process smoothly.

## Deep Linking Setup

### URL Scheme

The app uses the custom URL scheme `IntervuAI://` for deep linking. When a user clicks on a verification link in their email, the app will be opened with the verification data.

### Configuration Files

- **app.config.js**: Contains the deep linking configuration for Expo
- **ios/IntervuAI/Info.plist**: Contains the URL scheme for iOS
- **android/app/src/main/AndroidManifest.xml**: Contains intent filters for Android deep linking (configured via app.config.js)

## Authentication Flow

1. **Registration**: 
   - User enters their details in the RegisterScreen
   - The app calls `supabase.auth.signUp()` with `emailRedirectTo` set to our deep link URL
   - Supabase sends a verification email to the user

2. **Email Verification**:
   - User clicks the verification link in their email
   - The device opens the IntervuAI app with the verification token in the URL
   - Our deep linking handler in App.js processes the URL and extracts the tokens
   - The app calls `supabase.auth.setSession()` with the extracted tokens
   - The user is now verified and logged in

3. **Password Reset**:
   - Similar flow to email verification, but triggered by the Forgot Password screen
   - User receives an email with a password reset link
   - The app processes the reset link using the same deep linking infrastructure

## Implementation Details

### Deep Link URL Format

The deep link URL is: `IntervuAI://auth/callback`

### Deep Link Handling

When the app receives a deep link, it:

1. Extracts access and refresh tokens from the URL
2. Uses these tokens to set or refresh the Supabase session
3. Updates the authentication context accordingly

## Testing Authentication

During development, you have two options:

1. **Test with email verification**: Use real email addresses and check that verification works correctly
2. **Disable email verification**: In the Supabase Dashboard, go to Authentication > Providers > Email and uncheck "Enable email confirmations"

## Troubleshooting

### Common Issues

1. **Deep links not working on iOS**: Ensure the URL scheme is correctly added to Info.plist
2. **Deep links not working on Android**: Check the intent filters in AndroidManifest.xml
3. **Verification link not working**: Ensure the redirectTo URL matches exactly with your app's deep link configuration

### Debugging Deep Links

To debug deep links:
- On iOS: `xcrun simctl openurl booted IntervuAI://auth/callback?access_token=test&refresh_token=test`
- On Android: `adb shell am start -W -a android.intent.action.VIEW -d "IntervuAI://auth/callback?access_token=test&refresh_token=test" com.yourcompany.IntervuAI` 