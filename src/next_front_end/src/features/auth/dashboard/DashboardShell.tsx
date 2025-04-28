import DataProyectContract from "@/src/components/ERP/moleculs/DataProyectContract"
import ChartTeams from "@/src/components/ERP/moleculs/ChartTeams"
import TableEmployees from "@/src/components/ERP/moleculs/TableEmployees"

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

export default function DashboardShell(){

    return (
        <section aria-labelledby="dashboard-section-title" className="mt-4 text-[var(--father-font)] md:row-start-2 md:row-span-3   md:row-end-4  xl:col-start-2">
            <h2 className="text-md font-bold mb-4">Recursos y Proyectos Actuales</h2>
    
            <div className="overflow-x-auto  md:overflow-y-auto md:max-h-[400px] md:max-w-[335px] md:mx-auto md:flex-col md:gap-2 xl:flex-row xl:overflow-x-hidden whitespace-nowrap items-center flex flex-nowrap py-2 xl:w-full xl:justify-between scrollbar-thin-custom">
                <article className="card-base mr-4 pl-4 md:mr-0">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <p className="text-sm">Proyectos</p>
                            <h3 className="text-lg font-bold leading-2.5">9 en curso</h3>
                        </div>
                        
                        <p className="text-sm font-light">Proximos a concluir</p>
                    </div>
    
                    <DataProyectContract data={data}/>
                </article>

                <article className="card-base mr-4 md:mr-0">
                    <div className="flex flex-col mb-2">                        
                        <p className="text-sm">Equipos</p>
                        <h3 className="text-lg font-bold leading-2.5">6 en operacion</h3>
                    </div>

                    <ChartTeams />
                </article>
    
                <article className="card-base">
                    <div className="flex justify-between flex-col mb-2">                        
                        <p className="text-sm">Empleados</p>
                        <h3 className="text-lg font-bold leading-2.5 ">30 en plantilla</h3>                        
                    </div>
        
                    <TableEmployees />
                </article>
            </div>
        </section>
    )
} 