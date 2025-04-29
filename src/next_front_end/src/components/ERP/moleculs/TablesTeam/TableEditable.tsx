'use client'

import { EmailIcon, PhoneIcon } from "@/src/components/landing/atoms/Icons/Icons"
import CopyButton from "../../atoms/CopyButton"
import { ShortTeam } from "@/src/shared/types"
import { useEffect, useRef, useState } from "react"

export default function TableEditable({team}: {team: ShortTeam}){
    const [isEditing, setIsEditing] = useState(false);
    const [employeesToRemove, setEmployeesToRemove] = useState<string[]>([]);

    const handleToggleRemove = (id: string) => {
        setEmployeesToRemove(prev =>
            prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
        )
    }

    const handleSave = () => {
        // Aquí haces tu llamada API o actualización
        setIsEditing(false);
    };
    
    const handleCancel = () => {
        setEmployeesToRemove([]);
        setIsEditing(false);
    };

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditing && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isEditing]);

    const [newMemberName, setNewMemberName] = useState('');
const [newMembers, setNewMembers] = useState<string[]>([]);

const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    setNewMembers(prev => [...prev, newMemberName.trim()]);
    setNewMemberName('');
};


    return(
        <>
            <div className="w-full font-light text-sm">
                            
                            {/* Header */}
                            <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] bg-transparent text-center py-2 mb-2 font-medium border-b border-[#bec8a6]">

                                <span className="text-sm">Puesto</span>
                                <span className="text-sm">Expediente</span>
                                <span className="text-sm">Nombre</span>
                                <span className="text-sm">Contacto</span>
                                <span className="text-sm">{isEditing ? "Eliminar" : "Salario"}</span>
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

                                        {isEditing 
                                            ?         
                                                <button onClick={() => handleToggleRemove(usuario.id)}>
                                                    ✔️
                                                </button> 
                                            : 
                                            <span className="text-sm">{usuario.salary}</span>
                                        }
                                    
                            </div>
                            ))}
                    {isEditing && <button onClick={handleAddMember} className="btn-primary">Agregar</button> }
                </div>
            </div>


            <button onClick={() => setIsEditing(true)}>Editar</button>

            {isEditing && (
                <div className="flex gap-2 justify-end mt-4">
                    <button onClick={handleSave} className="btn-primary">Guardar</button>
                    <button onClick={handleCancel} className="btn-secondary">Cancelar</button>
                </div>
            )}  
        </>
    )
}