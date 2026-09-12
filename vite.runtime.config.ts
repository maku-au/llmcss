import { defineConfig } from 'vite';
import { resolve } from 'path';

// Standalone runtime for plain HTML pages: <script src="https://llmcss.io/llmcss.js" defer></script>
// Registers the light-DOM custom elements and the data-ai-* attribute engine.
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/runtime/index.ts'),
      name: 'LLMCSS',
      formats: ['iife'],
      fileName: () => 'llmcss.js',
    },
    minify: true,
  },
});
