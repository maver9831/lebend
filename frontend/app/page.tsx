"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  Brain,
  Calendar,
  Heart,
  Home,
  Pill,
  TestTube,
  Utensils,
  Weight,
  TrendingUp,
  Moon,
  Zap,
  Target,
  Droplets,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

// Importa tutti i componenti delle pagine
import { CalendarPage } from "../components/calendar-page"
import { WorkoutsPage } from "../components/workouts-page"
import { SupplementsPage } from "../components/supplements-page"
import { NutritionPage } from "../components/nutrition-page"
import { BloodworkPage } from "../components/bloodwork-page"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/components/auth/auth-provider"

// Dati di esempio per le metriche di salute
const healthMetrics = {
  age: 32,
  biologicalAge: 28,
  vo2Max: 45,
  caloriesBurned: 2340,
  sleepScore: 85,
  readiness: 78,
  stressLevel: 32,
  weight: 75.2,
}

// Dati di esempio per il monitoraggio degli organi
const organHealth = [
  { name: "Cuore", rating: 92, status: "Eccellente", color: "bg-green-500" },
  { name: "Fegato", rating: 78, status: "Buono", color: "bg-yellow-500" },
  { name: "Reni", rating: 85, status: "Molto Buono", color: "bg-green-400" },
  { name: "Polmoni", rating: 88, status: "Molto Buono", color: "bg-green-400" },
  { name: "Cervello", rating: 82, status: "Buono", color: "bg-green-300" },
  { name: "Pancreas", rating: 75, status: "Buono", color: "bg-yellow-400" },
]

// Menu items per la sidebar
const menuItems = [
  { title: "Dashboard", icon: Home, id: "dashboard" },
  { title: "Calendario", icon: Calendar, id: "calendar" },
  { title: "Allenamenti", icon: Activity, id: "workouts" },
  { title: "Farmaci e Supplementi", icon: Pill, id: "supplements" },
  { title: "Alimentazione", icon: Utensils, id: "nutrition" },
  { title: "Analisi Sangue", icon: TestTube, id: "bloodwork" },
]

function AppSidebar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string
  setActiveSection: (section: string) => void
}) {
  const { user } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Heart className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Health Dashboard</span>
            <span className="truncate text-xs text-muted-foreground">
              {user ? `Ciao, ${user.name.split(" ")[0]}` : "Il tuo benessere"}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigazione</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => setActiveSection(item.id)} isActive={activeSection === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default function HealthDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Solo reindirizza se non stiamo caricando e non c'è un utente
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  // Mostra un loader mentre verifichiamo l'autenticazione
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    )
  }

  // Se non c'è un utente, non renderizzare nulla (il redirect è in corso)
  if (!user) {
    return null
  }

  // Aggiungi la logica per renderizzare le diverse pagine
  const renderPage = () => {
    switch (activeSection) {
      case "calendar":
        return <CalendarPage />
      case "workouts":
        return <WorkoutsPage />
      case "supplements":
        return <SupplementsPage />
      case "nutrition":
        return <NutritionPage />
      case "bloodwork":
        return <BloodworkPage />
      default:
        return (
          // Il contenuto della dashboard esistente rimane qui
          <div className="space-y-6">
            {/* Metriche principali */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Età Biologica</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.biologicalAge} anni</div>
                  <p className="text-xs text-muted-foreground">
                    {healthMetrics.age - healthMetrics.biologicalAge} anni più giovane
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">VO2 Max</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.vo2Max}</div>
                  <p className="text-xs text-muted-foreground">ml/kg/min</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Punteggio Sonno</CardTitle>
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.sleepScore}%</div>
                  <Progress value={healthMetrics.sleepScore} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Prontezza</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.readiness}%</div>
                  <Progress value={healthMetrics.readiness} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Metriche secondarie */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Calorie Bruciate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.caloriesBurned.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">kcal oggi</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Livello Stress</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.stressLevel}%</div>
                  <Progress value={healthMetrics.stressLevel} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Basso</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Peso</CardTitle>
                  <Weight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.weight} kg</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    -0.5 kg questa settimana
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Monitoraggio Organi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Monitoraggio Organi
                </CardTitle>
                <CardDescription>Stato di salute dei tuoi organi basato sulle analisi del sangue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {organHealth.map((organ) => (
                    <div key={organ.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{organ.name}</span>
                        <Badge variant="secondary">{organ.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={organ.rating} className="flex-1" />
                        <span className="text-sm font-bold">{organ.rating}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Calendario Impegni */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Impegni di Oggi
                </CardTitle>
                <CardDescription>Allenamenti, supplementi e farmaci programmati</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">Allenamento HIIT</p>
                      <p className="text-sm text-muted-foreground">09:00 - 10:00</p>
                    </div>
                    <Badge variant="outline">Allenamento</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <Pill className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">Vitamina D3 + K2</p>
                      <p className="text-sm text-muted-foreground">Dopo colazione</p>
                    </div>
                    <Badge variant="outline">Supplemento</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <Droplets className="h-5 w-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium">Omega-3</p>
                      <p className="text-sm text-muted-foreground">Dopo cena</p>
                    </div>
                    <Badge variant="outline">Supplemento</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Azioni rapide */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col gap-2" variant="outline">
                <TestTube className="h-6 w-6" />
                <span>Carica Analisi</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Activity className="h-6 w-6" />
                <span>Nuovo Allenamento</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Pill className="h-6 w-6" />
                <span>Aggiungi Supplemento</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Utensils className="h-6 w-6" />
                <span>Log Pasto</span>
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-lg font-semibold">Dashboard Salute</h1>
          </div>
          <UserNav />
        </header>

        <main className="flex-1 space-y-6 p-6">{renderPage()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
