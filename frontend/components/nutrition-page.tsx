"use client"

import { useState } from "react"
import { Target, TrendingUp, Plus, Search, Camera } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const dailyNutrition = {
  calories: { consumed: 1850, target: 2200, remaining: 350 },
  protein: { consumed: 120, target: 150, remaining: 30 },
  carbs: { consumed: 180, target: 220, remaining: 40 },
  fats: { consumed: 65, target: 80, remaining: 15 },
  fiber: { consumed: 25, target: 35, remaining: 10 },
  water: { consumed: 2.1, target: 3.0, remaining: 0.9 },
}

const recentMeals = [
  {
    id: 1,
    name: "Colazione",
    time: "08:00",
    foods: ["Avena con frutti di bosco", "Yogurt greco", "Mandorle"],
    calories: 420,
    protein: 25,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Spuntino",
    time: "10:30",
    foods: ["Mela", "Burro di mandorle"],
    calories: 180,
    protein: 6,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Pranzo",
    time: "13:00",
    foods: ["Salmone grigliato", "Quinoa", "Verdure miste"],
    calories: 650,
    protein: 45,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const favoritesFoods = [
  { name: "Salmone", calories: 206, protein: 22, per: "100g" },
  { name: "Avocado", calories: 160, protein: 2, per: "100g" },
  { name: "Quinoa", calories: 120, protein: 4.4, per: "100g" },
  { name: "Spinaci", calories: 23, protein: 2.9, per: "100g" },
]

export function NutritionPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alimentazione</h1>
          <p className="text-muted-foreground">Monitora la tua nutrizione quotidiana</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Camera className="h-4 w-4" />
            Scansiona
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Aggiungi Pasto
          </Button>
        </div>
      </div>

      {/* Macronutrienti Giornalieri */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calorie</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyNutrition.calories.consumed}</div>
            <Progress
              value={(dailyNutrition.calories.consumed / dailyNutrition.calories.target) * 100}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {dailyNutrition.calories.remaining} rimanenti di {dailyNutrition.calories.target}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proteine</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyNutrition.protein.consumed}g</div>
            <Progress
              value={(dailyNutrition.protein.consumed / dailyNutrition.protein.target) * 100}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">{dailyNutrition.protein.remaining}g rimanenti</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idratazione</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyNutrition.water.consumed}L</div>
            <Progress value={(dailyNutrition.water.consumed / dailyNutrition.water.target) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{dailyNutrition.water.remaining}L rimanenti</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Oggi</TabsTrigger>
          <TabsTrigger value="meals">Pasti</TabsTrigger>
          <TabsTrigger value="foods">Alimenti</TabsTrigger>
          <TabsTrigger value="analysis">Analisi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Breakdown Macronutrienti */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuzione Macronutrienti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Carboidrati</span>
                    <span className="text-sm font-medium">{dailyNutrition.carbs.consumed}g</span>
                  </div>
                  <Progress value={(dailyNutrition.carbs.consumed / dailyNutrition.carbs.target) * 100} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Grassi</span>
                    <span className="text-sm font-medium">{dailyNutrition.fats.consumed}g</span>
                  </div>
                  <Progress value={(dailyNutrition.fats.consumed / dailyNutrition.fats.target) * 100} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fibre</span>
                    <span className="text-sm font-medium">{dailyNutrition.fiber.consumed}g</span>
                  </div>
                  <Progress value={(dailyNutrition.fiber.consumed / dailyNutrition.fiber.target) * 100} />
                </div>
              </CardContent>
            </Card>

            {/* Pasti Recenti */}
            <Card>
              <CardHeader>
                <CardTitle>Pasti di Oggi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMeals.map((meal) => (
                    <div key={meal.id} className="flex items-center gap-4 p-3 rounded-lg border">
                      <img
                        src={meal.image || "/placeholder.svg"}
                        alt={meal.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{meal.name}</h3>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                        <p className="text-xs text-muted-foreground">{meal.foods.join(", ")}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium">{meal.calories} kcal</p>
                        <p className="text-muted-foreground">{meal.protein}g proteine</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["Colazione", "Spuntino Mattina", "Pranzo", "Spuntino Pomeriggio", "Cena", "Spuntino Sera"].map(
              (mealType) => (
                <Card key={mealType} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{mealType}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Plus className="h-8 w-8 text-gray-400" />
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        Aggiungi Alimenti
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </TabsContent>

        <TabsContent value="foods" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cerca alimenti..." className="pl-10" />
            </div>
            <Button variant="outline">Filtri</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alimenti Preferiti</CardTitle>
              <CardDescription>I tuoi alimenti più utilizzati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {favoritesFoods.map((food) => (
                  <div key={food.name} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h3 className="font-medium">{food.name}</h3>
                      <p className="text-sm text-muted-foreground">Per {food.per}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">{food.calories} kcal</p>
                      <p className="text-muted-foreground">{food.protein}g proteine</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tendenze Settimanali</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Calorie Medie</span>
                    <span className="text-sm font-medium">2,150 kcal/giorno</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Proteine Medie</span>
                    <span className="text-sm font-medium">145g/giorno</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Idratazione Media</span>
                    <span className="text-sm font-medium">2.8L/giorno</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Obiettivi Raggiunti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Questa Settimana</span>
                    <Badge variant="default">6/7 giorni</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Questo Mese</span>
                    <Badge variant="secondary">24/30 giorni</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Streak Attuale</span>
                    <Badge variant="default">5 giorni</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
