import {
	Card,
	CardBody,
	CardHeader,
	Button,
	Spinner,
	Alert,
} from '@heroui/react'
import { useState } from 'react'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import { usePayrollStore } from '../model/payrollStore'

export default function PayrollCard() {
	const { user } = useAuthStore()
	const { generatePayroll, downloadPayroll, isLoading, error } =
		usePayrollStore()
	const [isGenerating, setIsGenerating] = useState(false)
	const [isDownloading, setIsDownloading] = useState(false)

	const handleGeneratePayroll = async () => {
		if (!user?.id_empleado) return

		setIsGenerating(true)
		try {
			await generatePayroll(user.id_empleado)
		} catch (err) {
			console.error('Error generating payroll:', err)
		} finally {
			setIsGenerating(false)
		}
	}

	const handleDownloadPayroll = async () => {
		if (!user?.id_empleado) return

		setIsDownloading(true)
		try {
			const response = await downloadPayroll(user.id_empleado)
			if (response.file) {
				const blob = new Blob([response.file], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				})
				const url = window.URL.createObjectURL(blob)
				// setDownloadUrl(url)

				// Create temporary link and trigger download
				const a = document.createElement('a')
				a.href = url
				a.download = response.filename || 'nomina.xlsx'
				document.body.appendChild(a)
				a.click()
				document.body.removeChild(a)
				window.URL.revokeObjectURL(url)
			}
		} catch (err) {
			console.error('Error downloading payroll:', err)
		} finally {
			setIsDownloading(false)
		}
	}

	return (
		<Card className='bg-[var(--bg-card-obscure)] h-fit'>
			<CardHeader>
				<h3 className='text-lg font-medium'>Nómina</h3>
			</CardHeader>
			<CardBody>
				{error && (
					<Alert variant='flat' className='mb-4'>
						{error}
					</Alert>
				)}
				<div className='space-y-4'>
					<Button
						color='primary'
						size='lg'
						fullWidth
						onClick={handleGeneratePayroll}
						disabled={isGenerating || isLoading}
					>
						{isGenerating ? (
							<>
								<Spinner className='mr-2' />
								Generando nómina...
							</>
						) : (
							'Generar Nómina'
						)}
					</Button>
					<Button
						color='success'
						size='lg'
						fullWidth
						onClick={handleDownloadPayroll}
						disabled={isDownloading || isLoading}
					>
						{isDownloading ? (
							<>
								<Spinner className='mr-2' />
								Descargando nómina...
							</>
						) : (
							'Descargar Nómina'
						)}
					</Button>
				</div>
			</CardBody>
		</Card>
	)
}
