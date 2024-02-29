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
