import { type useImgReturn } from './types'

export default function useImageUrl (): useImgReturn {
  const getUrl = (path: string): string => {
    const moduleUrl = import.meta.url
    return new URL(`../assets/${path}`, moduleUrl).href
  }

  return { getUrl }
}
