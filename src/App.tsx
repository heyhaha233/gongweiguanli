import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StudentCheckIn from './pages/StudentCheckIn'
import Dashboard from './pages/Dashboard'
import TeacherLogin from './pages/TeacherLogin'
import TeacherDashboard from './pages/TeacherDashboard'
import Analytics from './pages/Analytics'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/checkin" element={<StudentCheckIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
