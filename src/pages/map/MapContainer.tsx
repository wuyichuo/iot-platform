import { useEffect } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import useImageUrl from '@/hooks/useImgHooks'

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
  const imageUrl = useImageUrl() // 获取图片url

  useEffect(() => {
    // 地图实例
    let map: any = null
    // 加载地图
    AMapLoader.load({
      key: '0c925ab02fe8ea3590803c230d2df8a5', // 高德地图Web端开发者Key
      version: '2.0',
      plugins: [] // 需要使用的的插件列表(必填项)
    })
      .then((AMap) => {
        map = new AMap.Map('container', {
          viewMode: '3D', // 3D地图模式
          zoom: 16, // 地图比例尺
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

        // 将创建的点标记添加到已有的地图
        map.on('complete', function () {
          map.add(markerList)
        })
      })
      .catch((e) => {
        console.log(e)
      })

    // 销毁地图实例
    return () => {
      map?.destroy()
    }
  }, [])

  return (
    <div id="container" style={{ width: '100%', height: 'calc(100vh - 64px)' }}></div>
  )
}

export default MapContainer
