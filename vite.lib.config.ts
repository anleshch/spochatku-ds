import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Library build for the Spochatku site: `npm run build:lib` → dist/index.js + dist/styles.css.
// React, React DOM and lucide-react come from the site, so they are not bundled.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/lib.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    rolldownOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^lucide-react($|\/)/],
    },
  },
})
