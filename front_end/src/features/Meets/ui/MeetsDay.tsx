import { GroupIcon } from '@/src/components/landing/atoms/Icons/Icons'
import { format } from 'date-fns'

export default function MeetsDay() {
	const date = new Date()

	return (
		<section className='w-full max-w-[350px] h-fit max-h-[237px] row-start-3 md:col-start-2 md:row-start-3 xl:row-start-3 xl:col-start-3 xl:max-w-[250px] bg-[rgba(24,44,2)] p-4 rounded-lg flex flex-col  mt-2'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col '>
					<h3 className='font-bold text-lg'>Juntas del día</h3>
					<p className='text-sm'>{format(date, 'dd / MM / yyyy')}</p>
				</div>

				<button className='font-medium text-xl bg-[var(--green-dark-500)] rounded-full flex w-8 h-8 items-center justify-center'>
					+
				</button>
			</div>

			<article className='flex flex-col gap-2 overflow-y-auto scrollbar-this-custom'>
				<div>
					<h4 className='text-md'>Meet con Alejandro</h4>
					<div className='flex items-center gap-3'>
						<div className='flex items-center gap-2'>
							<GroupIcon h={18} color='#e2e2e270' />
							<p className='text-blue-300 text-xs'>
								https://meet/avs#...
							</p>
						</div>

						<div className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
							>
								<mask
									id='mask0_499_536'
									maskUnits='userSpaceOnUse'
									x='0'
									y='0'
									width='24'
									height='24'
								>
									<rect
										width='24'
										height='24'
										fill='#D9D9D9'
									/>
								</mask>
								<g mask='url(#mask0_499_536)'>
									<path
										d='M5 8H19V6H5V8ZM5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V11.675C20.6833 11.525 20.3583 11.4 20.025 11.3C19.6917 11.2 19.35 11.125 19 11.075V10H5V20H11.3C11.4167 20.3667 11.5542 20.7167 11.7125 21.05C11.8708 21.3833 12.0583 21.7 12.275 22H5ZM18 23C16.6167 23 15.4375 22.5125 14.4625 21.5375C13.4875 20.5625 13 19.3833 13 18C13 16.6167 13.4875 15.4375 14.4625 14.4625C15.4375 13.4875 16.6167 13 18 13C19.3833 13 20.5625 13.4875 21.5375 14.4625C22.5125 15.4375 23 16.6167 23 18C23 19.3833 22.5125 20.5625 21.5375 21.5375C20.5625 22.5125 19.3833 23 18 23ZM19.675 20.375L20.375 19.675L18.5 17.8V15H17.5V18.2L19.675 20.375Z'
										fill='#EAF2E7'
										fillOpacity='0.4'
									/>
								</g>
							</svg>
							<p className='text-gray-100/35 text-xs'>12:35</p>
						</div>
					</div>
				</div>
			</article>
		</section>
	)
}
