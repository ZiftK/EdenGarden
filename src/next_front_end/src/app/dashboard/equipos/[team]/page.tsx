

import CopyButton from "@/src/components/ERP/atoms/CopyButton"
import { EmailIcon, PhoneIcon } from "@/src/components/landing/atoms/Icons/Icons"
import { getTeams } from "@/src/features/Teams/lib/getTeams"
import Link from "next/link"

export default async function  TeamPage({ params }: { params: { team: string } }) {
    const teams = await getTeams()
    const team = teams.find(item => item.name === decodeURIComponent(params.team))
    if (!team) return null

    return(
        <section className="mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2">
            <h2 className="text-md font-bold mb-4 inline-block mr-3">
                <Link href={"./"} className="text-[var(--green-dark-500)]">Equipos</Link> / {decodeURIComponent(team!.name)}
            </h2>

            <h3 className="text-lg font-bold">Distribucion del equipo</h3>

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
                                    <CopyButton text={usuario.email} icon={EmailIcon({ color: "var(--father-font)", size: [.75, .75] })} />
                                    <CopyButton text={usuario.phone_number} icon={PhoneIcon({ color: "var(--father-font)", size: [.75, .75] })} />
                                </div>
            
                        </div>
                    ))}
                </div>
            </div>
        </ section>
    )
}