import { ClientToCreate } from "../types/client"

export function isClientComplete(c: Partial<ClientToCreate>): c is ClientToCreate {
    return !!c.nombre && !!c.direccion && !!c.telefono && !!c.email;
}