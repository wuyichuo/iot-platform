import { createSlice } from '@reduxjs/toolkit'

interface dataType {
  dataRange: string
}

// 默认值
const initialState: dataType = {
  dataRange: 'today'
}

export const rangeSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // 登录
    setDataRange: (state, action) => {
      state.dataRange = action.payload
    }
  }
})

export const { setDataRange } = rangeSlice.actions

export default rangeSlice.reducer
