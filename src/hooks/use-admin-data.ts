"use client"

import { useState, useEffect, useCallback } from "react"

interface UseAdminDataOptions<T> {
  url: string
  initialData?: T
  enabled?: boolean
}

interface UseAdminDataReturn<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  mutate: (newData: T) => void
}

export function useAdminData<T>({
  url,
  initialData,
  enabled = true,
}: UseAdminDataOptions<T>): UseAdminDataReturn<T> {
  const [data, setData] = useState<T | null>(initialData ?? null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!enabled) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Erreur ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setIsLoading(false)
    }
  }, [url, enabled])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const mutate = useCallback((newData: T) => {
    setData(newData)
  }, [])

  return { data, isLoading, error, refetch: fetchData, mutate }
}

interface UseAdminMutationOptions {
  url: string
  method?: "POST" | "PUT" | "PATCH" | "DELETE"
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface UseAdminMutationReturn<TBody> {
  execute: (body?: TBody) => Promise<boolean>
  isLoading: boolean
  error: string | null
}

export function useAdminMutation<TBody = unknown>({
  url,
  method = "POST",
  onSuccess,
  onError,
}: UseAdminMutationOptions): UseAdminMutationReturn<TBody> {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (body?: TBody): Promise<boolean> => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: body ? JSON.stringify(body) : undefined,
        })
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.message || `Erreur ${res.status}`)
        }
        onSuccess?.()
        return true
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur inconnue"
        setError(message)
        onError?.(message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [url, method, onSuccess, onError]
  )

  return { execute, isLoading, error }
}
