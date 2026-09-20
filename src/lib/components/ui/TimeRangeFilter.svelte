<script lang="ts">
	import { timeRange } from '$lib/stores/metrics';

	const ranges = [
		{ value: '1h', label: '1h' },
		{ value: '24h', label: '24h' },
		{ value: '7d', label: '7d' },
		{ value: '30d', label: '30d' }
	] as const;

	function selectRange(value: (typeof ranges)[number]['value']): void {
		timeRange.set(value);
	}
</script>

<div class="time-range">
	<span class="label">Rango:</span>

	<div class="buttons">
		{#each ranges as range}
			<button
				class:active={$timeRange === range.value}
				onclick={() => selectRange(range.value)}
			>
				{range.label}
			</button>
		{/each}
	</div>
</div>

<style>
	.time-range {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.label {
		font-size: 0.85rem;
		color: #6b7280;
		font-weight: 500;
	}

	.buttons {
		display: flex;
		gap: 0.35rem;
		padding: 0.25rem;
		border: 1px solid #e5e7eb;
		border-radius: 10px;
		background: #f9fafb;
	}

	button {
		border: none;
		border-radius: 7px;
		padding: 0.45rem 0.75rem;
		background: transparent;
		color: #6b7280;
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	button:hover {
		background: #e5e7eb;
		color: #374151;
	}

	button.active {
		background: #111827;
		color: white;
	}
</style>