import { useEffect } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useLocation } from 'react-router-dom'

//   测试数据
const markData = [
  {
    id: 0,
    type: 'type1',
    location: {
      latitude: 30.312749138738265,
      longitude: 120.34544347319752
    },
    name: '1'
  },
  {
    id: 1,
    type: 'type1',
    location: {
      latitude: 30.3146385735457,
      longitude: 120.3427934506908
    },
    name: '2'
  },
  {
    id: 2,
    type: 'type1',
    location: {
      latitude: 30.312323084679694,
      longitude: 120.34167765174061
    },
    name: '3'
  }
]

const MapContainer: React.FC = () => {
  const mapHeight = document.body.clientHeight - 64 // 地图高度
  // 当前路径
  const location = useLocation()
  const { pathname } = location

  let map: any = null // 地图实例

  useEffect(() => {
    // 加载地图
    AMapLoader.load({
      key: '0c925ab02fe8ea3590803c230d2df8a5', // 高德地图Web端开发者Key
      version: '2.0', // JSAPI 的版本
      plugins: [] // 需要使用的的插件列表(必填项)
    })
      .then((AMap) => {
        map = new AMap.Map('container', {
          // 地图容器id
          viewMode: '3D', // 3D地图模式
          zoom: 16, // 地图比例尺
          center: [120.34332989249378, 30.314101385002868] // 初始化地图中心点位置
        })

        // 标记点实例列表
        const markerList = markData.map(item => (
          new AMap.Marker({
            position: new AMap.LngLat(item.location.longitude, item.location.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: item.name
          })))

        // 将创建的点标记添加到已有的地图
        map.on('complete', function () {
          map.add(markerList)
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  // 销毁地图实例
  useEffect(() => {
    if (map !== null && pathname !== '/home') {
      map.destroy()
    }
  }, [pathname])

  return (
    <div id="container" style={{ width: '100%', height: mapHeight }}></div>
  )
}

export default MapContainer
