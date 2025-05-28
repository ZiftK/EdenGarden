export type DateFormat = {
    dia: number;
    mes: number;
    anno: number;
}

export interface Employee {
    id_empleado: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    fecha_contratacion: DateFormat;
    fecha_salida?: DateFormat;
    fecha_recontratacion?: DateFormat;
    clave: string;
    rol: string;
    puesto: string;
    salario: number;
    img?: string;
    fk_equipo?: number
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
    lider: Pick<Employee, 'email' | 'id_empleado' | 'nombre' | 'telefono' | 'rol' | 'puesto' | 'salario' | 'img' | 'fk_equipo'>;
    empleados: Pick<Employee, 'email' | 'id_empleado' | 'nombre' | 'telefono' | 'rol' | 'puesto' | 'salario' | 'img' | 'fk_equipo'>[];
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
