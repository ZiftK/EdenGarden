import { EmailIcon, PhoneIcon } from "@/src/components/landing/atoms/Icons/Icons"
import CopyButton from "../../atoms/CopyButton"
import { ShortTeam } from "@/src/shared/types"

export default function TableEditable({team}: {team: ShortTeam}){
    return(
        <>
            <div className="w-full font-light text-sm">
                            
                            {/* Header */}
                            <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] bg-transparent text-center py-2 mb-2 font-medium border-b border-[#bec8a6]">
                                <span className="text-sm">Puesto</span>
                                <span className="text-sm">Expediente</span>
                                <span className="text-sm">Nombre</span>
                                <span className="text-sm">Contacto</span>
                                <span className="text-sm">Salario</span>
                            </div>
            
                            {/* Body */}
                            <div className="divide-y divide-[#2b2f22] h-[100px] overflow-y-auto text-xs scrollbar-thin-custom xl:h-48">
                                {team.members.map((usuario, i) => (
                                    <div
                                        key={i}
                                        className={`grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center text-center py-2 ${i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--father-font-transparent-200)]'}`}
                                    >
                                        <span className="text-sm">{usuario.position}</span>
                                        <span className="text-sm">{usuario.id}</span>
                                        <span className="text-sm">{usuario.name}</span>
            
                                <div className="flex items-center justify-center gap-2">
                                    <CopyButton text={usuario.email} icon={EmailIcon({ color: "var(--father-font)", size: [.75, .75] })} />
                                    <CopyButton text={usuario.phone_number} icon={PhoneIcon({ color: "var(--father-font)", size: [.75, .75] })} />
                                </div>

                                    <span className="text-sm">{usuario.salary}</span>
            
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}