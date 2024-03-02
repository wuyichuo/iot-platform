import { createSlice } from '@reduxjs/toolkit'
import { type userInfo } from './userType'

// 默认值
const initialState: userInfo = {
  username: null,
  company: null
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // 登录
    // setUser: (state, action) => {
    //   state = action.payload
    // }
  }
})

// export const { setUser } = userSlice.actions

export default userSlice.reducer
