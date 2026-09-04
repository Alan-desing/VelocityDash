<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		DoughnutController,
		ArcElement,
		Tooltip
	} from 'chart.js';
	import { metrics } from '$lib/stores/metrics';

	Chart.register(DoughnutController, ArcElement, Tooltip);

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	const MAX_LCP = 5000;

	function createChart() {
		if (!canvas) return;

		chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: ['Bueno', 'Regular', 'Malo'],
				datasets: [
					{
						data: [2500, 1500, 1000],
						backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
						borderWidth: 0
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				rotation: -90,
				circumference: 180,
				cutout: '65%',
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true
					}
				}
			}
		});
	}

	onMount(() => {
		createChart();

		return () => {
			chart?.destroy();
		};
	});
</script>

<section class="chart-card">
	<div class="header">
		<div>
			<p class="eyebrow">INDICADOR</p>
			<h2>LCP actual</h2>
			<p>Tiempo de carga del contenido principal</p>
		</div>
	</div>

	<div class="gauge-container">
		<canvas bind:this={canvas}></canvas>

		<div class="gauge-value">
			<strong>{$metrics.lcp}</strong>
			<span>ms</span>
		</div>
	</div>

	<div class={`status ${$metrics.lcpStatus}`}>
		{$metrics.lcpStatus === 'good'
			? 'Bueno'
			: $metrics.lcpStatus === 'warning'
				? 'Regular'
				: 'Malo'}
	</div>

	<div class="legend">
		<span><i class="good"></i> Bueno</span>
		<span><i class="warning"></i> Regular</span>
		<span><i class="bad"></i> Malo</span>
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
		margin-bottom: 0.5rem;
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

	.gauge-container {
		position: relative;
		height: 240px;
	}

	.gauge-value {
		position: absolute;
		left: 50%;
		bottom: 20px;
		transform: translateX(-50%);
		text-align: center;
	}

	.gauge-value strong {
		font-size: 2rem;
	}

	.gauge-value span {
		margin-left: 0.25rem;
		color: #6b7280;
	}

	.status {
		width: fit-content;
		margin: -5px auto 1rem;
		padding: 0.3rem 0.8rem;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.status.good {
		background: #dcfce7;
		color: #166534;
	}

	.status.warning {
		background: #fef3c7;
		color: #92400e;
	}

	.status.bad {
		background: #fee2e2;
		color: #991b1b;
	}

	.legend {
		display: flex;
		justify-content: center;
		gap: 1rem;
		font-size: 0.75rem;
		color: #6b7280;
	}

	.legend span {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.legend i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.good {
		background: #22c55e;
	}

	.warning {
		background: #f59e0b;
	}

	.bad {
		background: #ef4444;
	}
</style>