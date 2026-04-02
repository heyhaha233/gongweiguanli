// 基于真实 Excel 数据的 API 服务

// 真实学生数据
const realStudents = [
  { record_id: '174977625042290', user_id: '1894345348474675201', student_id: '34520241151603', name: '安云飞', tutor: '"', college: '航空航天学院', grade: '2024', ip: '240e:465:2551:b8a2:408b:3ff:fe55:3bc3', time: '2025-06-13 08:57:30', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176111603491035', user_id: '1701062515229552642', student_id: '36520231151950', name: '叶剑峰', tutor: '马盛林老师', college: '化学化工学院', grade: '2023', ip: '240e:467:2570:d7eb:acff:c2ff:feb9:8eec', time: '2025-10-22 14:53:55', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176077134235663', user_id: '1963189033030897665', student_id: '36920251153110', name: '郭玉锁', tutor: '马盛林', college: '人工智能研究院', grade: '2025', ip: '240e:467:2573:11e0:5dff:4287:31c5:dbbc', time: '2025-10-18 15:09:02', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174960321140348', user_id: '1701059295727939585', student_id: '23220221151706', name: '黄江山', tutor: '王靖瑶', college: '航空航天学院', grade: '2022', ip: '240e:466:2558:1ae3::1', time: '2025-06-11 08:53:31', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174407288264963', user_id: '1701059295727939585', student_id: '23220221151706', name: '黄江山', tutor: '王靖瑶', college: '航空航天学院', grade: '2022', ip: '120.32.196.35', time: '2025-04-08 08:41:23', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174314264447016', user_id: '1701062625304866818', student_id: '34720231151534', name: '董典胜', tutor: '邢菲', college: '航空航天学院', grade: '2023', ip: '240e:465:2450:e722:a42d:3dc0:abe4:b077', time: '2025-03-28 14:17:24', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174286826810547', user_id: '1668543204661555202', student_id: '23220221151710', name: '林晨滢', tutor: '刘暾东', college: '萨本栋微米纳米科学技术研究院', grade: '2022', ip: '2409:8934:24e5:fa0:5573:c76c:abdf:4529', time: '2025-03-25 10:04:28', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176534669054466', user_id: '1963086845109485570', student_id: '34520251151693', name: '朱春阳', tutor: '何良宗', college: '航空航天学院', grade: '2025', ip: '2408:844b:ab01:312a:187f:afb5:3d7a:8d62', time: '2025-12-10 14:04:51', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174278367255291', user_id: '1893891196283969538', student_id: '34520241151663', name: '沈屹', tutor: '赖爱文', college: '航空航天学院', grade: '2024', ip: '240e:467:2592:6973::1', time: '2025-03-24 10:34:33', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176060313644778', user_id: '1960631298573615106', student_id: '34520251151597', name: '廖炜韬', tutor: '关锦婷', college: '航空航天学院', grade: '2025', ip: '2409:8934:20b4:365e:186e:d347:a81e:5830', time: '2025-10-16 16:25:36', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174444798175923', user_id: '1701060916016934913', student_id: '19920221151594', name: '孙望', tutor: '穆瑞', college: '航空航天学院', grade: '2022', ip: '240e:464:2523:1280::1', time: '2025-04-12 16:53:02', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174312437783423', user_id: '1772424996484710402', student_id: '34520241151736', name: '杨鹏', tutor: '朱呈祥', college: '航空航天学院', grade: '2024', ip: '2409:8934:24f5:1ab6:a4b:eaa8:c431:d104', time: '2025-03-28 09:12:58', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176887071205386', user_id: '1701062372602245121', student_id: '23220231151777', name: '周洋', tutor: '王靖瑶', college: '航空航天学院', grade: '2023', ip: '240e:465:2570:8b64:e462:725c:b66d:8c64', time: '2026-01-20 08:58:32', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174566353010642', user_id: '1888534631402147842', student_id: '34520241151771', name: '姚欣怡', tutor: '王奕首教授', college: '航空航天学院', grade: '2024', ip: '120.32.128.57', time: '2025-04-26 18:32:10', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '175617328281986', user_id: '1906649170073042946', student_id: '34520241151626', name: '黎弘杰', tutor: '', college: '航空航天学院', grade: '2024', ip: '240e:467:25a0:24::1', time: '2025-08-26 09:54:43', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176507815122239', user_id: '1960328547960504322', student_id: '34520250156839', name: '贾灏', tutor: '何良宗', college: '航空航天学院', grade: '2025', ip: '2408:844b:ab00:1a74:d939:4d0b:ed33:af52', time: '2025-12-07 11:29:11', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176109035031163', user_id: '1856241705095774209', student_id: '32420241153192', name: '赵赫', tutor: '何良宗', college: '能源学院', grade: '2024', ip: '2409:8934:20a4:1f4a:3cab:bdff:fe5c:7ca4', time: '2025-10-22 07:45:50', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '175629145975411', user_id: '1946127748501999618', student_id: '18019061114', name: '张博', tutor: '', college: '工程技术学部', grade: '', ip: '240e:465:2533:ae8c:3558:2207:10ba:f7c3', time: '2025-08-27 18:44:20', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174305011144177', user_id: '1701062382798598145', student_id: '23220231151800', name: '孙墨洋', tutor: '周笋', college: '航空航天学院', grade: '2023', ip: '240e:464:2520:1d82::1', time: '2025-03-27 12:35:11', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174666579344671', user_id: '1701062372602245121', student_id: '23220231151777', name: '周洋', tutor: '王靖瑶', college: '航空航天学院', grade: '2023', ip: '240e:467:25a3:68d9:f52d:24e4:d0d5:ebcd', time: '2025-05-08 08:56:33', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174451977717462', user_id: '1701062654379782146', student_id: '35120231151723', name: '周子哲', tutor: '陈延平', college: '航空航天学院', grade: '2023', ip: '240e:465:2530:4dd:4c49:d5ff:fe1e:dbb', time: '2025-04-13 12:49:37', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174416914793828', user_id: '1701053700731908098', student_id: '23220220156480', name: '张家熹', tutor: '曾建平', college: '航空航天学院', grade: '2022', ip: '2409:8934:24e2:1bd9:71e0:18c8:802a:96b', time: '2025-04-09 11:25:48', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174364171125494', user_id: '1701059295727939585', student_id: '23220221151706', name: '黄江山', tutor: '王靖瑶', college: '航空航天学院', grade: '2022', ip: '120.32.141.238', time: '2025-04-03 08:55:11', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176282491520320', user_id: '1961777909056028674', student_id: '33520251153312', name: '刘洋', tutor: '马盛林', college: '萨本栋微米纳米科学技术研究院', grade: '2025', ip: '2408:844b:ab00:5696:d0b2:c6bb:247:61d6', time: '2025-11-11 09:35:15', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174902934990015', user_id: '1701062372602245121', student_id: '23220231151777', name: '周洋', tutor: '王靖瑶', college: '航空航天学院', grade: '2023', ip: '240e:467:2590:f54:2442:8d0d:d003:ba40', time: '2025-06-04 17:29:10', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176589380647729', user_id: '1960328547960504322', student_id: '34520250156839', name: '贾灏', tutor: '何良宗', college: '航空航天学院', grade: '2025', ip: '2408:844b:ab00:225:68cb:86cd:88a3:6bf2', time: '2025-12-16 22:03:26', location: '福建省厦门市翔安区香山街道厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '175746058014825', user_id: '1963127872860180481', student_id: '33520250157477', name: '汪泰棚', tutor: '吴德志', college: '萨本栋微米纳米科学技术研究院', grade: '2025', ip: '2408:844b:ab00:b0bb:1863:bd78:5be3:1a73', time: '2025-09-10 07:29:40', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176109683007110', user_id: '1963162661709402114', student_id: '33520251153360', name: '张子怡', tutor: '', college: '萨本栋微米纳米科学技术研究院', grade: '2025', ip: '2409:8934:24a1:32eb:e8b3:f7cb:2686:58db', time: '2025-10-22 09:33:50', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174727026408766', user_id: '1701059295727939585', student_id: '23220221151706', name: '黄江山', tutor: '王靖瑶', college: '航空航天学院', grade: '2022', ip: '240e:464:2521:a711::1', time: '2025-05-15 08:51:04', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174666596068189', user_id: '1701059295727939585', student_id: '23220221151706', name: '黄江山', tutor: '王靖瑶', college: '航空航天学院', grade: '2022', ip: '110.86.201.196', time: '2025-05-08 08:59:21', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '174278851240334', user_id: '1701062371885019138', student_id: '23220231151768', name: '李宁', tutor: '洪文兴', college: '航空航天学院', grade: '2023', ip: '240e:466:2563:478d:1c49:88ff:fe75:aa34', time: '2025-03-24 11:55:12', location: '福建省厦门市翔安区香山街道厦门大学航空航天学院院楼厦门大学翔安校区航空航天学院;经度：118.311076;纬度：24.608676' },
  { record_id: '176256801922469', user_id: '1701062414947938305', student_id: '19920231151636', name: '蔡昌栋', tutor: '穆瑞', college: '航空航天学院', grade: '2023', ip: '240e:465:2542:4241:9fd:c2c3:430c:720e', time: '2025' }
];

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
        const student = realStudents.find(s => s.student_id === studentId);
        resolve({
          code: 200,
          data: {
            student_id: studentId,
            name: student?.name || '未知学生',
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
              current_student_id: realStudents[0].student_id,
              student_name: realStudents[0].name,
              student_id: realStudents[0].student_id
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
              current_student_id: realStudents[1].student_id,
              student_name: realStudents[1].name,
              student_id: realStudents[1].student_id
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
            current_student_id: realStudents[0].student_id,
            student_name: realStudents[0].name,
            student_id: realStudents[0].student_id
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
          data: realStudents.map(student => ({
            student_id: student.student_id,
            name: student.name,
            class: `${student.college} ${student.grade}级`
          })),
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
        let csvContent = '学号,姓名,学院,年级,签到时间,签退时间,时长(分钟),工位\n';
        
        realStudents.forEach((student, index) => {
          csvContent += `${student.student_id},${student.name},${student.college},${student.grade},2024-01-01 08:00:00,2024-01-01 10:00:00,120,A${index + 1}\n`;
        });
        
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
    // 使用真实学生数据
    const studentData = realStudents.map((student, index) => ({
      name: student.name,
      attendance_rate: Math.floor(Math.random() * 30) + 70 // 70-100%
    }));
    
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            total_students: realStudents.length,
            average_attendance: 85.5,
            data: studentData
          },
          message: '获取成功'
        });
      }, 500);
    });
  },
  getAnomalies: async (teacherId: string) => {
    // 生成异常行为记录
    const anomalyData = realStudents.slice(0, 10).map((student, index) => {
      const anomalyTypes = ['连续迟到', '频繁早退', '座位使用异常', '长时间未签到'];
      const randomType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
      
      return {
        student_id: student.student_id,
        name: student.name,
        anomaly_type: randomType,
        count: Math.floor(Math.random() * 5) + 1,
        last_occurrence: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      };
    });
    
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
        let csvContent = '学号,姓名,学院,年级,出勤率,签到次数,迟到次数,早退次数\n';
        
        realStudents.forEach((student, index) => {
          const attendanceRate = Math.floor(Math.random() * 30) + 70;
          const checkinCount = Math.floor(Math.random() * 20) + 10;
          const lateCount = Math.floor(Math.random() * 5);
          const earlyLeaveCount = Math.floor(Math.random() * 3);
          
          csvContent += `${student.student_id},${student.name},${student.college},${student.grade},${attendanceRate}%,${checkinCount},${lateCount},${earlyLeaveCount}\n`;
        });
        
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