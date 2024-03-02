export interface addDeviceProps {
  type: string
  location: {
    latitude: number
    longitude: number
  }
  name: string
}

export interface markType extends addDeviceProps {
  id: number
}

export interface deviceDetailProps {
  device: markType | null
  close: () => void
  afterDelete: () => void
}

export interface OperateDeviceProps {
  deviceId: number
  open: boolean
}
