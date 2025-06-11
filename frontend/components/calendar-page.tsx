"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const calendarEvents = [
  {
    id: 1,
    title: "Allenamento HIIT",
    time: "09:00",
    duration: "60 min",
    type: "workout",
    color: "bg-blue-500",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Vitamina D3 + K2",
    time: "08:30",
    type: "supplement",
    color: "bg-green-500",
    status: "completed",
  },
  {
    id: 3,
    title: "Controllo Pressione",
    time: "18:00",
    type: "health",
    color: "bg-red-500",
    status: "scheduled",
  },
  {
    id: 4,
    title: "Omega-3",
    time: "20:00",
    type: "supplement",
    color: "bg-purple-500",
    status: "pending",
  },
]

const weekDays = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
const currentWeek = [18, 19, 20, 21, 22, 23, 24]

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(20)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendario</h1>
          <p className="text-muted-foreground">Gestisci i tuoi impegni di salute</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuovo Evento
        </Button>
      </div>

      {/* Vista Settimanale */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Novembre 2024
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4 mb-6">
            {weekDays.map((day, index) => (
              <div key={day} className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">{day}</p>
                <Button
                  variant={selectedDate === currentWeek[index] ? "default" : "ghost"}
                  className="w-full h-12"
                  onClick={() => setSelectedDate(currentWeek[index])}
                >
                  {currentWeek[index]}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Eventi del Giorno */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Eventi di Oggi - {selectedDate} Novembre</CardTitle>
              <CardDescription>I tuoi impegni programmati</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {calendarEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className={`w-4 h-4 rounded-full ${event.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant={event.status === "completed" ? "default" : "secondary"}>
                        {event.status === "completed"
                          ? "Completato"
                          : event.status === "pending"
                            ? "In Attesa"
                            : "Programmato"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                      {event.duration && <span>{event.duration}</span>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Modifica
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Statistiche Laterali */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiche Settimana</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Allenamenti</span>
                <Badge variant="outline">4/5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Supplementi</span>
                <Badge variant="outline">12/14</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Controlli</span>
                <Badge variant="outline">2/3</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Promemoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Analisi del sangue</p>
                  <p className="text-muted-foreground">Scadenza: 25 Nov</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Visita cardiologica</p>
                  <p className="text-muted-foreground">Scadenza: 30 Nov</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
