import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import PieChat from '@/components/pieChat'
import { BasicDataAPI } from '../api'
import { useNavigate } from 'react-router-dom'

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
