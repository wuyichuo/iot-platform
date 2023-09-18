import React from 'react'
import { Select } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setUserName } from '@/store/user/userSlice'

const USERS = ['字节跳动', '华为', '阿里巴巴', '腾讯']

const App: React.FC = () => {
  const { username } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  // 用户登录
  const Login = (username: string): void => {
    dispatch(setUserName(username))
  }

  return (
    <div
      style={{
        backgroundColor: 'rgb(245, 245, 245)',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-around'
      }}
    >
      <Select
        placeholder="请选择用户"
        value={username}
        onChange={Login}
        style={{
          width: '40%',
          height: 50,
          marginTop: 200
        }}
        size='large'
        options={USERS.map((item) => ({
          value: item,
          label: item
        }))}
      />
    </div>
  )
}

export default App
