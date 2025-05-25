import { Card, CardBody, CardHeader, Divider, Skeleton } from '@heroui/react'

export default function Loading() {
	return (
		<section className='z-[-1] text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<Card className='bg-[var(--bg-card-obscure-200)]'>
				<CardHeader>
					<div className='flex flex-col sm:flex-row sm:items-center w-full justify-between gap-4'>
						<div className='flex gap-3'>
							<Skeleton className='rounded-full w-[100px] h-[100px]' />
							<div className='flex flex-col justify-center gap-2'>
								<Skeleton className='h-6 w-32' />
								<Skeleton className='h-4 w-24' />
							</div>
						</div>
						<div className='flex gap-2 items-center ml-auto'>
							<Skeleton className='h-7 w-16' />
							<Skeleton className='h-7 w-16' />
						</div>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div>
							<Skeleton className='h-6 w-40 mb-4' />
							<div className='space-y-4'>
								<div className='flex items-center gap-2'>
									<Skeleton className='h-4 w-4' />
									<Skeleton className='h-4 w-48' />
								</div>
								<div className='flex items-center gap-2'>
									<Skeleton className='h-4 w-4' />
									<Skeleton className='h-4 w-32' />
								</div>
								<div className='flex items-center gap-2'>
									<Skeleton className='h-4 w-4' />
									<Skeleton className='h-4 w-56' />
								</div>
							</div>
						</div>
						<div>
							<Skeleton className='h-6 w-40 mb-4' />
							<div className='space-y-4'>
								<Skeleton className='h-4 w-40' />
								<Skeleton className='h-4 w-24' />
								<Skeleton className='h-4 w-32' />
								<Skeleton className='h-4 w-48' />
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		</section>
	)
}
