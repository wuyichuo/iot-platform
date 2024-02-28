import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import PieChat from '@/components/pieChat'
import { BasicDataAPI } from '../api'
import { useNavigate } from 'react-router-dom'

// 测试数据
const infos = {
  devicesCount: 100,
  onlineDevicesCount: 40,
  offlineDevicesCount: 60,
  deviceTypesCount: [
    {
      count: 335,
      type: '摄像头'
    },
    {
      count: 234,
      type: '温度计'
    },
    {
      count: 1548,
      type: '湿度计'
    },
    {
      count: 1548,
      type: '灯'
    },
    {
      count: 234,
      type: '光线传感器'
    },
    {
      count: 234,
      type: '空调'
    }
  ],
  deviceMsgCount: 500,
  deviceErrorCount: 120
}

interface basicDataType {
  devicesCount: number
  onlineDevicesCount: number
  offlineDevicesCount: number
  deviceTypeData: []
  onlineRatioData: []
}

const InfoWindow: React.FC = () => {
  const navigate = useNavigate()

  const [expand, setExpand] = useState(false) // infoWindow是否展开

  const [basicData, setBasicData] = useState<basicDataType | null>(null)

  // 设备类型数据
  const [deviceTypeData, setDeviceTypeData] = useState([])
  // 设备在线率数据
  const [onlineRatioData, setOnlineRatioData] = useState([
    {
      value: infos.onlineDevicesCount,
      name: '在线设备'
    },
    {
      value: infos.offlineDevicesCount,
      name: '离线设备'
    }
  ])

  const getBasicData = (): void => {
    BasicDataAPI()
      .then(data => {
        setBasicData(data)
      })
      .catch((err) => {
        void message.error(err.message)
        if (err.message === '请重新登录') {
          navigate('/login')
        }
      })
  }

  useEffect(() => {
    if (expand) {
      getBasicData()
    }
  }, [expand])

  // DOM
  return (
    <div>
      <div>
        <h2 style={{ display: 'inline-block' }}>基本信息</h2>
        <Button
          type="text"
          onClick={() => { setExpand(!expand) }}
          style={{ float: 'right' }}
        >
          {expand ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
        </Button>
      </div>
      {/* 弹窗内容 */}
      {expand && basicData !== null &&
        <div className={styles.content}>
          <p>设备数量：{basicData.devicesCount}</p>
          <div className={styles.piechart}>
            <PieChat title='设备类型：' data={basicData.deviceTypeData} />
          </div>
          <div className={styles.piechart}>
            <PieChat title='设备在线率：' data={basicData.onlineRatioData} />
          </div>
        </div>
      }
    </div>
  )
}

export default InfoWindow
