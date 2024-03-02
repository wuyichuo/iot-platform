import { MyRequest } from '@/http'
import { type OperateDeviceProps, type addDeviceProps } from './type'

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

const DeleteDeviceAPI = async (id: number): Promise<any> => (
  await MyRequest.delete('/deleteDevice', {
    deviceid: id
  })
)

const OperateDeviceAPI = async (props: OperateDeviceProps): Promise<any> => (
  await MyRequest.post('/operateDevice', props)
)

export {
  BasicDataAPI,
  AllDevicesAPI,
  AddDeviceAPI,
  DeleteDeviceAPI,
  OperateDeviceAPI
}
