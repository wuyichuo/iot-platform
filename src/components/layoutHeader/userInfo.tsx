import React from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Popconfirm } from 'antd'
import { useAppSelector } from '@/hooks/reduxHooks'

interface UserInfoProps {
  show: boolean
  setShow: (show: boolean) => void
  handleLogout: () => void
}

const UserInfo: React.FC<UserInfoProps> = ({
  show,
  setShow,
  handleLogout
}) => {
  const { username } = useAppSelector(state => state.user)

  // DOM
  return (
    <Modal
      title="用户信息"
      open={show}
      onCancel={() => { setShow(false) }}
      style={{ right: 20 }}
      footer={[
        <Button
          key="cancel"
          type="primary"
          onClick={() => { setShow(false) }}>
          关闭
        </Button>,
        <Popconfirm
            key="logout"
            title="请确定退出登录"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            okText="确定"
            cancelText="取消"
            onConfirm={handleLogout}
        >
            <Button danger type="primary">退出登录</Button>
        </Popconfirm>
      ]}
    >
      <p>用户名：{username}</p>
      <p>组织：杭州电子科技大学</p>
    </Modal>
  )
}

export default UserInfo
