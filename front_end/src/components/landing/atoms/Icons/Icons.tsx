interface IconProps {
	color?: string
	h?: number
}

export const StoreIcon = ({
	h = 24,
	color = 'var(--green-200)',
}: {
	h?: number
	color?: string
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		height={h}
		width={h}
		viewBox='0 -960 960 960'
		style={{
			flexGrow: 0,
			flexShrink: 0,
			fill: color,
		}}
	>
		<path d='M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Z' />
	</svg>
)

export const GroupIcon = ({
	h = 24,
	color = 'var(--green-200)',
}: {
	h?: number
	color?: string
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		height={h}
		width={h}
		viewBox='0 -960 960 960'
		style={{
			flexGrow: 0,
			flexShrink: 0,
			fill: color,
		}}
	>
		<path d='M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Z' />
	</svg>
)

export const CertifiedIcon = ({
	h = 24,
	color = 'var(--green-200)',
}: {
	h?: number
	color?: string
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		height={h}
		width={h}
		viewBox='0 -960 960 960'
		style={{
			flexGrow: 0,
			flexShrink: 0,
			fill: color,
		}}
	>
		<path d='m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Z' />
	</svg>
)

export const FacebookIcon = ({
	h = 24,
	color = 'var(--green-200)',
}: {
	h?: number
	color?: string
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 320 512'
		height={h}
		width={h}
		style={{
			flexGrow: 0,
			flexShrink: 0,
			fill: color,
		}}
	>
		<path d='M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z' />
	</svg>
)

export const EmailIcon = ({
	h = 24,
	color = 'var(--green-200)',
}: {
	h?: number
	color?: string
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		height={h}
		width={h}
		viewBox='0 0 20 20'
		fill='none'
		style={{
			flexGrow: 0,
			flexShrink: 0,
		}}
	>
		<mask
			id='mask0_504_26'
			style={{ maskType: 'alpha' }}
			maskUnits='userSpaceOnUse'
			x='0'
			y='0'
			width='20'
			height='20'
		>
			<rect width='20' height='20' fill={color} />
		</mask>
		<g mask='url(#mask0_504_26)'>
			<path
				d='M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10V11.45C20 12.4333 19.6625 13.2708 18.9875 13.9625C18.3125 14.6542 17.4833 15 16.5 15C15.9167 15 15.3667 14.875 14.85 14.625C14.3333 14.375 13.9 14.0167 13.55 13.55C13.0667 14.0333 12.5208 14.3958 11.9125 14.6375C11.3042 14.8792 10.6667 15 10 15C8.61667 15 7.4375 14.5125 6.4625 13.5375C5.4875 12.5625 5 11.3833 5 10C5 8.61667 5.4875 7.4375 6.4625 6.4625C7.4375 5.4875 8.61667 5 10 5C11.3833 5 12.5625 5.4875 13.5375 6.4625C14.5125 7.4375 15 8.61667 15 10V11.45C15 11.8833 15.1417 12.25 15.425 12.55C15.7083 12.85 16.0667 13 16.5 13C16.9333 13 17.2917 12.85 17.575 12.55C17.8583 12.25 18 11.8833 18 11.45V10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18H15V20H10ZM10 13C10.8333 13 11.5417 12.7083 12.125 12.125C12.7083 11.5417 13 10.8333 13 10C13 9.16667 12.7083 8.45833 12.125 7.875C11.5417 7.29167 10.8333 7 10 7C9.16667 7 8.45833 7.29167 7.875 7.875C7.29167 8.45833 7 9.16667 7 10C7 10.8333 7.29167 11.5417 7.875 12.125C8.45833 12.7083 9.16667 13 10 13Z'
				fill={color}
				fillOpacity='0.8'
			/>
		</g>
	</svg>
)

export const PhoneIcon = ({
	h = 24,
	color = 'var(--green-200)',
}: {
	h?: number
	color?: string
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height={h}
			width={h}
			viewBox='0 0 20 20'
			fill='none'
			style={{
				flexGrow: 0,
				flexShrink: 0,
			}}
		>
			<mask
				id='mask0_504_38'
				style={{ maskType: 'alpha' }}
				maskUnits='userSpaceOnUse'
				x='0'
				y='0'
				width='20'
				height='20'
			>
				<rect width='20' height='20' fill={color} />
			</mask>
			<g mask='url(#mask0_504_38)'>
				<path
					d='M8.0954 17.2727H11.9049V16.3636H8.0954V17.2727ZM5.23826 20C4.71445 20 4.26604 19.822 3.89302 19.4659C3.52 19.1098 3.3335 18.6818 3.3335 18.1818V1.81818C3.3335 1.31818 3.52 0.890152 3.89302 0.534091C4.26604 0.17803 4.71445 0 5.23826 0H14.7621C15.2859 0 15.7343 0.17803 16.1073 0.534091C16.4803 0.890152 16.6668 1.31818 16.6668 1.81818V18.1818C16.6668 18.6818 16.4803 19.1098 16.1073 19.4659C15.7343 19.822 15.2859 20 14.7621 20H5.23826ZM5.23826 15.4545V18.1818H14.7621V15.4545H5.23826ZM5.23826 13.6364H14.7621V4.54545H5.23826V13.6364ZM5.23826 2.72727H14.7621V1.81818H5.23826V2.72727Z'
					fill={color}
					fillOpacity='0.8'
				/>
			</g>
		</svg>
	)
}

export const HouseIcon = ({
	h = 24,
	color = '#EAF2E7',
}: {
	h?: number
	color?: string
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={h}
		height={h}
		viewBox='0 0 31 31'
		fill='none'
	>
		<mask
			id='house-mask'
			maskUnits='userSpaceOnUse'
			x='0'
			y='0'
			width='31'
			height='31'
			style={{ maskType: 'alpha' }}
		>
			<rect width='31' height='31' fill={color} />
		</mask>
		<g mask='url(#house-mask)'>
			<path
				d='M8.58333 24.6667H12.4583V16.9167H20.2083V24.6667H24.0833V13.0417L16.3333 7.22917L8.58333 13.0417V24.6667ZM6 27.25V11.75L16.3333 4L26.6667 11.75V27.25H17.625V19.5H15.0417V27.25H6Z'
				fill={color}
			/>
		</g>
	</svg>
)

export const MessageIcon = ({ color, h }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		fill='none'
		stroke={color}
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		height={h}
	>
		<path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
	</svg>
)

export const TrashIcon = ({
	h = 24,
	color = 'var(--green-200)',
}: {
	h?: number
	color?: string
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		height={h}
		width={h}
		viewBox='0 0 24 24'
		style={{
			flexGrow: 0,
			flexShrink: 0,
			fill: color,
		}}
	>
		<path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
	</svg>
)
