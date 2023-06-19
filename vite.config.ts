import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  base: '/hengtai',
  build: {
    outDir: './admin-back/public/hengtai'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // '/htdp': {
      //   // target: 'http://10.55.68.2:31345',
      //   target: 'http://ctoa.sc.yichang.gov.cn',
      //   changeOrigin: true,
      // },
      '/api': {
        target: 'http://192.168.28.21:8091',
        changeOrigin: true
      },
      '/hengtai/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      }
    }
  }
})
