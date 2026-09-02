export type MetricStatus = 'good' | 'warning' | 'bad';

export interface WebMetric {
	lcp: number;
	fid: number;
	cls: number;
	ttfb: number;
	timestamp: number;
}

export interface MetricState extends WebMetric {
	lcpStatus: MetricStatus;
	fidStatus: MetricStatus;
	clsStatus: MetricStatus;
	ttfbStatus: MetricStatus;
}