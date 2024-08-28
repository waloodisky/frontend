// Establish a connection to the Glitch server
const socket = io('https://makimaserver.glitch.me');

// Handle the "Create Room" button click event
document.getElementById('create-room').addEventListener('click', () => {
    socket.emit('createRoom');
});

// Handle the "Join Room" button click event
document.getElementById('join-room').addEventListener('click', () => {
    const roomId = document.getElementById('room-id').value;
    socket.emit('joinRoom', roomId);
});

// Handle the image click event, which increases the player's score
document.getElementById('click-image').addEventListener('click', () => {
    socket.emit('click');
});

// Listen for the "roomCreated" event from the server
socket.on('roomCreated', (roomId) => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('waiting-room').style.display = 'block';
    document.getElementById('room-id-display').textContent = roomId;
});

// Listen for the "roomJoined" event from the server
socket.on('roomJoined', () => {
    document.getElementById('waiting-room').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

// Update the scores when the "updateScores" event is received
socket.on('updateScores', (yourScore, opponentScore) => {
    document.getElementById('your-score').textContent = yourScore;
    document.getElementById('opponent-score').textContent = opponentScore;
});

// Handle the case where a player disconnects from the room
socket.on('roomDisconnected', () => {
    alert('The other player has disconnected. The game will reset.');
    location.reload();
});
