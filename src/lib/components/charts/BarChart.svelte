<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
		Tooltip,
		Legend
	} from 'chart.js';
	import { metricHistory } from '$lib/stores/metrics';

	Chart.register(
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
		Tooltip,
		Legend
	);

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	function getAverage(
		values: number[]
	): number {
		if (values.length === 0) return 0;

		return values.reduce((sum, value) => sum + value, 0) / values.length;
	}

	function createChart() {
		if (!canvas) return;

		const history = $metricHistory;

		const lcpAverage = getAverage(history.map((metric) => metric.lcp));
		const fidAverage = getAverage(history.map((metric) => metric.fid));
		const ttfbAverage = getAverage(history.map((metric) => metric.ttfb));

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: ['LCP', 'FID', 'TTFB'],
				datasets: [
					{
						label: 'Promedio (ms)',
						data: [lcpAverage, fidAverage, ttfbAverage],
						backgroundColor: ['#6366f1', '#8b5cf6', '#a855f7'],
						borderRadius: 8
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Milisegundos'
						}
					}
				}
			}
		});
	}

	function updateChart() {
		if (!chart) return;

		const history = $metricHistory;

		const lcpAverage = getAverage(history.map((metric) => metric.lcp));
		const fidAverage = getAverage(history.map((metric) => metric.fid));
		const ttfbAverage = getAverage(history.map((metric) => metric.ttfb));

		chart.data.datasets[0].data = [
			lcpAverage,
			fidAverage,
			ttfbAverage
		];

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
	<div class="header">
		<p class="eyebrow">COMPARACIÓN</p>
		<h2>Promedio de rendimiento</h2>
		<p>Comparación de métricas expresadas en milisegundos</p>
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

	.header {
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

	.header p:last-child {
		margin: 0.35rem 0 0;
		color: #6b7280;
		font-size: 0.85rem;
	}

	.chart-container {
		position: relative;
		height: 300px;
	}
</style>