import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8'));

export default defineConfig({
  root: '.',
  define: {
    __LLMCSS_VERSION__: JSON.stringify(pkg.version),
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
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
