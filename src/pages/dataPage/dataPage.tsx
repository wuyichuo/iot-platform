import { useEffect } from 'react'
import { useChats } from '@/hooks/chartsHook'

const dataPage: React.FC = () => {
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
  const option1 = {
    ...option,
    title: {
      ...option.title,
      text: '设备类型：'
    },
    series: [
      {
        ...option.series[0],
        data: [
          {
            value: 335,
            name: '摄像头'
          },
          {
            value: 234,
            name: '温度计'
          },
          {
            value: 1548,
            name: '湿度计'
          },
          {
            value: 1548,
            name: '灯'
          },
          {
            value: 234,
            name: '光线传感器'
          },
          {
            value: 234,
            name: '空调'
          }
        ]
      }
    ]
  }
  useEffect(() => {
    const chart1 = useChats('chart1', option1)
    const chart2 = useChats('chart2', option1)
    const chart3 = useChats('chart3', option1)
    const chart4 = useChats('chart4', option1)
    const chart5 = useChats('chart5', option1)
    const chart6 = useChats('chart6', option1)
    return () => {
      chart1.destroy()
      chart2.destroy()
      chart3.destroy()
      chart4.destroy()
      chart5.destroy()
      chart6.destroy()
    }
  }, [])
  return (
    <div>
      <div id='chart1' style={{ height: 200, width: 200, display: 'inline-block' }}></div>
      <div id='chart2' style={{ height: 200, width: 200, display: 'inline-block' }}></div>
      <div id='chart3' style={{ height: 200, width: 200, display: 'inline-block' }}></div>
      <div id='chart4' style={{ height: 200, width: 200, display: 'inline-block' }}></div>
      <div id='chart5' style={{ height: 200, width: 200, display: 'inline-block' }}></div>
      <div id='chart6' style={{ height: 200, width: 200, display: 'inline-block' }}></div>
    </div>
  )
}

export default dataPage
