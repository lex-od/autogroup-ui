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
import ServiceChecklistDetailed from '@/components/ui/service-checklist-detailed';
import CallSummaryCard from '@/components/ui/call-summary-card';
import AudioPlayerSimple from '@/components/ui/audio-player-simple';
import TranscriptChat from '@/components/ui/transcript-chat';
import { ProcessingMenuProgress } from "@/components/ui/processing-menu-progress"
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
  Zap as ZapIcon,
  DollarSign,
  ChevronDown,
  Award as AwardIcon,
  Wrench,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react'; // Added missing import
import { cn } from '@/lib/utils';

const CallDetailsFinalPage: FC = () => {
  // Состояние для отслеживания процесса выполнения функций
  const [isRetranscribing, setIsRetranscribing] = React.useState(false);
  const [isPostprocessing, setIsPostprocessing] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  // Обработчики для функций обработки
  const handleRetranscribe = async () => {
    setIsRetranscribing(true);
    try {
      // Здесь будет вызов API для повторной транскрипции
      console.log('Запуск повторной транскрипции...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Имитация задержки
      console.log('Повторная транскрипция завершена');
    } catch (error) {
      console.error('Ошибка при повторной транскрипции:', error);
    } finally {
      setIsRetranscribing(false);
    }
  };

  const handleRolesPostprocess = async () => {
    setIsPostprocessing(true);
    try {
      // Здесь будет вызов API для обработки ролей
      console.log('Запуск обработки ролей...');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация задержки
      console.log('Обработка ролей завершена');
    } catch (error) {
      console.error('Ошибка при обработке ролей:', error);
    } finally {
      setIsPostprocessing(false);
    }
  };

  const handleReAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // Здесь будет вызов API для повторного AI-анализа
      console.log('Запуск повторного AI-анализа...');
      await new Promise(resolve => setTimeout(resolve, 3000)); // Имитация задержки
      console.log('Повторный AI-анализ завершен');
    } catch (error) {
      console.error('Ошибка при повторном AI-анализе:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
      department: 'Сервис',
      position: 'Сервисный консультант',
      experience: '3 года'
    }
  };

  // Демо-данные AI-анализа
  const analysisData = {
    sentimentLabel: 'positive' as const,
    sentimentScore: 0.8,
    sentimentConfidence: 0.9,
    topics: ['консультация', 'обслуживание', 'автомобили', 'сервис', 'ТО'],
    actionItems: ['Перезвонить клиенту завтра', 'Отправить каталог', 'Записать на тест-драйв'],
    summary: 'Клиент проявил интерес к консультации по автомобилям. Менеджер вежливо приветствовал и предложил помощь.',
    serviceQualityScore: 4,
    missedOpportunities: ['Не предложил дополнительные услуги', 'Не уточнил бюджет клиента'],
    insights: {
      client_readiness: 'средняя',
      expected_deal_size: 'неизвестно'
    },
    callPurpose: 'консультация по сервисному обслуживанию',
    clientSatisfactionScore: 4,
    managerConfidenceScore: 0.85,
    clientConfidenceScore: 0.75,
    managerStrengths: ['Профессионализм', 'Внимательность', 'Знание продукта'],
    actionItemsForManager: ['Подготовить презентацию', 'Изучить конкурентов'],
    actionItemsForClient: ['Рассмотреть предложения', 'Подготовить вопросы'],
    recommendedNextSteps: ['Встреча в салоне', 'Тест-драйв', 'Расчет стоимости'],
    summaryText: 'Успешная консультация с высоким уровнем удовлетворенности клиента.',
    modelUsed: 'gpt-4o-mini',
    processingTimeMs: 2000,
    tokensUsed: 1500,
    estimatedCost: 0.15, // в гривнах
    
    // Расширенные данные
    productServiceInterest: {
      brandModelCar: 'Toyota Camry',
      serviceType: 'ТО-1',
      desiredConfiguration: 'не_указано',
      desiredYear: '2020',
      partsDescription: 'не_указано',
      budgetDiscussedRub: 15000,
      currency: 'UAH'
    },
    clientNeeds: ['Диагностика автомобиля', 'Плановое ТО', 'Консультация по обслуживанию'],
    clientObjectionsConcerns: ['Высокая цена', 'Долгий срок ожидания'],
    managerServiceQualityScore: 4,
    managerPoliteness: 'да',
    consultationCompleteness: 'полная',
    missedOpportunitiesDetailed: ['Не предложил тест-драйв', 'Не уточнил бюджет', 'Не предложил акций'],
    managerStrengthsDetailed: ['Грамотная консультация', 'Активное слушание', 'Оперативность ответа'],
    clientReadinessLevel: 'средняя',
    expectedDealSizeCategory: 'средний',
    followUpPriority: 'средний',
    actionItemsForManagerDetailed: [
      'Отправить расчет ТО до конца дня',
      'Согласовать время диагностики завтра',
      'Перезвонить клиенту в четверг'
    ],
    actionItemsForClientDetailed: [
      'приехать_на_диагностику_в_пятницу',
      'выслать_документы_на_почту',
      'обдумать_предложение_до_завтра'
    ],
    recommendedNextStepsDetailed: [
      'Предложить другие варианты ТО',
      'Направить информацию о гарантии',
      'Уточнить дополнительные потребности'
    ],
    // Данные по акциям и диагностике
    hasSpecialOffers: true,
    specialOffers: ['Скидка 15% на ТО', 'Бесплатная диагностика'],
    diagnosticType: 'Компьютерная диагностика'
  };

  // Демо-данные транскрипции
  const transcriptData = {
    id: 'c14473b1-9959-4fae-be56-f5c2e8088457',
    fullText: 'Здравствуйте, добро пожаловать в автосалон AUTOGROUP. Чем могу помочь?',
    language: 'ru',
    speakersCount: 2,
    overallConfidence: 0.95,
    wordCount: 10,
    silenceDurationMs: 500,
    modelUsed: 'groq-whisper-large-v3-turbo',
    processingTimeMs: 1000,
    tokensUsed: 800,
    estimatedCost: 0.08
  };

  // Демо-данные транскрипции с сегментами для WhatsApp-стиля
  const transcriptSegments = [
    {
      id: '1',
      start_ms: 0,
      end_ms: 3000,
      speaker: 'A',
      text: 'Здравствуйте, добро пожаловать в автосалон AUTOGROUP. Чем могу помочь?',
      role: 'Менеджер',
      name: 'Тестовый Менеджер',
      confidence: 0.95
    },
    {
      id: '2',
      start_ms: 3500,
      end_ms: 8000,
      speaker: 'B',
      text: 'Добрый день! У меня есть вопрос по обслуживанию автомобиля. Нужно ли проходить ТО?',
      role: 'Клиент',
      name: 'Тестовый Клиент',
      confidence: 0.92
    },
    {
      id: '3',
      start_ms: 8500,
      end_ms: 12000,
      speaker: 'A',
      text: 'Конечно! Расскажите, пожалуйста, какая у вас марка автомобиля и какой пробег?',
      role: 'Менеджер',
      name: 'Тестовый Менеджер',
      confidence: 0.94
    },
    {
      id: '4',
      start_ms: 12500,
      end_ms: 15000,
      speaker: 'B',
      text: 'У меня Toyota Camry, пробег около 50 тысяч километров.',
      role: 'Клиент',
      name: 'Тестовый Клиент',
      confidence: 0.91
    },
    {
      id: '5',
      start_ms: 15500,
      end_ms: 20000,
      speaker: 'A',
      text: 'Отлично! Для Toyota Camry с таким пробегом рекомендую пройти техническое обслуживание. Могу записать вас на удобное время.',
      role: 'Менеджер',
      name: 'Тестовый Менеджер',
      confidence: 0.93
    }
  ];

  // Демо-данные чек-листа сервиса (20 пунктов)
  const serviceChecklistData = [
    {
      id: 1,
      name: 'Реакция на звонок (количество гудков)',
      description: 'Оцени, если транскрипция предоставляет метаданные о времени до ответа или явные указания на гудки. Балл: 1, если ответ в течение 20 секунд.',
      category: 'obligatory' as const,
      completed: true,
      score: 1,
      maxScore: 1,
      explanation: 'Ответ получен в течение 15 секунд'
    },
    {
      id: 2,
      name: 'Произнесено название Дилерского центра',
      description: 'Должно быть четко названо (например, Автогруп Моторс, Авто груп+, Автоград Одеса, Мустанг Моторс, Скай Моторс, Базис Авто).',
      category: 'obligatory' as const,
      completed: true,
      score: 1,
      maxScore: 1,
      explanation: 'Названо "AUTOGROUP"'
    },
    {
      id: 3,
      name: 'Произнесено название отдел /должность',
      description: 'Например, Сервисный отдел, Менеджер сервиса, Відділ сервісу.',
      category: 'obligatory' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Должность не была названа'
    },
    {
      id: 4,
      name: 'Представился ли консультант по Имени',
      description: 'Консультант должен назвать свое имя.',
      category: 'obligatory' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Имя консультанта не было названо'
    },
    {
      id: 5,
      name: 'Фраза «Слухаю Вас!» или аналог',
      description: 'Оценивается, если это уместно как завершение приветствия или приглашение клиента начать разговор.',
      category: 'contextual' as const,
      completed: true,
      score: 1,
      maxScore: 1,
      explanation: 'Использована фраза "Чем могу помочь?"'
    },
    {
      id: 6,
      name: 'Спросил ли консультант имя Клиента?',
      description: 'Применимо, если имя клиента не было названо в начале звонка. Искать вопросы типа "Как могу к Вам обращаться?"',
      category: 'contextual' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Имя клиента не было уточнено'
    },
    {
      id: 7,
      name: 'Использовал ли консультант два и более раз имя Клиента',
      description: 'Подсчитай количество обращений менеджера к клиенту по имени. Балл: 1, если использовал 2 и более раз.',
      category: 'obligatory' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Имя клиента не использовалось'
    },
    {
      id: 8,
      name: 'Узнал ли консультант на каком автомобиле ездит Клиент?',
      description: 'Применимо, если цель звонка касается сервиса. Искать вопросы типа "Какой у Вас автомобиль?"',
      category: 'contextual' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Марка/модель автомобиля не была уточнена'
    },
    {
      id: 9,
      name: 'Узнал ли консультант какой на автомобиле пробег?',
      description: 'Применимо, если обсуждается обслуживание, ТО или диагностика. Искать вопросы типа "Какой пробег?"',
      category: 'contextual' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Пробег автомобиля не был уточнен'
    },
    {
      id: 10,
      name: 'Уточнил ли консультант обслуживался ли Клиент на АСЦ ДЦ ранее?',
      description: 'Применимо, если клиент может быть новым. Искать вопросы типа "Вы у нас уже обслуживались?"',
      category: 'contextual' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'История обслуживания не была уточнена'
    },
    {
      id: 11,
      name: 'Проконсультировал ли консультант Клиента по поводу возможных действий',
      description: 'Применимо, если клиент описывает проблему с автомобилем. Консультант должен предложить варианты решения.',
      category: 'contextual' as const,
      completed: true,
      score: 1,
      maxScore: 1,
      explanation: 'Предложены варианты решения'
    },
    {
      id: 12,
      name: 'Пригласил ли консультант Клиента на АСЦ / Предложил записаться',
      description: 'Должно быть четкое приглашение или предложение о записи, если это соответствует цели звонка.',
      category: 'obligatory' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Запись на сервис не была предложена'
    },
    {
      id: 13,
      name: 'Задал ли консультант вопрос о дополнительных пожеланиях',
      description: 'Искать фразы типа "Может быть, еще что-то хотели уточнить?"',
      category: 'obligatory' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Дополнительные пожелания не были уточнены'
    },
    {
      id: 14,
      name: 'Уточнил ли консультант продолжительность запланированных работ',
      description: 'Должен сообщить примерное время выполнения работ.',
      category: 'obligatory' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Время выполнения работ не было указано'
    },
    {
      id: 15,
      name: 'Убедился ли консультант, что Клиент знает местонахождение АСЦ',
      description: 'Применимо, если клиент новый или выразил неуверенность. Искать вопросы типа "Вам подсказать адрес?"',
      category: 'contextual' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Адрес не был уточнен'
    },
    {
      id: 16,
      name: 'Консультант предложил 2 альтернативных варианта записи',
      description: 'Применимо, если клиент не назвал конкретное время. Например, "Можем предложить среду или четверг?"',
      category: 'contextual' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Альтернативные варианты не были предложены'
    },
    {
      id: 17,
      name: 'Консультант уточнил у Клиента номер телефона',
      description: 'Применимо, если номер клиента не был явно известен или подтвержден в начале звонка.',
      category: 'contextual' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Номер телефона не был уточнен'
    },
    {
      id: 18,
      name: 'Консультант резюмировал договоренности с Клиентом',
      description: 'Должно быть краткое повторение ключевых договоренностей перед завершением.',
      category: 'obligatory' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Договоренности не были резюмированы'
    },
    {
      id: 19,
      name: 'Консультант поблагодарил Клиента за звонок',
      description: 'Явная благодарность в конце разговора.',
      category: 'obligatory' as const,
      completed: false,
      score: 0,
      maxScore: 1,
      explanation: 'Благодарность не была выражена'
    },
    {
      id: 20,
      name: 'Был ли консультант вежливым и заинтересованным',
      description: 'Оценивается по общему тону, выбору слов, активному слушанию и реакции на вопросы клиента.',
      category: 'obligatory' as const,
      completed: true,
      score: 1,
      maxScore: 1,
      explanation: 'Консультант проявил вежливость и заинтересованность'
    }
  ];

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

  // Определяем, является ли звонок сервисным
  const isServiceCall = callData.employeeInfo.department === 'Сервис' || 
                       analysisData.topics.some(topic => ['сервис', 'обслуживание', 'ТО'].includes(topic));

  // Вычисляем итоговую оценку для сервисных звонков
  const serviceScore = serviceChecklistData.reduce((sum, item) => sum + item.score, 0);
  const maxServiceScore = serviceChecklistData.reduce((sum, item) => sum + item.maxScore, 0);
  const servicePercentage = maxServiceScore > 0 ? (serviceScore / maxServiceScore) * 100 : 0;

  // Обработчики для транскрипции
  const handleSegmentClick = (startMs: number) => {
    console.log('Переход к времени:', startMs);
  };

  const handleSegmentEdit = (id: string, updates: any) => {
    console.log('Изменение сегмента:', id, updates);
  };

  // Функция для прокрутки к чек-листу
  const scrollToChecklist = () => {
    const checklistElement = document.getElementById('service-checklist');
    if (checklistElement) {
      checklistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 relative">
      {/* Глобальный индикатор процесса */}
      {(isRetranscribing || isPostprocessing || isAnalyzing) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-pulse">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-medium">
              {isRetranscribing && "🔄 Выполняется повторная транскрипция..."}
              {isPostprocessing && "🧠 Выполняется обработка ролей..."}
              {isAnalyzing && "🤖 Выполняется AI-анализ..."}
            </span>
          </div>
        </div>
      )}

      {/* Затемнение и блокировка при обработке */}
      {(isRetranscribing || isPostprocessing || isAnalyzing) && (
        <div className="fixed inset-0 bg-black/20 z-40 pointer-events-none" />
      )}

      {/* Хедер */}
      <div className={cn(
        "flex items-center justify-between",
        (isRetranscribing || isPostprocessing || isAnalyzing) && "pointer-events-none opacity-50"
      )}>
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
          <ProcessingMenuProgress 
            onRetranscribe={handleRetranscribe}
            onRolesPostprocess={handleRolesPostprocess}
            onReAnalyze={handleReAnalyze}
            isRetranscribing={isRetranscribing}
            isPostprocessing={isPostprocessing}
            isAnalyzing={isAnalyzing}
          />
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/processing-menu-demo">
              Демо анимаций
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/test-real-data">
              Тест реальных данных
            </Link>
          </Button>
          <Button variant="outline" className="space-x-1">
            <Download className="h-4 w-4" />
            Скачать запись
          </Button>
        </div>
      </div>

      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-3 gap-6",
        (isRetranscribing || isPostprocessing || isAnalyzing) && "pointer-events-none opacity-50"
      )}>
        {/* Основной контент */}
        <div className="space-y-6 lg:col-span-2">
          {/* Основная информация о звонке */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Основная информация
                </div>
                <Badge variant="destructive" className="text-xs">
                  {callData.priority === 'high' ? 'Высокий' : 'Обычный'} приоритет
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Приоритет перемещен в правый верхний угол */}
                  <div className="flex items-center justify-between">
                    <CallTypeBadge callType={callData.callType} />
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

                  {/* Ключевые темы */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">Ключевые темы:</span>
                    <div className="flex flex-wrap gap-1">
                      {analysisData.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Итоговая оценка для сервисных звонков с кнопкой-якорем */}
                  {isServiceCall && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">Итоговая оценка сервиса:</span>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-sm ${
                          servicePercentage >= 80 ? 'bg-green-100 text-green-800 border-green-200' :
                          servicePercentage >= 60 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {serviceScore}/{maxServiceScore} баллов ({servicePercentage.toFixed(0)}%)
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={scrollToChecklist}
                          className="flex items-center gap-1 text-xs"
                        >
                          <AwardIcon className="h-3 w-3" />
                          Чек-лист
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
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
          <AudioPlayerSimple
            filename={callData.originalFilename}
            duration={callData.duration}
            currentTime={45}
          />

          {/* Резюме звонка */}
          <CallSummaryCard
            summary={analysisData.summaryText || analysisData.summary}
            callPurpose={analysisData.callPurpose}
            callOutcome="Консультация завершена успешно"
            participants={{
              manager: callData.managerName,
              client: callData.clientName
            }}
          />

          {/* Акции и спецпредложения */}
          <Card className={analysisData.hasSpecialOffers ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${analysisData.hasSpecialOffers ? 'text-green-800' : 'text-gray-600'}`}>
                <ZapIcon className="h-5 w-5" />
                Акции и спецпредложения
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysisData.hasSpecialOffers ? (
                <div className="space-y-2">
                  {analysisData.specialOffers.map((offer, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-green-100 rounded border border-green-300">
                      <ZapIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800 font-medium">{offer}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm py-4">
                  Акции и спецпредложения в звонке не выявлены
                </div>
              )}
            </CardContent>
          </Card>

          {/* Детали запроса */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Детали запроса
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Автомобиль:</span>
                    <span className="font-medium">{analysisData.productServiceInterest.brandModelCar}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Тип сервиса:</span>
                    <span className="font-medium">{analysisData.productServiceInterest.serviceType}</span>
                  </div>
                  {analysisData.diagnosticType && (
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Тип диагностики:</span>
                      <span className="font-medium">{analysisData.diagnosticType}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Год выпуска:</span>
                    <span className="font-medium">{analysisData.productServiceInterest.desiredYear}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Бюджет:</span>
                    <span className="font-medium">
                      {analysisData.productServiceInterest.budgetDiscussedRub > 0 
                        ? `${analysisData.productServiceInterest.budgetDiscussedRub.toLocaleString()} ${analysisData.productServiceInterest.currency}`
                        : 'Не обсуждался'
                      }
                    </span>
                  </div>
                  {analysisData.productServiceInterest.partsDescription !== 'не_указано' && (
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Запчасти:</span>
                      <span className="font-medium">{analysisData.productServiceInterest.partsDescription}</span>
                    </div>
                  )}
                  {analysisData.productServiceInterest.desiredConfiguration !== 'не_указано' && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Комплектация:</span>
                      <span className="font-medium">{analysisData.productServiceInterest.desiredConfiguration}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Транскрипция в стиле WhatsApp */}
          <TranscriptChat
            segments={transcriptSegments}
            overallConfidence={transcriptData.overallConfidence}
            modelUsed={transcriptData.modelUsed}
            processingTimeMs={transcriptData.processingTimeMs}
            tokensUsed={transcriptData.tokensUsed}
            estimatedCost={transcriptData.estimatedCost}
            onSegmentClick={handleSegmentClick}
            onSegmentEdit={handleSegmentEdit}
          />

          {/* Чек-лист сервиса (перемещен под транскрипцию на всю ширину) */}
          {isServiceCall && (
            <div id="service-checklist">
              <ServiceChecklistDetailed 
                items={serviceChecklistData} 
                isServiceCall={isServiceCall}
              />
            </div>
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* AI-анализ */}
          <CallMetricsCard
            title="AI-анализ"
            icon={<Brain className="h-5 w-5" />}
            metrics={[
              { label: 'Настроение', value: (analysisData.sentimentScore * 100).toFixed(0), unit: '%', progress: analysisData.sentimentScore * 100 },
              { label: 'Качество обслуживания', value: analysisData.managerServiceQualityScore, unit: '/5', stars: analysisData.managerServiceQualityScore },
              { label: 'Удовлетворенность клиента', value: analysisData.clientSatisfactionScore, unit: '/5', stars: analysisData.clientSatisfactionScore },
              { label: 'Уверенность менеджера', value: (analysisData.managerConfidenceScore * 100).toFixed(0), unit: '%', progress: analysisData.managerConfidenceScore * 100 },
              { label: 'Полнота консультации', value: analysisData.consultationCompleteness === 'полная' ? '100%' : analysisData.consultationCompleteness === 'частичная' ? '60%' : '30%', unit: '', progress: analysisData.consultationCompleteness === 'полная' ? 100 : analysisData.consultationCompleteness === 'частичная' ? 60 : 30 }
            ]}
          />

          {/* Потенциал сделки */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-800 text-sm">
                <TrendingUp className="h-4 w-4" />
                Потенциал сделки
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Готовность клиента:</span>
                  <Badge variant="secondary" className={`text-xs ${
                    analysisData.clientReadinessLevel === 'высокая' ? 'bg-green-100 text-green-800 border-green-200' :
                    analysisData.clientReadinessLevel === 'средняя' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {analysisData.clientReadinessLevel}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Размер сделки:</span>
                  <Badge variant="secondary" className="text-xs">
                    {analysisData.expectedDealSizeCategory}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Приоритет связи:</span>
                  <Badge variant="secondary" className={`text-xs ${
                    analysisData.followUpPriority === 'высокий' ? 'bg-red-100 text-red-800 border-red-200' :
                    analysisData.followUpPriority === 'средний' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-green-100 text-green-800 border-green-200'
                  }`}>
                    {analysisData.followUpPriority}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Потребности клиента */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-800 text-sm">
                <User className="h-4 w-4" />
                Потребности клиента
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-purple-700">Потребности:</span>
                  <div className="space-y-1 mt-1">
                    {analysisData.clientNeeds.map((need, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-purple-200">
                        <CheckCircle className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-purple-700">{need}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-purple-700">Возражения:</span>
                  <div className="space-y-1 mt-1">
                    {analysisData.clientObjectionsConcerns.map((objection, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-purple-200">
                        <AlertTriangle className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-purple-700">{objection}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Детализированные действия */}
          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-indigo-800 text-sm">
                <Target className="h-4 w-4" />
                Детализированные действия
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-indigo-700">Для менеджера:</span>
                  <div className="space-y-1 mt-1">
                    {analysisData.actionItemsForManagerDetailed.map((action, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-indigo-200">
                        <Target className="h-3 w-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-indigo-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-indigo-700">Для клиента:</span>
                  <div className="space-y-1 mt-1">
                    {analysisData.actionItemsForClientDetailed.map((action, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-indigo-200">
                        <User className="h-3 w-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-indigo-700">{action.replace(/_/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Действия (компактная версия) */}
          <CallActionsCard
            title="Действия"
            icon={<Target className="h-5 w-5" />}
            items={[
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
              }
            ]}
            showActions={true}
          />

          {/* Упущенные возможности (расширенная версия) */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-800 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Упущенные возможности
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {analysisData.missedOpportunitiesDetailed.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-orange-200">
                    <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-orange-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Сильные стороны (расширенная версия) */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-800 text-sm">
                <Award className="h-4 w-4" />
                Сильные стороны
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {analysisData.managerStrengthsDetailed.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-green-200">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-green-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Лог изменений */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Лог изменений
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  Очистить
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center text-gray-500 text-sm py-4">
                Изменений пока нет. Попробуйте отредактировать транскрипцию!
              </div>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Всего сегментов:</span>
                  <Badge variant="secondary" className="text-xs">
                    {transcriptSegments.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Сотрудник - {callData.managerName}:</span>
                  <Badge variant="secondary" className="text-xs">
                    {transcriptSegments.filter(s => s.speaker === 'A').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Клиент - {callData.clientName}:</span>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                    {transcriptSegments.filter(s => s.speaker === 'B').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Средняя точность:</span>
                  <Badge variant="secondary" className="text-xs">
                    {transcriptData.overallConfidence ? `${(transcriptData.overallConfidence * 100).toFixed(0)}%` : '—'}
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

export default CallDetailsFinalPage; 