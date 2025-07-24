'use client';

import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CallStatusBadge from '@/components/ui/call-status-badge';
import CallTypeBadge from '@/components/ui/call-type-badge';
import CallMetricsCard from '@/components/ui/call-metrics-card';
import CallActionsCard from '@/components/ui/call-actions-card';
import ServiceChecklistCard from '@/components/ui/service-checklist-card';
import {
  Phone,
  User,
  Clock,
  Calendar,
  Brain,
  Download,
  ArrowLeft,
  MessageSquare,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Star,
  FileText,
  Headphones,
  BarChart3,
  Lightbulb,
  Settings,
  Zap,
  Users,
  MapPin,
  Building,
  Mail,
  PhoneCall,
  Timer,
  Activity,
  Award,
  Shield,
  Eye,
  Play,
  Pause,
  Volume2,
  Info,
  Tag,
  Building2,
  UserCheck,
  PhoneIncoming,
  PhoneOutgoing,
} from 'lucide-react';

const CallDetailsEnhancedPage: FC = () => {
  // Демо-данные звонка
  const callData = {
    id: '00ec856b-b3f4-4980-8498-0bf3a24f9902',
    originalFilename: 'test_call_complete.mp3',
    storagePath: 'demo/test_call_complete.mp3',
    fileSizeBytes: 244736,
    duration: 185,
    callType: 'incoming' as const,
    phoneNumber: '+380501234567',
    clientName: 'Тестовый Клиент',
    managerName: 'Тестовый Менеджер',
    status: 'completed' as const,
    callDate: '2025-07-23T10:39:22.270Z',
    createdAt: '2025-07-23T10:39:22.270Z',
    processingStartedAt: '2025-07-23T10:39:25.000Z',
    processingCompletedAt: '2025-07-23T10:40:15.000Z',
    audioFormat: 'mp3',
    companyNumber: '+380441234567',
    companyNumberName: 'AUTOGROUP Центральный',
    waitTime: 5,
    eventType: 'call_completed',
    callStartedAt: '2025-07-23T10:36:00.000Z',
    callEndedAt: '2025-07-23T10:39:22.000Z',
    binotelStatus: 'answered',
    recordingStatus: 'completed',
    tags: ['VIP', 'Новый клиент'],
    priority: 'high',
    employeeInfo: {
      department: 'Продажи',
      position: 'Менеджер по продажам',
      experience: '3 года'
    }
  };

  // Демо-данные AI-анализа
  const analysisData = {
    sentimentLabel: 'positive' as const,
    sentimentScore: 0.8,
    sentimentConfidence: 0.9,
    topics: ['консультация', 'обслуживание', 'автомобили', 'сервис'],
    actionItems: ['Перезвонить клиенту завтра', 'Отправить каталог', 'Записать на тест-драйв'],
    summary: 'Клиент проявил интерес к консультации по автомобилям. Менеджер вежливо приветствовал и предложил помощь.',
    serviceQualityScore: 4,
    missedOpportunities: ['Не предложил дополнительные услуги', 'Не уточнил бюджет клиента'],
    insights: {
      client_readiness: 'средняя',
      expected_deal_size: 'неизвестно',
      follow_up_priority: 'средний'
    },
    clientReadiness: 'средняя',
    expectedDealSize: 'неизвестно',
    followUpPriority: 'средний',
    callPurpose: 'консультация по автомобилям',
    clientSatisfactionScore: 4,
    managerConfidenceScore: 0.85,
    clientConfidenceScore: 0.75,
    managerPoliteness: 'высокая',
    consultationCompleteness: 'полная',
    managerStrengths: ['Профессионализм', 'Внимательность', 'Знание продукта'],
    actionItemsForManager: ['Подготовить презентацию', 'Изучить конкурентов'],
    actionItemsForClient: ['Рассмотреть предложения', 'Подготовить вопросы'],
    recommendedNextSteps: ['Встреча в салоне', 'Тест-драйв', 'Расчет стоимости'],
    serviceScriptChecklist: {
      greeting: { completed: true, score: 5 },
      needs_identification: { completed: true, score: 4 },
      product_presentation: { completed: true, score: 4 },
      objection_handling: { completed: false, score: 2 },
      closing: { completed: true, score: 4 }
    },
    summaryText: 'Успешная консультация с высоким уровнем удовлетворенности клиента.',
    modelUsed: 'gpt-4o-mini',
    processingTimeMs: 2000,
    tokensUsed: 1500
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  // Данные для метрик
  const metricsData = {
    sentiment: [
      { label: 'Настроение', value: analysisData.sentimentScore * 100, unit: '%', progress: analysisData.sentimentScore * 100 },
      { label: 'Уверенность', value: analysisData.sentimentConfidence * 100, unit: '%', progress: analysisData.sentimentConfidence * 100 }
    ],
    quality: [
      { label: 'Качество обслуживания', value: analysisData.serviceQualityScore, unit: '/5', stars: analysisData.serviceQualityScore },
      { label: 'Удовлетворенность клиента', value: analysisData.clientSatisfactionScore, unit: '/5', stars: analysisData.clientSatisfactionScore }
    ],
    performance: [
      { label: 'Уверенность менеджера', value: analysisData.managerConfidenceScore * 100, unit: '%', progress: analysisData.managerConfidenceScore * 100 },
      { label: 'Уверенность клиента', value: analysisData.clientConfidenceScore * 100, unit: '%', progress: analysisData.clientConfidenceScore * 100 }
    ]
  };

  // Данные для действий
  const actionsData = [
    {
      id: '1',
      text: 'Перезвонить клиенту завтра',
      type: 'action' as const,
      priority: 'high' as const,
      assignedTo: 'manager' as const,
      dueDate: '2025-07-24'
    },
    {
      id: '2',
      text: 'Отправить каталог',
      type: 'action' as const,
      priority: 'medium' as const,
      assignedTo: 'manager' as const
    },
    {
      id: '3',
      text: 'Не предложил дополнительные услуги',
      type: 'opportunity' as const,
      priority: 'medium' as const
    },
    {
      id: '4',
      text: 'Профессионализм',
      type: 'strength' as const
    }
  ];

  // Данные для чек-листа
  const checklistData = [
    {
      id: '1',
      name: 'Приветствие',
      description: 'Вежливое приветствие и представление',
      completed: true,
      score: 5,
      maxScore: 5,
      category: 'greeting'
    },
    {
      id: '2',
      name: 'Выявление потребностей',
      description: 'Определение потребностей клиента',
      completed: true,
      score: 4,
      maxScore: 5,
      category: 'needs_identification'
    },
    {
      id: '3',
      name: 'Презентация продукта',
      description: 'Представление релевантных товаров/услуг',
      completed: true,
      score: 4,
      maxScore: 5,
      category: 'product_presentation'
    },
    {
      id: '4',
      name: 'Работа с возражениями',
      description: 'Обработка возражений клиента',
      completed: false,
      score: 2,
      maxScore: 5,
      category: 'objection_handling'
    },
    {
      id: '5',
      name: 'Завершение',
      description: 'Подведение итогов и назначение следующих шагов',
      completed: true,
      score: 4,
      maxScore: 5,
      category: 'closing'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Хедер */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="space-x-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Назад к звонкам</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              Звонок {callData.clientName || callData.phoneNumber}
            </h1>
            <p className="text-muted-foreground">
              {formatDate(callData.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CallStatusBadge status={callData.status} />
          <Button variant="outline" className="space-x-1">
            <Download className="h-4 w-4" />
            Скачать запись
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основной контент */}
        <div className="space-y-6 lg:col-span-2">
          {/* Основная информация о звонке */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CallTypeBadge callType={callData.callType} />
                    <Badge variant="outline" className="ml-auto">
                      {callData.priority === 'high' ? 'Высокий' : 'Обычный'} приоритет
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Клиент:</span>
                      <span className="font-medium">{callData.clientName || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Телефон:</span>
                      <span className="font-medium">{callData.phoneNumber || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Менеджер:</span>
                      <span className="font-medium">{callData.managerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Отдел:</span>
                      <span className="font-medium">{callData.employeeInfo.department}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Длительность:</span>
                      <span className="font-medium">{formatDuration(callData.duration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Время ожидания:</span>
                      <span className="font-medium">{callData.waitTime} сек</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Размер файла:</span>
                      <span className="font-medium">{formatFileSize(callData.fileSizeBytes)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Формат:</span>
                      <span className="font-medium uppercase">{callData.audioFormat}</span>
                    </div>
                  </div>
                  
                  {callData.tags && callData.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Теги:</span>
                      <div className="flex gap-1">
                        {callData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Аудиоплеер */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Аудиозапись
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{callData.originalFilename}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatDuration(callData.duration)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>0:45</span>
                  <span>{formatDuration(callData.duration)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Транскрипция */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Транскрипция
                <Badge variant="secondary" className="ml-2">
                  95%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Здравствуйте, добро пожаловать в автосалон AUTOGROUP. Чем могу помочь?
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Модель: groq-whisper-large-v3-turbo</span>
                  <span>Время обработки: 1000ms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* AI-анализ */}
          <CallMetricsCard
            title="AI-анализ"
            icon={<Brain className="h-5 w-5" />}
            metrics={[
              { label: 'Настроение', value: (analysisData.sentimentScore * 100).toFixed(0), unit: '%', progress: analysisData.sentimentScore * 100 },
              { label: 'Качество обслуживания', value: analysisData.serviceQualityScore, unit: '/5', stars: analysisData.serviceQualityScore },
              { label: 'Удовлетворенность клиента', value: analysisData.clientSatisfactionScore, unit: '/5', stars: analysisData.clientSatisfactionScore },
              { label: 'Уверенность менеджера', value: (analysisData.managerConfidenceScore * 100).toFixed(0), unit: '%', progress: analysisData.managerConfidenceScore * 100 }
            ]}
          />

          {/* Действия */}
          <CallActionsCard
            title="Действия"
            icon={<Target className="h-5 w-5" />}
            items={actionsData}
            showActions={true}
          />

          {/* Упущенные возможности */}
          <CallActionsCard
            title="Упущенные возможности"
            icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
            items={[
              {
                id: '1',
                text: 'Не предложил дополнительные услуги',
                type: 'opportunity'
              },
              {
                id: '2',
                text: 'Не уточнил бюджет клиента',
                type: 'opportunity'
              }
            ]}
          />

          {/* Сильные стороны */}
          <CallActionsCard
            title="Сильные стороны"
            icon={<Award className="h-5 w-5 text-green-500" />}
            items={[
              {
                id: '1',
                text: 'Профессионализм',
                type: 'strength'
              },
              {
                id: '2',
                text: 'Внимательность',
                type: 'strength'
              },
              {
                id: '3',
                text: 'Знание продукта',
                type: 'strength'
              }
            ]}
          />

          {/* Чек-лист сервиса */}
          <ServiceChecklistCard items={checklistData} />

          {/* Заметки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Заметки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-32 resize-none rounded-md border p-3 text-sm"
                placeholder="Добавьте заметки к этому звонку..."
              />
              <Button className="mt-3 w-full" size="sm">
                Сохранить заметки
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CallDetailsEnhancedPage; 