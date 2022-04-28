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
          // renderNew: path.resolve(__dirname, './renderNew/index.html'),
          // renderOld: path.resolve(__dirname, './renderOld/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@comp': path.resolve(__dirname, './components'),
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
