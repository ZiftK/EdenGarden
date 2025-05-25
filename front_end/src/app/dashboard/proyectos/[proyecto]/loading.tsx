'use client'

import { Card, CardBody, CardHeader, Divider } from '@heroui/react'

export default function Loading() {
	return (
		<section className='text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			{/* Breadcrumb */}
			<h2 className='text-md font-bold mb-4 inline-block mr-3'>
				<div className='inline-block w-24 h-4 bg-white/30 rounded' />
				<span className='mx-2'>/</span>
				<div className='inline-block w-48 h-4 bg-white/30 rounded' />
			</h2>

			<article className='xl:flex gap-10 max-h-[calc(100%-45px)] overflow-y-auto scrollbar-thin-custom'>
				{/* Left Column */}
				<Card className='z-0 bg-[var(--bg-card-obscure-200)] pb-5 text-[var(--father-font)] xl:h-full xl:col-start-1 top-0 xl:flex-7/12'>
					<CardHeader className='flex flex-col gap-0.5 items-start w-full font-bold mb-6'>
						<div className='w-64 h-6 bg-white/30 rounded' />
						<div className='flex items-center gap-1 w-full'>
							<div className='w-4 h-4 bg-white/30 rounded' />
							<div className='w-full h-2 bg-white/30 rounded-full' />
						</div>
					</CardHeader>

					<CardBody className='flex flex-col gap-10 scrollbar-thin-custom px-4'>
						{/* Team Section */}
						<div>
							<div className='w-48 h-5 bg-white/30 rounded mb-2' />
							<div className='flex items-center gap-1 mb-3.5'>
								<div className='w-4 h-4 bg-white/30 rounded' />
								<div className='w-32 h-4 bg-white/30 rounded' />
							</div>

							{/* Team Table */}
							<div className='w-full h-[200px] bg-white/10 rounded' />
						</div>

						{/* Calendar Section */}
						<div>
							<div className='w-48 h-5 bg-white/30 rounded mb-2' />
							<div className='flex items-center gap-1 mb-3.5'>
								<div className='w-4 h-4 bg-white/30 rounded' />
								<div className='w-48 h-4 bg-white/30 rounded' />
							</div>

							{/* Calendar */}
							<div className='flex'>
								<div className='flex flex-col gap-0.5 w-6 mr-1'>
									{[...Array(7)].map((_, i) => (
										<div
											key={i}
											className='w-full h-3 bg-white/30 rounded'
										/>
									))}
								</div>
								<div className='flex gap-1 overflow-x-hidden max-w-[275px]'>
									{[...Array(6)].map((_, i) => (
										<div
											key={i}
											className='flex flex-col gap-1'
										>
											{[...Array(7)].map((_, j) => (
												<div
													key={j}
													className='w-2.5 h-2.5 bg-white/30 rounded-xs'
												/>
											))}
										</div>
									))}
								</div>
							</div>
						</div>
					</CardBody>
				</Card>

				{/* Right Column */}
				<Card className='z-0 text-[var(--father-font)] mr-6 bg-transparent xl:col-start-2 xl:flex-5/12 shadow-none'>
					<CardHeader className='relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-white/10' />

					<CardBody className='m-0 p-0 mt-3'>
						<article className='flex justify-between'>
							<div className='w-24 h-4 bg-white/30 rounded' />
							<div className='flex flex-col gap-4 ml-auto'>
								<div className='w-24 h-8 bg-white/30 rounded' />
								<div className='flex items-center gap-1 bg-[var(--bg-card-obscure-200)] w-32 rounded-md p-1.5'>
									<div className='w-4 h-4 bg-white/30 rounded' />
									<div className='w-20 h-4 bg-white/30 rounded' />
								</div>
							</div>
						</article>

						<Divider className='my-4' />

						<article>
							<div className='w-48 h-6 bg-white/30 rounded mb-4' />
							<div className='flex flex-col gap-3'>
								{[...Array(4)].map((_, i) => (
									<div
										key={i}
										className='flex items-center gap-1'
									>
										<div className='w-4 h-4 bg-white/30 rounded' />
										<div className='w-full h-4 bg-white/30 rounded' />
									</div>
								))}
							</div>
						</article>
					</CardBody>
				</Card>
			</article>
		</section>
	)
}
