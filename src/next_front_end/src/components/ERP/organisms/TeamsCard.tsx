'use client'

import { ShortTeam } from "@/src/shared/types"
import { EmailIcon, PhoneIcon } from "../../landing/atoms/Icons/Icons"

export default function TeamsCard(
    // {data}: {data: ShortTeam[]}
) {
    const data: ShortTeam[] = [
        {
            name: "Equipo 1",
            leaderName: { name: "Ruth Viveros" },
            members: [
                {role: "leader", name: "Ruth Viveros", id: "123456", email: "ruth@gmail.com", phone_number: "12344567", position: "lider", salary: 2000},
                {role: "user", name: "Martín Herrera López", id: "12356", email: "martin@gamil.com", phone_number: "1234452567", position:"Diseñador", salary: 2000},
                {role: "user", name: "Javier López", id: "86344", email: "javier@gmail.com", phone_number: "12314567", position:"Ing. Civil", salary: 2000},
                {role: "user", name: "Valentina Rojas Martínez", id: "987654", email: "valentina@gmail.com", phone_number: "12344567", position:"Arquitecta", salary: 2000},
            ]
        },
        {
            name: "Equipo 1",
            leaderName: { name: "Ruth Viveros" },
            members: [
                {role: "leader", name: "Ruth Viveros", id: "123456", email: "ruth@gmail.com", phone_number: "12344567", position: "lider", salary: 2000},
                {role: "user", name: "Martín Herrera López", id: "12356", email: "martin@gamil.com", phone_number: "1234452567", position:"Diseñador", salary: 2000},
                {role: "user", name: "Javier López", id: "86344", email: "javier@gmail.com", phone_number: "12314567", position:"Ing. Civil", salary: 2000},
                {role: "user", name: "Valentina Rojas Martínez", id: "987654", email: "valentina@gmail.com", phone_number: "12344567", position:"Arquitecta", salary: 2000},
            ]
        },
        {
            name: "Equipo 1",
            leaderName: { name: "Ruth Viveros" },
            members: [
                {role: "leader", name: "Ruth Viveros", id: "123456", email: "ruth@gmail.com", phone_number: "12344567", position: "lider", salary: 2000},
                {role: "user", name: "Martín Herrera López", id: "12356", email: "martin@gamil.com", phone_number: "1234452567", position:"Diseñador", salary: 2000},
                {role: "user", name: "Javier López", id: "86344", email: "javier@gmail.com", phone_number: "12314567", position:"Ing. Civil", salary: 2000},
                {role: "user", name: "Valentina Rojas Martínez", id: "987654", email: "valentina@gmail.com", phone_number: "12344567", position:"Arquitecta", salary: 2000},
            ]
        },

    ]

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
            console.log('Copiado al portapapeles:', text);
            })
            .catch((err) => {
                console.error('Error al copiar:', err);
            });
};

    return(
        <div className="scrollbar-thin-custom w-full flex flex-col gap-4 md:max-h-[calc(100vh-14rem)] md:overflow-y-auto xl:grid xl:grid-cols-2">
        {data.map((team, index) => (
            <article className="w-full bg-[var(--bg-card-obscure)] rounded-lg px-4 py-2 flex flex-col gap-2 xl:h-56" key={index}>
                <div>
                    <p className="text-sm">{team.name}</p>
                    <h3 className="text-lg font-bold leading-2.5">{team.leaderName.name}</h3>
                </div>
                
                <div className="w-full font-light text-sm">
                
                {/* Header */}
                <div className="grid grid-cols-[1fr_1fr_2fr_1fr] bg-transparent text-center py-2 mb-2 font-medium border-b border-[#bec8a6]">
                    <span className="text-xs">Puesto</span>
                    <span className="text-xs">Expediente</span>
                    <span className="text-xs">Nombre</span>
                    <span className="text-xs">Contacto</span>
                </div>

                {/* Body */}
                <div className="divide-y divide-[#2b2f22] h-[100px] overflow-y-auto text-xs scrollbar-thin-custom xl:h-48">
                    {team.members.map((usuario, i) => (
                        <div
                            key={i}
                            className={`grid grid-cols-[1fr_1fr_2fr_1fr] items-center text-center py-2 ${i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--father-font-transparent-200)]'}`}
                        >
                            <span>{usuario.position}</span>
                            <span>{usuario.id}</span>
                            <span>{usuario.name}</span>

                            <div className="flex items-center justify-center gap-2">
                                <span    
                                    className="cursor-pointer "
                                    title={usuario.email}
                                    onClick={() => copyToClipboard(usuario.email)}
                                >
                                        {EmailIcon({color: "var(--father-font)", size:[.75,.75]})}
                                </span>

                                <span    
                                    className="cursor-pointer "
                                    title={usuario.email}
                                    onClick={() => copyToClipboard(usuario.phone_number)}
                                >
                                        {PhoneIcon({color: "var(--father-font)", size:[.75,.75]})}
                                </span>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </article>
            ))
        }
        </div>
    )
}