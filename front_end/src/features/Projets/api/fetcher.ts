import { httpFunction } from '@/src/shared/api/httpClient';

export const fetcher = {
    get: <T>(url: string) => httpFunction<T>(url, { method: 'GET' }),
    post: <T>(url: string, data?: unknown) => httpFunction<T>(url, { method: 'POST', body: JSON.stringify(data) }),
    put: <T>(url: string, data?: unknown) => httpFunction<T>(url, { method: 'PUT', body: JSON.stringify(data) }),
    patch: <T>(url: string, data?: unknown) => httpFunction<T>(url, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: <T>(url: string) => httpFunction<T>(url, { method: 'DELETE' })
}; 