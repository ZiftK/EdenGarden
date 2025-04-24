import DataProyectContract from "@/src/components/ERP/moleculs/DataProyectContract"
import ChartTeams from "@/src/components/ERP/moleculs/ChartTeams"

const data =[
    {
        name: "Jardin Casa Voulsen",
        price: 1000,
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        teem: "Equipo A"
    },
    {
        name: "Casc. en Casa Rumus",
        price: 2000,
        startDate: "2023-02-01",
        endDate: "2023-11-30",
        teem: "Equipo B"
    },
    {
        name: "Proyecto 3",
        price: 1500,
        startDate: "2023-03-01",
        endDate: "2023-10-31",
        teem: "Equipo C"
    }
]

export default function Resources(){
    return(
        <section aria-labelledby="dashboard-section-title" className="mt-4 text-[var(--father-font)]">
            <h2 className="text-md font-bold mb-4">Recursos y Proyectos Actuales</h2>

            <div className="overflow-x-auto  whitespace-nowrap items-center flex flex-nowrap py-2">

                <article className="bg-[var(--bg-card-obscure)] rounded-lg p-4 inline-block w-full mr-4 h-[235px] flex-shrink-0">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <p className="text-sm">Proyectos</p>
                            <h3 className="text-xl font-bold leading-2.5">9 en curso</h3>
                        </div>

                        <p className="text-sm font-light">Proximos a concluir</p>
                    </div>

                    <DataProyectContract data={data}/>
                </article>

                <article className="bg-[var(--bg-card-obscure)] rounded-lg p-4 inline-block w-full max-h-[235px] h-[235px] flex-shrink-0">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <p className="text-sm">Equipos</p>
                            <h3 className="text-xl font-bold leading-2.5">6 en operacion</h3>
                        </div>
                    </div>

                    <ChartTeams />
                </article>
            </div>
        </section>
    )
} 