export type Employee = {
    id: string;
    name: string;
    address: string;
    phone_number: string;
    email: string;
    hire_date: string; //fecha de reintegracion
    salary: number;
    in_time: string;
    out_time: string;
    password: string;
    role: 'user' | 'admin' | 'leader';
    position: string;
    img?: string
    status?: 'active' | 'inactive' | 'pending';
    teams?: string;
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
    id: string;
    name: string;
    leader: Pick<Employee, 'email' | 'id' | 'name' | 'phone_number' | 'role' | 'position' | 'salary' | 'teams' | 'img' | 'status'>
    members: Pick<Employee, 'email' | 'id' | 'name' | 'phone_number' | 'role' | 'position' | 'salary' | 'teams' | 'img' | 'status'>[];
}

