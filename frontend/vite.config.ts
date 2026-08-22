import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { devApiPlugin } from './dev-api-plugin';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Server-side variables (DATABASE_URL, ADMIN_PASSWORD_HASH, SESSION_SECRET)
  // have no VITE_ prefix on purpose, so Vite keeps them out of the bundle. The
  // dev-only API handlers still need them, hence loading them into process.env.
  // Anything already set in the shell wins.
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), ''))) {
    process.env[key] ??= value;
  }

  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
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
  };
});
