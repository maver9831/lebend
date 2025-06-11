"use client"

import { useState } from "react"
import { Activity, Clock, Flame, Target, TrendingUp, Plus, Play, Pause } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const workoutHistory = [
  {
    id: 1,
    name: "HIIT Cardio",
    date: "Oggi",
    duration: "45 min",
    calories: 420,
    intensity: "Alta",
    status: "completed",
  },
  {
    id: 2,
    name: "Forza Upper Body",
    date: "Ieri",
    duration: "60 min",
    calories: 380,
    intensity: "Media",
    status: "completed",
  },
  {
    id: 3,
    name: "Yoga Flow",
    date: "2 giorni fa",
    duration: "30 min",
    calories: 150,
    intensity: "Bassa",
    status: "completed",
  },
]

const plannedWorkouts = [
  {
    id: 1,
    name: "Leg Day",
    scheduledTime: "Domani 09:00",
    duration: "75 min",
    type: "Forza",
    difficulty: "Alta",
  },
  {
    id: 2,
    name: "Cardio Recovery",
    scheduledTime: "Venerdì 18:00",
    duration: "30 min",
    type: "Cardio",
    difficulty: "Bassa",
  },
]

const weeklyStats = {
  workoutsCompleted: 4,
  totalMinutes: 285,
  caloriesBurned: 1250,
  weeklyGoal: 5,
}

export function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Allenamenti</h1>
          <p className="text-muted-foreground">Monitora i tuoi progressi fitness</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuovo Allenamento
        </Button>
      </div>

      {/* Statistiche Settimanali */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Allenamenti</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weeklyStats.workoutsCompleted}/{weeklyStats.weeklyGoal}
            </div>
            <Progress value={(weeklyStats.workoutsCompleted / weeklyStats.weeklyGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Obiettivo settimanale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Totale</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.totalMinutes} min</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% vs settimana scorsa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calorie Bruciate</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.caloriesBurned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">kcal questa settimana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intensità Media</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8/10</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs per diverse viste */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="history">Storico</TabsTrigger>
          <TabsTrigger value="planned">Programmati</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Allenamento Attivo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-green-500" />
                  Allenamento in Corso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">HIIT Cardio</h3>
                    <p className="text-muted-foreground">Circuito 2 di 4</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">15:32</div>
                    <p className="text-sm text-muted-foreground">Tempo rimanente</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Pause className="h-4 w-4 mr-2" />
                      Pausa
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Termina
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prossimo Allenamento */}
            <Card>
              <CardHeader>
                <CardTitle>Prossimo Allenamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Leg Day</h3>
                    <p className="text-muted-foreground">Domani alle 09:00</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Durata</p>
                      <p className="font-medium">75 minuti</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Intensità</p>
                      <Badge variant="destructive">Alta</Badge>
                    </div>
                  </div>
                  <Button className="w-full">Inizia Ora</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Storico Allenamenti</CardTitle>
              <CardDescription>I tuoi ultimi allenamenti completati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workoutHistory.map((workout) => (
                  <div key={workout.id} className="flex items-center gap-4 p-4 rounded-lg border">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{workout.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{workout.date}</span>
                        <span>{workout.duration}</span>
                        <span>{workout.calories} kcal</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        workout.intensity === "Alta"
                          ? "destructive"
                          : workout.intensity === "Media"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {workout.intensity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Allenamenti Programmati</CardTitle>
              <CardDescription>I tuoi prossimi allenamenti</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plannedWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center gap-4 p-4 rounded-lg border">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{workout.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{workout.scheduledTime}</span>
                        <span>{workout.duration}</span>
                        <Badge variant="outline">{workout.type}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifica
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
