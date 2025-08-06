import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/Siritori/",
  root: '.',
  server: {
    port: 5173
  }
})
