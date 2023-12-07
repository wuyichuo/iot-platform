import { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import { Button } from 'antd'
import { CloseSquareOutlined } from '@ant-design/icons'
import LineChat from '@/components/lineChart'
// import { MyRequest } from '@/http'

// 测试数据
const info = {
  name: 'name',
  id: 40,
  type: 'type',
  dataURL: 'http://jasfikua',
  location: {
    latitude: 0,
    longitude: 0
  }
}

interface deviceDetailProps {
  id: number | null
  close: () => void
}

const deviceDetail: React.FC<deviceDetailProps> = (props) => {
  const [data, setData] = useState({
    date: [1, 2, 3],
    value: [1, 2, 3]
  })

  useEffect(() => {
    // 动态数据测试
    // const newData = { ...data }
    // setInterval(function () {
    //   newData.date.shift()
    //   newData.date.push(newData.date[newData.date.length - 1] + 1)
    //   newData.value.shift()
    //   newData.value.push(newData.value[newData.value.length - 1] + 1)
    //   setData(newData)
    // }, 500)

    // // api测试
    // MyRequest.get('./test.json')
    //   .then(responseData => {
    //     console.log('GET 请求成功:', responseData)
    //   })
    //   .catch(error => {
    //     console.error('GET 请求失败:', error.message)
    //   })
  }, [])

  // DOM
  return (
    <div>
      <div>
        <h2 style={{ display: 'inline-block' }}>设备详情</h2>
        <Button
          type="text"
          onClick={props.close}
          style={{ float: 'right' }}
        >
          <CloseSquareOutlined />
        </Button>
      </div>
      <div className={styles.content}>
        <p>设备ID：{props.id}</p>
        <p>设备名称：{info.name}</p>
        <p>设备类型：{info.type}</p>
        <div className={styles.piechart}>
          <LineChat title='设备数据' data={data} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <Button type='primary' >启动</Button>
          <Button type='primary' >关闭</Button>
          <Button type='primary' >删除</Button>
        </div>
      </div>
    </div>
  )
}

export default deviceDetail
