import { LoginForm } from "@/src/features/auth/login/ui"
import bgPrimary from "@/public/assets/river.webp"

export default function LoginERP() {
    return(
        <section
            className="flex flex-col items-start h-svh bg-center bg-cover bg-no-repeat w-lvw justify-between"
            style={{
                backgroundImage: `
                linear-gradient(to left, var(--green-bg-0), var(--green-bg), var(--green-bg-1)),
                url(${bgPrimary.src})
                `
            }}
        >
            <h1 className="text-3xl font-bold m-7">Accede con tus credenciales</h1>
            <div
                style={{
                    backgroundColor: "var(--green-bg)",
                }}
                className="w-full h-[350px] p-10 flex flex-col gap-2 "
            >
                <h2
                    className="text-[1.25rem] mb-6"
                    style={{
                        color: "var(--green-dark-500)",
                        
                    }}
                >
                    Iniciar Sesión
                </h2>
                <LoginForm />
            </div>
        </section>
    )
}