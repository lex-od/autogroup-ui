'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Download,
  ArrowLeft,
  Clock,
  User,
  Phone,
  MessageSquare,
  Target,
  Award,
  Brain,
  Users,
  FileText,
  Headphones,
  Calendar,
  Building2,
  Tag,
  Timer,
  Zap,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  Edit3,
  Save,
  RotateCcw,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import TranscriptChat from '@/components/ui/transcript-chat';
import AudioPlayerSimple from '@/components/ui/audio-player-simple';
import CallSummaryCard from '@/components/ui/call-summary-card';
import ServiceChecklistDetailed from '@/components/ui/service-checklist-detailed';
import CallActionsCard from '@/components/ui/call-actions-card';
import CallMetricsCard from '@/components/ui/call-metrics-card';
import CallStatusBadge from '@/components/ui/call-status-badge';
import CallTypeBadge from '@/components/ui/call-type-badge';

interface CallDetailsFinalV2Props {
  callId: string;
}

export function CallDetailsFinalV2({ callId }: CallDetailsFinalV2Props) {
  const [selectedSegmentStart, setSelectedSegmentStart] = useState<number | null>(null);
  const [isChecklistExpanded, setIsChecklistExpanded] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);

  // Демо-данные для звонка
  const demoDetails = {
    id: callId,
    clientName: 'Игорь Петрович',
    phoneNumber: '+380 50 123 45 67',
    managerName: 'Анна Коваленко',
    durationSeconds: 280,
    createdAt: new Date().toISOString(),
    storagePath: 'demo-call-123.mp3',
    department: 'Продажи новых автомобилей',
    status: 'completed',
    callType: 'incoming'
  };

  const handleSegmentClick = (segment: any) => {
    setSelectedSegmentStart(segment.start_ms);
    if (playerRef.current) {
      playerRef.current.currentTime = segment.start_ms / 1000;
      playerRef.current.play();
    }
  };

  // Демо-данные для транскрипции
  const demoTranscript = [
    {
      id: '1',
      start_ms: 0,
      end_ms: 3000,
      speaker: 'Сотрудник',
      text: 'Добрый день! Добро пожаловать в AUTOGROUP. Меня зовут Анна, чем могу помочь?',
      confidence: 0.95
    },
    {
      id: '2',
      start_ms: 3000,
      end_ms: 8000,
      speaker: 'Клиент',
      text: 'Здравствуйте! Меня зовут Игорь Петрович. Интересует новый автомобиль KIA Sportage. Есть ли у вас в наличии?',
      confidence: 0.92
    },
    {
      id: '3',
      start_ms: 8000,
      end_ms: 15000,
      speaker: 'Сотрудник',
      text: 'Конечно, Игорь Петрович! У нас есть несколько вариантов KIA Sportage в наличии. Какой комплектации вас интересует?',
      confidence: 0.94
    },
    {
      id: '4',
      start_ms: 15000,
      end_ms: 22000,
      speaker: 'Клиент',
      text: 'Хотел бы максимальную комплектацию. И еще вопрос - есть ли возможность trade-in моего старого автомобиля?',
      confidence: 0.89
    },
    {
      id: '5',
      start_ms: 22000,
      end_ms: 28000,
      speaker: 'Сотрудник',
      text: 'Отлично! У нас есть программа trade-in. Можете приехать к нам, и мы оценим ваш автомобиль. Когда вам удобно?',
      confidence: 0.96
    }
  ];

  // Демо-данные для AI-анализа
  const demoAnalysis = {
    general_info: {
      call_type: 'sales',
      call_purpose: 'Покупка автомобиля',
      call_outcome: 'Потенциальная сделка',
      call_priority: 'high',
      lead_quality: 'hot'
    },
    participants: {
      manager: 'Анна (Сотрудник)',
      client: 'Игорь Петрович (Клиент)',
      manager_role: 'Менеджер по продажам',
      client_type: 'Потенциальный покупатель'
    },
    sentiment_and_tone: {
      overall_sentiment: 'positive',
      manager_sentiment: 'professional',
      client_sentiment: 'interested',
      conversation_tone: 'friendly'
    },
    call_purpose_and_outcome: {
      primary_purpose: 'Продажа автомобиля KIA Sportage',
      secondary_purposes: ['Trade-in', 'Консультация'],
      call_result: 'Договоренность о встрече',
      next_steps: 'Встреча в салоне для оценки trade-in'
    },
    key_topics_and_interests: {
      main_topics: ['KIA Sportage', 'Trade-in', 'Комплектации'],
      client_interests: ['Максимальная комплектация', 'Выгодная сделка'],
      product_mentions: ['KIA Sportage', 'Новый автомобиль']
    },
    client_needs_pain_points: {
      primary_needs: ['Новый автомобиль', 'Trade-in старого'],
      pain_points: ['Необходимость продажи старого автомобиля'],
      objections: ['Нет явных возражений'],
      concerns: ['Стоимость trade-in']
    },
    manager_service_quality: {
      overall_score: 85,
      communication_skills: 90,
      product_knowledge: 85,
      objection_handling: 80,
      closing_skills: 75,
      strengths: ['Профессиональный подход', 'Активное слушание'],
      missed_opportunities: ['Не предложил кредитование', 'Не уточнил бюджет'],
      politeness_score: 95,
      consultation_completeness: 80
    },
    deal_potential_and_next_steps: {
      deal_potential: 'high',
      probability_score: 75,
      estimated_value: 2500000,
      action_items: [
        'Организовать встречу в салоне',
        'Подготовить варианты KIA Sportage',
        'Оценить автомобиль клиента'
      ],
      recommended_next_steps: [
        'Перезвонить через 2 дня',
        'Отправить каталог комплектаций',
        'Подготовить расчет trade-in'
      ]
    },
    service_script_checklist_evaluation: {
      total_score: 85,
      checklist_items: [
        { item: 'Приветствие и представление', score: 100, status: 'passed', comment: 'Отличное приветствие' },
        { item: 'Выявление потребностей', score: 80, status: 'passed', comment: 'Хорошо выявлены основные потребности' },
        { item: 'Презентация продукта', score: 70, status: 'partial', comment: 'Можно было подробнее рассказать о преимуществах' },
        { item: 'Обработка возражений', score: 90, status: 'passed', comment: 'Возражений не было' },
        { item: 'Предложение дополнительных услуг', score: 60, status: 'failed', comment: 'Не предложено кредитование' },
        { item: 'Фиксация договоренностей', score: 85, status: 'passed', comment: 'Договоренность о встрече зафиксирована' },
        { item: 'Прощание', score: 100, status: 'passed', comment: 'Вежливое прощание' }
      ]
    },
    summary_text: 'Клиент Игорь Петрович заинтересован в покупке KIA Sportage максимальной комплектации с возможностью trade-in. Менеджер Анна профессионально провела консультацию, выявила потребности и договорилась о встрече. Оценка качества обслуживания: 85/100. Высокий потенциал сделки.'
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Хедер */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/calls" className="cursor-default space-x-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Назад к звонкам</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              Звонок {demoDetails.clientName || demoDetails.phoneNumber}
            </h1>
            <p className="text-muted-foreground">
              {new Date(demoDetails.createdAt).toLocaleString('ru-RU')}
            </p>
          </div>
        </div>
        <Button variant="outline" className="cursor-default" asChild>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <Download className="h-4 w-4 mr-2" />
            Скачать запись
          </a>
        </Button>
      </div>

      {/* Основная информация */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Приоритет в левом верхнем углу */}
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Приоритет</p>
                <CallStatusBadge status="high" />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Номер телефона</p>
                <p className="font-medium">
                  {demoDetails.phoneNumber || 'Нет номера'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Клиент</p>
                <p className="font-medium">
                  {demoDetails.clientName || 'Нет названия'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Менеджер</p>
                <p className="font-medium">
                  {demoDetails.managerName || 'Нет имени'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Длительность</p>
                <p className="font-medium">
                  {demoDetails.durationSeconds
                    ? `${Math.floor(demoDetails.durationSeconds / 60)}:${(demoDetails.durationSeconds % 60).toString().padStart(2, '0')}`
                    : 'Нет данных'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Дата</p>
                <p className="font-medium">
                  {new Date(demoDetails.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Отдел</p>
                <p className="font-medium">
                  {demoDetails.department || 'Продажи'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Тип звонка</p>
                <CallTypeBadge callType="incoming" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ключевые темы */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Ключевые темы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {demoAnalysis.key_topics_and_interests.main_topics.map((topic, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {topic}
              </Badge>
            ))}
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
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
            <div className="text-center space-y-2">
              <Headphones className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-500">Демо-аудиофайл</p>
              <p className="text-xs text-gray-400">Длительность: 4:40</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Резюме */}
      <CallSummaryCard
        summary={demoAnalysis.summary_text}
        callPurpose={demoAnalysis.call_purpose_and_outcome.primary_purpose}
        callOutcome={demoAnalysis.call_purpose_and_outcome.call_result}
      />

      {/* Транскрипция */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Транскрипция
            <Badge variant="outline" className="ml-2">
              Точность: 92%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            Модель: AssemblyAI Universal Speech Model | Время обработки: 45 сек | Токены: 1,247
          </div>
          <TranscriptChat
            segments={demoTranscript}
            onSegmentClick={handleSegmentClick}
          />
        </CardContent>
      </Card>

      {/* AI-анализ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основные метрики */}
        <div className="lg:col-span-2 space-y-6">
          <CallMetricsCard
            title="Ключевые метрики"
            icon={<Award className="h-5 w-5" />}
            metrics={[
              { label: 'Общая оценка', value: demoAnalysis.manager_service_quality.overall_score, unit: '/100', progress: demoAnalysis.manager_service_quality.overall_score },
              { label: 'Коммуникация', value: demoAnalysis.manager_service_quality.communication_skills, unit: '/100', progress: demoAnalysis.manager_service_quality.communication_skills },
              { label: 'Знание продукта', value: demoAnalysis.manager_service_quality.product_knowledge, unit: '/100', progress: demoAnalysis.manager_service_quality.product_knowledge },
              { label: 'Обработка возражений', value: demoAnalysis.manager_service_quality.objection_handling, unit: '/100', progress: demoAnalysis.manager_service_quality.objection_handling },
              { label: 'Закрытие сделки', value: demoAnalysis.manager_service_quality.closing_skills, unit: '/100', progress: demoAnalysis.manager_service_quality.closing_skills },
              { label: 'Вежливость', value: demoAnalysis.manager_service_quality.politeness_score, unit: '/100', progress: demoAnalysis.manager_service_quality.politeness_score },
              { label: 'Полнота консультации', value: demoAnalysis.manager_service_quality.consultation_completeness, unit: '/100', progress: demoAnalysis.manager_service_quality.consultation_completeness },
            ]}
          />

          <CallActionsCard
            title="Действия и рекомендации"
            icon={<Target className="h-5 w-5" />}
            items={[
              ...demoAnalysis.deal_potential_and_next_steps.action_items.map((text, i) => ({ id: `a${i}`, text, type: 'action' as const })),
              ...demoAnalysis.manager_service_quality.missed_opportunities.map((text, i) => ({ id: `m${i}`, text, type: 'opportunity' as const })),
              ...demoAnalysis.manager_service_quality.strengths.map((text, i) => ({ id: `s${i}`, text, type: 'strength' as const })),
              ...demoAnalysis.deal_potential_and_next_steps.recommended_next_steps.map((text, i) => ({ id: `r${i}`, text, type: 'recommendation' as const })),
            ]}
          />
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Итоговая оценка сервиса */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Итоговая оценка сервиса
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsChecklistExpanded(!isChecklistExpanded)}
                  className="flex items-center gap-1"
                >
                  Чек-лист
                  {isChecklistExpanded ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-blue-600">
                  {demoAnalysis.manager_service_quality.overall_score}/100
                </div>
                <div className="flex items-center justify-center gap-1">
                  {demoAnalysis.manager_service_quality.overall_score >= 80 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : demoAnalysis.manager_service_quality.overall_score >= 60 ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {demoAnalysis.manager_service_quality.overall_score >= 80
                      ? 'Отличное качество'
                      : demoAnalysis.manager_service_quality.overall_score >= 60
                      ? 'Хорошее качество'
                      : 'Требует улучшения'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Потенциал сделки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Потенциал сделки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Вероятность:</span>
                  <Badge variant="outline">
                    {demoAnalysis.deal_potential_and_next_steps.probability_score}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Оценка:</span>
                  <Badge variant="outline">
                    {demoAnalysis.deal_potential_and_next_steps.estimated_value?.toLocaleString()} ₽
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Качество лида:</span>
                  <Badge variant="outline" className="capitalize">
                    {demoAnalysis.general_info.lead_quality}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

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
                className="h-32 w-full resize-none rounded-md border p-3 text-sm"
                placeholder="Добавьте заметки к этому звонку..."
              />
              <Button className="mt-3 w-full" size="sm">
                Сохранить заметки
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Чек-лист сервиса (только для сервисных звонков) */}
      {demoAnalysis.general_info.call_type === 'service' && (
        <ServiceChecklistDetailed
          items={[]}
          isServiceCall={true}
        />
      )}
    </div>
  );
} 