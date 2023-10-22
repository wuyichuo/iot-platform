import * as echarts from 'echarts'
import { type chartData, type chartsReturn } from './types'

// 基础配置信息
const basicOption = {
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
  ]
}

export function useChats (containerId: string, option: echarts.EChartsCoreOption): chartsReturn {
  // 绘制图表
  const init = (containerId: string, option: echarts.EChartsCoreOption): echarts.ECharts | null => {
    const element = document.getElementById(containerId)
    if (element !== null) {
      const myChart = echarts.init(element)
      myChart.setOption(basicOption)
      myChart.setOption(option)
      return myChart
    } else {
      console.log(`No element with id '${containerId}' found`)
    }
    return null
  }

  const myChart = init(containerId, option) // 图表实例
  let oldData: chartData[] // 图表数据

  // 修改数据
  const changeData = (data: chartData[]): void => {
    if (myChart !== null) {
      myChart.setOption({
        series: [
          data
        ]
      })
      oldData = data
    } else {
      console.log('Chart not found')
    }
  }

  // 添加数据
  const addData = (data: chartData[]): void => {
    const newData = oldData.splice(0, data.length)
    data.forEach(item => { newData.push(item) })
    if (myChart !== null) {
      myChart.setOption({
        series: [
          newData
        ]
      })
      oldData = newData
    } else {
      console.log('Chart not found')
    }
  }

  // 销毁图表
  const destroy = (): void => {
    if (myChart !== null) {
      myChart.dispose()
    } else {
      console.log('Chart not found')
    }
  }

  return { changeData, addData, destroy }
}
