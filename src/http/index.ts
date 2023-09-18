import axios, { AxiosError, type AxiosRequestConfig, AxiosResponse } from 'axios'
import { useStorage } from '@/hooks/storageHooks'
import qs from 'query-string'

const storage = useStorage()

const baseURL = import.meta.env.VITE_API_PREFIX // 服务地址
axios.defaults.timeout = 6000 // 超时时间

// 创建请求实例
const requestInstance = axios.create({
  baseURL,
  headers: { access_token: storage.get('token') },
  withCredentials: true // 跨域
})

// 封装请求方法
export async function request<T = any, D = any> (config: AxiosRequestConfig<D>): Promise<T> {
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
      } else {
        reject(new Error('网络错误, 请稍后重试!'))
      }
    }).catch((err) => {
      console.log(err)
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
