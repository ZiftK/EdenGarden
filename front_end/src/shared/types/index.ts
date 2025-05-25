export type DateFormat = {
    dia: number;
    mes: number;
    anno: number;
}

export type Employee = {
    id_empleado?: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email?: string | null;
    fecha_recontratacion?: DateFormat | null;
    fecha_contratacion: DateFormat;
    fecha_salida?: DateFormat | null;
    clave: string;
    rol: string;
    puesto: string;
    img?: string | null;
    salario: number;
    fk_equipo?: number | null;
}

export type AuthState = {
    user: Employee | null
    loading: boolean
    error: string | null
    validateSession: () => Promise<void>
    login: (expediente: string, clave: string) => Promise<void>
    logout: () => Promise<void>
}

export type ShortTeam = {
    id_equipo: number;
    nombre: string;
    lider: Pick<Employee, 'email' | 'id_empleado' | 'nombre' | 'telefono' | 'rol' | 'puesto' | 'salario' | 'img'>
    empleados: Pick<Employee, 'email' | 'id_empleado' | 'nombre' | 'telefono' | 'rol' | 'puesto' | 'salario' | 'img'>[];
}

export type Team = {
    id_equipo: number;
    nombre: string;
    lider: Employee;
    empleados: Employee[];
}

export type TeamCreate = {
    nombre: string;
    lider_id: number;
    empleados_ids: number[];
}

