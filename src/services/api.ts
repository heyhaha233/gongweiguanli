// Mock数据版本的API服务

// 签到相关API
export const checkinAPI = {
  checkin: async (data: { seat_id: string; student_id: string }) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            record_id: '1',
            seat_id: data.seat_id,
            student_id: data.student_id,
            check_in_time: new Date().toISOString()
          },
          message: '签到成功'
        });
      }, 500);
    });
  },
  checkout: async (data: { seat_id: string; student_id: string }) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            record_id: '1',
            check_out_time: new Date().toISOString(),
            duration: 120
          },
          message: '签退成功'
        });
      }, 500);
    });
  },
  getStudentStatus: async (studentId: string) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            student_id: studentId,
            name: '张三',
            status: 'idle',
            seat_id: null,
            check_in_time: null
          },
          message: '获取成功'
        });
      }, 500);
    });
  }
};

// 工位相关API
export const seatAPI = {
  getSeats: async () => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: [
            {
              id: '1',
              seat_id: 'A1',
              location: '第一排',
              status: 'using',
              current_student_id: '1',
              student_name: '张三',
              student_id: '2021001'
            },
            {
              id: '2',
              seat_id: 'A2',
              location: '第一排',
              status: 'idle',
              current_student_id: null,
              student_name: null,
              student_id: null
            },
            {
              id: '3',
              seat_id: 'B1',
              location: '第二排',
              status: 'using',
              current_student_id: '2',
              student_name: '李四',
              student_id: '2021002'
            },
            {
              id: '4',
              seat_id: 'B2',
              location: '第二排',
              status: 'idle',
              current_student_id: null,
              student_name: null,
              student_id: null
            }
          ],
          message: '获取成功'
        });
      }, 500);
    });
  },
  getSeat: async (seatId: string) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            id: '1',
            seat_id: seatId,
            location: '第一排',
            status: 'using',
            current_student_id: '1',
            student_name: '张三',
            student_id: '2021001'
          },
          message: '获取成功'
        });
      }, 500);
    });
  },
  updateSeatStatus: async (seatId: string, status: string) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            id: '1',
            seat_id: seatId,
            status: status
          },
          message: '更新成功'
        });
      }, 500);
    });
  }
};

// 教师相关API
export const teacherAPI = {
  getStudents: async (teacherId: string) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: [
            {
              student_id: '2021001',
              name: '张三',
              class: '计算机科学与技术1班'
            },
            {
              student_id: '2021002',
              name: '李四',
              class: '计算机科学与技术1班'
            },
            {
              student_id: '2021003',
              name: '王五',
              class: '计算机科学与技术2班'
            }
          ],
          message: '获取成功'
        });
      }, 500);
    });
  },
  getStudentRecords: async (studentId: string, params: { start_date?: string; end_date?: string }, teacherId: string) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: [
            {
              id: '1',
              check_in_time: '2024-01-01T08:00:00Z',
              check_out_time: '2024-01-01T10:00:00Z',
              duration: 120,
              seat_id: 'A1'
            },
            {
              id: '2',
              check_in_time: '2024-01-02T09:00:00Z',
              check_out_time: '2024-01-02T11:30:00Z',
              duration: 150,
              seat_id: 'A2'
            }
          ],
          message: '获取成功'
        });
      }, 500);
    });
  },
  exportData: async (params: { start_date?: string; end_date?: string }, teacherId: string) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        // 创建一个模拟的CSV blob
        const csvContent = '学号,姓名,班级,签到时间,签退时间,时长(分钟),工位\n2021001,张三,计算机科学与技术1班,2024-01-01 08:00:00,2024-01-01 10:00:00,120,A1\n2021002,李四,计算机科学与技术1班,2024-01-01 09:00:00,2024-01-01 11:00:00,120,A2';
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        resolve(blob);
      }, 500);
    });
  }
};

// 数据分析相关API
export const analyticsAPI = {
  getSeatUsage: async (params: { time_range?: string; date?: string }) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            total_seats: 1000,
            used_seats: 850,
            usage_rate: 85,
            data: [
              { time: '06:00', usage_rate: 5 },
              { time: '07:00', usage_rate: 15 },
              { time: '08:00', usage_rate: 30 },
              { time: '09:00', usage_rate: 55 },
              { time: '10:00', usage_rate: 75 },
              { time: '11:00', usage_rate: 90 },
              { time: '12:00', usage_rate: 60 },
              { time: '13:00', usage_rate: 70 },
              { time: '14:00', usage_rate: 85 },
              { time: '15:00', usage_rate: 95 },
              { time: '16:00', usage_rate: 90 },
              { time: '17:00', usage_rate: 80 },
              { time: '18:00', usage_rate: 65 },
              { time: '19:00', usage_rate: 45 },
              { time: '20:00', usage_rate: 25 },
              { time: '21:00', usage_rate: 10 }
            ]
          },
          message: '获取成功'
        });
      }, 500);
    });
  },
  getStudentAttendance: async (params: { time_range?: string; date?: string }, teacherId: string) => {
    // 生成100个学生的出勤数据
    const studentData = [];
    for (let i = 1; i <= 100; i++) {
      studentData.push({
        name: `学生${i}`,
        attendance_rate: Math.floor(Math.random() * 30) + 70 // 70-100%
      });
    }
    
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            total_students: 1000,
            average_attendance: 85.5,
            data: studentData
          },
          message: '获取成功'
        });
      }, 500);
    });
  },
  getAnomalies: async (teacherId: string) => {
    // 生成20个异常行为记录
    const anomalyData = [];
    for (let i = 1; i <= 20; i++) {
      const anomalyTypes = ['连续迟到', '频繁早退', '座位使用异常', '长时间未签到'];
      const randomType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
      
      anomalyData.push({
        student_id: '2021' + String(i).padStart(4, '0'),
        name: `学生${i}`,
        anomaly_type: randomType,
        count: Math.floor(Math.random() * 5) + 1,
        last_occurrence: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: anomalyData,
          message: '获取成功'
        });
      }, 500);
    });
  },
  exportAttendanceData: async (params: { start_date?: string; end_date?: string }, teacherId: string) => {
    // 模拟导出数据
    return new Promise((resolve) => {
      setTimeout(() => {
        // 创建一个模拟的CSV blob
        let csvContent = '学号,姓名,班级,出勤率,签到次数,迟到次数,早退次数\n';
        
        for (let i = 1; i <= 100; i++) {
          const attendanceRate = Math.floor(Math.random() * 30) + 70;
          const checkinCount = Math.floor(Math.random() * 20) + 10;
          const lateCount = Math.floor(Math.random() * 5);
          const earlyLeaveCount = Math.floor(Math.random() * 3);
          
          csvContent += `2021${String(i).padStart(4, '0')},学生${i},计算机${Math.floor((i-1)/20) + 1}班,${attendanceRate}%,${checkinCount},${lateCount},${earlyLeaveCount}\n`;
        }
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        resolve(blob);
      }, 1000);
    });
  }
};

// 认证相关API
export const authAPI = {
  login: async (email: string, password: string) => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'zhangsan@example.com' && password === '123456') {
          resolve({
            data: {
              user: {
                id: '1',
                email: email,
                name: '张三'
              },
              session: {
                access_token: 'mock-token'
              }
            },
            error: null
          });
        } else if (email === 'lisi@example.com' && password === '123456') {
          resolve({
            data: {
              user: {
                id: '2',
                email: email,
                name: '李四'
              },
              session: {
                access_token: 'mock-token'
              }
            },
            error: null
          });
        } else {
          resolve({
            data: null,
            error: {
              message: '邮箱或密码错误'
            }
          });
        }
      }, 500);
    });
  },
  logout: async () => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          error: null
        });
      }, 500);
    });
  },
  getCurrentUser: async () => {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          email: 'zhangsan@example.com',
          name: '张三'
        });
      }, 500);
    });
  }
};