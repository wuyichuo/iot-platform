import { createSlice } from '@reduxjs/toolkit'
import { type userInfo } from './userType'

const initialState: userInfo = {
  username: ''
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload
    }
  }
})

export const { login } = counterSlice.actions

export default counterSlice.reducer
