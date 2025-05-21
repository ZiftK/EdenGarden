export type Client = {
    id_cliente: number;
}

export type ClientToCreate = {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
}

export type ClientFromAPI = ClientToCreate & Client;