import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setUserName } from '@/store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

interface FieldType {
  username?: string
  password?: string
  remember?: string
}

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // 用户登录
  const Login = (username: string): void => {
    dispatch(setUserName(username))
    // 跳转到首页
    navigate('/home')
  }

  const onFinish = (values: any): void => {
    console.log('Success:', values)
    Login(values.username)
  }

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.bg}>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={styles.form}
        size='large'
      >
        {/* 账号 */}
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input size='large' />
        </Form.Item>
        {/* 密码 */}
        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password size='large' />
        </Form.Item>
        {/* 自动登录 */}
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Checkbox>自动登录</Checkbox>
        </Form.Item>
        {/* 提交 */}
        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Button type="primary" htmlType="submit" size='large'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
