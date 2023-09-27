import { createSlice } from '@reduxjs/toolkit'
import { type userInfo } from './userType'
import { useStorage } from '@/hooks/storageHooks'

const storage = useStorage()

// 默认值
const initialState: userInfo = {
  username: null
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // 登录
    setUserName: (state, action) => {
      storage.set('token', action.payload)
      state.username = action.payload
    }
  }
})

export const { setUserName } = userSlice.actions

export default userSlice.reducer
