import styles from '../styles.module.css'

interface DeviceInfoProps {
  name: string
  type: string
  id: number
}

// 设备类型翻译函数
const translateDeviceType = (type: string): string => {
  switch (type) {
    case 'temperatureSensor':
      return '温度计'
    case 'humiditySensor':
      return '湿度计'
    case 'lightSensor':
      return '光线传感器'
    default:
      return type
  }
}

const deviceInfo: React.FC<DeviceInfoProps> = (props) => {
  // DOM
  return (
    <div className={styles.deviceInfo}>
      <p>名称：{props.name}</p>
      <p>类型：{translateDeviceType(props.type)}</p>
      <p>ID：{props.id}</p>
    </div>
  )
}

export default deviceInfo
