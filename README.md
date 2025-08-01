# Qada Prayers

**Qada Prayers** is a mobile application built with React Native and Expo, designed to help users keep track of their Qada prayers efficiently and easily. The app supports Over-The-Air (OTA) updates through Expo Application Services (EAS), allowing users to receive updates without reinstalling the app.

---

## Features

- Track pending and completed Qada prayers
- Intuitive user interface with light theme support
- Over-The-Air (OTA) updates using EAS Update
- Compatible with both Android and iOS devices
- Fast and smooth performance powered by React Native and Hermes engine

---

## Screenshots

_Add screenshots here to showcase your app UI_

---

## Technologies Used

- React Native
- Expo SDK 53
- Expo Updates (EAS Update)
- React Navigation (Drawer & Stack)
- TypeScript
- Hermes JavaScript engine

---

## Getting Started

### Prerequisites

- Node.js (>=16.x recommended)
- Yarn or npm
- Expo CLI or use `npx expo`
- EAS CLI for building and OTA updates (`npm install -g eas-cli`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mranonno/QudaPrayersMobile.git
cd qada-prayers

```

### Important Command

1. For OTA Update:

```bash
eas update --branch main --message "My OTA update message"
```

2. For Preview build

```bash
eas build --profile preview --platform android
```
