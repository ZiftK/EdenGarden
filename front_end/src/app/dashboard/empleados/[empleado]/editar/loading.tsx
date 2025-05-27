import { Card, CardBody, CardHeader, Divider, Skeleton } from '@heroui/react'

export default function Loading() {
	return (
		<Card className='w-full max-w-full mx-auto bg-[var(--bg-card-obscure)] h-full min-h-full !row-start-2 row-end-4 md:col-start-2'>
			<CardHeader>
				<Skeleton className='h-7 w-48 mb-2' />
				<Skeleton className='h-5 w-64' />
			</CardHeader>
			<Divider />
			<CardBody>
				<div className='space-y-8'>
					{/* Sección de imagen */}
					<div>
						<Skeleton className='rounded-full w-32 h-32 mb-4' />
						<Skeleton className='h-9 w-32' />
					</div>

					{/* Información Personal */}
					<div>
						<Skeleton className='h-6 w-40 mb-4' />
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Skeleton className='h-12' />
							<Skeleton className='h-12' />
							<Skeleton className='h-12' />
							<Skeleton className='h-12' />
						</div>
					</div>

					{/* Información Laboral */}
					<div>
						<Skeleton className='h-6 w-40 mb-4' />
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Skeleton className='h-12' />
							<Skeleton className='h-12' />
							<Skeleton className='h-12' />
							<Skeleton className='h-12' />
							<Skeleton className='h-12' />
							<Skeleton className='h-12' />
						</div>
					</div>

					{/* Botones de acción */}
					<div className='flex justify-start flex-row-reverse gap-2'>
						<Skeleton className='h-9 w-24' />
						<Skeleton className='h-9 w-24' />
					</div>
				</div>
			</CardBody>
		</Card>
	)
}
