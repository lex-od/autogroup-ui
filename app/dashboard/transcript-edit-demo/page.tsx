'use client';

import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TranscriptChat from '@/components/ui/transcript-chat';
import { 
  ArrowLeft, 
  Edit3, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare,
  FileText,
  History,
  Zap,
  Info,
  Play,
  Users,
  Clock
} from 'lucide-react';
import Link from 'next/link';

const TranscriptEditDemoPage: FC = () => {
  const [editLog, setEditLog] = useState<string[]>([]);

  // Демо-данные транскрипции с сегментами
  const initialSegments = [
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

  // Обработчики для транскрипции
  const handleSegmentClick = (startMs: number) => {
    const time = Math.floor(startMs / 1000);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    addToLog(`🎵 Переход к времени ${timeStr} в аудио`);
  };

  const handleSegmentEdit = (id: string, updates: any) => {
    if (updates.isManuallyEdited) {
      const field = updates.text !== undefined ? 'текст' : 'спикера';
      const newSpeaker = updates.speaker;
      const oldSpeaker = initialSegments.find(s => s.id === id)?.speaker;
      
      if (newSpeaker && oldSpeaker && newSpeaker !== oldSpeaker) {
        const speakerName = newSpeaker === 'A' ? 'Менеджер' : 'Клиент';
        const oldSpeakerName = oldSpeaker === 'A' ? 'Менеджер' : 'Клиент';
        addToLog(`🔄 Сообщение ${id} перемещено с ${oldSpeakerName} на ${speakerName}`);
      }
      
      if (updates.text !== undefined) {
        addToLog(`✏️ Изменен текст в сегменте ${id}`);
      }
      
      addToLog(`✅ Сегмент ${id} отмечен как измененный вручную`);
    }
  };

  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('ru-RU');
    setEditLog(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const clearLog = () => {
    setEditLog([]);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Хедер */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/call-details-demo">
            <Button variant="ghost" size="sm" className="space-x-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Назад к демо</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Демо: Редактирование транскрипции</h1>
            <p className="text-muted-foreground">
              Тестирование функциональности изменения текста и спикеров
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основной контент */}
        <div className="space-y-6 lg:col-span-2">
          {/* Инструкции */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Как тестировать редактирование
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">📝 Редактирование текста:</h4>
                  <ol className="space-y-1 text-sm">
                    <li>1. Наведите на любое сообщение</li>
                    <li>2. Нажмите кнопку редактирования (карандаш)</li>
                    <li>3. Измените текст в поле ввода</li>
                    <li>4. Нажмите "Сохранить"</li>
                    <li>5. Проверьте индикатор "Изменено вручную"</li>
                  </ol>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">🔄 Смена спикера:</h4>
                  <ol className="space-y-1 text-sm">
                    <li>1. Откройте редактирование сообщения</li>
                    <li>2. Измените спикера в выпадающем списке</li>
                    <li>3. Сохраните изменения</li>
                    <li>4. Увидите, как сообщение переместилось на другую сторону</li>
                    <li>5. Проверьте логи изменений справа</li>
                  </ol>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Важно!</span>
                </div>
                <p className="text-sm text-blue-700">
                  При смене спикера сообщение автоматически перемещается на соответствующую сторону чата. 
                  Все изменения отслеживаются и могут быть отменены кнопкой "Отменить изменения".
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Транскрипция */}
          <TranscriptChat
            segments={initialSegments}
            overallConfidence={0.95}
            modelUsed="groq-whisper-large-v3-turbo"
            processingTimeMs={1000}
            tokensUsed={800}
            estimatedCost={0.08}
            onSegmentClick={handleSegmentClick}
            onSegmentEdit={handleSegmentEdit}
          />
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Лог изменений */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Лог изменений
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={clearLog}
                  className="ml-auto"
                >
                  Очистить
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {editLog.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Изменений пока нет. Попробуйте отредактировать транскрипцию!
                  </p>
                ) : (
                  editLog.map((log, index) => (
                    <div key={index} className="text-xs p-2 bg-gray-50 rounded border">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Всего сегментов:</span>
                  <Badge variant="secondary">{initialSegments.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Менеджер (A):</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {initialSegments.filter(s => s.speaker === 'A').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Клиент (B):</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {initialSegments.filter(s => s.speaker === 'B').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Средняя точность:</span>
                  <Badge variant="secondary">
                    {(initialSegments.reduce((sum, s) => sum + s.confidence, 0) / initialSegments.length * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Возможности редактирования */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Возможности редактирования
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Изменение текста сообщений</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Смена спикера с автоматическим перемещением</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Отслеживание истории изменений</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Возможность отмены изменений</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Визуальные индикаторы изменений</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Кликабельные временные метки</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Цветовая схема */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Цветовая схема
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                  <span className="text-sm">Менеджер (слева)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                  <span className="text-sm">Клиент (справа)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded"></div>
                  <span className="text-sm">Изменено вручную</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
                  <span className="text-sm">Оригинальный текст</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranscriptEditDemoPage; 