export type Employee = {
    id_empleado: string;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    fecha_recontratacion: string;
    fecha_contratacion: string;
    fecha_salida: string;
    clave: string;
    rol: 'user' | 'admin' | 'leader';
    puesto: string;
    img?: string
    salario: number
    equipo?: string;
}

export type AuthState = {
    user: Employee | null
    loading: boolean
    error: string | null
    validateSession: () => Promise<void>
    login: (id: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export type ShortTeam ={
    id_equipo: number;
    nombre: string;
    lider: Pick<Employee, 'email' | 'id_empleado' | 'nombre' | 'telefono' | 'rol' | 'puesto' | 'salario' | 'equipo' | 'img' >
    empleados: Pick<Employee, 'email' | 'id_empleado' | 'nombre' | 'telefono' | 'rol' | 'puesto' | 'salario' | 'equipo' | 'img' >[];
}

