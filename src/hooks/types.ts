export interface storageReturn {
  set: (name: string, value: string) => void
  get: (name: string) => string | null
  remove: (name: string) => void
}

export interface useImgReturn {
  getUrl: (path: string) => string
}
