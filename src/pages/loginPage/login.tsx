import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setUserName } from '@/store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useStorage } from '@/hooks/storageHooks'
import JSEncrypt from 'jsencrypt'
import styles from './styles.module.css'
import { LoginAPI, PublicKeyAPI } from './api'
import { type FieldType } from './type'

const App: React.FC = () => {
  // hooks
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const storage = useStorage()

  // 用户登录
  const Login = async (username: string, password: string): Promise<void> => {
    const encryptedPwd = await encrypt(password) // 加密
    // 登录请求
    const token = await LoginAPI({
      username,
      password: encryptedPwd
    })
    storage.set('access_token', token)
  }

  const onFinish = (values: any): void => {
    console.log('Success:', values)
    Login(values.username, values.password)
      .then(() => {
        void message.success('登陆成功')
        dispatch(setUserName(values.username))
        // 跳转到首页
        navigate('/home')
      })
      .catch((error) => {
        void message.error(error)
        console.error(error)
      })
  }

  // 密码加密
  const encrypt = async (dataToEncrypt: string): Promise<string> => {
    const publicKey = await PublicKeyAPI() // 获取公钥
    // 加密
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    const encrypted = encrypt.encrypt(dataToEncrypt)
    // 错误处理
    if (encrypted !== false) {
      console.log('result:', encrypted)
      return encrypted
    }
    throw new Error('系统错误')
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
