const socket = io('makimaserver.glitch.me');

// Handle Create Room button click
document.getElementById('create-room').addEventListener('click', () => {
    socket.emit('createRoom');
});

// Handle Join Room button click
document.getElementById('join-room').addEventListener('click', () => {
    const roomId = document.getElementById('room-id').value;
    socket.emit('joinRoom', roomId);
});

// Handle image click
document.getElementById('click-image').addEventListener('click', () => {
    const roomId = document.getElementById('room-id-display').textContent;
    socket.emit('click', roomId);
});

// Listen for roomCreated event
socket.on('roomCreated', (roomId) => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('waiting-room').style.display = 'block';
    document.getElementById('room-id-display').textContent = roomId;
});

// Listen for gameStart event
socket.on('gameStart', () => {
    document.getElementById('waiting-room').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

// Update scores
socket.on('updateScores', (yourScore, opponentScore) => {
    document.getElementById('your-score').textContent = yourScore;
    document.getElementById('opponent-score').textContent = opponentScore;
});

// Handle player disconnection
socket.on('playerDisconnected', () => {
    alert('The other player has disconnected. The game will reset.');
    location.reload();
});
