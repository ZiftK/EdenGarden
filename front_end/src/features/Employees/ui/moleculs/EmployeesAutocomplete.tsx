import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { getEmployees } from '../../api/getEmployees'
import { Employee } from '@/src/shared/types'

export default async function EmployeesAutocomplete({
	value,
	onChange,
}: {
	value: string
	onChange: (employee: Employee) => void
}) {
	const employees = await getEmployees()
	const employeesWithoutTeam = employees.filter(
		(employee) => !employee.fk_equipo
	)

	return (
		<Autocomplete
			label='Lider de Equipo'
			width={'200px'}
			className='mx-auto'
			color='success'
			variant='underlined'
			selectedKey={value}
			onSelectionChange={(key) => {
				const selectedEmployee = employeesWithoutTeam.find(
					(leader) => leader.id_empleado === key
				)

				if (!selectedEmployee) return
				onChange(selectedEmployee)
			}}
		>
			{employeesWithoutTeam.map((leader) => (
				<AutocompleteItem
					textValue={leader.nombre}
					key={leader.id_empleado}
					className=' text-stone-800'
				>
					{leader.nombre}
				</AutocompleteItem>
			))}
		</Autocomplete>
	)
}
