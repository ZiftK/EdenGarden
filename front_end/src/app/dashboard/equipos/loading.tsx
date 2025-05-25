export default function Loading() {
	return (
		<div className='animate-pulse w-full flex flex-col gap-4 md:max-h-[calc(100vh-14rem)] md:overflow-y-auto xl:grid xl:grid-cols-2'>
			{[1, 2, 3, 4].map((index) => (
				<div
					key={index}
					className='w-full bg-[var(--bg-card-obscure)] rounded-lg px-4 py-2 flex flex-col gap-4 xl:h-60'
				>
					<div className='flex flex-col gap-2'>
						<div className='w-24 h-4 bg-white/30 rounded' />
						<div className='w-48 h-6 bg-white/30 rounded' />
					</div>

					<div className='flex-1 bg-[var(--bg-card-obscure-200)] rounded-lg p-4'>
						<div className='flex flex-col gap-3'>
							<div className='w-full h-8 bg-white/30 rounded' />
							<div className='w-full h-8 bg-white/30 rounded' />
							<div className='w-full h-8 bg-white/30 rounded' />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
