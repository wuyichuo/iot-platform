/* eslint-disable react/prop-types */
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { type LayoutType, type ScreenProps } from '../type'

const Screen: React.FC<ScreenProps> = ({ layout, isEditing, changeLayout, children }) => {
  const ratio = isEditing ? 0.95 : 1 // 缩放比例

  // 页面配置
  const handleLayoutChange = (newLayout: LayoutType[]): void => {
    changeLayout(newLayout)
  }

  // DOM
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={6}
      rowHeight={200 * ratio}
      width={(window.innerWidth - 80) * ratio}
      isDraggable={isEditing}
      isResizable={isEditing}
      onLayoutChange={handleLayoutChange}
      useCSSTransforms={true} // 使用Css3 Translate 替换 position, 可以使性能可以提高6倍
      margin={[10 / ratio, 10 / ratio]}
    >
      {children}
    </GridLayout>
  )
}

export default Screen
