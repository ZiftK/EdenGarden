const API_URL =  'http://127.0.0.1:8000';

export async function httpFunction<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T>{
    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    };
    
    if ((options.method === 'GET' || options.method === 'HEAD') && config.body) {
        delete config.body;
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if(!response.ok){
        const errorData = await response.json().catch(() => null);
        throw {
            status: response.status,
            statusText: response.statusText,
            data: errorData,
            response: response
        };
    }

    return response.json()
}

export const fetcher = {
    get: <T>(endpoint: string) => httpFunction<T>(endpoint, { method: 'GET' }),
    post: <T>(endpoint:string, body?: unknown) => httpFunction<T>(endpoint,{method: 'POST', body: JSON.stringify(body)}),
    put:<T>(endpoint: string, body: unknown) => httpFunction<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string) => httpFunction<T>(endpoint, { method: 'DELETE' }),
    patch: <T>(endpoint: string, body: unknown) => httpFunction<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
}