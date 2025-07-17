import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) // 加载环境变量

  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL , // 使用加载的环境变量
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})