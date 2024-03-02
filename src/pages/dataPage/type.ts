import { type ReactNode } from 'react'

export interface chartData {
  value: string[] | number[]
  date: string[] | number[]
}

export interface ScreenProps {
  layout: LayoutType[]
  isEditing: boolean
  changeLayout: (layout: LayoutType[]) => void
  children: ReactNode
}

export interface LayoutType {
  i: string
  x: number
  y: number
  w: number
  h: number
}

export interface DevicesType {
  name: string
  id: number
}

export interface ViewType extends DevicesType {
  layout: LayoutType
}

export interface EditViewParams {
  devices: DevicesType[]
  layout: LayoutType[]
}
