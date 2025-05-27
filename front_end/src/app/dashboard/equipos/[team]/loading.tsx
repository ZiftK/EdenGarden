export default function Loading() {
	return (
		<div className='animate-pulse w-full flex flex-col gap-6 md:row-start-2 md:row-end-4 xl:col-start-2'>
			{/* Header */}
			<div className='w-full bg-[var(--bg-card-obscure)] rounded-lg p-6'>
				<div className='flex flex-col gap-3'>
					<div className='w-48 h-7 bg-white/30 rounded' />
					<div className='w-32 h-5 bg-white/30 rounded' />
				</div>
			</div>

			{/* Team Details */}
			<div className='w-full bg-[var(--bg-card-obscure)] rounded-lg p-6'>
				<div className='flex flex-col gap-8'>
					{/* Team Stats */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='bg-[var(--bg-card-obscure-200)] p-4 rounded-lg'
							>
								<div className='w-32 h-5 bg-white/30 rounded mb-2' />
								<div className='w-24 h-7 bg-white/30 rounded' />
							</div>
						))}
					</div>

					{/* Team Leader */}
					<div className='space-y-4'>
						<div className='w-36 h-6 bg-white/30 rounded' />
						<div className='bg-[var(--bg-card-obscure-200)] p-4 rounded-lg flex items-center gap-4'>
							<div className='w-16 h-16 bg-white/30 rounded-full' />
							<div className='flex-1'>
								<div className='w-48 h-6 bg-white/30 rounded mb-2' />
								<div className='w-32 h-4 bg-white/30 rounded' />
							</div>
						</div>
					</div>

					{/* Team Members */}
					<div className='space-y-4'>
						<div className='w-36 h-6 bg-white/30 rounded' />
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{[1, 2, 3, 4, 5].map((i) => (
								<div
									key={i}
									className='bg-[var(--bg-card-obscure-200)] p-4 rounded-lg flex items-center gap-3'
								>
									<div className='w-12 h-12 bg-white/30 rounded-full' />
									<div className='flex-1'>
										<div className='w-32 h-5 bg-white/30 rounded mb-2' />
										<div className='w-24 h-4 bg-white/30 rounded' />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
