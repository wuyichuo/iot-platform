import { type RouteObject } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/pages/login'
import MapContainer from '@/pages/homePage/MapContainer'
import DataPage from '@/pages/dataPage/dataPage'

const AppRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <MapContainer />
      },
      {
        path: '/data',
        element: <DataPage />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]

export default AppRoutes
