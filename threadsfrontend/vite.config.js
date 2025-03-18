import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@reduxjs/toolkit', 'react-redux'], 
  },
  server :{
    proxy : { //Prevention of CORS error
      "/api":{
        target : "http://localhost:3001",
        changeOrigin : true ,
        secure : false
      },
    },
  },
});
