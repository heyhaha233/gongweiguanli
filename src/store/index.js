import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import seatReducer from './slices/seatSlice';
import studentReducer from './slices/studentSlice';
import analyticsReducer from './slices/analyticsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    seat: seatReducer,
    student: studentReducer,
    analytics: analyticsReducer
  }
});

export default store;