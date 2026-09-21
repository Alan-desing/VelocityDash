import { derived, writable } from 'svelte/store';
import type { MetricState, WebMetric, MetricStatus } from '$lib/types/metrics';

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

const initialMetric: WebMetric = {
	lcp: 0,
	fid: 0,
	cls: 0,
	ttfb: 0,
	timestamp: Date.now()
};

export const metrics = writable<MetricState>(
	createMetricState(initialMetric)
);

export const metricHistory = writable<WebMetric[]>([]);

export interface AlertThresholds {
	lcp: number;
	fid: number;
	cls: number;
	ttfb: number;
}

export const alertThresholds = writable<AlertThresholds>({
	lcp: 4000,
	fid: 300,
	cls: 0.25,
	ttfb: 1800
});

export type TimeRange = '1h' | '24h' | '7d' | '30d';

export const timeRange = writable<TimeRange>('1h');

export const filteredHistory = derived(
	[metricHistory, timeRange],
	([$history, $timeRange]) => {
		const now = Date.now();

		const rangeInMs: Record<TimeRange, number> = {
			'1h': 60 * 60 * 1000,
			'24h': 24 * 60 * 60 * 1000,
			'7d': 7 * 24 * 60 * 60 * 1000,
			'30d': 30 * 24 * 60 * 60 * 1000
		};

		const startTime = now - rangeInMs[$timeRange];

		return $history.filter((metric) => metric.timestamp >= startTime);
	}
);

export const averageLCP = derived(filteredHistory, ($history) => {
	if ($history.length === 0) return 0;

	const total = $history.reduce((sum, metric) => sum + metric.lcp, 0);

	return total / $history.length;
});

export const averageFID = derived(filteredHistory, ($history) => {
	if ($history.length === 0) return 0;

	const total = $history.reduce((sum, metric) => sum + metric.fid, 0);

	return total / $history.length;
});

export const averageCLS = derived(filteredHistory, ($history) => {
	if ($history.length === 0) return 0;

	const total = $history.reduce((sum, metric) => sum + metric.cls, 0);

	return total / $history.length;
});

export const averageTTFB = derived(filteredHistory, ($history) => {
	if ($history.length === 0) return 0;

	const total = $history.reduce((sum, metric) => sum + metric.ttfb, 0);

	return total / $history.length;
});

export const overallStatus = derived(metrics, ($metrics): MetricStatus => {
	const statuses = [
		$metrics.lcpStatus,
		$metrics.fidStatus,
		$metrics.clsStatus,
		$metrics.ttfbStatus
	];

	if (statuses.includes('bad')) return 'bad';
	if (statuses.includes('warning')) return 'warning';

	return 'good';
});

export interface MetricAlert {
	metric: string;
	value: number;
	message: string;
}

export const alerts = derived(
	[metrics, alertThresholds],
	([$metrics, $thresholds]): MetricAlert[] => {
		const currentAlerts: MetricAlert[] = [];

		if ($metrics.lcp > $thresholds.lcp) {
			currentAlerts.push({
				metric: 'LCP',
				value: $metrics.lcp,
				message: 'El LCP superó el umbral configurado.'
			});
		}

		if ($metrics.fid > $thresholds.fid) {
			currentAlerts.push({
				metric: 'FID',
				value: $metrics.fid,
				message: 'El FID superó el umbral configurado.'
			});
		}

		if ($metrics.cls > $thresholds.cls) {
			currentAlerts.push({
				metric: 'CLS',
				value: $metrics.cls,
				message: 'El CLS superó el umbral configurado.'
			});
		}

		if ($metrics.ttfb > $thresholds.ttfb) {
			currentAlerts.push({
				metric: 'TTFB',
				value: $metrics.ttfb,
				message: 'El TTFB superó el umbral configurado.'
			});
		}

		return currentAlerts;
	}
);

export function updateMetrics(newMetric: WebMetric): void {
	const newState = createMetricState(newMetric);

	metrics.set(newState);

	metricHistory.update((history) => {
		const updatedHistory = [...history, newMetric];

		return updatedHistory.slice(-60);
	});
}