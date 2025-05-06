'use client'

import { Autocomplete, Button, Input } from '@heroui/react'
import { useEditableTeam } from '../model/useTeamEditable'
import LeaderAutocomplete from '../../Employees/ui/moleculs/LeadereAutocomplete'
import { getEmployees } from '../../Employees/model/getEmployees'
import { ShortTeam } from '@/src/shared/types'
import EmployeesAutocomplete from '../../Employees/ui/moleculs/EmployeesAutocomplete'

export default function CreateTeam({}) {
	const employees = getEmployees()
	const employeesWithoutTeam = employees.filter((employee) => !employee.teams)

	const dataTeam: ShortTeam = {
		name: '',
		leader: {
			name: '',
			id: '',
			email: '',
			phone_number: '',
			role: 'user',
			position: '',
			salary: 0,
		},
		members: [],
	}

	const { reset, data, setData, handleSave } = useEditableTeam(dataTeam)

	const handleSubmit = () => {
		handleSave()
	}

	return (
		<article>
			<Input
				isRequired
				errorMessage='Please enter a valid email'
				label='Nombre del Equipo'
				labelPlacement='inside'
				name='TeamName'
				placeholder='Ingresa el nombre del equipo'
				type='text'
				classNames={{
					label: '!text-white/50',
					input: 'label: text-white bg-transparent !text-white/80 focus:!bg-white/30 active:!bg-white/30',
					inputWrapper: [
						'bg-transparent',
						'hover:!bg-white/30',
						'!data-[focused=true]:bg-transparent',
						'data-[hover=true]:!bg-white/30',
						'focus-within:!bg-transparent',
						'focus:!bg-transparent',
						'active:!bg-transparent',
						'focus:border-white/50',
					],
				}}
			/>

			<LeaderAutocomplete
				value={dataTeam.leader.id}
				onChange={(leader) => {
					setData((prev) => ({
						...prev,
						leaderName: {
							name: leader.name,
							id: leader.id,
						},
					}))
				}}
			/>

			{/* <EmployeesAutocomplete value={} /> */}

			<div className='flex gap-2 ml-auto'>
				<Button
					onPress={handleSubmit}
					size='sm'
					color='primary'
					className='bg-[rgba(24,44,2)]'
				>
					Submit
				</Button>
				<Button
					size='sm'
					onPress={reset}
					variant='flat'
					color='default'
					className='text-white bg-amber-50/5'
				>
					Reset
				</Button>
			</div>
		</article>
	)
}
