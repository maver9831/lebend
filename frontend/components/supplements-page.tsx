"use client"

import { useState } from "react"
import { Pill, Clock, Calendar, AlertTriangle, CheckCircle, Plus, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const supplements = [
  {
    id: 1,
    name: "Vitamina D3 + K2",
    dosage: "4000 IU + 100 mcg",
    frequency: "1 volta al giorno",
    timeOfDay: "Mattina",
    taken: true,
    category: "Vitamine",
    stock: 28,
    nextDose: "Domani 08:00",
  },
  {
    id: 2,
    name: "Omega-3",
    dosage: "1000 mg",
    frequency: "2 volte al giorno",
    timeOfDay: "Pranzo e Cena",
    taken: false,
    category: "Acidi Grassi",
    stock: 45,
    nextDose: "Oggi 20:00",
  },
  {
    id: 3,
    name: "Magnesio",
    dosage: "400 mg",
    frequency: "1 volta al giorno",
    timeOfDay: "Sera",
    taken: false,
    category: "Minerali",
    stock: 12,
    nextDose: "Oggi 21:00",
  },
]

const medications = [
  {
    id: 1,
    name: "Metformina",
    dosage: "500 mg",
    frequency: "2 volte al giorno",
    timeOfDay: "Pranzo e Cena",
    taken: true,
    category: "Diabete",
    stock: 20,
    nextDose: "Oggi 20:00",
    prescribedBy: "Dr. Rossi",
  },
]

const adherenceStats = {
  today: 75,
  thisWeek: 85,
  thisMonth: 82,
}

export function SupplementsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Farmaci e Supplementi</h1>
          <p className="text-muted-foreground">Gestisci la tua routine di supplementazione</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Aggiungi Nuovo
        </Button>
      </div>

      {/* Statistiche Aderenza */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aderenza Oggi</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adherenceStats.today}%</div>
            <Progress value={adherenceStats.today} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">3 di 4 assunzioni</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aderenza Settimana</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adherenceStats.thisWeek}%</div>
            <Progress value={adherenceStats.thisWeek} className="mt-2" />
            <p className="text-xs text-green-600">+5% vs settimana scorsa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scorte in Esaurimento</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-orange-600">Riordina entro 7 giorni</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="supplements">Supplementi</TabsTrigger>
          <TabsTrigger value="medications">Farmaci</TabsTrigger>
          <TabsTrigger value="schedule">Programma</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Prossime Assunzioni */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Prossime Assunzioni
              </CardTitle>
              <CardDescription>I tuoi prossimi farmaci e supplementi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...supplements, ...medications]
                  .filter((item) => !item.taken)
                  .map((item) => (
                    <div key={`${item.category}-${item.id}`} className="flex items-center gap-4 p-4 rounded-lg border">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.category === "Diabete" ? "bg-red-100" : "bg-blue-100"
                        }`}
                      >
                        <Pill className={`h-6 w-6 ${item.category === "Diabete" ? "text-red-600" : "text-blue-600"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{item.dosage}</span>
                          <span>{item.nextDose}</span>
                        </div>
                      </div>
                      <Badge variant={item.stock < 15 ? "destructive" : "secondary"}>{item.stock} rimasti</Badge>
                      <Button size="sm">Assunto</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplements" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca supplementi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {supplements.map((supplement) => (
              <Card key={supplement.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{supplement.name}</CardTitle>
                    <Badge variant="outline">{supplement.category}</Badge>
                  </div>
                  <CardDescription>
                    {supplement.dosage} • {supplement.frequency}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Orario</p>
                        <p className="font-medium">{supplement.timeOfDay}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Scorte</p>
                        <p className={`font-medium ${supplement.stock < 15 ? "text-red-600" : ""}`}>
                          {supplement.stock} giorni
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Modifica
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Riordina
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <div className="grid gap-4">
            {medications.map((medication) => (
              <Card key={medication.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{medication.name}</CardTitle>
                    <Badge variant="destructive">{medication.category}</Badge>
                  </div>
                  <CardDescription>
                    {medication.dosage} • {medication.frequency} • Prescritto da {medication.prescribedBy}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Orario</p>
                        <p className="font-medium">{medication.timeOfDay}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Scorte</p>
                        <p className="font-medium">{medication.stock} giorni</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Prossima Dose</p>
                        <p className="font-medium">{medication.nextDose}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Dettagli
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Rinnova Ricetta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Programma Giornaliero</CardTitle>
              <CardDescription>La tua routine quotidiana di assunzione</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Mattina (08:00)", "Pranzo (13:00)", "Sera (20:00)", "Prima di dormire (22:00)"].map((timeSlot) => (
                  <div key={timeSlot}>
                    <h3 className="font-medium mb-3">{timeSlot}</h3>
                    <div className="space-y-2 ml-4">
                      {timeSlot.includes("Mattina") && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>Vitamina D3 + K2 (4000 IU + 100 mcg)</span>
                        </div>
                      )}
                      {timeSlot.includes("Pranzo") && (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Omega-3 (1000 mg)</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span>Metformina (500 mg)</span>
                          </div>
                        </>
                      )}
                      {timeSlot.includes("Sera") && (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Omega-3 (1000 mg)</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span>Metformina (500 mg)</span>
                          </div>
                        </>
                      )}
                      {timeSlot.includes("dormire") && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <span>Magnesio (400 mg)</span>
                        </div>
                      )}
                    </div>
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
