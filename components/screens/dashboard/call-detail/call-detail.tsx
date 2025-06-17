'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Download,
  ArrowLeft,
  Clock,
  User,
  Phone,
  Brain,
  FileText,
  MessageSquare,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCallAIAnalysis } from '@/services/api/queries/calls.queries';

interface CallDetailScreenProps {
  callId: string;
}

const CallDetailScreen = ({ callId }: CallDetailScreenProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [volume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedTranscriptTime, setSelectedTranscriptTime] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Получаем данные звонка и AI анализ
  const { data: aiAnalysis, isLoading } = useCallAIAnalysis(callId);

  // Mock данные звонка (в реальном приложении получали бы из API)
  const callData = {
    id: callId,
    phoneNumber: '+7 (495) 123-45-67',
    clientName: 'Михаил Козлов',
    managerName: 'Анна Смирнова',
    duration: 420,
    date: new Date().toISOString(),
    type: 'incoming' as const,
    status: 'completed' as const,
    recordingUrl: '/recordings/call-sample.mp3', // Это будет реальная ссылка
  };

  // Mock транскрипция с временными метками
  const transcriptSegments = [
    { time: 0, speaker: 'Менеджер', text: 'Здравствуйте! Автосалон "Премиум", меня зовут Анна. Чем могу помочь?' },
    { time: 8, speaker: 'Клиент', text: 'Добрый день! Я интересуюсь покупкой автомобиля. Хотел бы узнать о ваших предложениях.' },
    { time: 18, speaker: 'Менеджер', text: 'Отлично! Какая марка и модель вас интересует? Какой у вас бюджет?' },
    { time: 25, speaker: 'Клиент', text: 'Рассматриваю BMW X5 или Mercedes GLE. Бюджет до 6 миллионов рублей.' },
    { time: 35, speaker: 'Менеджер', text: 'Прекрасный выбор! У нас есть несколько отличных вариантов в этом сегменте. Вы рассматриваете покупку в кредит или за наличные?' },
    { time: 48, speaker: 'Клиент', text: 'Предпочел бы кредит. Какие у вас условия? И можно ли посмотреть автомобили сегодня?' },
    { time: 58, speaker: 'Менеджер', text: 'Конечно! Кредит от 0.1% годовых. Trade-in тоже возможен. Приезжайте сегодня после 14:00, покажу все модели.' },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = time;
    setCurrentTime(time);
    setSelectedTranscriptTime(time);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    seek(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSentimentBadge = (sentiment: string) => {
    const variants = {
      positive: 'success' as const,
      negative: 'destructive' as const,
      neutral: 'warning' as const,
    };
    
    const labels = {
      positive: 'Позитивный',
      negative: 'Негативный', 
      neutral: 'Нейтральный',
    };

    return (
      <Badge variant={variants[sentiment as keyof typeof variants]}>
        {labels[sentiment as keyof typeof labels]}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      {/* Хедер */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard" className="flex items-center space-x-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Назад к дашборду</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Звонок #{callId}</h1>
            <p className="text-muted-foreground">
              {new Date(callData.date).toLocaleString('ru-RU')}
            </p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center space-x-1">
          <Download className="h-4 w-4" />
          <span>Скачать запись</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основной контент */}
        <div className="lg:col-span-2 space-y-6">
          {/* Информация о звонке */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Номер телефона</p>
                    <p className="font-medium">{callData.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Клиент</p>
                    <p className="font-medium">{callData.clientName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Менеджер</p>
                    <p className="font-medium">{callData.managerName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Длительность</p>
                    <p className="font-medium">{formatTime(callData.duration)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Аудиоплеер */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5" />
                <span>Запись разговора</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <audio
                ref={audioRef}
                src={callData.recordingUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
              
              {/* Прогресс бар */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div 
                  className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    seek(percent * duration);
                  }}
                >
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>

              {/* Контролы */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => skipTime(-10)}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="w-12 h-12 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => skipTime(10)}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Скорость воспроизведения */}
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">Скорость:</span>
                {[0.5, 1, 1.25, 1.5, 2].map(rate => (
                  <Button
                    key={rate}
                    variant={playbackRate === rate ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setPlaybackRate(rate);
                      if (audioRef.current) {
                        audioRef.current.playbackRate = rate;
                      }
                    }}
                  >
                    {rate}x
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Транскрипция */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Транскрипция</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {transcriptSegments.map((segment, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTranscriptTime === segment.time
                        ? 'bg-primary/10 border border-primary'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => seek(segment.time)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-xs text-muted-foreground min-w-16">
                        {formatTime(segment.time)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">
                          {segment.speaker}
                        </div>
                        <div className="text-sm">{segment.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Боковая панель с AI анализом */}
        <div className="space-y-6">
          {/* AI Анализ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Анализ</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiAnalysis ? (
                <>
                  {/* Настроение */}
                  <div>
                    <p className="text-sm font-medium mb-2">Настроение</p>
                    <div className="flex items-center justify-between">
                      {getSentimentBadge(aiAnalysis.sentiment)}
                      <span className="text-sm text-muted-foreground">
                        {(aiAnalysis.sentimentScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Качество лида */}
                  <div>
                    <p className="text-sm font-medium mb-2">Качество лида</p>
                    <Badge variant={
                      aiAnalysis.leadQuality === 'hot' ? 'destructive' :
                      aiAnalysis.leadQuality === 'warm' ? 'warning' : 'secondary'
                    }>
                      {aiAnalysis.leadQuality === 'hot' ? 'Горячий' :
                       aiAnalysis.leadQuality === 'warm' ? 'Теплый' : 'Холодный'}
                    </Badge>
                  </div>

                  {/* Оценка удовлетворенности */}
                  <div>
                    <p className="text-sm font-medium mb-2">Удовлетворенность</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < aiAnalysis.satisfaction
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {aiAnalysis.satisfaction}/5
                      </span>
                    </div>
                  </div>

                  {/* Ключевые темы */}
                  <div>
                    <p className="text-sm font-medium mb-2">Ключевые темы</p>
                    <div className="flex flex-wrap gap-1">
                      {aiAnalysis.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Резюме */}
                  <div>
                    <p className="text-sm font-medium mb-2">Резюме</p>
                    <p className="text-sm text-muted-foreground">
                      {aiAnalysis.summary}
                    </p>
                  </div>

                  {/* Действия */}
                  <div>
                    <p className="text-sm font-medium mb-2">Рекомендуемые действия</p>
                    <ul className="space-y-1">
                      {aiAnalysis.actionItems.map((action, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                          <span className="text-primary">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <Brain className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">AI анализ недоступен</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Заметки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Заметки</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-32 p-3 border rounded-md resize-none text-sm"
                placeholder="Добавьте заметки к этому звонку..."
              />
              <Button className="w-full mt-3" size="sm">
                Сохранить заметки
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CallDetailScreen; 