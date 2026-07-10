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
    plugins: [react(), tailwindcss()],
    resolve:{
      alias: {
        '@': path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: Number(process.env.PORT) || 3000,
      open: !process.env.PORT,
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion': ['framer-motion'],
            'i18n': ['i18next', 'react-i18next'],
          },
        },
      },
    },
  }
})