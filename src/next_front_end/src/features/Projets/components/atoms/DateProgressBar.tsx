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
		<div className='relative w-full h-2 bg-gray-200 rounded'>
			<div
				className='absolute top-0 left-0 h-full bg-green-500 rounded'
				style={{ width: `${progress}%` }}
			></div>
			%{progress.toString().slice(0, 2)}
		</div>
	)
}
