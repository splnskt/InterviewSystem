// server.js
const io = require('socket.io')(3000, {
  cors: {
    origin: '*',
  }
});

const users = {};
// 新增：存储预约信息的全局对象
let reservations = {}; 
// reservations 结构: { interviewId: [candidateName,...] }

io.on('connection', (socket) => {
  console.log('用户已连接:', socket.id);

  socket.on('join', (roomId) => {
    users[socket.id] = roomId;
    socket.join(roomId);
    console.log(`${socket.id} 加入了房间 ${roomId}`);
    // 通知房间内其他用户有新用户加入
    socket.to(roomId).emit('new-user', socket.id);
  });

  socket.on('offer', (offer, roomId) => {
    console.log(`接收到来自 ${socket.id} 的 Offer`);
    socket.to(roomId).emit('offer', offer, socket.id);
  });

  socket.on('answer', (answer, roomId) => {
    console.log(`接收到来自 ${socket.id} 的 Answer`);
    socket.to(roomId).emit('answer', answer, socket.id);
  });

  socket.on('candidate', (candidate, roomId) => {
    console.log(`接收到来自 ${socket.id} 的 ICE 候选者`);
    socket.to(roomId).emit('candidate', candidate, socket.id);
  });

  // 新增：处理预约事件
  socket.on('reservation', (data) => {
    const { interviewId, candidateName } = data;
    reservations[interviewId] = reservations[interviewId] || [];
    if (!reservations[interviewId].includes(candidateName)) {
      reservations[interviewId].push(candidateName);
    }
    // 广播给所有连接的客户端，更新预约信息
    io.emit('reservation-update', { interviewId, reservations: reservations[interviewId] });
    console.log(`面试 ${interviewId} 已预约:`, reservations[interviewId]);
  });

  socket.on('disconnect', () => {
    console.log('用户已断开连接:', socket.id);
    const roomId = users[socket.id];
    if (roomId) {
      socket.to(roomId).emit('user-disconnected', socket.id);
      delete users[socket.id];
    }
  });
});
