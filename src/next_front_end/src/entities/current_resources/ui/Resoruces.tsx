import DataProyectContract from "@/src/components/ERP/moleculs/DataProyectContract"

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
        <section aria-labelledby="dashboard-section-title" className="mt-4">
            <h2 className="text-md font-bold">Recursos y Proyectos Actuales</h2>

            <article className="bg-[var(--bg-card-obscure)] rounded-lg p-4 ">
                <div className="flex justify-between  items-center mb-4">
                    <div>
                        <p className="text-sm">Proyectos</p>
                        <h3 className="text-xl font-bold leading-2.5">9 en curso</h3>
                    </div>

                    <p className="text-sm font-light">Proximos a concluir</p>
                </div>

                <DataProyectContract data={data}/>
            </article>
        </section>
    )
} 