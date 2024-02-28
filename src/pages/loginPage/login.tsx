import React, { useEffect, useRef } from 'react'
import { Button, Checkbox, Form, type FormInstance, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStorage } from '@/hooks/storageHooks'
import JSEncrypt from 'jsencrypt'
import styles from './styles.module.css'
import { LoginAPI, PublicKeyAPI } from './api'
import { type FieldType } from './type'

const App: React.FC = () => {
  // hooks
  const navigate = useNavigate()
  const storage = useStorage()

  const publicKeyRef = useRef<string>('')
  const formRef = useRef<FormInstance>(null)

  // 用户登录
  const Login = async (username: string, password: string): Promise<void> => {
    try {
      const encryptedPwd = await encrypt(password) // 加密
      // 登录请求
      const res = await LoginAPI({
        username,
        password: encryptedPwd
      })
      storage.set('token', res.token)
      storage.set('company', res.company)
      storage.set('user', username)
    } catch (error) {
      await Promise.reject(error) // 将错误包装在一个拒绝状态的 promise 中
    }
  }

  const onFinish = (values: any): void => {
    if (values.remember === true) {
      storage.set('password', values.password)
      storage.set('username', values.username)
    } else {
      storage.set('password', '')
      storage.set('username', '')
    }
    Login(values.username, values.password)
      .then(() => {
        void message.success('登陆成功')
        navigate('/home') // 跳转到首页
      })
      .catch((err) => {
        void message.error(err.message)
      })
  }

  // 密码加密
  const encrypt = async (dataToEncrypt: string): Promise<string> => {
    // 加密
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKeyRef.current)
    const encrypted = encrypt.encrypt(dataToEncrypt)
    // 错误处理
    if (encrypted !== false) {
      return encrypted
    }
    throw new Error('系统错误')
  }

  useEffect(() => {
    // 获取公钥
    const getPublicKey = async (): Promise<void> => {
      publicKeyRef.current = await PublicKeyAPI()
    }
    getPublicKey().catch(console.error)
    // 自动填充密码
    const password = storage.get('password')
    const username = storage.get('username')
    if (password !== '' && username !== '') {
      formRef.current?.setFieldsValue({
        username,
        password,
        remember: true
      })
    }
  })

  return (
    <div className={styles.bg}>
      <Form
        name="basic"
        ref={formRef}
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
        {/* 记住密码 */}
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Checkbox>记住密码</Checkbox>
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
