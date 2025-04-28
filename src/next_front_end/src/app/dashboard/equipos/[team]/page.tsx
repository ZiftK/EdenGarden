import Link from "next/link"

export default async function  TeamPage({params}: {params: string}) {
    const {team} = await params
    console.log(team)

    return(
        <section className="mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2">
            <h2 className="text-md font-bold mb-4 inline-block mr-3">
                <Link href={"./"} className="text-[var(--green-dark-500)]">Equipos</Link> / {team}
            </h2>
        </ section>
    )
}