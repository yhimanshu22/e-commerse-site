import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/': {
        target: 'https://e-commerse-site-m1a3.onrender.com', // Your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ''), // Remove /api prefix when forwarding
      },
    },
  },
});
