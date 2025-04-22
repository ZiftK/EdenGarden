import { Employee } from "@/src/shared/types"
import Image from "next/image"
import imgIcon from "@/public/assets/Profile-picture.jpg"

export default function InfoUser({user}: {user: Employee}) {
    return(
        <section className="w-full flex justify-between">
            <div className="flex flex-col ">
                <h1 className="font-bold text-2xl">Buen día, Luisa</h1>
                <p>Cuenta Administrador</p>
            </div>

            <Image src={imgIcon} alt="Foto de perfil" className="rounded-full object-cover" width={55} height={55} />
        </section>
    )
}