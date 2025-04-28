import Title from "@/src/shared/components/atoms/Title"


export default function page(){
    return(
        <section aria-labelledby="dashboard-section-title" className="mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 lg:col-start-2">
            <Title title="Equipos" btn={{active: true, path: "/dashboard/equipos/crear"}}/>

            
        </ section>
    )
}