<script lang="ts">
	import { metricHistory } from '$lib/stores/metrics';

	function getIntensity(value: number): string {
		if (value <= 1500) return 'low';
		if (value <= 2500) return 'medium';
		if (value <= 3500) return 'high';
		return 'critical';
	}

	function getStatus(value: number): string {
		if (value <= 2500) return 'Bueno';
		if (value <= 4000) return 'Regular';
		return 'Malo';
	}
</script>

<section class="chart-card">
	<div class="header">
		<p class="eyebrow">ANÁLISIS</p>
		<h2>Heatmap de LCP</h2>
		<p>Intensidad de los últimos registros de rendimiento</p>
	</div>

	<div class="heatmap">
		{#each $metricHistory as metric, index}
			<div
				class={`cell ${getIntensity(metric.lcp)}`}
				title={`Registro ${index + 1} · LCP: ${metric.lcp} ms · ${getStatus(metric.lcp)}`}
			>
				<span>{metric.lcp}</span>
			</div>
		{/each}
	</div>

	<div class="legend">
		<span><i class="low"></i> Bajo</span>
		<span><i class="medium"></i> Medio</span>
		<span><i class="high"></i> Alto</span>
		<span><i class="critical"></i> Crítico</span>
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

	.heatmap {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: 0.35rem;
	}

	.cell {
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		font-size: 0.65rem;
		font-weight: 600;
		color: white;
		cursor: pointer;
		transition: transform 0.15s ease;
	}

	.cell:hover {
		transform: scale(1.08);
	}

	.low {
		background: #22c55e;
	}

	.medium {
		background: #f59e0b;
	}

	.high {
		background: #f97316;
	}

	.critical {
		background: #ef4444;
	}

	.legend {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 1rem;
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
</style>