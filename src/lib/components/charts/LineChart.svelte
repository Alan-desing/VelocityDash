<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Legend
	} from 'chart.js';
	import { metricHistory } from '$lib/stores/metrics';

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Legend
	);

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	function createChart() {
		if (!canvas) return;

		const history = $metricHistory;

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: history.map((metric) =>
					new Date(metric.timestamp).toLocaleTimeString()
				),
				datasets: [
					{
						label: 'LCP',
						data: history.map((metric) => metric.lcp),
						borderWidth: 2,
						tension: 0.35,
						pointRadius: 3,
						fill: false
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					intersect: false,
					mode: 'index'
				},
				plugins: {
					legend: {
						display: true
					},
					tooltip: {
						enabled: true
					}
				},
				scales: {
					y: {
						beginAtZero: false,
						title: {
							display: true,
							text: 'Milisegundos'
						}
					},
					x: {
						title: {
							display: true,
							text: 'Hora'
						}
					}
				}
			}
		});
	}

	function updateChart() {
		if (!chart) return;

		const history = $metricHistory;

		chart.data.labels = history.map((metric) =>
			new Date(metric.timestamp).toLocaleTimeString()
		);

		chart.data.datasets[0].data = history.map((metric) => metric.lcp);

		chart.update();
	}

	onMount(() => {
		createChart();

		return () => {
			chart?.destroy();
		};
	});

	$effect(() => {
		$metricHistory;

		if (chart) {
			updateChart();
		}
	});
</script>

<section class="chart-card">
	<div class="chart-header">
		<div>
			<p class="eyebrow">EVOLUCIÓN</p>
			<h2>LCP en el tiempo</h2>
			<p>Tiempo de carga del contenido principal</p>
		</div>
	</div>

	<div class="chart-container">
		<canvas bind:this={canvas}></canvas>
	</div>
</section>

<style>
	.chart-card {
		padding: 1.25rem;
		border: 1px solid #e5e7eb;
		border-radius: 14px;
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.chart-header {
		margin-bottom: 1rem;
	}

	.eyebrow {
		margin: 0 0 0.3rem;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: #6b7280;
	}

	h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.chart-header p:last-child {
		margin: 0.35rem 0 0;
		color: #6b7280;
		font-size: 0.85rem;
	}

	.chart-container {
		position: relative;
		height: 320px;
	}
</style>