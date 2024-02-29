import { MyRequest } from '@/http'
import { type addDeviceProps } from './type'

const BasicDataAPI = async (): Promise<any> => (
  await MyRequest.get('/basicData')
)

const AllDevicesAPI = async (): Promise<any> => (
  await MyRequest.get('/allDevices')
)

const AddDeviceAPI = async (props: addDeviceProps): Promise<any> => (
  await MyRequest.post('/addDevice', {
    name: props.name,
    type: props.type,
    location: props.location
  })
)

export { BasicDataAPI, AllDevicesAPI, AddDeviceAPI }
