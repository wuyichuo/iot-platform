import { createSlice } from '@reduxjs/toolkit'
import { type userInfo } from './userType'

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
      state.username = action.payload
    }
  }
})

export const { setUserName } = userSlice.actions

export default userSlice.reducer
