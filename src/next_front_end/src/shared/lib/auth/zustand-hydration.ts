import { useEffect } from "react"
import {  StoreApi } from "zustand"

export function useHydrate<T extends object>(
    store: StoreApi<T>,
    values: Partial<T>
){
    useEffect(() => store.setState(values) ,[])
}