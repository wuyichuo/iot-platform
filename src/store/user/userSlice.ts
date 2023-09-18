import { createSlice } from '@reduxjs/toolkit'
import { type userInfo } from './userType'

// 默认值
const initialState: userInfo = {
  username: ''
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // 登录
    login: (state, action) => {
      state.username = action.payload
    }
  }
})

export const { login } = userSlice.actions

export default userSlice.reducer
