// utils/request.js
import axios from 'axios'

// 从环境变量中获取 API 基础 URL
const baseURL = import.meta.env.VITE_API_BASE_URL

class Request {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 初始化拦截器
    this.setupInterceptors()
  }

  // 设置拦截器
  setupInterceptors() {
    this.instance.interceptors.request.use(
        config => {
          const token = localStorage.getItem('token')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
          return config
        },
        error => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
        response => {
          const { data } = response
          if (data.code && data.code !== 200) {
            this.showError(data.message || '请求失败')
            return Promise.reject(data)
          }
          return data
        },
        error => {
          this.handleError(error)
          return Promise.reject(error)
        }
    )
  }

  handleError(error) {
    let errorMessage = '请求错误'

    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          errorMessage = '未授权，请登录'
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
          break
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求地址不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = data?.message || `请求错误 ${status}`
      }
    } else if (error.request) {
      errorMessage = '网络错误，请检查网络连接'
    } else {
      errorMessage = error.message || '未知错误'
    }

    this.showError(errorMessage)
  }

  showError(message) {
    console.error(message)
    if (typeof window !== 'undefined') {
      alert(message)
    }
  }

  get(url, params, config = {}) {
    return this.instance.get(url, { params, ...config })
  }

  post(url, data, config = {}) {
    return this.instance.post(url, data, config)
  }

  put(url, data, config = {}) {
    return this.instance.put(url, data, config)
  }

  delete(url, params, config = {}) {
    return this.instance.delete(url, { params, ...config })
  }

  upload(url, file, config = {}) {
    const formData = new FormData()
    formData.append('file', file)
    return this.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
  }
}

// 创建请求实例
const request = new Request(baseURL)

export default request