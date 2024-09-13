import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:3000', 
        changeOrigin: true,
      },
      '/session': {
        target: 'http://backend:3000',
        changeOrigin: true,
      },
      '/page-views': {
        target: 'http://backend:3000',
        changeOrigin: true,
      },
    },
  },
});
