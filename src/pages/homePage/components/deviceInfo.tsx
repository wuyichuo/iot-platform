import styles from '../styles.module.css'

interface DeviceInfoProps {
  name: string
  type: string
  id: number
}

const deviceInfo: React.FC<DeviceInfoProps> = (props) => {
  // DOM
  return (
    <div className={styles.deviceInfo}>
      <p>名称：{props.name}</p>
      <p>类型：{props.type}</p>
      <p>ID：{props.id}</p>
    </div>
  )
}

export default deviceInfo
