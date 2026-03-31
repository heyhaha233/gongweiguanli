import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { seatAPI } from '../../services/api';

// 异步获取所有工位
export const fetchSeats = createAsyncThunk(
  'seat/fetchSeats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await seatAPI.getSeats();
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '获取工位失败');
    }
  }
);

// 异步更新工位状态
export const updateSeatStatus = createAsyncThunk(
  'seat/updateSeatStatus',
  async ({ seatId, status }, { rejectWithValue }) => {
    try {
      const response = await seatAPI.updateSeatStatus(seatId, status);
      if (response.code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message || '更新工位状态失败');
    }
  }
);

const seatSlice = createSlice({
  name: 'seat',
  initialState: {
    seats: [],
    loading: false,
    error: null
  },
  reducers: {
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 获取工位
      .addCase(fetchSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.seats = action.payload;
      })
      .addCase(fetchSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 更新工位状态
      .addCase(updateSeatStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSeatStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.seats.findIndex(seat => seat.seat_id === action.payload.seat_id);
        if (index !== -1) {
          state.seats[index].status = action.payload.status;
        }
      })
      .addCase(updateSeatStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSeats, clearError } = seatSlice.actions;
export default seatSlice.reducer;