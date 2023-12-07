import { type ReactNode } from 'react'

export interface ViewConfigType {
  id: string
  name: string
  x: number
  y: number
  w: number
  h: number
}

export interface LayoutType {
  i: string
  x: number
  y: number
  w: number
  h: number
}

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
