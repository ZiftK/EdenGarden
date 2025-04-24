export default function TableEmployees() {
    const data = [
        { nombre: 'Martin Lopez C.', expediente: '5248924', estado: true },
        { nombre: 'Diego Carrillo', expediente: '5248924', estado: false },
        { nombre: 'Luisa Sosa', expediente: '5248924', estado: true },
        { nombre: 'Martin Lopez C.', expediente: '5248924', estado: true },
        { nombre: 'Martin Lopez C.', expediente: '5248924', estado: false },
        ]

    return(
        <div className="w-full font-light text-sm">

        {/* Header */}
        <div className="grid grid-cols-[4fr_3fr_1fr] bg-transparent px-4 py-2 mb-2 font-medium border-b border-[#bec8a6]">
          <span>Nombre</span>
          <span>Expediente</span>
          <span>Estado</span>
        </div>
  
        {/* Body */}
        <div className="divide-y divide-[#2b2f22] h-[120px] overflow-y-auto text-xs">
          {data.map((usuario, index) => (
            <div
              key={index}
              className={`grid grid-cols-[4fr_3fr_1fr] items-center px-4 py-2 ${index % 2 === 0 ? 'bg-transparent' : 'bg-[var(--father-font-transparent-200)]'}`}
            >
              <span>{usuario.nombre}</span>
              <span>{usuario.expediente}</span>
              <span>
                <div
                  className={`w-2 h-2 rounded-full mx-auto ${usuario.estado ? 'bg-[var(--green-dark-500)]' : 'bg-gray-600'}`}
                ></div>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
}