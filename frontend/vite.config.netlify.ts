import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    // Use root base path for Netlify, /staff/ for GitHub Pages
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
