export interface AttendanceRecord {
    id_asistencia: number
    fk_empleado: number
    fecha: string
    hora_entrada: string
    hora_salida: string | null
    horas_trabajadas: string | null
    horas_extra: string | null
}

export interface Employee {
    id_empleado: number
    nombre: string
    rol: string
    fk_equipo: number | null
    email: string
    telefono: string
    puesto: string
    salario: number
    fecha_contratacion: string
    fecha_salida?: string
    fecha_recontratacion?: string
    img?: string
    expediente: string
} 