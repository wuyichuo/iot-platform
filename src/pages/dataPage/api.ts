import { MyRequest } from '@/http'
import { type EditViewParams } from './type'

const DataLayoutAPI = async (): Promise<any> => (
  await MyRequest.get('/View')
)

const EditViewAPI = async (params: EditViewParams): Promise<any> => (
  await MyRequest.post('/editView', {
    view: params
  })
)

export { DataLayoutAPI, EditViewAPI }
