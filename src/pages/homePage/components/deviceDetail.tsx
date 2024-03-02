import { useEffect, useRef, useState } from 'react'
import styles from '../styles.module.css'
import { Button, Switch, message } from 'antd'
import { CloseSquareOutlined } from '@ant-design/icons'
import LineChat from '@/components/lineChart'
import { DeleteDeviceAPI, OperateDeviceAPI } from '../api'
import { type deviceDetailProps } from '../type'

// 设备类型翻译函数
const translateDeviceType = (type: string | undefined): string => {
  switch (type) {
    case 'temperatureSensor':
      return '温度计'
    case 'humiditySensor':
      return '湿度计'
    case 'lightSensor':
      return '光线传感器'
    default:
      return ''
  }
}

const deviceDetail: React.FC<deviceDetailProps> = (props) => {
  const [data, setData] = useState({
    date: [],
    value: []
  })
  const [deviceState, setDeviceState] = useState('在线')

  const deleteDevice = (): void => {
    if (props.device !== null) {
      DeleteDeviceAPI(props.device?.id)
        .then(() => {
          props.afterDelete()
          void message.success('已删除')
        })
        .catch((err) => {
          void message.error(err.message)
        })
    }
  }

  const changeDeviceState = (checked: boolean): void => {
    const msg = checked ? '已开启' : '已关闭'
    if (props.device !== null) {
      OperateDeviceAPI({
        deviceId: props.device.id,
        open: checked
      })
        .then(() => {
          getDeviceDetail()
          void message.success(msg)
        })
        .catch(err => {
          void message.error(err.message)
        })
    }
  }

  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // WebSocket
    const ws = new WebSocket('ws://localhost:5000')
    wsRef.current = ws

    ws.onopen = function () {
      ws.send(JSON.stringify([props.device?.id]))
    }

    ws.onmessage = function (event: { data: any }) {
      setData(JSON.parse(event.data).data)
      setDeviceState(JSON.parse(event.data).state)
    }

    ws.onclose = function () {
      console.log('Disconnected from server')
    }

    // 组件卸载时关闭WebSocket连接
    return () => {
      ws.close()
    }
  }, [])

  const getDeviceDetail = (): void => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const arr = [props.device?.id]
      wsRef.current.send(JSON.stringify(arr))
    }
  }

  useEffect(() => {
    getDeviceDetail()
  }, [props.device?.id])

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
        <p>设备ID：{props.device?.id}</p>
        <p>设备名称：{props.device?.name}</p>
        <p>设备类型：{translateDeviceType(props.device?.type)}</p>
        {/* <text>数据范围：</text><RangeSelector size='small'/> */}
        <p>
          设备状态：
          <Switch
            checked={deviceState === '在线'}
            checkedChildren="在线"
            unCheckedChildren="离线"
            onChange={changeDeviceState}
          />
        </p>
        <div className={styles.piechart}>
          <LineChat title='设备数据(后端模拟)：' data={data} />
        </div>
        <Button
          size='large'
          type='primary'
          onClick={deleteDevice}
          style={{ width: '100%' }}
        >
          删除
        </Button>
      </div>
    </div>
  )
}

export default deviceDetail
