import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyticsAPI } from '../../services/api';

// 异步获取工位使用率
export const fetchUsageData = createAsyncThunk(
  'analytics/fetchUsageData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getSeatUsage(params);
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '获取工位使用率失败');
    }
  }
);

// 异步获取学生出勤统计
export const fetchAttendanceData = createAsyncThunk(
  'analytics/fetchAttendanceData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getStudentAttendance(params);
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '获取学生出勤统计失败');
    }
  }
);

// 异步获取异常检测数据
export const fetchAnomalies = createAsyncThunk(
  'analytics/fetchAnomalies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getAnomalies();
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '获取异常检测数据失败');
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    usageData: null,
    attendanceData: null,
    anomalies: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 获取工位使用率
      .addCase(fetchUsageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsageData.fulfilled, (state, action) => {
        state.loading = false;
        state.usageData = action.payload;
      })
      .addCase(fetchUsageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 获取学生出勤统计
      .addCase(fetchAttendanceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceData.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceData = action.payload;
      })
      .addCase(fetchAttendanceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 获取异常检测数据
      .addCase(fetchAnomalies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnomalies.fulfilled, (state, action) => {
        state.loading = false;
        state.anomalies = action.payload;
      })
      .addCase(fetchAnomalies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;