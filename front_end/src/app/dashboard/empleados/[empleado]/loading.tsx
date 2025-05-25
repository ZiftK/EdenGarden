'use client'

import { Card, CardBody, CardHeader, Divider, Skeleton } from '@heroui/react'

export default function Loading() {
	return (
		<section className='relative text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<div className='w-full bg-[var(--bg-card-obscure)] rounded-lg animate-pulse'>
				{/* Header */}
				<div className='p-6'>
					<div className='flex flex-col sm:flex-row sm:items-center w-full justify-between gap-4'>
						<div className='flex gap-3'>
							<div className='w-[100px] h-[100px] bg-white/30 rounded-full' />
							<div className='flex flex-col justify-center gap-2'>
								<div className='w-48 h-6 bg-white/30 rounded' />
								<div className='w-32 h-4 bg-white/30 rounded' />
							</div>
						</div>
						<div className='flex gap-2 items-center ml-auto'>
							<div className='w-20 h-8 bg-white/30 rounded-lg' />
							<div className='w-20 h-8 bg-white/30 rounded-lg' />
						</div>
					</div>
				</div>

				<div className='w-full h-[1px] bg-white/10' />

				{/* Body */}
				<div className='p-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{/* Personal Information */}
						<div>
							<div className='w-48 h-6 bg-white/30 rounded mb-4' />
							<div className='space-y-4'>
								{[1, 2, 3].map((i) => (
									<div
										key={i}
										className='flex items-center gap-2'
									>
										<div className='w-4 h-4 bg-white/30 rounded' />
										<div className='w-full h-4 bg-white/30 rounded' />
									</div>
								))}
							</div>
						</div>

						{/* Work Information */}
						<div>
							<div className='w-48 h-6 bg-white/30 rounded mb-4' />
							<div className='space-y-4'>
								{[1, 2, 3, 4, 5].map((i) => (
									<div
										key={i}
										className='flex flex-col gap-1'
									>
										<div className='w-24 h-4 bg-white/30 rounded' />
										<div className='w-full h-4 bg-white/30 rounded' />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
