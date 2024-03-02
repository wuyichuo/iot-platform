import { useEffect, useState, useRef } from 'react'
import { FloatButton, Modal, Spin, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import styles from './styles.module.css'
import useImageUrl from '@/hooks/useImgHooks'
import { DataLayoutAPI, EditViewAPI } from './api'

import Screen from './components/screen'
import LineChat from '@/components/lineChart'
import { type LayoutType, type DevicesType, type ViewType } from './type'

const dataPage: React.FC = () => {
  const imageUrl = useImageUrl() // 获取图片url

  // 页面配置
  const [layout, setLayout] = useState<LayoutType[] | null>(null)
  const [devices, setDevices] = useState<DevicesType[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const oldLayout = useRef<LayoutType[] | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  // 测试数据——图表数据
  const [data, setData] = useState(null)

  // 关闭编辑弹窗
  const handelModalCancel = (): void => {
    setLayout(oldLayout.current)
    setIsEditing(false)
  }

  // 保存布局
  const handelModalOK = (): void => {
    // API
    if (devices.length !== 0 && layout !== null) {
      EditViewAPI({
        devices,
        layout
      })
        .catch((err) => {
          void message.error(err.message)
          setLayout(oldLayout.current)
        })
    }
    setIsEditing(false)
  }

  // 开始编辑
  const editLayout = (): void => {
    oldLayout.current = layout
    setIsEditing(true)
  }

  const getDataLayout = (): void => {
    DataLayoutAPI()
      .then(view => {
        setLayout(view.map((e: ViewType) => e.layout))
        setDevices(view.map((e: ViewType) => ({
          id: e.id,
          name: e.name
        })))
        if (wsRef.current === null) {
          const arr = view?.map((e: ViewType) => e.id)
          OpenSocket(arr)
        }
      })
      .catch((err) => {
        void message.error(err.message)
      })
  }

  // WebSocket
  const OpenSocket = (idArr: number[]): void => {
    const ws = new WebSocket('ws://localhost:5000')
    wsRef.current = ws
    ws.onopen = function () {
      ws.send(JSON.stringify(idArr))
    }
    ws.onmessage = function (event: { data: any }) {
      setData(JSON.parse(event.data).data)
    }
    ws.onclose = function () {
      console.log('Disconnected from server')
    }
  }

  // 关闭sokect链接
  useEffect(() => {
    getDataLayout()
    // 组件卸载时关闭WebSocket连接
    return () => {
      wsRef.current?.close()
    }
  }, [])

  // DOM
  return (
    <>
      <Spin
        tip="Loading"
        size="large"
        spinning={data === null}
        style={{
          top: 300
        }}
      >
        <div className="content" />
      </Spin>
      {!isEditing && layout !== null && data !== null &&
        <Screen layout={layout} isEditing={false} changeLayout={setLayout}>
          {devices.map((e, i) => (
            <div key={e.id} className={styles.chartBox}>
              <LineChat title={e.name} data={data[i]}/>
            </div>
          ))}
        </Screen>
      }
      <FloatButton
        icon={<EditOutlined />}
        type="primary"
        style={{ right: 24 }}
        onClick={editLayout}
      />
      <Modal
        title="编辑视图"
        open={isEditing}
        width="95%"
        onOk={handelModalOK}
        onCancel={handelModalCancel}
        okText='保存'
        cancelText='取消'
      >
        <div style={{ minHeight: 500 }}>
          {layout !== null &&
            <Screen layout={layout} isEditing={true} changeLayout={setLayout}>
              {devices.map((e, i) => (
                <div key={e.id}>
                  <div className={styles.chartBoxEdit}>
                    <h2>{e.name}</h2>
                    <img src={imageUrl.getUrl('images/chartImg.png')} width='100%' height='80%'/>
                  </div>
                </div>
              ))}
            </Screen>
          }
        </div>
      </Modal>
    </>
  )
}

export default dataPage
