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
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCallDetailsQuery, useCallTranscriptQuery, useCallAnalysisQuery } from '@/services/api/calls-api';

interface CallDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CallDetailsPage: FC<CallDetailsPageProps> = ({ params }) => {
  // Все хуки должны быть в начале компонента
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Состояние для отслеживания процесса выполнения функций
  const [isRetranscribing, setIsRetranscribing] = React.useState(false);
  const [isPostprocessing, setIsPostprocessing] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  // Получаем ID звонка из параметров
  const callId = React.use(params).id;

  // Запросы данных
  const { data: callData, isPending: callPending } = useCallDetailsQuery(callId);
  const { data: transcriptData, isPending: transcriptPending } = useCallTranscriptQuery(callId);
  const { data: analysisData, isPending: analysisPending } = useCallAnalysisQuery(callId);

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

  const handleBackClick = () => {
    // Получаем все параметры из URL
    const params = new URLSearchParams(searchParams);
    // Удаляем параметр id, так как он не нужен на странице списка
    params.delete('id');
    
    // Формируем URL для возврата
    const backUrl = `/dashboard/calls${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(backUrl);
  };

  // Показываем загрузку если данные еще загружаются
  if (callPending || transcriptPending || analysisPending) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-lg">Загрузка данных звонка...</span>
          </div>
        </div>
      </div>
    );
  }

  // Показываем ошибку если данные не загрузились
  if (!callData) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ошибка загрузки</h2>
            <p className="text-muted-foreground mb-4">
              Не удалось загрузить данные звонка
            </p>
            <Button asChild>
              <Link href="/dashboard/calls">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться к звонкам
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Подготавливаем данные для отображения
  const displayCallData = {
    id: callData.id,
    originalFilename: callData.storagePath?.split('/').pop() || 'unknown.mp3',
    storagePath: callData.storagePath || '',
    fileSizeBytes: 0, // Будет получено из API
    duration: callData.duration || 0,
    callType: callData.callType,
    phoneNumber: callData.phoneNumber || undefined,
    clientName: callData.clientName || undefined,
    managerName: callData.managerName || 'Unknown',
    status: callData.status,
    callDate: callData.callDate || undefined,
    createdAt: callData.createdAt,
    processingStartedAt: callData.createdAt, // Временные данные
    processingCompletedAt: callData.createdAt, // Временные данные
    audioFormat: 'mp3',
    companyNumber: '+380441234567',
    companyNumberName: 'AUTOGROUP Центральный',
    waitTime: 5,
    eventType: 'call_completed',
    callStartedAt: callData.callDate || callData.createdAt,
    callEndedAt: callData.createdAt,
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

  // Подготавливаем данные анализа
  const displayAnalysisData = analysisData ? {
    sentimentLabel: analysisData.sentiment_label,
    sentimentScore: analysisData.sentiment_score,
    sentimentConfidence: analysisData.sentiment_confidence,
    topics: analysisData.topics || [],
    actionItems: analysisData.action_items || [],
    summary: analysisData.summary || '',
    serviceQualityScore: analysisData.service_quality_score || 0,
    missedOpportunities: analysisData.missed_opportunities || [],
    insights: analysisData.insights || {},
    callPurpose: 'консультация',
    clientSatisfactionScore: 4,
    managerConfidenceScore: 0.85,
    clientConfidenceScore: 0.75,
    managerStrengths: ['Профессионализм', 'Внимательность'],
    actionItemsForManager: ['Подготовить презентацию'],
    actionItemsForClient: ['Рассмотреть предложения'],
    recommendedNextSteps: ['Встреча в салоне'],
    summaryText: analysisData.summary || '',
    modelUsed: analysisData.model_used || 'unknown',
    processingTimeMs: analysisData.processing_time_ms || 0,
    tokensUsed: 1500,
    estimatedCost: 0.15,
    
    // Расширенные данные
    productServiceInterest: {
      brandModelCar: 'Не указано',
      serviceType: 'Не указано',
      desiredConfiguration: 'не_указано',
      desiredYear: 'Не указано',
      partsDescription: 'не_указано',
      budgetDiscussedRub: 0,
      currency: 'UAH'
    },
    clientNeeds: ['Консультация'],
    clientObjectionsConcerns: [],
    managerServiceQualityScore: analysisData.service_quality_score || 0,
    managerPoliteness: 'да',
    consultationCompleteness: 'полная',
    missedOpportunitiesDetailed: analysisData.missed_opportunities || [],
    managerStrengthsDetailed: ['Грамотная консультация'],
    clientReadinessLevel: 'средняя',
    expectedDealSizeCategory: 'средний',
    followUpPriority: 'средний',
    actionItemsForManagerDetailed: analysisData.action_items || [],
    actionItemsForClientDetailed: [],
    recommendedNextStepsDetailed: [],
    hasSpecialOffers: false,
    specialOffers: [],
    diagnosticType: 'Не указано'
  } : null;

  // Подготавливаем данные транскрипции
  const displayTranscriptData = transcriptData ? {
    id: transcriptData.id,
    fullText: transcriptData.full_text,
    language: transcriptData.language,
    speakersCount: transcriptData.speakers_count,
    overallConfidence: transcriptData.overall_confidence,
    wordCount: transcriptData.word_count,
    silenceDurationMs: transcriptData.silence_duration_ms,
    modelUsed: transcriptData.model_used,
    processingTimeMs: transcriptData.processing_time_ms,
    tokensUsed: 800,
    estimatedCost: 0.08
  } : null;

  // Подготавливаем сегменты транскрипции
  const transcriptSegments = transcriptData?.segments?.map((segment, index) => ({
    id: String(index + 1),
    start_ms: segment.start_ms,
    end_ms: segment.end_ms,
    speaker: segment.speaker,
    text: segment.text,
    role: segment.speaker === 'A' ? 'Менеджер' : 'Клиент',
    name: segment.speaker === 'A' ? callData.managerName || undefined : callData.clientName || undefined,
    confidence: segment.confidence || 0
  })) || [];

  // Определяем, является ли звонок сервисным (пока используем демо-логику)
  const isServiceCall = analysisData?.topics?.some(topic => ['сервис', 'обслуживание', 'ТО'].includes(topic)) || false;

  // Вычисляем итоговую оценку для сервисных звонков (демо-данные)
  const serviceScore = 6; // Демо-значение
  const maxServiceScore = 20; // Демо-значение
  const servicePercentage = maxServiceScore > 0 ? (serviceScore / maxServiceScore) * 100 : 0;

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

  // Демо-данные чек-листа сервиса (20 пунктов) - пока используем демо
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
    // ... остальные пункты чек-листа остаются без изменений
  ];

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
          <Button variant="ghost" size="sm" className="space-x-1" onClick={handleBackClick}>
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
                  Высокий приоритет
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
                      <span className="font-medium">Сервис</span>
                    </div>
                  </div>

                  {/* Ключевые темы */}
                  {displayAnalysisData && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">Ключевые темы:</span>
                      <div className="flex flex-wrap gap-1">
                        {displayAnalysisData.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

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
                      <span className="font-medium">{formatDuration(callData.duration || 0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Время ожидания:</span>
                      <span className="font-medium">5 сек</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Размер файла:</span>
                      <span className="font-medium">0.24 MB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Формат:</span>
                      <span className="font-medium uppercase">mp3</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Теги:</span>
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-xs">VIP</Badge>
                      <Badge variant="secondary" className="text-xs">Новый клиент</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Аудиоплеер */}
          <AudioPlayerSimple
            filename="call_recording.mp3"
            duration={callData.duration || 0}
            currentTime={45}
          />

          {/* Резюме звонка */}
          <CallSummaryCard
            summary={displayAnalysisData?.summaryText || displayAnalysisData?.summary || ''}
            callPurpose={displayAnalysisData?.callPurpose || 'консультация'}
            callOutcome="Консультация завершена успешно"
            participants={{
              manager: callData.managerName || 'Unknown',
              client: callData.clientName || 'Unknown'
            }}
          />

          {/* Транскрипция в стиле WhatsApp */}
          {displayTranscriptData && (
            <TranscriptChat
              segments={transcriptSegments}
              overallConfidence={displayTranscriptData.overallConfidence || undefined}
              modelUsed={displayTranscriptData.modelUsed}
              processingTimeMs={displayTranscriptData.processingTimeMs}
              tokensUsed={displayTranscriptData.tokensUsed}
              estimatedCost={displayTranscriptData.estimatedCost}
              onSegmentClick={handleSegmentClick}
              onSegmentEdit={handleSegmentEdit}
            />
          )}

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
          {displayAnalysisData && (
            <CallMetricsCard
              title="AI-анализ"
              icon={<Brain className="h-5 w-5" />}
              metrics={[
                { label: 'Настроение', value: (displayAnalysisData.sentimentScore * 100).toFixed(0), unit: '%', progress: displayAnalysisData.sentimentScore * 100 },
                { label: 'Качество обслуживания', value: displayAnalysisData.managerServiceQualityScore, unit: '/5', stars: displayAnalysisData.managerServiceQualityScore },
                { label: 'Удовлетворенность клиента', value: displayAnalysisData.clientSatisfactionScore, unit: '/5', stars: displayAnalysisData.clientSatisfactionScore },
                { label: 'Уверенность менеджера', value: (displayAnalysisData.managerConfidenceScore * 100).toFixed(0), unit: '%', progress: displayAnalysisData.managerConfidenceScore * 100 },
                { label: 'Полнота консультации', value: displayAnalysisData.consultationCompleteness === 'полная' ? '100%' : displayAnalysisData.consultationCompleteness === 'частичная' ? '60%' : '30%', unit: '', progress: displayAnalysisData.consultationCompleteness === 'полная' ? 100 : displayAnalysisData.consultationCompleteness === 'частичная' ? 60 : 30 }
              ]}
            />
          )}

          {/* Действия (компактная версия) */}
          {displayAnalysisData && (
            <CallActionsCard
              title="Действия"
              icon={<Target className="h-5 w-5" />}
              items={displayAnalysisData.actionItems.map((item, index) => ({
                id: String(index + 1),
                text: item,
                type: 'action' as const,
                priority: 'medium' as const,
                assignedTo: 'manager' as const
              }))}
              showActions={true}
            />
          )}

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

export default CallDetailsPage;
