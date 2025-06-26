import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const url = "https://personal-anime-watchlist-backend.onrender.com";
// const url = "http://localhost:3002";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
        '/anime-records': {
            target: url,
            changeOrigin: true,
        }
    },
},
})
