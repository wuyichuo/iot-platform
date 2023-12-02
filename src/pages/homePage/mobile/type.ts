export interface submitData {
  name: string
  type: string
  location: {
    latitude: number
    longitude: number
  }
}

export interface ModalFormProps {
  isModalOpen: boolean
  setIsModalOpen: (e: boolean) => void
  submit: (value: submitData) => void
}

export interface markType extends submitData {
  id: number
}
