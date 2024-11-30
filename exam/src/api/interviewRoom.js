// import api from '@/api'; // axios 实例

// export function getAllInterviewRooms() {
//   return api.get('/interview-room');
// }

// export function getInterviewRoomById(id) {
//   return api.get(`/interview-room/${id}`);
// }

// export function createInterviewRoom(data) {
//   return api.post('/interview-room', data);
// }

// export function updateInterviewRoom(data) {
//   return api.put('/interview-room', data);
// }

// export function deleteInterviewRoom(id) {
//   return api.delete(`/interview-room/${id}`);
// }

// export function startInterview(id) {
//   return api.get('/interview-room/startInterview', { params: { id } });
// }

// export function endInterview(id) {
//   return api.post('/interview-room/endInterview', null, { params: { id } });
// }

// export function fetchStudentInterviews(candidateName) {
//   return api.get('/interview-room/studentInterviews', {
//     params: { candidateName },
//   });
// }

// src/api/interviewRoom.js

import axios from 'axios';

// 创建一个 Axios 实例，可以统一配置前缀
const apiClient = axios.create({
  baseURL: '/api', // 代理标识符
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取所有面试房间
export const getAllInterviewRooms = () => {
  return apiClient.get('/interview-room');
};

// 获取指定 ID 的面试房间
export const getInterviewRoomById = (id) => {
  return apiClient.get(`/interview-room/${id}`);
};

// 创建面试房间
export const createInterviewRoom = (data) => {
  return apiClient.post('/interview-room', data);
};

// 更新面试房间
export const updateInterviewRoom = (data) => {
  return apiClient.put('/interview-room', data);
};

// 删除面试房间
export const deleteInterviewRoom = (id) => {
  return apiClient.delete(`/interview-room/${id}`);
};

// 开始面试
export const startInterview = (id) => {
  return apiClient.get(`/interview-room/startInterview`, {
    params: { id },
  });
};

// 结束面试
export const endInterview = (id) => {
  return apiClient.post(`/interview-room/endInterview`, null, {
    params: { id },
  });
};

// 获取学生面试列表
export const fetchStudentInterviews = (studentName) => {
  return apiClient.get(`/interview-room/studentInterviews`, {
    params: { candidateName: studentName },
  });
};


