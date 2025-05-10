import {
	AlertDiamondIcon,
	CalendarIcon,
	TableRowsIcon,
} from '@/src/components/ERP/moleculs/icons/iconst'
import { GroupIcon } from '@/src/components/landing/atoms/Icons/Icons'
import DateProgressBar from '@/src/features/Projets/components/atoms/DateProgressBar'
import getProjects from '@/src/features/Projets/model/getProjects'
import Title from '@/src/shared/components/atoms/Title'
import { Card, CardBody, CardHeader } from '@heroui/react'

export default async function page() {
	const projects = await getProjects()
	const colorIcons = 'var(--children-font)'
	const calendar = projects[0].calendar

	return (
		<section
			aria-labelledby='dashboard-section-title'
			className='mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'
		>
			<Title
				title='Proyectos'
				btn={{ active: true, path: '/dashboard/proyectos/crear' }}
			/>

			<Card
				className='flex flex-col justify-between bg-center bg-cover bg-no-repeat'
				style={{
					background: `linear-gradient(to left, var(--bg-card-obscure-300), var(--bg-card-obscure-200) 20%, var(--bg-card-obscure) 40%), url(${projects[0].image.src}) right center no-repeat`,
					backgroundSize: 'auto, 40% auto',
					backgroundPosition: 'left top, right center',
					backgroundRepeat: 'no-repeat, no-repeat',
				}}
			>
				<CardHeader>
					<div>
						<span>{projects[0].name}</span>
						<span>{projects[0].teams.leader.name}</span>
						<span>ID 189053</span>
					</div>
					<div>
						<span />
						<span>${projects[0].price}</span>
					</div>
				</CardHeader>
				<CardBody>
					<div>
						<span>
							<GroupIcon size={[15, 15]} color={colorIcons} />
							Conformado por {
								projects[0].teams.members.length
							}{' '}
							miembros
						</span>
						<span>
							<CalendarIcon h={15} color={colorIcons} />
							{projects[0].calendar.intial_date.toLocaleDateString()}{' '}
							-{' '}
							{projects[0].calendar.final_date.toLocaleDateString()}
						</span>
						<span>
							<TableRowsIcon h={15} color={colorIcons} />
							<DateProgressBar
								startDate={calendar.intial_date}
								endDate={calendar.final_date}
							/>
						</span>
					</div>
					<div>
						<AlertDiamondIcon h={15} color={colorIcons} />
						<span>2 Problemas</span>
					</div>
				</CardBody>
			</Card>
		</section>
	)
}
