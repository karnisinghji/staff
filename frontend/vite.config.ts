import { defineConfig } from 'vite'import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react'import react from '@vitejs/plugin-react';



export default defineConfig({
  export default defineConfig({

    plugins: [react()], plugins: [react()],

    base: '/staff/'  base: '/staff/',

  })  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});