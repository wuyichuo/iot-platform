import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { useStorage } from '@/hooks/storageHooks'
import qs from 'query-string'

const storage = useStorage()

// 服务地址
const baseURL = '/api/IotPlatform'

// 设置请求超时时间为 6000 毫秒
axios.defaults.timeout = 6000

// 创建请求实例
const requestInstance = axios.create({
  baseURL
})

/**
 * 封装请求方法
 * @param {AxiosRequestConfig<D>} config 请求配置
 * @returns {Promise<T>} 请求结果的 Promise
 */
async function MyRequest<T = any, D = any> (config: AxiosRequestConfig<D>): Promise<T> {
  const token = storage.get('token')

  if (token === null && config.url !== '/public_key' && config.url !== '/login') {
    throw new Error('请登录')
  }

  return await new Promise((resolve, reject) => {
    const { ...restConfig } = config

    // 发送请求
    requestInstance.request({
      ...restConfig,
      headers: {
        ...restConfig.headers,
        access_token: token // 将 token 添加到请求头中
      },
      // GET 参数序列化
      paramsSerializer (params: any): string {
        return qs.stringify(params)
      }
    }).then((res) => {
      // 如果请求成功，则 resolve 结果
      if (res.status >= 200 && res.status < 300) {
        resolve(res.data)
      }
    }).catch((err) => {
      // 如果请求出现错误
      if (err instanceof AxiosError) {
        // 处理超时错误
        if (err.code === 'ECONNABORTED') {
          reject(new Error('请求超时'))
        } else if (err.response?.data !== undefined) {
          // 处理身份验证错误
          if (err.response.status === 401) {
            reject(new Error('请登录'))
          }
          // 如果响应数据不是对象，则 reject 错误
          if (typeof err.response.data !== 'object') {
            reject(new Error(err.response.data))
            return
          }
          // 否则 reject 响应数据
          reject(err.response.data)
        } else if (axios.isCancel(err)) {
          // 请求被取消
          console.log('Request canceled:', err.message)
        } else {
          // 其他错误情况，直接 reject
          reject(err)
        }
      } else {
        // 其他类型的错误，直接 reject
        reject(err)
      }
    })
  })
}

// 添加方法属性
MyRequest.get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return await MyRequest<T>({ ...config, method: 'get', url })
}

MyRequest.post = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return await MyRequest<T>({ ...config, method: 'post', url, data })
}

MyRequest.delete = async <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return await MyRequest<T>({ ...config, method: 'delete', url, params })
}

export { MyRequest }
