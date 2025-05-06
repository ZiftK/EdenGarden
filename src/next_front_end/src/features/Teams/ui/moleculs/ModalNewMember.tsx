'use client'

import { getLeaders } from '@/src/features/Employees/model/getLeaders'
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
import { useState } from 'react'

export default function ModalNewMember({
	onChange,
}: {
	onChange: (employee: Employee) => void
}) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const members = getLeaders()
	const membersWithoutTeam = members.filter((member) => !member.teams)

	const [idNewMember, setIdNewMember] = useState<string>('')
	const onSave = (id: string) => {
		const selectedMember = members.find((member) => member.id === id)
		if (!selectedMember) return

		onChange(selectedMember)
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
									{membersWithoutTeam.map((member) => (
										<AutocompleteItem
											classNames={{
												title: 'text-black',
											}}
											key={member.id}
											textValue={member.name}
										>
											{member.name}
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
									Close
								</Button>
								<Button onPress={() => onSave(idNewMember)}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
