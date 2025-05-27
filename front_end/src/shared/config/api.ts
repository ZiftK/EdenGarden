const API_BASE_URL = 'http://localhost:8000'

export const API_ENDPOINTS = {
    // Attendance endpoints
    attendance: {
        create: `${API_BASE_URL}/attendance`,
        markExit: (id: number) => `${API_BASE_URL}/attendance/${id}/exit`,
        getEmployeeAttendance: (id: number) => `${API_BASE_URL}/employees/${id}/attendance`,
        getTeamAttendance: (id: number) => `${API_BASE_URL}/teams/${id}/attendance`,
    },
    // Team endpoints
    teams: {
        getMembers: (id: number) => `${API_BASE_URL}/teams/${id}/members`,
        getAll: `${API_BASE_URL}/teams`,
        getById: (id: number) => `${API_BASE_URL}/teams/${id}`,
        create: `${API_BASE_URL}/teams`,
        update: (id: number) => `${API_BASE_URL}/teams/${id}`,
        delete: (id: number) => `${API_BASE_URL}/teams/${id}`,
    },
    // Employee endpoints
    employees: {
        getAll: `${API_BASE_URL}/employees`,
        getById: (id: number) => `${API_BASE_URL}/employees/${id}`,
        create: `${API_BASE_URL}/employees`,
        update: (id: number) => `${API_BASE_URL}/employees/${id}`,
        delete: (id: number) => `${API_BASE_URL}/employees/${id}`,
    },
    // Auth endpoints
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        logout: `${API_BASE_URL}/auth/logout`,
        validate: `${API_BASE_URL}/auth/validate`,
    },
} 