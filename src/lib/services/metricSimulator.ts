import type { WebMetric } from '$lib/types/metrics';

function randomBetween(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export function generateMetric(): WebMetric {
	return {
		lcp: Math.round(randomBetween(1200, 3500)),
		fid: Math.round(randomBetween(30, 250)),
		cls: Number(randomBetween(0.02, 0.3).toFixed(3)),
		ttfb: Math.round(randomBetween(200, 1000)),
		timestamp: Date.now()
	};
}