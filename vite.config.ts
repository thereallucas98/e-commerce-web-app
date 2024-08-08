import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~/*': path.resolve(__dirname, './src/*'),
    },
  },
})
