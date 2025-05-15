import {
	Button,
	Modal,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react'
import { DeleteIcon } from '../moleculs/Icons'
import deleteEmployee from '../../api/deleteEmployee'

export default function ModalDeleteEmployee({
	employeeName,
	employeeId,
}: {
	employeeName: string
	employeeId: string
}) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const onDelete = (id: string) => {
		deleteEmployee(id)
		onClose()
	}

	return (
		<>
			<Button
				isIconOnly
				onPress={onOpen}
				className='w-full py-4 text-sm h-[20px] cursor-pointer'
			>
				<DeleteIcon />
			</Button>
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
								Eliminaras a {employeeName} de la empresa
							</ModalHeader>

							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={onClose}
								>
									Cerrar
								</Button>
								<Button onPress={() => onDelete(employeeId)}>
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
