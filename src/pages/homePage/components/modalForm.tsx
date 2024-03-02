import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, Select } from 'antd'
import { type ModalFormProps } from '../mobile/type'

const ModalForm: React.FC<ModalFormProps> = ({ isModalOpen, setIsModalOpen, submit }) => {
  // 添加 props 验证
  ModalForm.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  }
  const [form] = Form.useForm()

  const [location, setLocation] = useState({
    latitude: 999,
    longitude: 999
  })
  //   const [isModalOpen, setIsModalOpen] = useState(false)

  // 弹窗关闭后清空数据
  const handleClose = (): void => {
    setLocation({
      latitude: 999,
      longitude: 999
    })
    form.setFieldsValue({
      deviceType: null,
      deviceName: null
    })
    setIsModalOpen(false)
  }
  // 弹窗控制
  const handleOk = (): void => {
    form
      .validateFields()
      .then((values) => {
        submit({
          name: values.deviceName,
          type: values.deviceType,
          location
        })
        handleClose()
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo)
      })
  }

  // 获取定位
  const getLocation = (): void => {
    // 向RN发送消息
    window.ReactNativeWebView.postMessage('getLocation')
    setTimeout(() => {
      const string = localStorage.getItem('location')
      if (string !== null) {
        const locat = JSON.parse(string)
        setLocation({
          latitude: locat.latitude,
          longitude: locat.longitude
        })
      }
    }, 100)
  }

  return (
      <Modal title="添加设备" open={isModalOpen} onOk={handleOk} onCancel={handleClose}>
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="设备名称"
            name="deviceName"
            rules={[{ type: 'string', required: true, message: '请输入设备名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="设备类型"
            name="deviceType"
            rules={[{ type: 'string', required: true, message: '请选择设备类型!' }]}
          >
            <Select
              options={[
                { value: 'temperatureSensor', label: '温度传感器' },
                { value: 'humiditySensor', label: '湿度传感器' },
                { value: 'lightSensor', label: '光线传感器' }
              ]}
            />
          </Form.Item>
          <Form.Item
            label="定位"
            name="location"
            rules={[() => ({
              async validator (_) {
                if (location.latitude !== 999) {
                  await Promise.resolve()
                  return
                }
                return await Promise.reject(new Error('请选择定位'))
              }
            })]}
          >
            {
              location.latitude === 999
                ? (
                <Button type="primary" onClick={getLocation} >获取手机定位</Button>
                  )
                : (<div>
                经度：{location.longitude + `° ${location.longitude >= 0 ? 'E' : 'W'}`}
                <br />
                纬度：{location.latitude + `° ${location.latitude >= 0 ? 'N' : 'S'}`}
              </div>)
            }
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default ModalForm
