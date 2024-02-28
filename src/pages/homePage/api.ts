import { MyRequest } from '@/http'

const BasicDataAPI = async (): Promise<any> => (
  await MyRequest.get('/basicData')
)

export { BasicDataAPI }
