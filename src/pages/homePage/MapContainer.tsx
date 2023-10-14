import { useEffect } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import useImageUrl from '@/hooks/useImgHooks'
import styles from './styles.module.css'
// import ReactDOM from 'react-dom/client'
import InfoWindow from './components/infoWindow'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setMap } from '@/store/map/mapSlice'

//   测试数据
const markData = [
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

const MapContainer: React.FC = () => {
  // Redux
  const { amap } = useAppSelector(state => state.map)
  const dispatch = useAppDispatch()

  let map = amap // 地图实例
  const imageUrl = useImageUrl() // 获取图片url

  useEffect(() => {
    // 存在地图实例时直接使用
    if (map !== null) {
      const containerParent = document.getElementById('containerParent')
      if (containerParent !== null) {
        // 将空容器替换成地图
        const container = document.getElementById('container')
        if (container !== null) {
          containerParent.removeChild(container)
        }
        containerParent.insertBefore(map.getContainer(), containerParent.firstChild)
      }
    } else {
      // 不存在地图实例时重新加载地图
      AMapLoader.load({
        key: import.meta.env.VITE_APP_AMAP_KEY, // 高德地图Web端开发者Key
        version: '2.0',
        plugins: [] // 需要使用的的插件列表(必填项)
      })
        .then((AMap) => {
          map = new AMap.Map('container', {
            viewMode: '3D', // 3D地图模式
            zoom: 17, // 地图比例尺
            center: [120.34332989249378, 30.314101385002868] // 初始化地图中心点位置
          })

          // 创建自定义图标
          const icons = markData.map(item => {
            return new AMap.Icon({
              size: new AMap.Size(40, 40), // 图标尺寸
              image: imageUrl.getUrl(`icons/${item.type}.svg`), // Icon的图像
              imageSize: new AMap.Size(40, 40) // 压缩图片的尺寸
            })
          })

          // 标记点实例列表
          const markerList = markData.map((item, index) => (
            new AMap.Marker({
              position: new AMap.LngLat(item.location.longitude, item.location.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: item.name,
              icon: icons[index]
            })))

          // const window = document.createElement('div')
          // ReactDOM.createRoot(window).render(<InfoWindow />)
          // const Window = new AMap.InfoWindow({
          //   isCustom: true, // 使用自定义窗体
          //   content: window
          // })
          // const position = new AMap.LngLat(120.34332989249378, 30.314101385002868)
          // 将创建的点标记添加到已有的地图
          map.on('complete', function () {
            map.add(markerList)
          // Window.open(map, position)
          })
        })
        .catch((e) => {
          console.log(e)
        })
    }
    // 组件卸载时保存地图实例
    return () => {
      dispatch(setMap(map))
    }
  }, [])

  return (
    <div id='containerParent' style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)' }}>
      <div id="container" style={{ width: '100%', height: '100%' }}></div>
      <div className={styles.infoWindow}>
          <InfoWindow />
      </div>
    </div>
  )
}

export default MapContainer
