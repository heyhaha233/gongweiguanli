import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/reset.css';

// 页面组件
import StudentCheckIn from './pages/StudentCheckIn';
import Dashboard from './pages/Dashboard';
import TeacherLogin from './pages/TeacherLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import Analytics from './pages/Analytics';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/student/checkin" element={<StudentCheckIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;