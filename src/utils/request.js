// utils/request.js
import axios from 'axios'

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
    // 请求拦截器
    this.instance.interceptors.request.use(
        config => {
          // 可以从 localStorage 或 cookie 获取 token
          const token = localStorage.getItem('token')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
          return config
        },
        error => {
          return Promise.reject(error)
        }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
        response => {
          // 根据后端返回的数据结构进行调整
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

  // 错误处理
  handleError(error) {
    let errorMessage = '请求错误'

    if (error.response) {
      // 请求已发出，服务器返回状态码不在 2xx 范围内
      const { status, data } = error.response

      switch (status) {
        case 401:
          errorMessage = '未授权，请登录'
          // 跳转到登录页
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
      // 请求已发出但没有收到响应
      errorMessage = '网络错误，请检查网络连接'
    } else {
      // 发送请求时出错
      errorMessage = error.message || '未知错误'
    }

    this.showError(errorMessage)
  }

  // 显示错误信息（可根据项目使用不同的UI提示）
  showError(message) {
    console.error(message)
    // 这里可以使用 alert 或集成 UI 框架的提示组件
    if (typeof window !== 'undefined') {
      alert(message)
    }
  }

  // 封装请求方法
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

  // 上传文件
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
const request = new Request( '/api')

export default request