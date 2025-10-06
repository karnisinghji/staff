import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: '/staff/', // GitHub Pages deployment path
    build: {
      outDir: 'dist',
      sourcemap: true,
      // Ensure proper SPA routing for GitHub Pages
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    define: {
      __VITE_ENV__: JSON.stringify(env),
    },
    server: {
      // Local development settings
      port: 5173,
      host: true
    }
  };
});
