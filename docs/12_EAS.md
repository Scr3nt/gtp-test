# EAS (Expo Application Services) Setup and Build Guide

EAS (Expo Application Services) is a set of tools and services provided by Expo to streamline the process of building, testing, and deploying your Expo apps. This guide will walk you through the steps to set up EAS and build your app for different environments (development, staging, and production) on both Android and iOS platforms.

## 1. Install EAS

Install EAS CLI globally by running the following command:

```bash
npm install --global eas-cli
```

## 2. Log in with your Expo account

To use EAS, you need to log in with your Expo account. Open a terminal or command prompt and run the following command:

```bash
eas login
```

Follow the instructions to log in with your Expo account.

## 3. Configure the project

### Update the EAS Configuration

Next, configure EAS for your project by running the following commands:

```bash
eas update:configure
eas build:configure
```

Follow this documentation to set up multiple app variants (development, staging, and production) on your device: [Install app variants on the same device - Expo Documentation](https://docs.expo.dev/build-reference/variants/)

## 4. App Version Management

In app.json change the field `versionCode` in android then the field `version` and finally `runtimeVersion` and run `npx expo prebuild`

## 5. Build the app

You can build your app for different environments using EAS CLI.

Don't forget for **iOS** to add your device with `eas device:create`

### Build for Production

To build the app for production, run the following command:

```bash
eas build --profile production --platform all
```

### Build for Preview/Staging

To build the app for preview/staging, run the following command:

```bash
eas build --profile preview --platform all
```

### Build for Development

To build the app for development, run the following command:

```bash
eas build --profile development --platform all
```

## 6. Update the app

To update the app, use the `eas update` command followed by the branch name and a message describing the update. For example:

```bash
eas update --branch preview --message "Updating the app"
```

## 7. Submit the app

### For Android

Before submitting your app to the Google Play Store, you need to create a Google Service Account and obtain a JSON key. Refer to this documentation for instructions: [Creating a Google Service Account - Expo FYI](https://github.com/expo/fyi/blob/main/creating-google-service-account.md)

For the first app submission, you may need to perform a manual submission. Follow this documentation for guidance: [First Android Submission - Expo FYI](https://expo.fyi/first-android-submission)

Once you have the necessary setup, you can submit your app using the following command:

```bash
eas submit -p android
```

### For iOS

To submit your app to the Apple App Store, use the following command:

```bash
eas submit -p ios
```

Please note that you might need additional configuration for iOS app submission, such as certificates and provisioning profiles. Make sure to follow the Expo documentation for iOS app submission to ensure a smooth process.
