<script lang="ts">
	import { alertThresholds } from '$lib/stores/metrics';

	let isOpen = $state(false);

    let lcp = $state($alertThresholds.lcp);
    let fid = $state($alertThresholds.fid);
    let cls = $state($alertThresholds.cls);
    let ttfb = $state($alertThresholds.ttfb);

	function saveThresholds(): void {
		alertThresholds.set({
			lcp,
			fid,
			cls,
			ttfb
		});

		isOpen = false;
	}

	function openSettings(): void {
		lcp = $alertThresholds.lcp;
		fid = $alertThresholds.fid;
		cls = $alertThresholds.cls;
		ttfb = $alertThresholds.ttfb;

		isOpen = true;
	}
</script>

<div class="settings">
	<button class="settings-button" onclick={openSettings}>
		⚙ Configurar alertas
	</button>

	{#if isOpen}
		<div class="panel">
			<div class="panel-header">
				<h3>Umbrales de alerta</h3>

				<button class="close" onclick={() => (isOpen = false)}>
					×
				</button>
			</div>

			<div class="fields">
				<label>
					<span>LCP (ms)</span>
					<input type="number" min="0" bind:value={lcp} />
				</label>

				<label>
					<span>FID (ms)</span>
					<input type="number" min="0" bind:value={fid} />
				</label>

				<label>
					<span>CLS</span>
					<input type="number" min="0" step="0.01" bind:value={cls} />
				</label>

				<label>
					<span>TTFB (ms)</span>
					<input type="number" min="0" bind:value={ttfb} />
				</label>
			</div>

			<button class="save" onclick={saveThresholds}>
				Guardar cambios
			</button>
		</div>
	{/if}
</div>

<style>
	.settings {
		position: relative;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
	}

	.settings-button {
		padding: 0.55rem 0.85rem;
		border: 1px solid #e5e7eb;
		border-radius: 9px;
		background: white;
		color: #374151;
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
	}

	.settings-button:hover {
		background: #f9fafb;
	}

	.panel {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		z-index: 10;
		width: 280px;
		padding: 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		background: white;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	h3 {
		margin: 0;
		font-size: 0.95rem;
	}

	.close {
		border: none;
		background: transparent;
		font-size: 1.3rem;
		color: #6b7280;
		cursor: pointer;
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.8rem;
		color: #4b5563;
	}

	input {
		width: 100px;
		padding: 0.4rem 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 7px;
		font-size: 0.8rem;
	}

	.save {
		width: 100%;
		margin-top: 1rem;
		padding: 0.55rem;
		border: none;
		border-radius: 8px;
		background: #111827;
		color: white;
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
	}

	.save:hover {
		background: #374151;
	}
</style>