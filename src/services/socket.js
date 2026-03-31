import { io } from 'socket.io-client';

// 创建socket实例
const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  autoConnect: true
});

// 连接状态
let isConnected = false;

// 连接事件
socket.on('connect', () => {
  console.log('WebSocket连接成功');
  isConnected = true;
});

// 断开连接事件
socket.on('disconnect', () => {
  console.log('WebSocket连接断开');
  isConnected = false;
});

// 错误事件
socket.on('connect_error', (error) => {
  console.error('WebSocket连接错误:', error);
});

// 监听工位状态更新
export const onSeatStatusUpdate = (callback) => {
  socket.on('seat_status_update', callback);
};

// 监听实时统计数据
export const onRealTimeStats = (callback) => {
  socket.on('real_time_stats', callback);
};

// 移除监听
export const removeListeners = () => {
  socket.off('seat_status_update');
  socket.off('real_time_stats');
};

// 手动连接
export const connect = () => {
  if (!isConnected) {
    socket.connect();
  }
};

// 手动断开连接
export const disconnect = () => {
  if (isConnected) {
    socket.disconnect();
  }
};

export default socket;