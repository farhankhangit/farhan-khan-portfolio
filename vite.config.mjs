import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No "type": "module" in package.json on purpose: api/contact.js is a Vercel
// serverless function that runs as CommonJS under Node. This config uses the
// .mjs extension so Vite still loads it as ESM.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
