import { STORAGE_PREFIX, STORAGE_ISOLATION } from '@/config'
import { type storageReturn } from './types'

export function useStorage (): storageReturn {
  // 前缀，表示当前环境
  const NODE_ENV = import.meta.env.NODE_ENV ?? 'development'

  // 仅不启用存储隔离时添加环境前缀
  if (!STORAGE_ISOLATION) {
    sessionStorage.setItem('storageIsolation', '0')
  }

  // 存储操作：设置、获取、删除
  const set = (name: string, value: string): void => {
    const env = sessionStorage.getItem('storageIsolation') !== '0' ? '' : `${NODE_ENV}_`
    localStorage.setItem(`${env}${STORAGE_PREFIX}${name}`, value)
  }
  const get = (name: string): string | null => {
    const env = sessionStorage.getItem('storageIsolation') !== '0' ? '' : `${NODE_ENV}_`
    return localStorage.getItem(`${env}${STORAGE_PREFIX}${name}`)
  }
  const remove = (name: string): void => {
    const env = sessionStorage.getItem('storageIsolation') !== '0' ? '' : `${NODE_ENV}_`
    localStorage.removeItem(`${env}${STORAGE_PREFIX}${name}`)
  }

  return { set, get, remove }
}
