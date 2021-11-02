import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    // root: path.resolve(__dirname, './public/'),
    base: '/',
    publicDir: 'public',
    resolve: {
      alias: {
        '@utils': path.resolve(__dirname, './utils'),
        '@scripts': path.resolve(__dirname, './scripts'),
      },
    },
    server: {
      host: 'localhost',
      port: 9999,
      open: true,
      proxy: {},
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      assetsInlineLimit: 4096,
      sourcemap: 'inline',
      emptyOutDir: false,
      lib: {
        entry: './index.ts',
        formats: ['es'],
        fileName: () => 'index.js',
      },
      // rollupOptions: {
      //   // 确保外部化处理那些你不想打包进库的依赖
      //   external: ['vue'],
      //   output: {
      //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //     globals: {
      //       vue: 'Vue',
      //     },
      //   },
      // },
    },
  };
});
