import { create } from 'zustand'

interface PayrollState {
  isLoading: boolean
  error: string | null
  generatePayroll: (employeeId: number) => Promise<void>
  downloadPayroll: (employeeId: number) => Promise<{ file: string; filename: string }>
}

export const usePayrollStore = create<PayrollState>((set) => ({
  isLoading: false,
  error: null,

  generatePayroll: async (employeeId: number) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`http://localhost:8000/payroll/generate/${employeeId}`)
      if (!response.ok) {
        throw new Error('Error al generar la nómina')
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error desconocido' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  downloadPayroll: async (employeeId: number) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`http://localhost:8000/payroll/download/${employeeId}`)
      if (!response.ok) {
        throw new Error('Error al descargar la nómina')
      }
      const data = await response.json()
      return data
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error desconocido' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  }
}))
