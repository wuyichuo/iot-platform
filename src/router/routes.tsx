import { type RouteObject } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/pages/login'
import MapContainer from '@/pages/map/MapContainer'

const AppRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <MapContainer />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]

export default AppRoutes
