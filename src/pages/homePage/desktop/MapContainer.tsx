import { useEffect, useMemo, useRef, useState } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import useImageUrl from '@/hooks/useImgHooks'
import styles from '../styles.module.css'
import ReactDOM from 'react-dom/client'
import InfoWindow from '../components/infoWindow'
import DeviceInfo from '../components/deviceInfo'
import DeviceDetail from '../components/deviceDetail'
import { Form, Input, Modal, Select, message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { AllDevicesAPI, AddDeviceAPI } from '../api'
import { type markType } from '../type'

const MapContainer: React.FC = () => {
  const navigate = useNavigate()

  // 控制地图隐藏
  const url = useLocation()
  const hidden = useMemo(() => (url.pathname !== '/home'), [url.pathname])

  const mapInstanceRef = useRef<any>(null) // 地图实例
  const locationRef = useRef({
    latitude: 0,
    longitude: 0
  })
  const imageUrl = useImageUrl() // 获取图片url

  const [form] = Form.useForm()

  const [showDevice, setShowDevice] = useState<null | number>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [markData, setMarkData] = useState<markType[] | null>(null)

  const getAllDevices = (): void => {
    AllDevicesAPI()
      .then(data => {
        setMarkData(data)
      })
      .catch((err) => {
        void message.error(err.message)
        if (err.message === '请重新登录') {
          navigate('/login')
        }
      })
  }

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
    // const arr = markData
    // arr.push({
    //   id: 2,
    //   type,
    //   location: locationRef.current,
    //   name
    // })
    // setMarkData(arr)
    // addMarker({
    //   id: 2,
    //   type,
    //   location: locationRef.current,
    //   name
    // })
    AddDeviceAPI({
      name,
      type,
      location: locationRef.current
    })
      .then((res) => {
        void message.success(res)
        getAllDevices()
      })
      .catch((err) => {
        void message.error(err.message)
      })
  }

  // 初始化地图
  const initMap = (): void => {
    if (mapInstanceRef.current !== null) {
      return
    }
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
    // 判断是否隐藏地图
    if (!hidden) {
      initMap()
      getAllDevices()
    }
  }, [hidden])

  useEffect(() => {
    if (markData !== null) {
      markData.forEach(item => { addMarker(item) })
    }
  }, [markData])

  // 销毁地图
  useEffect(() => {
    return () => {
      mapInstanceRef.current?.destroy()
    }
  }, [])

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
