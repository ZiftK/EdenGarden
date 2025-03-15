export const StoreIcon = ({
    color,
    size
}:{
    color?:string,
    size?: [number,number]
}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height={size![0]+'rem'} viewBox="0 -960 960 960" width={size![1]+'rem'} style={{
            flexGrow: 0,
            flexShrink: 0,
            fill: color||'var(--green-200)',
        }}><path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"/></svg>
    )
}

export const GroupIcon = ({
    color,
    size
}:{
    color?:string,
    size?: [number,number]
}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height={size![0]+'rem'} viewBox="0 -960 960 960" width={size![1]+'rem'} style={{
            flexGrow: 0,
            flexShrink: 0,
            fill: color||'var(--green-200)',
        }}><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
    )
}


export const CertifiedIcon = ({
    color,
    size
}:{
    color?:string,
    size?: [number,number]
}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height={size![0]+'rem'} viewBox="0 -960 960 960" width={size![1]+'rem'} style={{
            flexGrow: 0,
            flexShrink: 0,
            fill: color||'var(--green-200)',
        }}><path d="m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z"/></svg>
    )
}


export const FacebookIcon = ({
    color,
    size
}:{
    color?: string,
    size?:[number,number]
}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
            height={size![0]+"rem"}
            width={size![1]+'rem'} style={{
                flexGrow: 0,
                flexShrink: 0,
                fill: color||'var(--green-200)',
            }}
        >
            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
        </svg>
    )
}