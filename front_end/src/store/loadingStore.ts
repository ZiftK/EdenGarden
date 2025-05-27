import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LoadingState {
  isLoading: boolean
  loadingMessage: string | null
  setLoading: (loading: boolean, message?: string) => void
  resetLoading: () => void
}

export const useLoadingStore = create<LoadingState>()(
  persist(
    (set) => ({
      isLoading: false,
      loadingMessage: null,
      setLoading: (loading: boolean, message?: string) => {
        set({ isLoading: loading, loadingMessage: message || null })
      },
      resetLoading: () => {
        set({ isLoading: false, loadingMessage: null })
      },
    }),
    {
      name: 'loading-storage',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name)
          return value ? Promise.resolve(JSON.parse(value)) : null
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
          return Promise.resolve()
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
          return Promise.resolve()
        },
      },
    }
  )
) 