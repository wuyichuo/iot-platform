import { useEffect, useRef, useState } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import useImageUrl from '@/hooks/useImgHooks'
import styles from './styles.module.css'
import { FloatButton } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import DeviceDetail from '../components/deviceDetail'
import ModalForm from '../components/modalForm'
import { type submitData, type markType } from './type'

//   测试数据
const testData = [
  {
    id: 0,
    type: 'Camera',
    location: {
      latitude: 30.312749,
      longitude: 120.345443
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

const PhoneMap: React.FC = () => {
  const mapInstanceRef = useRef<any>(null) // 地图实例
  const imageUrl = useImageUrl() // 获取图片url

  const [showDevice, setShowDevice] = useState<null | number>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [markData, setMarkData] = useState(testData)

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
        // 设备详情弹窗
        marker.on('click', () => { setShowDevice(device.id) })

        // 将创建的点标记添加到已有的地图
        mapInstanceRef.current.add(marker)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // 添加设备
  const addDevice = (value: submitData): void => {
    const arr = markData
    arr.push({
      id: 2,
      ...value
    })
    setMarkData(arr)
    addMarker({
      id: 2,
      ...value
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
          zoom: 16, // 地图比例尺
          center: [120.34332989249378, 30.314101385002868] // 初始化地图中心点位置
        })
        // 标记点实例列表
        markData.forEach(item => { addMarker(item) })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    initMap()
  }, [])

  // 销毁地图
  useEffect(() => {
    return () => {
      mapInstanceRef.current?.destroy()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }} >
      <div
        id="container"
        style={{ width: '100%', height: '100%' }}
      ></div>
      {showDevice !== null && <div className={styles.deviceWindow}>
        {/* <DeviceDetail
          id={showDevice}
          close={() => { setShowDevice(null) }}
        /> */}
      </div>}
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 24 }}
        onClick={() => { setIsModalOpen(true) }}
      />
      <ModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        submit={addDevice}
      />
    </div>
  )
}

export default PhoneMap
