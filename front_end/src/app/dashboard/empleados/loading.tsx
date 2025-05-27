'use client'

import { Skeleton } from '@heroui/react'

export default function Loading() {
	return (
		<div className='w-full mt-4 space-y-4 col-start-1 md:row-start-2 md:!col-start-1 md:row-span-3 xl:!col-start-2'>
			{/* Title and search bar skeleton */}
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<Skeleton className='w-32 h-8 rounded-lg' />
					<Skeleton className='w-8 h-8 rounded-lg' />
				</div>
				<Skeleton className='w-64 h-10 rounded-lg' />
			</div>

			{/* Table skeleton */}
			<div className='space-y-4'>
				{/* Header */}
				<div className='flex gap-4 p-4 bg-[#0002]'>
					<Skeleton className='w-1/4 h-6 rounded-lg' />
					<Skeleton className='w-1/4 h-6 rounded-lg' />
					<Skeleton className='w-1/4 h-6 rounded-lg' />
					<Skeleton className='w-1/4 h-6 rounded-lg' />
				</div>

				{/* Rows */}
				{[...Array(5)].map((_, i) => (
					<div key={i} className='flex gap-4 p-4 bg-[#0001]'>
						<Skeleton className='w-1/4 h-6 rounded-lg' />
						<Skeleton className='w-1/4 h-6 rounded-lg' />
						<Skeleton className='w-1/4 h-6 rounded-lg' />
						<Skeleton className='w-1/4 h-6 rounded-lg' />
					</div>
				))}
			</div>
		</div>
	)
}
