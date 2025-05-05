'use client'

import { Input } from '@heroui/react'
import { ShortTeam } from '@/src/shared/types'
import { useState } from 'react'
import LeaderAutocomplete from '../../Employees/ui/moleculs/LeadereAutocomplete'

export default function CreateTeam({}) {
	const [dataTeam, setDataTeam] = useState<ShortTeam>({
		name: '',
		leader: {
			name: '',
			id: '',
			email: '',
			phone_number: '',
			role: 'leader',
			position: '',
			salary: 0,
		},
		members: [],
	})

	return (
		<div className='grid grid-cols-2 gap-4'>
			<Input
				label='Nombre del equipo'
				width={'200px'}
				color='success'
				variant='underlined'
				value={dataTeam.name}
				onChange={(e) =>
					setDataTeam((prev) => ({
						...prev,
						name: e.target.value,
					}))
				}
			/>

			<LeaderAutocomplete
				value={dataTeam.leader.id}
				onChange={(leader) => {
					setDataTeam((prev) => ({
						...prev,
						leaderName: {
							name: leader.name,
							id: leader.id,
						},
					}))
				}}
			/>
		</div>
	)
}
