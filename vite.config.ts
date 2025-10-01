import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

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
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'), // <-- your main entry file
      name: 'authMicrofrontend',
      formats: ['es'], // export as ESM
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-hook-form'],
    },
  },
}); 