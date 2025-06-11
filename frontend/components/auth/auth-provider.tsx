"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  image?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Assicurati che siamo sul client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Simula il controllo dell'autenticazione all'avvio
  useEffect(() => {
    if (!isClient) return

    // Controlla se c'è un utente nel localStorage (simulazione)
    try {
      const storedUser = localStorage.getItem("health-dashboard-user")

      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Errore nel recupero dell'utente:", error)
    }

    setIsLoading(false)

    // Reindirizza alla pagina di login se non autenticato e non già sulla pagina di login
    const storedUser = localStorage.getItem("health-dashboard-user")
    if (!storedUser && !pathname?.startsWith("/auth")) {
      router.push("/auth/login")
    }
  }, [pathname, router, isClient])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simuliamo un login
    const mockUser = {
      id: "user-123",
      name: "Utente Demo",
      email: email,
    }

    // Salva l'utente nel localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("health-dashboard-user", JSON.stringify(mockUser))
    }
    setUser(mockUser)
    setIsLoading(false)
    router.push("/")
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)

    // Simuliamo un login con Google
    const mockUser = {
      id: "google-user-123",
      name: "Utente Google",
      email: "utente@gmail.com",
      image: "https://lh3.googleusercontent.com/a/default-user",
    }

    // Salva l'utente nel localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("health-dashboard-user", JSON.stringify(mockUser))
    }
    setUser(mockUser)
    setIsLoading(false)
    router.push("/")
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("health-dashboard-user")
    }
    setUser(null)
    router.push("/auth/login")
  }

  // Non renderizzare nulla finché non siamo sul client
  if (!isClient) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
