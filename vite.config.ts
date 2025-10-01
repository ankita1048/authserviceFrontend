import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'authMicrofrontend',
      filename: 'remoteEntry.js',
      exposes: {
        "./useAuthValidation": "./src/hooks/useAuthValidation.ts",
        "./uselogin": "./src/hooks/uselogin.ts",
        './AuthProvider': './src/components/AuthConfigProvider.tsx',
      },
      shared: ['react', 'react-dom', 'react-hook-form']
    })
  ]
}); 