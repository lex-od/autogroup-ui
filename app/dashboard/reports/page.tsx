'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  Phone,
  BarChart3,
  TrendingUp,
  Filter,
  Search,
  Plus,
  Settings
} from 'lucide-react';

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last-month');
  
  const reportTemplates = [
    {
      id: 'call-summary',
      name: 'Сводка по звонкам',
      description: 'Общая статистика звонков за выбранный период',
      icon: Phone,
      lastGenerated: 'Вчера',
      size: '2.3 MB',
      format: 'PDF',
    },
    {
      id: 'manager-performance',
      name: 'Производительность менеджеров',
      description: 'Детальный анализ работы каждого менеджера',
      icon: Users,
      lastGenerated: '2 дня назад',
      size: '1.8 MB',
      format: 'Excel',
    },
    {
      id: 'sentiment-analysis',
      name: 'Анализ тональности',
      description: 'Распределение эмоциональной окраски разговоров',
      icon: TrendingUp,
      lastGenerated: '3 дня назад',
      size: '945 KB',
      format: 'PDF',
    },
    {
      id: 'monthly-trends',
      name: 'Месячные тренды',
      description: 'Сравнение показателей по месяцам',
      icon: BarChart3,
      lastGenerated: 'Неделю назад',
      size: '3.1 MB',
      format: 'Excel',
    },
  ];

  const recentReports = [
    {
      name: 'Отчет по звонкам - Январь 2025',
      generated: 'Сегодня, 10:30',
      size: '2.1 MB',
      format: 'PDF',
      status: 'completed',
    },
    {
      name: 'Производительность менеджеров - Неделя 3',
      generated: 'Вчера, 15:45',
      size: '1.5 MB',
      format: 'Excel',
      status: 'completed',
    },
    {
      name: 'Анализ тональности - Последние 30 дней',
      generated: '2 дня назад, 09:15',
      size: '876 KB',
      format: 'PDF',
      status: 'processing',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">✅ Готов</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">🔄 Обработка</Badge>;
      case 'failed':
        return <Badge variant="destructive">❌ Ошибка</Badge>;
      default:
        return <Badge variant="outline">❓ Неизвестно</Badge>;
    }
  };

  const getFormatBadge = (format: string) => {
    const colors = {
      PDF: 'bg-red-100 text-red-800',
      Excel: 'bg-green-100 text-green-800',
      CSV: 'bg-blue-100 text-blue-800',
    };
    return <Badge className={colors[format as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{format}</Badge>;
  };

  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
        {/* Заголовок */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Отчеты</h1>
          <p className="text-muted-foreground">
            Генерация и управление отчетами по звонкам и аналитике
          </p>
        </div>

        {/* Фильтры и настройки */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Настройки отчетов
            </CardTitle>
            <CardDescription>
              Выберите период и параметры для генерации отчетов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="period">Период</Label>
                <select 
                  id="period"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="last-week">Последняя неделя</option>
                  <option value="last-month">Последний месяц</option>
                  <option value="last-quarter">Последний квартал</option>
                  <option value="custom">Выбрать даты</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Отдел</Label>
                <select 
                  id="department"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="all">Все отделы</option>
                  <option value="sales">Продажи</option>
                  <option value="service">Сервис</option>
                  <option value="parts">Запчасти</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">Формат</Label>
                <select 
                  id="format"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Отправить на email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="admin@autogroup.ru"
                  className="text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Шаблоны отчетов */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Шаблоны отчетов</h2>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Создать шаблон
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Последний: {template.lastGenerated}</span>
                            <span>•</span>
                            <span>{template.size}</span>
                            <span>•</span>
                            {getFormatBadge(template.format)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Сгенерировать
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Настроить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Последние отчеты */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Последние отчеты</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Поиск
              </Button>
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Фильтр по дате
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{report.generated}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                          <span>•</span>
                          {getFormatBadge(report.format)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(report.status)}
                      {report.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Отчетов создано</p>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-xs text-muted-foreground">В этом месяце</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Общий размер</p>
                  <p className="text-2xl font-bold">156 MB</p>
                  <p className="text-xs text-muted-foreground">Все отчеты</p>
                </div>
                <Download className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Автоматических</p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">По расписанию</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 