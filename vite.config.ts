import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        components: resolve(__dirname, 'components.html'),
        templates: resolve(__dirname, 'templates.html'),
        account: resolve(__dirname, 'account.html'),
        quickstart: resolve(__dirname, 'quickstart.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  }
});
