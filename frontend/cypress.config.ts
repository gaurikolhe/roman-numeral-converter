import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://frontend:3000', // Default baseUrl for Docker
    setupNodeEvents(on, config) {
      // Override baseUrl with environment variable if set
      if (process.env.CYPRESS_baseUrl) {
        config.baseUrl = process.env.CYPRESS_baseUrl;
      }
      return config;
    },
  },
});