'use client'

import { EmailIcon, PhoneIcon } from "@/src/components/landing/atoms/Icons/Icons"
import CopyButton from "../../atoms/CopyButton"
import { ShortTeam } from "@/src/shared/types"
import { useEffect, useRef, useState } from "react"

interface dataTeam  {
    isEditing : boolean
    currentTeam: ShortTeam
    teamShowed: ShortTeam
    teamChanged?: ShortTeam["members"]
}

export default function TableEditable({team}: {team: ShortTeam}){
    const [data, setData] = useState<dataTeam>({currentTeam: team, isEditing: false, teamShowed:team , teamChanged: []});



    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (data.isEditing && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [data.isEditing]);

    async function updateTeam(id: string, members: ShortTeam["members"]): Promise<ShortTeam | undefined> {
        try{

            const response = await fetch(`/api/teams/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ members })
            })

            return response.json()
        } catch (err: unknown) {
            console.log('Se generó el siguiente error: ', err)
        }
    }

    const reset = () => {
        setData((prev) => ({
            ...prev,
            isEditing: false,
            teamShowed: prev.currentTeam,
            teamChanged: []
        }))
    }



    const handleSave = () => {
        if(data.teamShowed?.members.length === 0 ) {
            alert("Puede borrar el equipo, mas no dejarlo vacio")
            return reset()
        }
        if(data.teamShowed.members === data.currentTeam.members) return reset()

        updateTeam(data.currentTeam.name, data.currentTeam.members)
        setData((prev) => ({
            ...prev,
            isEditing: false,
            currentTeam: {
                ...prev.currentTeam,
                members: prev.teamShowed.members || prev.currentTeam.members
            },
            teamChanged: [] 
        }))
    }
    
    const handleAddMember = () => {
    }


    const handleToggleRemove = () => {
        const idToRemove = new Set(data.teamChanged?.map(member => member.id))
        const teamUnsaved = data.currentTeam.members.filter(member => !idToRemove.has(member.id))
        setData((prev) => ({
            ...prev,
            teamShowed: {
                ...prev.teamShowed,
                members: teamUnsaved
            },
            teamChanged: []
        }))
    }

    return(
        <>
            <div className="w-full font-light text-sm overflow-x-auto">
                            
                            {/* Header */}
                            <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] min-w-[450px] bg-transparent text-center py-2 mb-2 font-medium border-b border-[#bec8a6]">

                                <span className="text-sm">Puesto</span>
                                <span className="text-sm">Expediente</span>
                                <span className="text-sm">Nombre</span>
                                <span className="text-sm">Contacto</span>
                                {data.isEditing 
                                    ? <button onClick={() => handleToggleRemove()} className="text-sm text-blue-500 cursor-pointer border-b-2 w-fit m-auto">Eliminar</button>
                                    : <span className="text-sm">Salario</span>
                                }
                            </div>
            
                            {/* Body */}
                            <div className="divide-y min-w-[450px] divide-[#2b2f22] h-[100px] overflow-y-auto text-xs scrollbar-thin-custom xl:h-48" ref={bottomRef}>
                                {data.teamShowed.members.map((user, i) => (
                                    <div
                                        key={i}
                                        className={`grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center text-center py-2 ${i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--father-font-transparent-200)]'}`}
                                    >
                                        <span className="text-sm">{user.position}</span>
                                        <span className="text-sm">{user.id}</span>
                                        <span className="text-sm">{user.name}</span>
            
                                        <div className="flex items-center justify-center gap-2">
                                            <CopyButton text={user.email} icon={EmailIcon({ color: "var(--father-font)", size: [.75, .75] })} />
                                            <CopyButton text={user.phone_number} icon={PhoneIcon({ color: "var(--father-font)", size: [.75, .75] })} />
                                        </div>

                                        {data.isEditing 
                                            ?         
                                                <input type="checkbox" checked={data.teamChanged!.includes(user)} className="accent-[var(--father-font)] cursor-pointer" onChange={(e) => {
                                                    const checked = e.target.checked
                                                    const newTeam = data.teamChanged || []
                                                    
                                                    setData({
                                                        ...data, 
                                                        teamChanged: checked 
                                                            ? [...newTeam, user]
                                                            : newTeam.filter(u => u !== user)
                                                    })
                                                    }
                                                }/>
                                            : 
                                            <span className="text-sm">{user.salary}</span>
                                        }
                                    
                                    </div>
                                ))}
                                {data.isEditing && <button onClick={handleAddMember} className="w-full py-4 text-sm h-[20px] cursor-pointer ">Agregar +</button> }
                </div>
            </div>


            {!data.isEditing &&<button onClick={() => setData({...data, isEditing: true})} className="cursor-pointer text-[var(--green-dark-500)] border-b-2 text-md place-self-end text-center">Editar</button>}

            {data.isEditing && (
                <div className="flex gap-2 justify-end mt-4"> 
                    <button onClick={handleSave} className="cursor-pointer text-md">Guardar</button>
                    <button onClick={() => reset()} className="cursor-pointer text-md">Cancelar</button>
                </div>
            )}  
        </>
    )
}