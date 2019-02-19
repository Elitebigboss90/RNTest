# RNTest

#### Table of Contents

- [Setting Up Visual Studio Code](#settingupvscode)
- [Installation](#installation)
- [Running the Application](#runningapp)
- [CocoaPods](#cocoaPods)

#### Other Important pages

- [Code Structure and Folder Architecture](docs/folder.md)
- [Navigation Achitecture](docs/navigation.md)

<a name="settingupvscode"/>

## Setting Up Visual Studio Code

Once you have Visual Studio Code, make sure it is closed before opening this project. Upon opening this project you will be greeting with two popups. One will ask you to install the recommended extensions. Hit yes. The other will be asking you to open this project in a workspace. Also hit yes. You can check if you installed all the correct extensions by checking the extension tab and seeing that there is no more recommended extensions except for the Atom Keymap. If you want to you can install that too.

<a name="installation"/>

## Installation

1. Install yarn

`$ brew update && brew install yarn`

or

`$ brew install yarn --without-node` (nvm environment)

2. Install react-native-debugger

`$ brew cask install react-native-debugger`

3. After cloning this project, run `yarn` within the project root to install all dependencies.

<a name="runningapp"/>

### Running the Application

#### IOS

Note: Requires macOS.

##### Device

Connect your android device to computer via a usb cable.

Open the project in Xcode `open ios/RNTest.xcworkspace`

Select the device in Xcode.

Run and build.

##### Simulator

In a terminal, run the command `yarn ios` which will start up an ios emulator.

#### Android

##### Device

Connect your android device to computer via a usb cable.

Turn the developer options under settings on.

Open a terminal and navigate to the root of this project.

Run the command `yarn start`

In another terminal, run the command `yarn android` which will start the app on the connected device.

##### Emulator

Install or open up Android Studio IDE.

Select the android folder in this project as the Android Studio project

Add or open an emulator from the AVD manager setting.

Open a terminal and navigate to the root of this project.

Run the command `yarn start`

In another terminal, run the command `yarn android` which will start the app in the emulator.


<a name="cocoapods"/>

### CocoaPods
I am using CocoaPods to manage all the libraries for iOS. I don't suggest using react-native link to perform auto link. Using Pods and also for the library doesn't support pods, we can create podspec by hands.

using react-native-biometrics as example

```javascript
try {
  const removedSrc = path.resolve(
    __dirname,
    "../../node_modules/react-native-biometrics/react-native-biometrics.podspec",
  );

  fs.unlinkSync(removedSrc);
} catch (e) {}

const src = path.resolve(
  __dirname,
  "./react-native-biometrics/RCTBiometrics.podspec",
);
const dest = path.resolve(
  __dirname,
  "../../node_modules/react-native-biometrics/RCTBiometrics.podspec",
);

fs.copySync(src, dest);

console.log("* Patched biometrics");
```