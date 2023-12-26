import { MyRequest } from '@/http'
import { type LoginParams } from './type'

const PublicKeyAPI = async (): Promise<any> => (
  await MyRequest.get('/public_key')
)

const LoginAPI = async (params: LoginParams): Promise<any> => (
  await MyRequest.post('/login', {
    username: params.username,
    password: params.password
  })
)

export { LoginAPI, PublicKeyAPI }
