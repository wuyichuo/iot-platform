import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { type pieChatProps, type pieData } from './type'

const PieChat: React.FC<pieChatProps> = (props: pieChatProps) => {
  // Ref
  const chartContainerRef = useRef(null)
  const myChartRef = useRef<echarts.ECharts | null>(null)
  // 基础配置信息
  const option = {
    title: {
      text: props.title,
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
        },
        data: props.data
      }
    ]
  }
  // 绘制图表
  const init = (): void => {
    if (chartContainerRef.current !== null) {
      myChartRef.current = echarts.init(chartContainerRef.current)
      myChartRef.current.setOption(option)
    } else {
      console.log('No Container was found')
    }
  }

  // 修改数据
  const changeData = (data: pieData[]): void => {
    if (myChartRef.current !== null) {
      myChartRef.current.setOption({
        series: [
          { data }
        ]
      })
    } else {
      console.log('Chart not found')
    }
  }

  useEffect(() => {
    // 图表初始化
    init()
    return () => {
      // 销毁图表
      if (myChartRef.current !== null) {
        myChartRef.current.dispose()
      }
    }
  }, [])

  // 修改数据
  useEffect(() => { changeData(props.data) }, [props.data])

  // DOM
  return (
    <div ref={chartContainerRef} style={{ height: '100%', width: '100%' }}></div>
  )
}

export default PieChat
