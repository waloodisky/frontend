const socket = io();

document.getElementById('create-room').addEventListener('click', () => {
    socket.emit('createRoom');
});

document.getElementById('join-room').addEventListener('click', () => {
    const roomId = document.getElementById('room-id').value;
    socket.emit('joinRoom', roomId);
});

document.getElementById('click-image').addEventListener('click', () => {
    socket.emit('click');
});

socket.on('roomCreated', (roomId) => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('waiting-room').style.display = 'block';
    document.getElementById('room-id-display').textContent = roomId;
});

socket.on('roomJoined', () => {
    document.getElementById('waiting-room').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

socket.on('updateScores', (yourScore, opponentScore) => {
    document.getElementById('your-score').textContent = yourScore;
    document.getElementById('opponent-score').textContent = opponentScore;
});
