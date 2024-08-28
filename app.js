// Establish a connection to the server
const socket = io();

// Handle Create Room button click
document.getElementById('create-room').addEventListener('click', () => {
    socket.emit('createRoom');
});

// Handle Join Room button click
document.getElementById('join-room').addEventListener('click', () => {
    const roomId = document.getElementById('room-id').value;
    socket.emit('joinRoom', roomId);
});

// Handle image click event
document.getElementById('click-image').addEventListener('click', () => {
    const roomId = document.getElementById('room-id').value;
    socket.emit('click', roomId);
});

// Listen for roomCreated event from server
socket.on('roomCreated', (roomId) => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('waiting-room').style.display = 'block';
    document.getElementById('room-id-display').textContent = roomId;
});

// Listen for roomJoined event from server
socket.on('roomJoined', () => {
    document.getElementById('waiting-room').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

// Update scores
socket.on('updateClick', (playerId) => {
    // Handle click events and update scores
    // This is a placeholder, you'll need to manage scores based on playerId
});

// Handle player joining
socket.on('playerJoined', (playerId) => {
    console.log('A new player joined with ID:', playerId);
    // Update UI or notify user
});
