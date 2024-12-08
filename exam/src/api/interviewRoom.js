import api from '@/api'; // axios 实例

export function getAllInterviewRooms() {
  return api.get('/interview-room');
}

export function getInterviewRoomById(id) {
  return api.get(`/interview-room/${id}`);
}

export function createInterviewRoom(data) {
  return api.post('/interview-room', data);
}

export function updateInterviewRoom(data) {
  return api.put('/interview-room', data);
}

export function deleteInterviewRoom(id) {
  return api.delete(`/interview-room/${id}`);
}

export function startInterview(id) {
  return api.get('/interview-room/startInterview', { params: { id } });
}

export function endInterview(id) {
  return api.post('/interview-room/endInterview', null, { params: { id } });
}

export function fetchStudentInterviews(candidateName) {
  return api.get('/interview-room/studentInterviews', {
    params: { candidateName },
  });
}



