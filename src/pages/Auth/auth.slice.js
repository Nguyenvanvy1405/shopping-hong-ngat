import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'src/api/auth.api'
import userApi from 'src/api/user.api'
import LocalStorage from 'src/constants/localStorage'
import { payloadCreator } from 'src/utils/helper'

// Setup Redux

// Async Function payloadCreator rút gọn của
// async (data, thunkAPI) => {
//   try {
//     const res = await authApi.register(data)
//     return res
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error)
//   }
// }

export const register = createAsyncThunk('auth/register', payloadCreator(authApi.register))

export const login = createAsyncThunk('auth/login', payloadCreator(authApi.login))

export const logout = createAsyncThunk('auth/logout', payloadCreator(authApi.logout))

export const updateMe = createAsyncThunk('auth/updateMe', payloadCreator(userApi.updateMe))

// xử lý logout
const handleUnauth = state => {
  state.profile = {}
  localStorage.removeItem(LocalStorage.user)
  localStorage.removeItem(LocalStorage.accessToken)
}
// Xử lý register/login fullfilled
const handleAuthFulFilled = (state, action) => {
  // lấy user và access_token
  const { user, access_token } = action.payload.data
  // truyền user
  state.profile = user
  // Lưu user
  // đổi object thành json
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
  // Lưu access_token
  localStorage.setItem(LocalStorage.accessToken, access_token)
}

const auth = createSlice({
  name: 'auth',
  //khai báo 1 state profile, khi mở app nếu localStorage đã có thông tin uer thì get lên, ngược lại trả về {}
  initialState: { profile: JSON.parse(localStorage.getItem(LocalStorage.user)) || {} },
  reducers: {
    // xử lý như login
    unauthorize: handleUnauth
  },
  // Xử lý register fullfilled
  extraReducers: {
    [register.fulfilled]: handleAuthFulFilled,
    [login.fulfilled]: handleAuthFulFilled,
    [logout.fulfilled]: handleUnauth,
    [updateMe.fulfilled]: (state, action) => {
      state.profile = action.payload.data
      // đổi json thành object
      localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
    }
  }
})

const authReducer = auth.reducer
// Xử lý khi token hết hạn
// tạo app.slice.js tạo status 401 => 200
export const unauthorize = auth.actions.unauthorize
export default authReducer
