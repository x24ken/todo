import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pagesの場合のみ base pathを設定
  base: process.env.GITHUB_PAGES === 'true' ? '/todo/' : '/',
})
