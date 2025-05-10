export default function DateProgressBar({
	startDate,
	endDate,
}: {
	startDate: Date
	endDate: Date
}) {
	const today = new Date()
	const totalDuration = endDate.getTime() - startDate.getTime()
	const elapsedDuration = today.getTime() - startDate.getTime()
	const progress = Math.min((elapsedDuration / totalDuration) * 100, 100)

	return (
		<>
			<div className='relative w-4/12 h-1 bg-[var(--children-font)] rounded '>
				<div
					className='absolute top-0 left-0 h-1 bg-[var(--father-font)] rounded'
					style={{ width: `${progress}%` }}
				></div>
			</div>
			%{progress.toString().slice(0, 2)}
		</>
	)
}
