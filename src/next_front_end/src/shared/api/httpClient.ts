const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function httpFunction<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T>{
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        credentials: 'include'
    })

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message || 'Error desconocido')
    }

    return response.json()
}