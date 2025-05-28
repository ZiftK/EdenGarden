export type DateFormat = {
    dia: number;
    mes: number;
    anno: number;
}

export interface Employee {
    id_empleado?: number;
    expediente: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    direccion: string;
    telefono: string;
    email: string;
    rol: string;
    img?: string | null;
    puesto?: string;
    salario?: number;
    equipo?: number | null;
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

