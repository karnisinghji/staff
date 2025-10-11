import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  // Use root path for Netlify deployment
  const base = '/';

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