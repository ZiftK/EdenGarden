import Link from 'next/link'

export default function Title({
	title,
	btn,
}: {
	title: string
	btn: {
		active: boolean
		path: string
	}
}) {
	return (
		<div className='flex items-center'>
			<h2 className='text-md font-bold inline-block mr-3'>{title}</h2>
			{btn.active && (
				<Link
					href={btn.path}
					className='bg-[var(--bg-card-obscure)] py-0.5 px-2 aspect-[1:1] items-center rounded-full justify-center text-center place-items-center cursor-pointer'
				>
					+
				</Link>
			)}
		</div>
	)
}
