'use client'
import { Button, Tooltip } from '@heroui/react'
import { format, addMonths, addWeeks } from 'date-fns'
import { es } from 'date-fns/locale'
import { useMemo } from 'react'

export default function CalendarProject({
	initialDate,
	finalDate,
	nonWorkingDays,
}: {
	initialDate: Date
	finalDate: Date
	nonWorkingDays?: Date[]
}) {
	const currentDate = new Date()

	const getPreviousMonday = (date: Date) => {
		const day = date.getDay()
		const diff = date.getDate() - day + (day === 0 ? -6 : 1)
		const monday = new Date(date)
		monday.setDate(diff)
		return monday
	}

	// Ensure minimum display period of 3 months from initial date
	const minEndDate = addMonths(initialDate, 3)

	// Add 2 weeks to the final date
	const extendedFinalDate = addWeeks(finalDate, 2)

	// Use the later date between minEndDate and extendedFinalDate
	const effectiveFinalDate =
		extendedFinalDate > minEndDate ? extendedFinalDate : minEndDate

	const adjustedInitialDate = getPreviousMonday(initialDate)

	const adjustedFinalDate = new Date(effectiveFinalDate)
	const finalDay = effectiveFinalDate.getDay()
	const daysToAdd = finalDay === 0 ? 0 : 7 - finalDay
	adjustedFinalDate.setDate(effectiveFinalDate.getDate() + daysToAdd)

	const calendar = useMemo(() => {
		const totalDuration = Math.ceil(
			(adjustedFinalDate.getTime() - adjustedInitialDate.getTime()) /
				(1000 * 60 * 60 * 24)
		)

		return Array.from({ length: totalDuration + 1 }, (_, i) => {
			const date = new Date(adjustedInitialDate)
			date.setDate(date.getDate() + i)
			return {
				date,
				isNonWorkingDay: nonWorkingDays?.some(
					(nonWorkingDay) =>
						nonWorkingDay.getTime() === date.getTime()
				),
				isToday:
					date.getDate() === currentDate.getDate() &&
					date.getMonth() === currentDate.getMonth() &&
					date.getFullYear() === currentDate.getFullYear(),
				projectActive: date >= initialDate && date <= finalDate,
				outsideProject: date < initialDate || date > finalDate,
			}
		})
	}, [
		adjustedInitialDate,
		adjustedFinalDate,
		initialDate,
		finalDate,
		nonWorkingDays,
	])

	const weeks = useMemo(() => {
		const result = []
		for (let i = 0; i < calendar.length; i += 7) {
			result.push(calendar.slice(i, i + 7))
		}
		return result
	}, [calendar])

	// Días de la semana para mostrar a la izquierda
	const weekdays = ['Lun', '', 'Mie', '', 'Vie', '', '']

	return (
		<>
			<div className='flex flex-col'>
				<div className='flex'>
					{/* Días de la semana a la izquierda */}
					<div className='flex flex-col gap-0.5 w-6 mr-1 max-h-[88px]'>
						{weekdays.map((day, idx) => (
							<div
								key={idx}
								className='text-[.6rem] h-3 flex items-center'
							>
								{day}
							</div>
						))}
					</div>

					{/* Calendario */}
					<div className='scrollbar-thin-custom flex overflow-x-auto gap-x-1 max-w-[275px] pb-2'>
						{weeks.map((week, i) => (
							<div key={i} className='flex flex-col gap-1'>
								{week.map((day, dayIndex) => (
									<Tooltip
										key={dayIndex}
										placement='bottom'
										className='text-black text-xs'
										content={
											day.isNonWorkingDay
												? 'Día no laborable'
												: day.isToday
													? 'Hoy'
													: `${day.date.getDate()}/${day.date.getMonth() + 1}`
										}
									>
										<div
											key={dayIndex}
											className={`w-2 h-2 rounded-xs xl:w-2.5 xl:h-2.5`}
											style={{
												backgroundColor:
													day.isNonWorkingDay
														? 'var(--bg-card-obscure-200)'
														: day.outsideProject
															? 'var(--bg-card-obscure)'
															: day.projectActive
																? 'var(--green-dark-500)'
																: 'var(--bg-card-obscure)',
												outline: day.isToday
													? '1px solid #7FFF00'
													: '1px solid transparent',
											}}
										/>
									</Tooltip>
								))}
							</div>
						))}
					</div>

					<div className='flex-col gap-1 ml-2 hidden xl:flex w-full'>
						<h4 className='text-sm'>
							Actividades{' '}
							{format(new Date(currentDate), 'd MMM', {
								locale: es,
							})}
						</h4>

						<span className='text-xs flex flex-col font-[var(--children-font)] w-full '>
							<div className='flex items-center gap-1'>
								<div className='w-1.5 h-1.5 bg-[var(--green-dark-500)] rounded-full font-medium' />
								Mostrar Avances al cliente
							</div>
							<div className='font-light ml-3'>12:30</div>
						</span>
					</div>
				</div>
				<Button
					className='text-[var(--green-dark-500)] bg-transparent ml-auto'
					variant='flat'
					size='sm'
				>
					Edtar Calendario
				</Button>
			</div>
		</>
	)
}
