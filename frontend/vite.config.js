import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  server: {
    port:10000,
  },
  plugins: [vercel(),react(),tailwindcss()],
})



 
