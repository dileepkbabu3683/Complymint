import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Use the React plugin for JSX/TSX support
  plugins: [react()],
  // Ensures the build output is relative, which is often required for hosting services
  base: './' 
})