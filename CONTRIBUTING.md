# Contributing Guidelines

## Setting up a development environment

The following instructions apply to both iOS and Android mobile apps. On macOS, we recommend using [Homebrew](https://brew.sh/) as a package manager.

### How to run

To install NVM using Homebrew, open a terminal and execute:

```sh
brew install nvm
```

### Install Watchman

To install Watchman using Homebrew, open a terminal and execute:

```sh
brew install watchman
```

### Install react-native-cli tools

```sh
npm -g install react-native-cli
```

### Install Ruby

A version of Ruby is automatically installed on macOS.

### Install Git

brew install git

### Additional setup for iOS

Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?ls=1&mt=12) to build and run the app on iOS. The minimum required version is 11.0.

### Additional setup for iOS on M1 macs

1. Follow the [React Native environment](https://reactnative.dev/docs/environment-setup) setup docs until the <span style="background-color: #EAEAEA; color: #E30B5C">cocoapods</span> point, then stop.
2. Specify the correct version of Xcode in the terminal: <span style="background-color: #EAEAEA; color: #E30B5C">sudo xcode-select --switch /Applications/Xcode.app</span>
3. In the Rosetta terminal, change to the <span style="background-color: #EAEAEA; color: #E30B5C">love-story/ios</span> directory and run:

```sh
sudo arch -x86_64 gem install ffi
sudo gem install cocoapods
arch -x86_64 pod install
```

4. If you need to use the Xcode app (e.g., to build, sign, and transfer the app to an iOS device), be sure to start it in Rosetta mode.

### Additional setup for Android

Download and install Android Studio or Android SDK CLI tools

Download and install the [Android Studio](https://developer.android.com/studio/index.html#downloads) app or the Android SDK command line tools

### Environment variables

On Mac, this usually requires adding the following lines to your <span style="background-color: #EAEAEA; color: #E30B5C">vim ~/.zshrc</span> file:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$PATH
```

Then reload your bash configuration:

```sh
source ~/.zshenv
```

> Note:
> Depending on the shell you’re using, this might need to be put into a different file such as ~/.bash_profile. Adjust this accordingly.

### Install the SDKs and SDK tools

In the SDK Manager using Android Studio or the [Android SDK command line tool](https://developer.android.com/tools/sdkmanager), ensure the following are installed:

-   Android SDK Build-Tools 31
-   Android Emulator
-   Android SDK Platform-Tools
-   Android SDK Tools
-   Google Play services
-   Intel x86 Emulator Accelerator (HAXM installer)
-   Support Repository
    -   Android Support Repository
    -   Google Repository
-   SDK Platforms (you may have to select Show Package Details to expand packages)

    -   Android 12 or above
        -   Google APIs
        -   SDK Platform
            -   Android SDK Platform 31 or above
        -   Intel or Google Play Intel x86 Atom_64 System Image
    -   Any other API version that you want to test

### Obtain the source code

1. Fork the love-story repository on GitHub.
2. Clone your fork locally:

-   Open a terminal
-   Change to a directory you want to hold your local copy
-   Run git clone https://github.com/loyal-ki/love-story.git if you want to use HTTPS, or git clone git@github.com:loyal-ki/love-story.git if you want to use SSH

3. Change the directory to love-story.

```sh
cd love-story
```

4. Install the project dependencies with:

```sh
yarn all
```

### Run the LoveStory mobile app

We provide a set of scripts to help you run the app for the different platforms that are executed with npm/yarn:

-   **yarn start**: Start the React Native packager. The packager has to be running in order to build the JavaScript code that powers the app.
-   **yarn android**: Compile and run the mobile app on Android.
-   **yarn ios**: Compile and run the mobile app on IOS.

To speed up development, only compile and run the apps in the following cases:

```sh
"adb": "adb reverse tcp:8081 tcp:8081",
"all": "watchman watch-del-all && rm -rf yarn.lock && rm -rf node_modules/ && rm -fr $TMPDIR/metro* && yarn install",
"android": "react-native run-android",
"eslint": "eslint --quiet --ext js,jsx,ts,tsx app --fix",
"fix": "prettier --write \"{app,src,modules}/**/*.{ts,tsx}\"",
"git-clean": "git config --local filter.turnOfDebugging.clean 'sed \"s/= true/= false/\"'",
"git-hide": "git update-index --skip-worktree packages/core/services/sender/getUrlForPath.ts",
"git-pull-rebase": "git config --local pull.rebase true",
"git-smudge": "git config --local filter.turnOfDebugging.smudge 'sed \"s/= true/= false/\"'",
"git-unhide": "git update-index --no-skip-worktree packages/core/services/sender/getUrlForPath.ts",
"ios": "react-native run-ios",
"ios-14": "react-native run-ios --simulator=\"iPhone 14 \"",
"ios-gems": "cd ios && bundle install",
"kill": "kill $(lsof -ti:8081)",
"lint": "tsc && eslint --quiet --ext js,jsx,ts,tsx app && jest",
"sort": "npx sort-package-json",
"start": "react-native start",
"test": "jest",
"test-no-cache": "jest --no-cache",
"visualize": "./node_modules/.bin/react-native-bundle-visualizer",
"postinstall": "patch-package"
```

### Run on a device

By default, running the app will launch an Android emulator (if you created one) or an iOS simulator.

### Android

1. Enable debugging over USB

    Most Android devices can only install and run apps downloaded from Google Play, by default. You will need to enable USB Debugging on your device in order to install your app during development.

    To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to Settings → About phone → Software information and then tapping the Build number row at the bottom seven times. You can then go back to Settings → Developer options to enable "USB debugging".

2. Plug in your device via USB

    To find the device name, run the following adb command:

```sh
$ adb devices

List of devices attached
abc1234    device
```

3. Compile and run

```sh
yarn android
```

4. Connecting to the development server

    Run the following in a command prompt:

```sh
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

### IOS

1. Get an Apple Developer account

    The apps that run on an iOS device must be signed. To sign it, you’ll need a set of provisioning profiles. If you already have an Apple Developer account enrolled in the Apple Developer program you can skip this step. If you don’t have an account yet you’ll need to [create one](https://appleid.apple.com/account?appId=632&returnUrl=https%3A%2F%2Fdeveloper.apple.com%2Faccount%2F#!&page=create) and enroll in the [Apple Developer Program](https://developer.apple.com/programs/).

2. Open the project in Xcode

    Navigate to the $\textcolor{magenta}{\textsf{ios}}$ folder in your love_story project, then open the file love_story_typescript.xcworkspace in Xcode.

3. Configure code signing and capabilities

Select the **LoveStory** project in the Xcode Project Navigator, then select the **LoveStory** target. Look for the **Signing & Capabilities** tab.

-   Go to the **Signing** section and make sure your Apple developer account or team is selected under the Team dropdown and change the [Bundle Identifier](https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids). Xcode will register your provisioning profiles in your account for the Bundle Identifier you’ve entered if it doesn’t exist.
-   Go to the **App Groups** section and change the [App Groups](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_security_application-groups?language=objc). Xcode will register your AppGroupId and update the provision profile.
-   Go to the **iCloud** section and change the [Containers](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_icloud-container-identifiers?language=objc). Xcode will register your iCloud container and update the provision profile.
-   Go to the **Keychain Sharing** section and change the [Keychain Groups](https://developer.apple.com/documentation/bundleresources/entitlements/keychain-access-groups?language=objc). Xcode will register your Keychain access groups and update the provision profile.

4. Compile and run

    Plug in your iOS device in any available USB port in your development computer.

    If everything is set up correctly, your device will be listed as the build target in the Xcode toolbar, and it will also appear in the Devices Pane (⇧⌘2). You can press the **Build and run** button (⌘R) or select **Run** from the Product menu to run the app.

> Note:
> If you run into any issues, please take a look at Apple’s [Launching Your App on a Device](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4) documentation. If the app fails to build, go to the Product menu and select Clean Build Folder before trying to build the app again. Also, be sure that your iOS device is trusted so app deployments can proceed.
