import { Employee } from "@/src/shared/types"
import Image from "next/image"
import imgIcon from "@/public/assets/Profile-picture.jpg"

export default function InfoUser({user}: {user: Employee}) {
    return(
        <section className="w-full flex justify-between max-h-[55px] h-[55px] md:col-span-2 row-start-1 xl:col-start-2">
            <div className="flex flex-col text-[var(--father-font)]">
                <h1 className="font-bold text-2xl">Buen día, Luisa</h1>
                <p className="text-sm">Cuenta Administrador</p>
            </div>

            <Image src={imgIcon} alt="Foto de perfil" className="rounded-full object-cover" width={55} height={55}/>
        </section>
    )
}