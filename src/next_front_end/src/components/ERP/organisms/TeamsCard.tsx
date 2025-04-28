import { ShortTeam } from "@/src/shared/types"


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
        }

    ]
    return(
        <>
        {data.map((team, index) => (
            <article className="w-5/12 bg-[var(--bg-card-obscure)] rounded-lg px-4 py-2 flex flex-col gap-2" key={index}>
                <div>
                <p className="text-sm">{team.name}</p>
                <h3 className="text-lg font-bold leading-2.5">{team.leaderName.name}</h3>
                </div>
                
                <div className="w-full font-light text-sm">
                
                {/* Header */} 
                <div className="grid grid-cols-[4fr_3fr_1fr] bg-transparent px-4 pr-7 py-2 mb-2 font-medium border-b border-[#bec8a6]">
                <span className="text-xs">Puesto</span>
                <span className="text-xs">Expediente</span>
                <span className="text-xs">Nombre</span>
                </div>
                
                {/* Body */}
                <div className="divide-y divide-[#2b2f22] h-[100px] overflow-y-auto text-xs">
                  {team.members.map((usuario, i) => (
                    <div
                    key={index}
                      className={`grid grid-cols-[4fr_3fr_1fr] items-center px-4 py-2 ${index % 2 === 0 ? 'bg-transparent' : 'bg-[var(--father-font-transparent-200)]'}`}
                      >
                      <span>{usuario.position}</span>
                      <span>{usuario.id}</span>
                      <span>{usuario.salary}</span>
                    </div>
                  ))}
                  </div>
                  </div>
                  </article>
            ))
        }
        </>
    )
}