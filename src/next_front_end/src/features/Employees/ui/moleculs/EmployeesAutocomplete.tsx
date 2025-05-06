import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { getEmployees } from '../../model/getEmployees'
import { Employee } from '@/src/shared/types'

export default function EmployeesAutocomplete({
	value,
	onChange,
}: {
	value: string
	onChange: (employee: Employee) => void
}) {
	const employees = getEmployees()
	const emplooyesWithoutTeam = employees.filter((employee) => !employee.teams)

	return (
		<Autocomplete
			label='Lider de Equipo'
			width={'200px'}
			className='mx-auto'
			color='success'
			variant='underlined'
			selectedKey={value}
			onSelectionChange={(key) => {
				const selectedEmployee = emplooyesWithoutTeam.find(
					(leader) => leader.id === key
				)

				if (!selectedEmployee) return
				onChange(selectedEmployee)
			}}
		>
			{emplooyesWithoutTeam.map((leader) => (
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
