<script lang="ts">
	import MetricCard from './MetricCard.svelte';
	import { metrics } from '$lib/stores/metrics';

	const getTrend = () => Math.random() * 10 - 5;
</script>

<section class="kpi-grid">
	<MetricCard
		title="LCP"
		value={$metrics.lcp}
		unit="ms"
		status={$metrics.lcpStatus}
		trend={getTrend()}
	/>

	<MetricCard
		title="FID"
		value={$metrics.fid}
		unit="ms"
		status={$metrics.fidStatus}
		trend={getTrend()}
	/>

	<MetricCard
		title="CLS"
		value={$metrics.cls}
		status={$metrics.clsStatus}
		trend={getTrend()}
	/>

	<MetricCard
		title="TTFB"
		value={$metrics.ttfb}
		unit="ms"
		status={$metrics.ttfbStatus}
		trend={getTrend()}
	/>
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