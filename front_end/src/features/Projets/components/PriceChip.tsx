export default function PriceChip({ price }: { price: string }) {
	return (
		<div className='flex mb-auto items-center gap-1 bg-[var(--bg-card-obscure-200)] w-[87px] rounded-md p-1.5 ml-auto'>
			<span className='rounded-full w-1.5 h-1.5 bg-[var(--green-light)]' />
			<span className='text-sm'>${price}</span>
		</div>
	)
}
