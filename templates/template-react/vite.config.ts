import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: '/',
    publicDir: 'public',
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
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
