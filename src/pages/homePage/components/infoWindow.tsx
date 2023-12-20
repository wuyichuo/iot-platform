import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import PieChat from '@/components/pieChat'

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

const InfoWindow: React.FC = () => {
  const [expand, setExpand] = useState(false) // infoWindow是否展开

  // 设备类型数据
  const [deviceTypeData, setDeviceTypeData] = useState(infos.deviceTypesCount.map(item => ({
    value: item.count,
    name: item.type
  })))
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

  useEffect(() => {
    setDeviceTypeData(infos.deviceTypesCount.map(item => ({
      value: item.count,
      name: item.type
    })))
    setOnlineRatioData([
      {
        value: infos.onlineDevicesCount,
        name: '在线设备'
      },
      {
        value: infos.offlineDevicesCount,
        name: '离线设备'
      }
    ])
    // 修改数据
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
      {expand &&
        <div className={styles.content}>
          <p>设备数量：{infos.devicesCount}</p>
          <div className={styles.piechart}>
            <PieChat title='设备类型：' data={deviceTypeData} />
          </div>
          <div className={styles.piechart}>
            <PieChat title='设备在线率：' data={onlineRatioData} />
          </div>
          <p>设备消息：{infos.deviceMsgCount}</p>
          <p>设备报错：{infos.deviceErrorCount}</p>
        </div>
      }
    </div>
  )
}

export default InfoWindow
