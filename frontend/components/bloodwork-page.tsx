"use client"

import { useState } from "react"
import { TestTube, Upload, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const bloodworkData = [
  {
    id: 1,
    name: "Colesterolo Totale",
    value: 185,
    unit: "mg/dL",
    range: "< 200",
    status: "normal",
    trend: "down",
    lastValue: 195,
    date: "2024-11-15",
    description:
      "Il colesterolo totale è la somma di HDL, LDL e VLDL. Valori elevati aumentano il rischio cardiovascolare.",
  },
  {
    id: 2,
    name: "HDL (Colesterolo Buono)",
    value: 58,
    unit: "mg/dL",
    range: "> 40 (M), > 50 (F)",
    status: "normal",
    trend: "up",
    lastValue: 52,
    date: "2024-11-15",
    description: "HDL rimuove il colesterolo dalle arterie. Valori più alti sono protettivi per il cuore.",
  },
  {
    id: 3,
    name: "LDL (Colesterolo Cattivo)",
    value: 115,
    unit: "mg/dL",
    range: "< 100",
    status: "warning",
    trend: "down",
    lastValue: 125,
    date: "2024-11-15",
    description: "LDL può accumularsi nelle arterie. Valori elevati aumentano il rischio di malattie cardiache.",
  },
  {
    id: 4,
    name: "Trigliceridi",
    value: 95,
    unit: "mg/dL",
    range: "< 150",
    status: "normal",
    trend: "stable",
    lastValue: 98,
    date: "2024-11-15",
    description: "I trigliceridi sono grassi nel sangue. Livelli elevati possono indicare rischio metabolico.",
  },
  {
    id: 5,
    name: "Glicemia",
    value: 92,
    unit: "mg/dL",
    range: "70-100",
    status: "normal",
    trend: "stable",
    lastValue: 89,
    date: "2024-11-15",
    description: "La glicemia misura lo zucchero nel sangue. Valori elevati possono indicare diabete.",
  },
  {
    id: 6,
    name: "HbA1c",
    value: 5.2,
    unit: "%",
    range: "< 5.7",
    status: "normal",
    trend: "down",
    lastValue: 5.4,
    date: "2024-11-15",
    description: "HbA1c riflette la glicemia media degli ultimi 2-3 mesi. Importante per il controllo diabetico.",
  },
]

const organScores = {
  heart: { score: 92, status: "excellent", factors: ["HDL alto", "Trigliceridi normali"] },
  liver: { score: 78, status: "good", factors: ["ALT normale", "Bilirubina ok"] },
  kidneys: { score: 85, status: "very-good", factors: ["Creatinina normale", "eGFR buono"] },
  pancreas: { score: 88, status: "very-good", factors: ["Glicemia normale", "HbA1c ottima"] },
}

export function BloodworkPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analisi del Sangue</h1>
            <p className="text-muted-foreground">Monitora i tuoi biomarkers e la salute degli organi</p>
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Carica Nuove Analisi
          </Button>
        </div>

        {/* Riepilogo Salute Organi */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(organScores).map(([organ, data]) => (
            <Card key={organ}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {organ === "heart"
                    ? "Cuore"
                    : organ === "liver"
                      ? "Fegato"
                      : organ === "kidneys"
                        ? "Reni"
                        : "Pancreas"}
                </CardTitle>
                <TestTube className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.score}%</div>
                <Progress value={data.score} className="mt-2" />
                <Badge
                  className={`mt-2 ${
                    data.status === "excellent"
                      ? "bg-green-100 text-green-800"
                      : data.status === "very-good"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {data.status === "excellent" ? "Eccellente" : data.status === "very-good" ? "Molto Buono" : "Buono"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Panoramica</TabsTrigger>
            <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
            <TabsTrigger value="trends">Andamenti</TabsTrigger>
            <TabsTrigger value="history">Storico</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Valori Critici */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Valori da Monitorare
                </CardTitle>
                <CardDescription>Biomarkers che richiedono attenzione</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bloodworkData
                    .filter((item) => item.status === "warning")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50"
                      >
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.value} {item.unit} (Range: {item.range})
                          </p>
                        </div>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          Attenzione
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Valori Normali */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Valori nella Norma
                </CardTitle>
                <CardDescription>Biomarkers con valori ottimali</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {bloodworkData
                    .filter((item) => item.status === "normal")
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Range: {item.range}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {item.value} {item.unit}
                          </p>
                          {getTrendIcon(item.trend)}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biomarkers" className="space-y-4">
            <div className="grid gap-4">
              {bloodworkData.map((biomarker) => (
                <Card key={biomarker.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {biomarker.name}
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{biomarker.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                      <Badge className={getStatusColor(biomarker.status)}>
                        {biomarker.status === "normal"
                          ? "Normale"
                          : biomarker.status === "warning"
                            ? "Attenzione"
                            : "Critico"}
                      </Badge>
                    </div>
                    <CardDescription>
                      Ultimo aggiornamento: {new Date(biomarker.date).toLocaleDateString("it-IT")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Valore Attuale</p>
                        <p className="text-2xl font-bold">
                          {biomarker.value} {biomarker.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Range Normale</p>
                        <p className="text-lg font-medium">{biomarker.range}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tendenza</p>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(biomarker.trend)}
                          <span className="text-lg font-medium">
                            {biomarker.trend === "up"
                              ? "In aumento"
                              : biomarker.trend === "down"
                                ? "In diminuzione"
                                : "Stabile"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Andamenti Ultimi 6 Mesi</CardTitle>
                <CardDescription>Visualizza l'evoluzione dei tuoi biomarkers nel tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bloodworkData.slice(0, 3).map((biomarker) => (
                    <div key={biomarker.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{biomarker.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {biomarker.lastValue} → {biomarker.value} {biomarker.unit}
                          </span>
                          {getTrendIcon(biomarker.trend)}
                        </div>
                      </div>
                      <div className="h-20 bg-gray-50 rounded-lg flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Grafico andamento temporale</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Storico Analisi</CardTitle>
                <CardDescription>Tutte le tue analisi del sangue caricate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "2024-11-15", type: "Controllo Completo", values: 12, status: "completed" },
                    { date: "2024-08-20", type: "Controllo Lipidico", values: 6, status: "completed" },
                    { date: "2024-05-15", type: "Controllo Diabete", values: 4, status: "completed" },
                    { date: "2024-02-10", type: "Controllo Completo", values: 15, status: "completed" },
                  ].map((analysis, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <TestTube className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{analysis.type}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{new Date(analysis.date).toLocaleDateString("it-IT")}</span>
                          <span>{analysis.values} valori</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Visualizza
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
