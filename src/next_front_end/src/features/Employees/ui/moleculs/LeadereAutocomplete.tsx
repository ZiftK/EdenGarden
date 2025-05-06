import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { getLeaders } from '../../model/getLeaders'
import { Props } from '../../types'

export default function LeaderAutocomplete({ value, onChange }: Props) {
	const employees = getLeaders()
	const leaders = employees.filter((employee) => employee.role === 'leader')

	const isValidSelection = leaders.some((leader) => leader.id === value)
	console.log(isValidSelection)

	return (
		<Autocomplete
			label='Lider de Equipo'
			width={'200px'}
			className='mx-auto'
			color='success'
			variant='underlined'
			selectedKey={isValidSelection ? value : undefined}
			onSelectionChange={(key) => {
				const selectedLeader = leaders.find(
					(leader) => leader.id === key
				)

				if (!selectedLeader) return
				onChange(selectedLeader)
			}}
		>
			{leaders.map((leader) => (
				<AutocompleteItem
					textValue={leader.name}
					key={leader.id}
					className=' text-stone-800'
				>
					{leader.name}
				</AutocompleteItem>
			))}
		</Autocomplete>
	)
}
