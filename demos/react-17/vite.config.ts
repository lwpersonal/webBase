import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    root: './',
    base: '/',
    publicDir: 'public',
    build: {
      rollupOptions: {
        input: {
          test: path.resolve(__dirname, './test/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@test': path.resolve(__dirname, './test'),
      },
    },
    server: {
      host: 'localhost',
      port: 9001,
      open: true,
      proxy: {},
    },
    plugins: [react()],
  };
});
