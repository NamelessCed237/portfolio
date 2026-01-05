import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
/* export default defineConfig({
  plugins: [react()],
}) */

export default defineConfig(({ command, mode }) => {
  console.log(`Vite command: ${command}, mode: ${mode}`);
  return {
    plugins: [react(), mode === 'development',tailwindcss()],
    resolve:{
      alias: {
        '@': path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
    },
  }
})