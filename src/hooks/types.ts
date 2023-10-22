// useStorage
export interface storageReturn {
  set: (name: string, value: string) => void
  get: (name: string) => string | null
  remove: (name: string) => void
}

// useImageUrl
export interface useImgReturn {
  getUrl: (path: string) => string
}

// useChats
export type chartData = number | {
  value: string | number
  name: string
}
export interface chartsReturn {
  changeData: (data: chartData[]) => void
  addData: (data: chartData[]) => void
  destroy: () => void
}
