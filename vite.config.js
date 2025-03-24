import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@reduxjs/toolkit', 'react-redux'], 
  },
  build: {
    outDir: 'dist', 
  },
  server: {
    // proxy: {
    //   "/api": {
    //     target:  "http://localhost:3002",
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
    proxy: {
      "/api": "https://threads-backend-1-so4b.onrender.com",
    },
  },
  define: {
    "process.env": {}, // Helps avoid issues with environment variables
  }
});