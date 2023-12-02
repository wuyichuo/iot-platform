import { type RouteObject } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/pages/login'
import DataPage from '@/pages/dataPage/dataPage'
import PhoneMap from '@/pages/homePage/mobile/MapContainer'

const AppRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <></>
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
  },
  {
    path: 'phonemap',
    element: <PhoneMap />
  }
]

export default AppRoutes
