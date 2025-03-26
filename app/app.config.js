import 'dotenv/config';

export default {
  name: 'PrepWise',
  slug: 'prepwise',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#06B6D4'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourcompany.prepwise'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#06B6D4'
    },
    package: 'com.yourcompany.prepwise'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-router'
  ],
  extra: {
    // Add environment variables here
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    vapiWebToken: process.env.VAPI_WEB_TOKEN,
    vapiWorkflowId: process.env.VAPI_WORKFLOW_ID,
    googleApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    baseUrl: process.env.BASE_URL,
    eas: {
      projectId: "your-project-id"
    }
  }
}; 