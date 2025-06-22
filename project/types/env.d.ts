declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL?: string;
      EXPO_PUBLIC_API_KEY?: string;
      // Add other environment variables here as needed
    }
  }
}

// Ensure this file is treated as a module
export {};