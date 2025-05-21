import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { getLeaders } from '../../api/getLeaders'
import { Props } from '../../types'

export default async function LeaderAutocomplete({ value, onChange }: Props) {
	const employees = getLeaders()
	const leaders = (await employees).filter(
		(employee) => employee.rol === 'leader'
	)

	const isValidSelection = leaders.some(
		(leader) => leader.id_empleado === value
	)

	return (
		<Autocomplete
			label='Lider de Equipo'
			width={'200px'}
			className='mx-auto'
			variant='underlined'
			selectedKey={isValidSelection ? value : undefined}
			onSelectionChange={(key) => {
				const selectedLeader = leaders.find(
					(leader) => leader.id_empleado === key
				)

				if (!selectedLeader) return
				onChange(selectedLeader)
			}}
			classNames={{
				base: 'rounded-xl !text-white hover:!bg-white/30  [&_input]:!text-[var(--father-font)] [&_span]:!text-[var(--father-font)] [&_label]:!text-white/50',
				selectorButton: 'text-white',
				clearButton: 'text-white',
			}}
		>
			{leaders.map((leader) => (
				<AutocompleteItem
					textValue={leader.nombre}
					key={leader.id_empleado}
					className='text-stone-800'
				>
					{leader.nombre}
				</AutocompleteItem>
			))}
		</Autocomplete>
	)
}
