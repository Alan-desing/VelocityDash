<script lang="ts">
	let exporting = $state(false);

	async function exportPdf(): Promise<void> {
		const dashboard = document.getElementById('dashboard-export');

		if (!dashboard) {
			console.error('No se encontró el dashboard para exportar.');
			return;
		}

		exporting = true;

		try {
			const { default: html2canvas } = await import('html2canvas');
			const { jsPDF } = await import('jspdf');

			const canvas = await html2canvas(dashboard, {
				scale: 2,
				backgroundColor: '#f8fafc',
				useCORS: true
			});

			const imageData = canvas.toDataURL('image/png');

			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4'
			});

			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();

			const imageWidth = pageWidth;
			const imageHeight =
				(canvas.height * imageWidth) / canvas.width;

			let position = 0;

			while (position < imageHeight) {
				if (position > 0) {
					pdf.addPage();
				}

				pdf.addImage(
					imageData,
					'PNG',
					0,
					-position,
					imageWidth,
					imageHeight
				);

				position += pageHeight;
			}

			pdf.save('velocitydash-report.pdf');
		} catch (error) {
			console.error('Error al generar el PDF:', error);
		} finally {
			exporting = false;
		}
	}
</script>

<button onclick={exportPdf} disabled={exporting}>
	{exporting ? 'Generando PDF...' : 'Exportar PDF'}
</button>

<style>
	button {
		border: 1px solid #e5e7eb;
		border-radius: 10px;
		padding: 0.6rem 0.9rem;
		background: white;
		color: #111827;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}

	button:hover:not(:disabled) {
		background: #f3f4f6;
		border-color: #d1d5db;
	}

	button:disabled {
		cursor: wait;
		opacity: 0.6;
	}
</style>