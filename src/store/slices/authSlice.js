import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';

// 异步登录
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.code === 200) {
        // 存储token到localStorage
        localStorage.setItem('token', response.data.token);
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '登录失败');
    }
  }
);

// 验证token
export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.verify();
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      // token无效，清除localStorage
      localStorage.removeItem('token');
      return rejectWithValue(error.message || '验证失败');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    teacherInfo: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.teacherInfo = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 登录
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.teacherInfo = action.payload.teacher;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 验证token
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherInfo = action.payload.teacher;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.teacherInfo = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;