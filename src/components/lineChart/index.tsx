import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { type lineChatProps } from './type'

const LineChat: React.FC<lineChatProps> = (props: lineChatProps) => {
  // Ref
  const chartContainerRef = useRef(null)
  const myChartRef = useRef<echarts.ECharts | null>(null)
  // 基础配置信息
  const option = {
    xAxis: {
      type: 'category',
      data: props.data.date
    },
    yAxis: {
      type: 'value'
    },
    title: {
      text: props.title,
      textStyle: {
        color: '#000'
      }
    },
    tooltip: {
      trigger: 'item', // 鼠标悬浮时显示
      formatter: '{c}' // 提示框内容的格式（key(value)）
    },
    series: [
      {
        type: 'line',
        smooth: true,
        data: props.data.value
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
  const changeData = (): void => {
    if (myChartRef.current !== null) {
      myChartRef.current.setOption({
        xAxis: {
          data: props.data.date
        },
        series: [
          { data: props.data.value }
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
  useEffect(() => { changeData() }, [props.data])

  // DOM
  return (
    <div ref={chartContainerRef} style={{ height: '100%', width: '100%' }}></div>
  )
}

export default LineChat
