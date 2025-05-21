export type DateFormat = {
    dia: number;
    mes: number;
    anno: number;
}

export type Employee = {
    id_empleado: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    fecha_recontratacion: DateFormat;
    fecha_contratacion: DateFormat;
    fecha_salida: DateFormat;
    clave: string;
    rol: 'user' | 'admin' | 'leader';
    puesto: string;
    img: string;
    salario: number;
}

export type AuthState = {
    user: Employee | null
    loading: boolean
    error: string | null
    validateSession: () => Promise<void>
    login: (id: string, password: string) => Promise<void>
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

