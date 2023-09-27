import AppRoutes from './router/routes'
import { RouterGuard } from './router/routerGuard'

function App (): React.ReactElement {
  // 路由守卫
  return <RouterGuard routes={AppRoutes}></RouterGuard>
}

export default App
