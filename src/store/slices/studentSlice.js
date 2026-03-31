import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkinAPI, teacherAPI } from '../../services/api';

// 异步签到
export const checkIn = createAsyncThunk(
  'student/checkIn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await checkinAPI.checkin(data);
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '签到失败');
    }
  }
);

// 异步签退
export const checkOut = createAsyncThunk(
  'student/checkOut',
  async (data, { rejectWithValue }) => {
    try {
      const response = await checkinAPI.checkout(data);
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '签退失败');
    }
  }
);

// 异步获取学生状态
export const fetchStudentStatus = createAsyncThunk(
  'student/fetchStudentStatus',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await checkinAPI.getStudentStatus(studentId);
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '获取学生状态失败');
    }
  }
);

// 异步获取学生列表
export const fetchStudents = createAsyncThunk(
  'student/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getStudents();
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '获取学生列表失败');
    }
  }
);

// 异步获取学生出勤记录
export const fetchStudentRecords = createAsyncThunk(
  'student/fetchStudentRecords',
  async ({ studentId, params }, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getStudentRecords(studentId, params);
      if (response.code === 200) {
        return { studentId, records: response.data };
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '获取出勤记录失败');
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    currentStudent: null,
    studentStatus: null,
    studentRecords: {},
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentStudent: (state) => {
      state.currentStudent = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 签到
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 签退
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkOut.fulfilled, (state) => {
        state.loading = false;
        state.currentStudent = null;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 获取学生状态
      .addCase(fetchStudentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.studentStatus = action.payload;
      })
      .addCase(fetchStudentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 获取学生列表
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 获取学生出勤记录
      .addCase(fetchStudentRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.studentRecords[action.payload.studentId] = action.payload.records;
      })
      .addCase(fetchStudentRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearCurrentStudent } = studentSlice.actions;
export default studentSlice.reducer;