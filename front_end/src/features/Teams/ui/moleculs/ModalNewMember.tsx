'use client'

import { getEmployees } from '@/src/features/Employees/api/getEmployees'
import { Employee } from '@/src/shared/types'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Autocomplete,
	AutocompleteItem,
} from '@heroui/react'
import { useState, useEffect } from 'react'

export default function ModalNewMember({
	onChange,
}: {
	onChange: (employee: Employee) => void
}) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [members, setMembers] = useState<Employee[]>([])
	const [membersWithoutTeam, setMembersWithoutTeam] = useState<Employee[]>([])
	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const members = await getEmployees()
				setMembers(members)
			} catch (error) {
				console.error('Error fetching members:', error)
			}
		}
		fetchMembers()
		setMembersWithoutTeam(
			members.filter(
				(member) => !member.equipo && member.rol !== 'leader'
			)
		)
	}, [])

	const [idNewMember, setIdNewMember] = useState<string>('')
	const [alreadyAddedIds, setAlreadyAddedIds] = useState<string[]>([])

	const availableMembers = membersWithoutTeam.filter(
		(member) => !alreadyAddedIds.includes(member.id_empleado)
	)

	console.log('availableMembers', members)

	const onSave = (id: string) => {
		const selectedMember = members.find(
			(member) => member.id_empleado === id
		)
		if (!selectedMember) return

		onChange(selectedMember)
		setAlreadyAddedIds([...alreadyAddedIds, selectedMember.id_empleado])
		onClose()
	}

	return (
		<>
			<button
				onClick={onOpen}
				className='w-full py-4 text-sm h-[20px] cursor-pointer'
			>
				Agregar +
			</button>
			<Modal
				isOpen={isOpen}
				size={'xs'}
				onClose={onClose}
				className=' bg-[var(--bg-card-obscure)]'
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1 '>
								Agrega nuevo empleado
							</ModalHeader>
							<ModalBody>
								<Autocomplete
									aria-label='Selecciona un empleado'
									color='secondary'
									classNames={{
										base: 'border-b-2 border-b-white text-amber-50',
										listbox: 'bg-[var(--bg-card-obscure)]',
									}}
									autoFocus
									onSelectionChange={(key) => {
										if (key === null) {
											setIdNewMember('')
											return
										}
										setIdNewMember(String(key))
									}}
									variant='underlined'
								>
									{availableMembers.map((member) => (
										<AutocompleteItem
											classNames={{
												title: 'text-black',
											}}
											key={member.id_empleado}
											textValue={member.nombre}
										>
											{member.nombre}
										</AutocompleteItem>
									))}
								</Autocomplete>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={onClose}
								>
									Cerrar
								</Button>
								<Button onPress={() => onSave(idNewMember)}>
									Agregar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
