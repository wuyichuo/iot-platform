import axios, { type AxiosRequestConfig } from 'axios'
// import { useStorage } from '@/hooks/storageHooks'
import qs from 'query-string'

// const storage = useStorage()

const baseURL = import.meta.env.VITE_APP_API_URL // 服务地址
axios.defaults.timeout = 6000 // 超时时间

// 创建请求实例
const requestInstance = axios.create({
  baseURL,
  // headers: { access_token: storage.get('token') },
  headers: { access_token: '21y7t8y42174' },
  withCredentials: true // 跨域
})

// 封装请求方法
async function MyRequest<T = any, D = any> (config: AxiosRequestConfig<D>): Promise<T> {
  return await new Promise((resolve, reject) => {
    const { ...restConfig } = config
    requestInstance.request({
      ...restConfig,
      // GET参数序列化
      paramsSerializer (params: any): string {
        return qs.stringify(params)
      }
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        console.log(res)
        // if (rawResponse) {
        //   resolve(resp.data)
        // }
        // if (resp.data?.status === true) {
        //   resolve(resp.data.data)
        // }
        // if (typeof resp.data !== 'object') {
        //   reject(new Error(resp.data))
        // }
      } else if (res.status === 500) {
        reject(new Error('后端错误'))
      } else {
        reject(new Error('网络错误, 请稍后重试!'))
      }
    }).catch((err) => {
      console.log(err)
      reject(new Error('网络错误, 请稍后重试!'))
    //   if (err instanceof AxiosError) {
    //     if (err.response?.data) {
    //       if (typeof err.response.data !== 'object') {
    //         reject(new Error(err.response.data))
    //       }
    //       reject(err.response.data)
    //     } else {
    //       reject(err)
    //     }
    //   } else {
    //     reject(err)
    //   }
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

MyRequest.delete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return await MyRequest<T>({ ...config, method: 'delete', url })
}

export { MyRequest }
