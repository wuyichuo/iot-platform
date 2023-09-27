import Layout from '@/layout'
import Login from '@/pages/login'
import { type RouteObject } from 'react-router-dom'

const AppRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />
  },
  {
    path: 'login',
    element: <Login />
  }
  // 添加其他路由规则
]

export default AppRoutes
