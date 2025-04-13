import { LoginForm } from "@/src/features/auth/login/ui"
import bgPrimary from "@/public/assets/river.webp"

export default function LoginERP() {
    return(
        <section
            className="flex flex-col items-start h-svh p-20 bg-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `
                linear-gradient(to left, var(--green-bg-0), var(--green-bg), var(--green-bg-1)),
                url(${bgPrimary.src})
                `
            }}
        >
            <h1>Accede con tus credenciales</h1>
            <div
                className="m-28 w-10/12 self-center "
                style={{
                    backgroundColor: "var(--green-bg)"
                }}
            >
                <h2
                    className="text-3xl "
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