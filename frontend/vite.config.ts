import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/staff/' : '/',
  server: {
    proxy: {
      '/api/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/api/matching': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
      },
      '/api/user': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
      },
      '/api/communication': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        secure: false,
      },
      '/api/notification': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
