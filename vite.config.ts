import { resolve } from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 4000 },
  build: { target: 'esnext' },
  plugins: [vue()],
  resolve: { alias: { '@': resolve(__dirname, './src/modules') } },
})
