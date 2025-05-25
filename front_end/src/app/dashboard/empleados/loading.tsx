import { Card, CardBody, CardHeader, Divider, Skeleton } from '@heroui/react'

export default function Loading() {
	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<Skeleton className='h-8 w-48' />
				<Skeleton className='h-9 w-32' />
			</div>

			<Card className='bg-[var(--bg-card-obscure-200)]'>
				<CardHeader>
					<div className='flex justify-between items-center'>
						<Skeleton className='h-8 w-48' />
						<Skeleton className='h-10 w-64' />
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<div className='space-y-4'>
						{/* Encabezados de la tabla */}
						<div className='grid grid-cols-4 gap-4 py-3 px-4 bg-[var(--bg-card-obscure-300)]'>
							<Skeleton className='h-6 w-24' />
							<Skeleton className='h-6 w-24' />
							<Skeleton className='h-6 w-16' />
							<Skeleton className='h-6 w-24' />
						</div>

						{/* Filas de la tabla */}
						{[...Array(5)].map((_, index) => (
							<div
								key={index}
								className='grid grid-cols-4 gap-4 py-3 px-4'
							>
								<Skeleton className='h-6 w-32' />
								<Skeleton className='h-6 w-20' />
								<Skeleton className='h-6 w-16' />
								<div className='flex gap-2'>
									<Skeleton className='h-8 w-8' />
									<Skeleton className='h-8 w-8' />
									<Skeleton className='h-8 w-8' />
								</div>
							</div>
						))}
					</div>
				</CardBody>
			</Card>
		</div>
	)
}
