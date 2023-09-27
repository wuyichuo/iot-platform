import { useEffect } from 'react'
import { type RouteObject, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { useStorage } from '@/hooks/storageHooks'

// 获取token
const storage = useStorage()
const token = storage.get('token')

export const RouterGuard = (props: { routes: RouteObject[] }): React.ReactElement => {
  const routes: RouteObject[] = props.routes
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // 全局路由守卫
    function guard (): void {
      const { pathname } = location
      // 未登陆时自动跳转到登录页
      if (pathname !== '/login') {
        if (token === null) {
          navigate('/login')
        }
      }
    }

    guard()
  }, [location, navigate])

  const Route = useRoutes(routes) as React.ReactElement

  return Route
}
