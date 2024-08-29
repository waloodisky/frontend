const socket = io('makimaserver.glitch.me');

// Handle matchmaking button click
document.getElementById('matchmake').addEventListener('click', () => {
    socket.emit('matchmake');
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

// Listen for gameStarted event
socket.on('gameStarted', (data) => {
    document.getElementById('waiting-room').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    // Initialize scores and timer
    setInterval(() => {
        fetch(`/gameData/${roomId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('your-score').textContent = data.player1;
                document.getElementById('opponent-score').textContent = data.player2;
            });
    }, 1000);
});

// Update scores
socket.on('scoreUpdate', (data) => {
    document.getElementById('your-score').textContent = data.player1;
    document.getElementById('opponent-score').textContent = data.player2;
});
