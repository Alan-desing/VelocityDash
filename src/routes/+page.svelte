<script lang="ts">
	import { onMount } from 'svelte';
	import KpiGrid from '$lib/components/dashboard/KpiGrid.svelte';
	import { updateMetrics } from '$lib/stores/metrics';

	onMount(() => {
		const interval = setInterval(() => {
			updateMetrics();
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>VelocityDash</title>
	<meta
		name="description"
		content="Panel de análisis de rendimiento web"
	/>
</svelte:head>

<main>
	<header>
		<div>
			<p class="eyebrow">WEB PERFORMANCE</p>
			<h1>VelocityDash</h1>
			<p class="subtitle">
				Monitoreo de rendimiento web en tiempo real
			</p>
		</div>

		<div class="live">
			<span></span>
			En tiempo real
		</div>
	</header>

	<section class="dashboard">
		<h2>Rendimiento actual</h2>

		<KpiGrid />
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		background: #f8fafc;
		font-family:
			Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			sans-serif;
		color: #111827;
	}

	main {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		margin-bottom: 2.5rem;
	}

	.eyebrow {
		margin: 0 0 0.4rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: #6b7280;
	}

	h1 {
		margin: 0;
		font-size: 2.5rem;
	}

	.subtitle {
		margin: 0.5rem 0 0;
		color: #6b7280;
	}

	.live {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.8rem;
		border: 1px solid #e5e7eb;
		border-radius: 999px;
		background: white;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.live span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #22c55e;
	}

	.dashboard h2 {
		margin-bottom: 1rem;
		font-size: 1.2rem;
	}

	@media (max-width: 600px) {
		main {
			padding: 1rem;
		}

		header {
			align-items: flex-start;
			flex-direction: column;
		}

		h1 {
			font-size: 2rem;
		}
	}
</style>