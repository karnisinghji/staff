import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  // Auto-detect deployment platform
  // Netlify: use root path
  // GitHub Pages: use /staff/ subdirectory
  const base = process.env.NETLIFY ? '/' : '/staff/';

  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    define: {
      __VITE_ENV__: JSON.stringify(env),
    },
  };
});