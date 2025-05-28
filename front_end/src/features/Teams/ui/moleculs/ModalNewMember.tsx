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
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				setIsLoading(true)
				const fetchedMembers = await getEmployees()
				setMembers(fetchedMembers)
				// Filter members that are not leaders and don't have a team assigned
				const availableMembers = fetchedMembers.filter(
					(member) => member.rol !== 'lider' && !member.equipo
				)
				setMembersWithoutTeam(availableMembers)
				console.log('Available members:', availableMembers)
			} catch (error) {
				console.error('Error fetching members:', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchMembers()
	}, [])

	const [idNewMember, setIdNewMember] = useState<string>('')
	const [alreadyAddedIds, setAlreadyAddedIds] = useState<string[]>([])

	const availableMembers = membersWithoutTeam.filter(
		(member) => !alreadyAddedIds.includes(String(member.id_empleado))
	)

	if (isLoading) {
		return (
			<button
				onClick={onOpen}
				className='w-full py-4 text-sm h-[20px] cursor-pointer text-[var(--father-font)]'
			>
				Cargando...
			</button>
		)
	}

	if (availableMembers.length === 0) {
		return (
			<button
				className='w-full py-4 text-sm h-[20px] cursor-not-allowed opacity-50 text-[var(--father-font)]'
				disabled
			>
				No hay empleados disponibles
			</button>
		)
	}

	const onSave = (id: string) => {
		const selectedMember = members.find(
			(member) => String(member.id_empleado) === id
		)
		if (!selectedMember) return

		onChange(selectedMember)
		setAlreadyAddedIds([
			...alreadyAddedIds,
			String(selectedMember.id_empleado),
		])
		onClose()
		setIdNewMember('') // Reset selection after adding
	}

	return (
		<>
			<button
				onClick={onOpen}
				className='w-full py-4 text-sm h-[20px] cursor-pointer text-[var(--father-font)]'
			>
				Agregar +
			</button>
			<Modal
				isOpen={isOpen}
				size={'xs'}
				onClose={onClose}
				className='bg-[var(--bg-card-obscure)]'
				classNames={{
					base: '!bg-[var(--bg-card-obscure)]',
					header: '!text-[var(--father-font)]',
					body: '!text-[var(--father-font)]',
					footer: '!text-[var(--father-font)]',
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Agrega nuevo empleado
							</ModalHeader>
							<ModalBody>
								<Autocomplete
									aria-label='Selecciona un empleado'
									color='secondary'
									classNames={{
										base: 'border-b-2 border-b-[var(--father-font)] text-[var(--father-font)] [&_input]:!text-[var(--father-font)] [&_span]:!text-[var(--father-font)] [&_label]:!text-[var(--father-font)]',
										listbox:
											'!bg-[var(--bg-card-obscure)] !text-[var(--father-font)]',
										popoverContent:
											'!bg-[var(--bg-card-obscure)]',
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
												base: '!text-[var(--father-font)] hover:!bg-white/30',
											}}
											key={String(member.id_empleado)}
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
									className='!text-[var(--father-font)]'
								>
									Cerrar
								</Button>
								<Button
									onPress={() => onSave(idNewMember)}
									isDisabled={!idNewMember}
									className='!text-[var(--father-font)]'
								>
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
