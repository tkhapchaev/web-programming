const socket = io({
    transports: ['websocket']
});

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});

socket.on('catalogUpdated', function(msg) {
    console.log(msg);
    alert(msg);
});