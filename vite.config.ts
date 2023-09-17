import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'; // 引入Node.js的URL模块
import path from 'path'; // 引入Node.js的path模块
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url); // 获取当前模块的文件路径
const __dirname = path.dirname(__filename); // 获取当前模块的目录路径

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'), // 使用 __dirname
    }
  }
})
