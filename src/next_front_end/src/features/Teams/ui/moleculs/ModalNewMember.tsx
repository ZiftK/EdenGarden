import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@heroui/react'

export default function ModalNewMember() {
	const { isOpen, onOpen, onClose } = useDisclosure()

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
							<ModalHeader className='flex flex-col gap-1'>
								Agregar por expediente
							</ModalHeader>
							<ModalBody></ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									className='bg-amber-50'
									onPress={onClose}
								>
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
