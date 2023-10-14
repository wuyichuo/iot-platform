import { createSlice } from '@reduxjs/toolkit'

interface map {
  amap: any
}

// 默认值
const initialState: map = {
  amap: null
}

export const mapSlice = createSlice({
  name: 'mapInstance',
  initialState,
  reducers: {
    // 登录
    setMap: (state, action) => {
      state.amap = action.payload
    }
  }
})

export const { setMap } = mapSlice.actions

export default mapSlice.reducer
