import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/anime-records': {
            target: 'http://localhost:3002',
            changeOrigin: true,
        },
    },
},
})
