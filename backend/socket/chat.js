const activeRooms = {}; // { roomId: Set(socketIds) }

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      
      // Presence Tracking
      if (!activeRooms[roomId]) activeRooms[roomId] = new Set();
      activeRooms[roomId].add(socket.id);
      
      io.to(roomId).emit('roomMemberUpdate', { 
        count: activeRooms[roomId].size,
        roomId 
      });
      
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      if (activeRooms[roomId]) {
        activeRooms[roomId].delete(socket.id);
        io.to(roomId).emit('roomMemberUpdate', { 
          count: activeRooms[roomId].size,
          roomId 
        });
      }
    });

    socket.on('sendMessage', ({ to, content, from, roomId }) => {
      if (roomId) {
        io.to(roomId).emit('receiveMessage', { from, content, roomId });
      } else {
        io.to(to).emit('receiveMessage', { from, content });
      }
    });

    socket.on('disconnect', () => {
      // Cleanup all rooms this socket was in
      for (const roomId in activeRooms) {
        if (activeRooms[roomId].has(socket.id)) {
          activeRooms[roomId].delete(socket.id);
          io.to(roomId).emit('roomMemberUpdate', { 
            count: activeRooms[roomId].size,
            roomId 
          });
        }
      }
      console.log('User disconnected');
    });
  });
};
