import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import { useChats } from '@/hooks/chartsHook'

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

  // 饼状图配置信息
  const option = {
    title: {
      textStyle: {
        color: '#000'
      }
    },
    tooltip: {
      trigger: 'item', // 鼠标悬浮时显示
      formatter: '{b} ({c})' // 提示框内容的格式（key(value)）
    },
    series: [
      {
        type: 'pie',
        label: {
          show: true,
          position: 'inside'
        }
      }
    ]
  }
  // 设备类型
  const deviceTypeOption = {
    ...option,
    title: {
      ...option.title,
      text: '设备类型：'
    },
    series: [
      {
        ...option.series[0],
        data: infos.deviceTypesCount.map(item => ({
          value: item.count,
          name: item.type
        }))
      }
    ]
  }
  // 设备在线率
  const onlineRatioOption = {
    ...option,
    title: {
      ...option.title,
      text: '设备在线率：'
    },
    series: [
      {
        ...option.series[0],
        data: [
          {
            value: infos.onlineDevicesCount,
            name: '在线设备'
          },
          {
            value: infos.offlineDevicesCount,
            name: '离线设备'
          }
        ]
      }
    ]
  }

  useEffect(() => {
    // 图表初始化
    if (!expand) return
    const deviceTypeChart = useChats('deviceType', deviceTypeOption)
    const onlineRatioChart = useChats('onlineRatio', onlineRatioOption)

    return () => {
      // 销毁图表
      deviceTypeChart.destroy()
      onlineRatioChart.destroy()
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
      {expand &&
        <div className={styles.content}>
          <p>设备数量：{infos.devicesCount}</p>
          <div id='onlineRatio' className={styles.piechart}></div>
          <div id='deviceType' className={styles.piechart}></div>
          <p>设备消息：{infos.deviceMsgCount}</p>
          <p>设备报错：{infos.deviceErrorCount}</p>
        </div>
      }
    </div>
  )
}

export default InfoWindow
