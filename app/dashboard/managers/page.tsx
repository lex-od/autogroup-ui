'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Star, 
  Phone, 
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Filter,
  Plus,
  MoreHorizontal,
  Award,
  Calendar
} from 'lucide-react';

const ManagersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const managers = [
    {
      id: 1,
      name: 'Анна Петрова',
      email: 'anna.petrova@autogroup.ru',
      department: 'Продажи новых авто',
      avatar: 'А',
      stats: {
        totalCalls: 89,
        avgRating: 4.8,
        conversion: 72,
        avgCallTime: '8:30',
        satisfaction: 94,
      },
      trends: {
        calls: '+12%',
        rating: '+0.2',
        conversion: '+5%',
        satisfaction: '+2%',
      },
      status: 'online',
      lastActive: 'Сейчас',
    },
    {
      id: 2,
      name: 'Михаил Иванов',
      email: 'mikhail.ivanov@autogroup.ru',
      department: 'Сервис',
      avatar: 'М',
      stats: {
        totalCalls: 67,
        avgRating: 4.6,
        conversion: 68,
        avgCallTime: '12:15',
        satisfaction: 87,
      },
      trends: {
        calls: '+8%',
        rating: '+0.1',
        conversion: '-2%',
        satisfaction: '+1%',
      },
      status: 'away',
      lastActive: '15 мин назад',
    },
    {
      id: 3,
      name: 'Елена Сидорова',
      email: 'elena.sidorova@autogroup.ru',
      department: 'Запчасти',
      avatar: 'Е',
      stats: {
        totalCalls: 54,
        avgRating: 4.5,
        conversion: 85,
        avgCallTime: '6:45',
        satisfaction: 91,
      },
      trends: {
        calls: '+3%',
        rating: '-0.1',
        conversion: '+8%',
        satisfaction: '+3%',
      },
      status: 'offline',
      lastActive: '2 часа назад',
    },
    {
      id: 4,
      name: 'Дмитрий Козлов',
      email: 'dmitry.kozlov@autogroup.ru',
      department: 'Trade-in',
      avatar: 'Д',
      stats: {
        totalCalls: 45,
        avgRating: 4.3,
        conversion: 63,
        avgCallTime: '9:20',
        satisfaction: 82,
      },
      trends: {
        calls: '-5%',
        rating: '+0.3',
        conversion: '+1%',
        satisfaction: '-1%',
      },
      status: 'online',
      lastActive: 'Сейчас',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">🟢 Онлайн</Badge>;
      case 'away': return <Badge className="bg-yellow-100 text-yellow-800">🟡 Отошел</Badge>;
      case 'offline': return <Badge variant="outline">⚫ Офлайн</Badge>;
      default: return <Badge variant="outline">❓ Неизвестно</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend.startsWith('+')) {
      return <TrendingUp className="h-3 w-3 text-green-600" />;
    } else if (trend.startsWith('-')) {
      return <TrendingDown className="h-3 w-3 text-red-600" />;
    }
    return null;
  };

  const filteredManagers = managers.filter(manager =>
    manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
        {/* Заголовок */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Менеджеры</h1>
          <p className="text-muted-foreground">
            Управление командой и анализ производительности менеджеров
          </p>
        </div>

        {/* Общая статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Всего менеджеров</p>
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+3</span> в этом месяце
                  </p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Онлайн сейчас</p>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-muted-foreground">72% от общего числа</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Средний рейтинг</p>
                  <p className="text-2xl font-bold">4.6</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+0.2</span> от прошлого месяца
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
                  <p className="text-sm font-medium text-muted-foreground">Ср. конверсия</p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+3%</span> от прошлого месяца
                  </p>
                </div>
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Фильтры и поиск */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени, email или отделу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="all">Все отделы</option>
                  <option value="sales">Продажи</option>
                  <option value="service">Сервис</option>
                  <option value="parts">Запчасти</option>
                  <option value="tradein">Trade-in</option>
                </select>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить менеджера
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Список менеджеров */}
        <div className="grid gap-4">
          {filteredManagers.map((manager) => (
            <Card key={manager.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  {/* Информация о менеджере */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {manager.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(manager.status)}`}></div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{manager.name}</h3>
                        {manager.stats.avgRating >= 4.7 && (
                          <div title="Топ менеджер">
                            <Award className="h-4 w-4 text-yellow-500" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{manager.email}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{manager.department}</Badge>
                        {getStatusBadge(manager.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Последняя активность: {manager.lastActive}
                      </p>
                    </div>
                  </div>

                  {/* Статистика */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 min-w-0 flex-1 max-w-2xl">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Звонки</p>
                      <p className="text-lg font-semibold">{manager.stats.totalCalls}</p>
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(manager.trends.calls)}
                        <span className={`text-xs ${manager.trends.calls.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {manager.trends.calls}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Рейтинг</p>
                      <p className="text-lg font-semibold">{manager.stats.avgRating}</p>
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(manager.trends.rating)}
                        <span className={`text-xs ${manager.trends.rating.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {manager.trends.rating}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Конверсия</p>
                      <p className="text-lg font-semibold">{manager.stats.conversion}%</p>
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(manager.trends.conversion)}
                        <span className={`text-xs ${manager.trends.conversion.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {manager.trends.conversion}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Ср. время</p>
                      <p className="text-lg font-semibold">{manager.stats.avgCallTime}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Довольство</p>
                      <p className="text-lg font-semibold">{manager.stats.satisfaction}%</p>
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(manager.trends.satisfaction)}
                        <span className={`text-xs ${manager.trends.satisfaction.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {manager.trends.satisfaction}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Действия */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Детали
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Действия */}
        <div className="flex gap-4">
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Экспорт списка
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Планировщик смен
          </Button>
          <Button variant="outline">
            Настроить KPI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManagersPage; 