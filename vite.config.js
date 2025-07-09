import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  // plugins: [vue()],
  plugins: [vue(), basicSsl()],
  server: {
    port: 5173, // 确保端口一致
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'certs/server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'certs/server.crt'))
    // },

    proxy: {
      // 代理所有以 /api 开头的请求
      '/api': {
        target: 'http://127.0.0.1:8080', // 后端服务器地址
        changeOrigin: true, // 是否改变请求源
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      }
    }
  }
})
