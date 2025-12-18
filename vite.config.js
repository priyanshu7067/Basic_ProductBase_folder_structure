
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:6006,
    allowedHosts:['yekahaa.smartchainstudio.in','https://yekahaa.smartchainstudio.in','www.yekahaa.smartchainstudio.in','https://www.yekahaa.smartchainstudio.in', 'yakaawaonline.com','https://yakaawaonline.com','www.yakaawaonline.com','https://www.yakaawaonline.com']
  },
  preview:{
    port:6006,
    allowedHosts:['yekahaa.smartchainstudio.in','https://yekahaa.smartchainstudio.in','www.yekahaa.smartchainstudio.in','https://www.yekahaa.smartchainstudio.in', 'yakaawaonline.com','https://yakaawaonline.com','www.yakaawaonline.com','https://www.yakaawaonline.com']
  }
})