import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { getLeaders } from '../../model/getLeaders'
import { Props } from '../../types'

export default function LeaderAutocomplete({ value, onChange }: Props) {
	const employees = getLeaders()
	const leaders = employees.filter((employee) => employee.role === 'leader')

	const isValidSelection = leaders.some((leader) => leader.id === value)

	return (
		<Autocomplete
			label='Lider de Equipo'
			width={'200px'}
			className='mx-auto'
			variant='underlined'
			selectedKey={isValidSelection ? value : undefined}
			onSelectionChange={(key) => {
				const selectedLeader = leaders.find(
					(leader) => leader.id === key
				)

				if (!selectedLeader) return
				onChange(selectedLeader)
			}}
			classNames={{
				base: '!text-white label:!text-white value:!text-white',
				selectorButton: '!text-white',
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
