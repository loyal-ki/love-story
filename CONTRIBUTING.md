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

Note:
Depending on the shell you’re using, this might need to be put into a different file such as ~/.bash_profile. Adjust this accordingly.

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

4. Install the project dependencies with <span style="background-color: #EAEAEA; color: #E30B5C">yarn install</span>
