import { WebSocketServer } from 'ws';

const PORT = 8080;

const wss = new WebSocketServer({
	port: PORT
});

function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function generateMetric() {
	return {
		lcp: Math.round(randomBetween(1200, 3500)),
		fid: Math.round(randomBetween(30, 250)),
		cls: Number(randomBetween(0.02, 0.3).toFixed(3)),
		ttfb: Math.round(randomBetween(200, 1000)),
		timestamp: Date.now()
	};
}

wss.on('connection', (socket) => {
	console.log('Cliente WebSocket conectado');

	socket.send(JSON.stringify(generateMetric()));

	socket.on('close', () => {
		console.log('Cliente WebSocket desconectado');
	});
});

setInterval(() => {
	const metric = JSON.stringify(generateMetric());

	wss.clients.forEach((client) => {
		if (client.readyState === 1) {
			client.send(metric);
		}
	});
}, 3000);

console.log(`WebSocket server ejecutándose en ws://localhost:${PORT}`);