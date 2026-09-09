import type { WebMetric } from '$lib/types/metrics';

const WS_URL = 'ws://localhost:8080';

let socket: WebSocket | null = null;

export function connectWebSocket(
	onMetric: (metric: WebMetric) => void
): () => void {
	socket = new WebSocket(WS_URL);

	socket.addEventListener('open', () => {
		console.log('WebSocket conectado');
	});

	socket.addEventListener('message', (event) => {
		try {
			const metric = JSON.parse(event.data) as WebMetric;

			onMetric(metric);
		} catch (error) {
			console.error('Error al procesar la métrica recibida:', error);
		}
	});

	socket.addEventListener('error', (error) => {
		console.error('Error en WebSocket:', error);
	});

	socket.addEventListener('close', () => {
		console.log('WebSocket desconectado');
	});

	return () => {
		socket?.close();
		socket = null;
	};
}