import React, { useMemo, useState } from 'react'
import { Button } from 'antd'
import useImageUrl from '@/hooks/useImgHooks'
import { useLocation, useNavigate } from 'react-router-dom'
import UserInfo from './userInfo'
// import RangeSelector from '../rangeSelector'
import { useStorage } from '@/hooks/storageHooks'

const App: React.FC = () => {
  const imageUrl = useImageUrl()
  const location = useLocation()
  const navigate = useNavigate()
  const storage = useStorage()

  const pathname = useMemo(() => (location.pathname), [location.pathname])

  const [showUserInfo, setShowUserInfo] = useState(false) // 展开用户信息
  const username = storage.get('user')

  // 退出登录
  const handleLogout = (): void => {
    storage.set('token', '')
    storage.set('user', '')
    storage.set('company', '')
    navigate('/login')
    setShowUserInfo(false)
  }

  // DOM
  return (
    <>
      <h1
        style={{
          color: '#fff',
          marginLeft: 20,
          display: 'inline-block'
        }}
      >物联网平台</h1>
      <div style={{ display: 'inline-flex', position: 'absolute', right: 50 }}>
        {(pathname === '/home') &&
          // 用户信息
          <>
            <img
              src={imageUrl.getUrl('/images/head.png')}
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                marginTop: 7
              }}
            />
            <Button type="link" onClick={() => { setShowUserInfo(true) } }>
              <h3
                style={{
                  color: '#fff',
                  fontSize: 24,
                  marginTop: 7
                }}
              >{username}</h3>
            </Button>
            <UserInfo
              show={showUserInfo}
              setShow={setShowUserInfo}
              handleLogout={handleLogout}
            />
          </>
          // : <RangeSelector size={'middle'}/>
        }
      </div>
    </>
  )
}

export default App
