export type ContactMessage = {
    id: string
    created_at: string
    name: string
    email: string
    phone: string
    message: string
    status: 'nuevo' | 'prospecto' | 'eliminado'
    read: boolean
}

export type Database = {
    // ... existing code ...
    contact_messages: ContactMessage[]
} 