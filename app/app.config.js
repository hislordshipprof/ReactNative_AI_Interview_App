import 'dotenv/config';

export default {
  name: 'IntervuAI',
  slug: 'intervuai',
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
    bundleIdentifier: 'com.yourcompany.intervuai'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#06B6D4'
    },
    package: 'com.yourcompany.intervuai',
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: "intervuai",
          },
          {
            scheme: "https",
            host: "*.supabase.co",
            pathPrefix: "/auth/v1/callback",
          }
        ],
        category: ["BROWSABLE", "DEFAULT"],
      }
    ],
    buildType: "apk",
    supportedArchitectures: ["armeabi-v7a"]
  },
  web: {
    favicon: './assets/favicon.png'
  },
  scheme: "intervuai",
  plugins: [
    'expo-router'
  ],
  extra: {
    vapiWebToken: process.env.VAPI_WEB_TOKEN,
    vapiWorkflowId: process.env.VAPI_WORKFLOW_ID,
    googleApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    baseUrl: process.env.BASE_URL,
    // Auth Redirect URL
    authRedirectUrl: process.env.AUTH_REDIRECT_URL,
    // Supabase Configuration
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    eas: {
      projectId: "your-project-id"
    }
  }
}; 