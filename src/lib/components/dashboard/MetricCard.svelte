<script lang="ts">
	import type { MetricStatus } from '$lib/types/metrics';

	let {
		title,
		value,
		unit = '',
		status,
		trend
	}: {
		title: string;
		value: number;
		unit?: string;
		status: MetricStatus;
		trend: number;
	} = $props();

	const statusLabels: Record<MetricStatus, string> = {
		good: 'Bueno',
		warning: 'Regular',
		bad: 'Malo'
	};

	const statusClass: Record<MetricStatus, string> = {
		good: 'status-good',
		warning: 'status-warning',
		bad: 'status-bad'
	};
</script>

<article class="metric-card">
	<div class="card-header">
		<h2>{title}</h2>

		<span class={`status ${statusClass[status]}`}>
			{statusLabels[status]}
		</span>
	</div>

	<div class="value">
		{value.toFixed(title === 'CLS' ? 3 : 0)}
		<span>{unit}</span>
	</div>

	<div class="trend">
		<span>{trend >= 0 ? '↑' : '↓'}</span>
		{Math.abs(trend).toFixed(1)}%
	</div>
</article>

<style>
	.metric-card {
		padding: 1.25rem;
		border: 1px solid #e5e7eb;
		border-radius: 14px;
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	h2 {
		margin: 0;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.status {
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.status-good {
		background: #dcfce7;
		color: #166534;
	}

	.status-warning {
		background: #fef3c7;
		color: #92400e;
	}

	.status-bad {
		background: #fee2e2;
		color: #991b1b;
	}

	.value {
		margin-top: 1rem;
		font-size: 2rem;
		font-weight: 700;
	}

	.value span {
		margin-left: 0.25rem;
		font-size: 0.9rem;
		font-weight: 400;
		color: #6b7280;
	}

	.trend {
		margin-top: 0.75rem;
		font-size: 0.85rem;
		color: #6b7280;
	}
</style>