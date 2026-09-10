import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/Doctor-Appointment-Frontend",
  plugins: [
    react(),
    tailwindcss(),
  ],
})
