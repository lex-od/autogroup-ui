'use client';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CallStats } from '@/services/api/queries/calls.queries';
import { TrendingUp, Activity, Users, Phone } from 'lucide-react';

interface AnalyticsChartsProps {
  stats?: CallStats;
  isLoading?: boolean;
}

const AnalyticsCharts = ({ stats, isLoading }: AnalyticsChartsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Генерируем данные для графиков
  const generateTimeSeriesData = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push({
        time: `${i.toString().padStart(2, '0')}:00`,
        calls: Math.floor(Math.random() * 20) + 5,
        completed: Math.floor(Math.random() * 15) + 3,
        sentiment: Math.random() * 2 - 1, // от -1 до 1
      });
    }
    return hours;
  };

  const generateSentimentData = () => [
    { name: 'Позитивные', value: 65, color: '#22c55e' },
    { name: 'Нейтральные', value: 25, color: '#64748b' },
    { name: 'Негативные', value: 10, color: '#ef4444' },
  ];

  const generateManagerData = () => {
    return stats?.topPerformers?.slice(0, 5).map(performer => ({
      name: performer.managerName.split(' ')[0], // Только имя
      calls: performer.callsCount,
      satisfaction: performer.avgSentiment * 100,
    })) || [];
  };

  const generateWeeklyTrend = () => {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return days.map(day => ({
      day,
      calls: Math.floor(Math.random() * 50) + 20,
      conversion: Math.floor(Math.random() * 30) + 60,
    }));
  };

  const timeSeriesData = generateTimeSeriesData();
  const sentimentData = generateSentimentData();
  const managerData = generateManagerData();
  const weeklyData = generateWeeklyTrend();

  interface TooltipEntry {
    dataKey: string;
    value: unknown;
    color: string;
  }
  
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* График звонков по времени */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Активность по часам</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                name="Всего звонков"
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.3}
                name="Завершенные"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Распределение настроения */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Анализ настроения</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Производительность менеджеров */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Топ менеджеры</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={managerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="calls" fill="#3b82f6" name="Звонки" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Недельный тренд */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Недельный тренд</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Звонки"
              />
              <Line
                type="monotone"
                dataKey="conversion"
                stroke="#22c55e"
                strokeWidth={2}
                name="Конверсия %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts; 