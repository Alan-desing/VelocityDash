import { derived, writable } from 'svelte/store';
import type { MetricState, WebMetric, MetricStatus } from '$lib/types/metrics';
import { generateMetric } from '$lib/services/metricSimulator';

function getLcpStatus(value: number): MetricStatus {
	if (value <= 2500) return 'good';
	if (value <= 4000) return 'warning';
	return 'bad';
}

function getFidStatus(value: number): MetricStatus {
	if (value <= 100) return 'good';
	if (value <= 300) return 'warning';
	return 'bad';
}

function getClsStatus(value: number): MetricStatus {
	if (value <= 0.1) return 'good';
	if (value <= 0.25) return 'warning';
	return 'bad';
}

function getTtfbStatus(value: number): MetricStatus {
	if (value <= 800) return 'good';
	if (value <= 1800) return 'warning';
	return 'bad';
}

function createMetricState(metric: WebMetric): MetricState {
	return {
		...metric,
		lcpStatus: getLcpStatus(metric.lcp),
		fidStatus: getFidStatus(metric.fid),
		clsStatus: getClsStatus(metric.cls),
		ttfbStatus: getTtfbStatus(metric.ttfb)
	};
}

const firstMetric = generateMetric();

export const metrics = writable<MetricState>(createMetricState(firstMetric));

export const metricHistory = writable<WebMetric[]>([firstMetric]);

export const averageLCP = derived(metricHistory, ($history) => {
	if ($history.length === 0) return 0;

	const total = $history.reduce((sum, metric) => sum + metric.lcp, 0);

	return total / $history.length;
});

export function updateMetrics(): void {
	const newMetric = generateMetric();
	const newState = createMetricState(newMetric);

	metrics.set(newState);

	metricHistory.update((history) => {
		const updatedHistory = [...history, newMetric];

		return updatedHistory.slice(-60);
	});
}