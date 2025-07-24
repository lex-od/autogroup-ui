'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Phone, 
  Clock,
  Target,
  Star,
  ThumbsUp,
  AlertTriangle
} from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
        {/* Заголовок */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Аналитика</h1>
          <p className="text-muted-foreground">
            Детальная аналитика звонков, трендов и KPI метрик
          </p>
        </div>

        {/* KPI Метрики */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Конверсия звонков</p>
                  <p className="text-2xl font-bold">68.5%</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2.1%</span> от прошлого месяца
                  </p>
                </div>
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Средняя оценка</p>
                  <p className="text-2xl font-bold">4.2</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+0.3</span> от прошлого месяца
                  </p>
                </div>
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Время ответа</p>
                  <p className="text-2xl font-bold">45с</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">+5с</span> от прошлого месяца
                  </p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Удовлетворенность</p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+1.5%</span> от прошлого месяца
                  </p>
                </div>
                <ThumbsUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Графики и отчеты */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Динамика звонков</CardTitle>
              <CardDescription>
                Количество звонков по дням за последний месяц
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    График будет отображаться здесь<br/>
                    (Интеграция с ECharts)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Распределение по настроению</CardTitle>
              <CardDescription>
                Анализ тональности разговоров
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Позитивные</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">156</span>
                    <Badge className="bg-green-100 text-green-800">62%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Нейтральные</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">67</span>
                    <Badge variant="outline">27%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Негативные</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">27</span>
                    <Badge variant="destructive">11%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Топ менеджеры</CardTitle>
              <CardDescription>
                Рейтинг по качеству обслуживания
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Анна Петрова", calls: 45, rating: 4.8, trend: "+0.2" },
                  { name: "Михаил Иванов", calls: 38, rating: 4.6, trend: "+0.1" },
                  { name: "Елена Сидорова", calls: 42, rating: 4.5, trend: "-0.1" },
                  { name: "Дмитрий Козлов", calls: 35, rating: 4.3, trend: "+0.3" },
                ].map((manager, index) => (
                  <div key={manager.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{manager.name}</p>
                        <p className="text-xs text-muted-foreground">{manager.calls} звонков</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{manager.rating}</span>
                      <Badge variant={manager.trend.startsWith('+') ? 'default' : 'destructive'}>
                        {manager.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Проблемные области</CardTitle>
              <CardDescription>
                Области требующие внимания
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Длительность ожидания</p>
                    <p className="text-xs text-red-600">
                      Среднее время ожидания увеличилось на 15% за последнюю неделю
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Обработка возражений</p>
                    <p className="text-xs text-yellow-600">
                      Снижение эффективности работы с возражениями клиентов
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Рекомендация</p>
                    <p className="text-xs text-blue-600">
                      Провести дополнительное обучение менеджеров техникам продаж
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Действия */}
        <div className="flex gap-4">
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Экспорт отчета
          </Button>
          <Button variant="outline">
            Настроить уведомления
          </Button>
          <Button variant="outline">
            Создать дашборд
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 