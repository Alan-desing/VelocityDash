<script lang="ts">
	import { alerts } from '$lib/stores/metrics';
	import { fly } from 'svelte/transition';
</script>

{#if $alerts.length > 0}
	<div class="alerts">
		{#each $alerts as alert (alert.metric)}
			<div class="alert" transition:fly={{ y: -20, duration: 300 }}>
				<div class="icon">!</div>

				<div class="content">
					<strong>{alert.metric} fuera de rango</strong>
					<span>{alert.message}</span>
				</div>

				<div class="value">
					{alert.value}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.alerts {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.alert {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.85rem 1rem;
		border: 1px solid #fecaca;
		border-radius: 12px;
		background: #fef2f2;
		color: #991b1b;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		flex-shrink: 0;
		border-radius: 50%;
		background: #dc2626;
		color: white;
		font-weight: 700;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		flex: 1;
	}

	.content strong {
		font-size: 0.85rem;
	}

	.content span {
		font-size: 0.75rem;
		color: #b91c1c;
	}

	.value {
		font-size: 0.9rem;
		font-weight: 700;
	}
</style>