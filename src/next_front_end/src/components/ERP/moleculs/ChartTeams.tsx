export default function ChartTeams() {

    const data = [4, 5, 5, 3, 3, 5]; 
    const max = 6;

    return (
        <>
            <span className="flex justify-between items-center mb-2">
                <p className="text-sm">Empleados por equipo</p>
                <p className="relative text-xs md:text-sm after:content-[''] after:absolute after:-left-2.5 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[var(--green-dark-500)] after:w-1.5 after:h-1.5">Destacado</p>
            </span>

            <div className="bg-transparent flex flex-col items-center h-[110px] w-10/12 m-auto">
                <div className="relative w-full max-w-xl border-l border-b border-[var(--father-font-transparent)] flex items-end gap-4 justify-center h-full">
                    {data.map((value, index) => (
                        <div
                            key={index}
                            className={`flex items-end justify-center w-1/12 ${
                                index === 4 ? 'bg-[var(--green-dark-500)]' : 'bg-[var(--father-font-transparent)]'
                            }`}  
                            style={{
                                height: `${(value / max) * 100}%`,
                                transition: 'height 0.3s ease',
                            }}
                        />
                    ))}

                    {/* Líneas horizontales  */}
                    <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between pointer-events-none">
                        {[...Array(max)].map((_, i) => (
                            <div key={i} className="border-t border-dashed border-[var(--father-font-transparent)] w-full" />
                        ))}
                    </div>
                </div>

      {/* Eje X (número de equipos) */}
            <div className="flex gap-4 mt-0.5 text-center justify-center w-full text-xs">
                {data.map((_, i) => (
                    <div key={i} className="w-1/12">
                        {i + 1}
                    </div>
                ))}  
            </div>

            <p className="mt-1 text-xs">No. Equipo</p>
        </div>
    </>
    )
}