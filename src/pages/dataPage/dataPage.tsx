import { useEffect, useState, useRef } from 'react'
import { FloatButton, Modal } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import styles from './styles.module.css'
import useImageUrl from '@/hooks/useImgHooks'

import Screen from './components/screen'
import LineChat from '@/components/lineChart'

// 测试数据——配置信息
const view = [
  { id: 'a', name: '设备数据', x: 0, y: 0, w: 1, h: 1 },
  { id: 'b', name: '设备数据', x: 1, y: 0, w: 3, h: 1 },
  { id: 'c', name: '设备数据', x: 4, y: 0, w: 1, h: 1 }
]

const dataPage: React.FC = () => {
  const imageUrl = useImageUrl() // 获取图片url

  // 页面配置
  const [layout, setLayout] = useState(view.map(e => (
    { i: e.id, x: e.x, y: e.y, w: e.w, h: e.h }
  )))
  const oldLayout = useRef(view.map(e => (
    { i: e.id, x: e.x, y: e.y, w: e.w, h: e.h }
  )))
  const [isEditing, setIsEditing] = useState<boolean>(false)

  // 测试数据——图表数据
  const [data, setData] = useState({
    date: [1, 2, 3],
    value: [1, 2, 3]
  })

  // 关闭编辑弹窗
  const handelModalCancel = (): void => {
    setLayout(oldLayout.current)
    setIsEditing(false)
  }

  // 开始编辑
  const editLayout = (): void => {
    oldLayout.current = layout
    setIsEditing(true)
  }

  // 关闭sokect链接
  useEffect(() => {
    return () => {
    }
  }, [])

  // DOM
  return (
    <>
      {!isEditing &&
        <Screen layout={layout} isEditing={false} changeLayout={setLayout}>
          {view.map(e => (
            <div key={e.id} className={styles.chartBox}>
              <LineChat title={e.name} data={data}/>
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
        onOk={() => { setIsEditing(false) }}
        onCancel={handelModalCancel}
        okText='保存'
        cancelText='取消'
      >
        <div style={{ minHeight: 500 }}>
          <Screen layout={layout} isEditing={true} changeLayout={setLayout}>
            {view.map(e => (
              <div key={e.id}>
                <div className={styles.chartBoxEdit}>
                  <h2>{e.name}</h2>
                  <img src={imageUrl.getUrl('images/chartImg.png')} width='100%' height='80%'/>
                </div>
              </div>
            ))}
          </Screen>
        </div>
      </Modal>
    </>
  )
}

export default dataPage
