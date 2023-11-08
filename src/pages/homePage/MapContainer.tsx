import { useEffect, useRef, useState } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import useImageUrl from '@/hooks/useImgHooks'
import styles from './styles.module.css'
import ReactDOM from 'react-dom/client'
import InfoWindow from './components/infoWindow'
import DeviceInfo from './components/deviceInfo'
import DeviceDetail from './components/deviceDetail'
import { Form, Input, Modal, Select } from 'antd'
import { useLocation } from 'react-router-dom'

//   测试数据
const testData = [
  {
    id: 0,
    type: 'Camera',
    location: {
      latitude: 30.312749138738265,
      longitude: 120.34544347319752
    },
    name: '1'
  },
  {
    id: 1,
    type: 'airConditioner',
    location: {
      latitude: 30.3146385735457,
      longitude: 120.3427934506908
    },
    name: '2'
  },
  {
    id: 2,
    type: 'lightSensor',
    location: {
      latitude: 30.312323084679694,
      longitude: 120.34167765174061
    },
    name: '3'
  }
]

interface markType {
  id: number
  type: string
  location: {
    latitude: number
    longitude: number
  }
  name: string
}

const MapContainer: React.FC = () => {
  // 控制地图隐藏
  const url = useLocation()
  const [hidden, setHidden] = useState(true)

  const mapInstanceRef = useRef<any>(null) // 地图实例
  const locationRef = useRef({
    latitude: 0,
    longitude: 0
  })
  const imageUrl = useImageUrl() // 获取图片url

  const [form] = Form.useForm()

  const [showDevice, setShowDevice] = useState<null | number>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [markData, setMarkData] = useState(testData)

  // 弹窗控制
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        addDevice(values.deviceType, values.deviceName)
        setIsModalOpen(false)
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo)
      })
  }
  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  // 添加标记点
  const addMarker = (device: markType): void => {
    AMapLoader.load({
      key: import.meta.env.VITE_APP_AMAP_KEY, // 高德地图Web端开发者Key
      version: '2.0',
      plugins: [] // 需要使用的的插件列表(必填项)
    })
      .then((AMap) => {
        // 创建自定义图标
        const icon = new AMap.Icon({
          size: new AMap.Size(40, 40), // 图标尺寸
          image: imageUrl.getUrl(`icons/${device.type}.svg`), // Icon的图像
          imageSize: new AMap.Size(40, 40) // 压缩图片的尺寸
        })

        // 标记点实例
        const position = new AMap.LngLat(device.location.longitude, device.location.latitude)
        const marker = new AMap.Marker({
          position,
          icon,
          offset: new AMap.Pixel(-20, -20)
        })
        // 设备信息弹窗
        const window = document.createElement('div')
        ReactDOM.createRoot(window).render(<DeviceInfo name={device.name} type={device.type} id={device.id}/>)
        const Window = new AMap.InfoWindow({
          isCustom: true, // 使用自定义窗体
          content: window
        })
        marker.on('mouseover', () => { Window.open(mapInstanceRef.current, position) })
        marker.on('mouseout', () => { Window.close() })
        marker.on('click', () => { setShowDevice(device.id) })

        // 将创建的点标记添加到已有的地图
        mapInstanceRef.current.add(marker)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // 添加设备
  const addDevice = (type: string, name: string): void => {
    const arr = markData
    arr.push({
      id: 2,
      type,
      location: locationRef.current,
      name
    })
    setMarkData(arr)
    addMarker({
      id: 2,
      type,
      location: locationRef.current,
      name
    })
  }

  // 初始化地图
  const initMap = (): void => {
    AMapLoader.load({
      key: import.meta.env.VITE_APP_AMAP_KEY, // 高德地图Web端开发者Key
      version: '2.0',
      plugins: [] // 需要使用的的插件列表(必填项)
    })
      .then((AMap) => {
        mapInstanceRef.current = new AMap.Map('container', {
          viewMode: '3D', // 3D地图模式
          zoom: 17, // 地图比例尺
          center: [120.34332989249378, 30.314101385002868] // 初始化地图中心点位置
        })
        // 标记点实例列表
        markData.forEach(item => { addMarker(item) })
        // 右键添加设备
        mapInstanceRef.current.on('rightclick', (e: any) => {
          locationRef.current = {
            latitude: e.lnglat.getLat(),
            longitude: e.lnglat.getLng()
          }
          setIsModalOpen(true)
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // 初始化
  useEffect(() => {
    initMap()
    return () => {
      mapInstanceRef.current?.destroy()
    }
  }, [])

  // 判断是否隐藏地图
  useEffect(() => {
    setHidden(url.pathname !== '/home')
  }, [url.pathname])

  return (
    <div
      style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)' }}
      className={hidden ? styles.hide : ''}
    >
      <div
        id="container"
        style={{ width: '100%', height: '100%' }}
      ></div>
      <div className={styles.infoWindow}>
          <InfoWindow />
      </div>
      {showDevice !== null && <div className={styles.deviceWindow}>
          <DeviceDetail id={showDevice} close={() => { setShowDevice(null) }}/>
      </div>}
      <Modal title="添加设备" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="设备名称"
            name="deviceName"
            rules={[{ type: 'string', required: true, message: '请输入设备名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="设备类型"
            name="deviceType"
            rules={[{ type: 'string', required: true, message: '请选择设备类型!' }]}
          >
            <Select
              options={[
                { value: 'camera', label: '摄像头' },
                { value: 'temperatureSensor', label: '温度传感器' },
                { value: 'humiditySensor', label: '湿度传感器' },
                { value: 'light', label: '灯具' },
                { value: 'lightSensor', label: '光线传感器' },
                { value: 'airConditioner', label: '空调' }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MapContainer
