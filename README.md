# ReactNative_AI_Interview_App
<div align="center">
  
  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react native" />
    <img src="https://img.shields.io/badge/-Expo-white?style=for-the-badge&color=000020&logo=expo" alt="expo" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=FFCA28" alt="firebase" />
    <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="vapi" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  </div>

  <h1 align="center">🚀 IntervuAI 🚀</h1>
  <h3 align="center">AI-powered interview preparation platform</h3>

 
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🔗 [Environment Variables](#environment-variables)
6. 📂 [Project Structure](#project-structure)
7. 🚀 [Deployment](#deployment)


## <a name="introduction">🤖 Introduction</a>

IntervuAI is a React Native mobile application that helps users prepare for job interviews through AI-powered mock interviews. The app uses voice AI technology (Vapi) to conduct realistic interview simulations and provides detailed feedback to help users improve their interview skills.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React Native with Expo
- TypeScript
- Firebase Authentication & Firestore
- Vapi AI for voice conversations
- React Navigation
- Tailwind CSS (NativeWind)
- Google Gemini for interview feedback

## <a name="features">🔋 Features</a>

👉 **User Authentication**: Secure sign up and sign in with email/password through Firebase

👉 **Customized Interviews**: Create interviews tailored to specific job positions and experience levels

👉 **AI Voice Interviews**: Realistic interview simulations with AI-powered voice conversations

👉 **Real-time Feedback**: Receive immediate feedback on your interview performance

👉 **Interview History**: Track your progress with a history of past interviews

👉 **Transcript & Analysis**: Review detailed transcripts and AI analysis of your responses

👉 **User-friendly Interface**: Intuitive and responsive design built with modern UI components

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally.

**Prerequisites**

- Node.js (v14.0 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

**Cloning the Repository**

```bash
git clone https://github.com/your-username/ReactNative_AI_Interview_App.git
cd ReactNative_AI_Interview_App/app
```

**Installation**

```bash
npm install
# or
yarn install
```

**Set Up Environment Variables**

Create a `.env` file in the app directory based on the `.env.example` template.

**Running the Development Server**

```bash
npm start
# or
yarn start
```

Then, you can run on your preferred platform:

```bash
npm run android
# or
npm run ios
# or
npm run web
```

## <a name="environment-variables">🔗 Environment Variables</a>

To run this project, you need to set up the following environment variables in a `.env` file:

```env
# Firebase Configuration
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id

# Vapi AI Voice Settings
VAPI_WEB_TOKEN=your-vapi-web-token
VAPI_WORKFLOW_ID=your-vapi-workflow-id

# Google Gemini API
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key

# App Base URL
BASE_URL=your-base-url
```

## <a name="project-structure">📂 Project Structure</a>

```
app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── context/         # React context providers
│   ├── services/        # API and Firebase services
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
├── assets/              # Images, fonts, etc.
├── App.js               # Main component
├── app.json             # Expo configuration
├── package.json         # Dependencies
└── tailwind.config.js   # TailwindCSS configuration
```

## <a name="deployment">🚀 Deployment</a>

**Expo Build**

Build your app for Android and iOS using Expo's build service:

```bash
expo build:android  # For Android
expo build:ios      # For iOS
```

**Firebase Setup**

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password) and Firestore Database
3. Add your app to the Firebase project and copy the configuration details
4. Update your `.env` file with the Firebase configuration

