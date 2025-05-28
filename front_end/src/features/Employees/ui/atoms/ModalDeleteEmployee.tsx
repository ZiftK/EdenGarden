import {
	Button,
	Modal,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from '@heroui/react'
import { DeleteIcon } from '../moleculs/Icons'
import { useEmployeeStore } from '../../model/employeeStore'
import { useRouter } from 'next/navigation'

export default function ModalDeleteEmployee({
	employeeName,
	employeeId,
}: {
	employeeName: string
	employeeId: string
}) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { deleteEmployee, isLoading, error, setError } = useEmployeeStore()
	const router = useRouter()

	const onDelete = async (id: string) => {
		try {
			await deleteEmployee(+id)
			onClose()
			router.push('/dashboard/empleados')
			router.refresh()
		} catch (error) {
			console.error('Error al eliminar el empleado:', error)
			setError('Error al eliminar el empleado')
		}
	}

	const handleClose = () => {
		setError(null)
		onClose()
	}

	return (
		<>
			<Tooltip color='danger' content='Eliminar usuario'>
				<Button
					isIconOnly
					onPress={onOpen}
					className='text-lg text-danger bg-[#0002] cursor-pointer active:opacity-50 rounded-full'
				>
					<DeleteIcon />
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				size={'xs'}
				onClose={handleClose}
				className='bg-[var(--bg-card-obscure)]'
			>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								<div>
									¿Estás seguro que deseas eliminar a{' '}
									{employeeName.split(' ')[0]} de la empresa?
								</div>
								{error && (
									<div className='text-sm text-danger'>
										{error}
									</div>
								)}
							</ModalHeader>

							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={handleClose}
									isDisabled={isLoading}
								>
									Cancelar
								</Button>
								<Button
									color='danger'
									onPress={() => onDelete(employeeId)}
									isLoading={isLoading}
								>
									Eliminar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
