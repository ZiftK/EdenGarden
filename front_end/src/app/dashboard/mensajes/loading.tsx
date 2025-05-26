'use client'

import { Box } from '@raul_yael/cleangui'

export default function Loading() {
	return (
		<Box className='p-6'>
			<div className='h-8 w-48 bg-gray-200 rounded animate-pulse mb-6'></div>

			<div className='space-y-4'>
				{[...Array(3)].map((_, i) => (
					<Box key={i} className='p-4'>
						<div className='flex justify-between'>
							<div className='space-y-2'>
								<div className='h-5 w-40 bg-gray-200 rounded animate-pulse'></div>
								<div className='h-4 w-32 bg-gray-200 rounded animate-pulse'></div>
								<div className='h-4 w-24 bg-gray-200 rounded animate-pulse'></div>
							</div>
							<div className='flex gap-2'>
								<div className='h-8 w-8 bg-gray-200 rounded animate-pulse'></div>
								<div className='h-8 w-8 bg-gray-200 rounded animate-pulse'></div>
								<div className='h-8 w-8 bg-gray-200 rounded animate-pulse'></div>
							</div>
						</div>
					</Box>
				))}
			</div>
		</Box>
	)
}
