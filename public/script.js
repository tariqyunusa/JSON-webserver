fetch('/api/data')
    .then(res => res.json())
    .then(data => {
        document.getElementById('api-response').textContent = JSON.stringify(data);
    });

const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
    document.getElementById('ws-messages').textContent = event.data;
};

ws.onopen = () => {
    ws.send('Hello Server!');
};
