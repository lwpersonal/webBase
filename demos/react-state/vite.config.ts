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
          redux: path.resolve(__dirname, './redux/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@redux': path.resolve(__dirname, './redux'),
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
