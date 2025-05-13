const API_URL =  'http://127.0.0.1:8000';

export async function httpFunction<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T>{
    console.log('URL:', `${API_URL}${endpoint}`)
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        credentials: 'include'
    })

    if(!response.ok){
        throw new Error('Error desconocido')
    }

    return response.json()
}

export const fetcher = {
    get: <T>(endpoint: string,body?: unknown ) => httpFunction<T>(endpoint, { method: 'GET', body: JSON.stringify(body)}),
    post: <T>(endpoint:string, body?: unknown) => httpFunction<T>(endpoint,{method: 'POST', body: JSON.stringify(body)}),
    put:<T>(endpoint: string, body: unknown) => httpFunction<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string) => httpFunction<T>(endpoint, { method: 'DELETE' }),
    patch: <T>(endpoint: string, body: unknown) => httpFunction<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
}