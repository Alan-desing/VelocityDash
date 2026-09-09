<script lang="ts">
	import MetricCard from './MetricCard.svelte';
	import { metrics } from '$lib/stores/metrics';
	import { fade } from 'svelte/transition';

	const getTrend = () => Math.random() * 10 - 5;
</script>

<section class="kpi-grid">
	<div transition:fade={{ duration: 500 }}>
		<MetricCard
			title="LCP"
			value={$metrics.lcp}
			unit="ms"
			status={$metrics.lcpStatus}
			trend={getTrend()}
		/>
	</div>

	<div transition:fade={{ duration: 600, delay: 100 }}>
		<MetricCard
			title="FID"
			value={$metrics.fid}
			unit="ms"
			status={$metrics.fidStatus}
			trend={getTrend()}
		/>
	</div>

	<div transition:fade={{ duration: 700, delay: 200 }}>
		<MetricCard
			title="CLS"
			value={$metrics.cls}
			status={$metrics.clsStatus}
			trend={getTrend()}
		/>
	</div>

	<div transition:fade={{ duration: 800, delay: 300 }}>
		<MetricCard
			title="TTFB"
			value={$metrics.ttfb}
			unit="ms"
			status={$metrics.ttfbStatus}
			trend={getTrend()}
		/>
	</div>
</section>

<style>
	.kpi-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	@media (max-width: 900px) {
		.kpi-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.kpi-grid {
			grid-template-columns: 1fr;
		}
	}
</style>