'use client'

import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { useEffect, useState } from 'react'
import { Props } from '../../types'
import { Employee } from '@/src/shared/types'
import { getLeaders } from '../../api/getLeaders'

export default function LeaderAutocomplete({ value, onChange }: Props) {
	const [leaders, setLeaders] = useState<Employee[]>([])

	useEffect(() => {
		const fetchLeaders = async () => {
			try {
				const fetchedLeaders = await getLeaders()
				console.log('Fetched leaders:', fetchedLeaders)
				setLeaders(fetchedLeaders)
			} catch (error) {
				console.error('Error fetching leaders:', error)
			}
		}
		fetchLeaders()
	}, [])

	return (
		<Autocomplete
			label='Lider de Equipo'
			width={'200px'}
			className='mx-auto'
			variant='underlined'
			selectedKey={value}
			defaultSelectedKey={value}
			onSelectionChange={(key) => {
				const selectedLeader = leaders.find(
					(leader) => String(leader.id_empleado) === key
				)

				if (!selectedLeader) return
				onChange(selectedLeader)
			}}
			classNames={{
				base: 'rounded-xl !text-white hover:!bg-white/30 [&_input]:!text-[var(--father-font)] [&_span]:!text-[var(--father-font)] [&_label]:!text-white/50',
				selectorButton: 'text-white',
				clearButton: 'text-white',
				listbox:
					'!bg-[var(--bg-card-obscure)] !text-[var(--father-font)]',
				popoverContent: '!bg-[var(--bg-card-obscure)]',
			}}
		>
			{leaders.map((leader) => (
				<AutocompleteItem
					textValue={leader.nombre}
					key={String(leader.id_empleado)}
					className='!text-[var(--father-font)] hover:!bg-white/30'
				>
					{leader.nombre}
				</AutocompleteItem>
			))}
		</Autocomplete>
	)
}
