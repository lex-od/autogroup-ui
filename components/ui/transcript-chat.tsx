import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  User, 
  Users, 
  Clock, 
  Edit3, 
  Save, 
  X,
  Play,
  Zap,
  DollarSign,
  Brain,
  AlertTriangle,
  CheckCircle,
  History,
  RotateCcw
} from 'lucide-react';

interface TranscriptSegment {
  id: string;
  start_ms: number;
  end_ms: number;
  speaker: string;
  text: string;
  role?: string;
  name?: string;
  confidence: number;
  isEditing?: boolean;
  isManuallyEdited?: boolean;
  originalSpeaker?: string;
  originalText?: string;
  editHistory?: Array<{
    timestamp: string;
    field: 'text' | 'speaker';
    oldValue: string;
    newValue: string;
  }>;
}

interface TranscriptChatProps {
  segments: TranscriptSegment[];
  overallConfidence?: number;
  modelUsed?: string;
  processingTimeMs?: number;
  tokensUsed?: number;
  estimatedCost?: number;
  onSegmentClick?: (startMs: number) => void;
  onSegmentEdit?: (id: string, updates: Partial<TranscriptSegment>) => void;
  className?: string;
}

const TranscriptChat: React.FC<TranscriptChatProps> = ({
  segments,
  overallConfidence,
  modelUsed,
  processingTimeMs,
  tokensUsed,
  estimatedCost,
  onSegmentClick,
  onSegmentEdit,
  className = ''
}) => {
  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editSpeaker, setEditSpeaker] = useState('');
  const [localSegments, setLocalSegments] = useState<TranscriptSegment[]>(segments);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSegmentClick = (segment: TranscriptSegment) => {
    onSegmentClick?.(segment.start_ms);
  };

  const handleEditStart = (segment: TranscriptSegment) => {
    setEditingSegment(segment.id);
    setEditText(segment.text);
    setEditSpeaker(segment.speaker);
  };

  const handleEditSave = (segmentId: string) => {
    const segment = localSegments.find(s => s.id === segmentId);
    if (!segment) return;

    const updates: Partial<TranscriptSegment> = {
      text: editText,
      speaker: editSpeaker,
      isManuallyEdited: true,
      originalSpeaker: segment.originalSpeaker || segment.speaker,
      originalText: segment.originalText || segment.text,
      editHistory: [
        ...(segment.editHistory || []),
        {
          timestamp: new Date().toISOString(),
          field: editText !== segment.text ? 'text' : 'speaker',
          oldValue: editText !== segment.text ? segment.text : segment.speaker,
          newValue: editText !== segment.text ? editText : editSpeaker
        }
      ]
    };

    // Обновляем локальное состояние
    const updatedSegments = localSegments.map(s => 
      s.id === segmentId ? { ...s, ...updates } : s
    );
    setLocalSegments(updatedSegments);

    // Вызываем callback для сохранения
    onSegmentEdit?.(segmentId, updates);

    setEditingSegment(null);
    setEditText('');
    setEditSpeaker('');
  };

  const handleEditCancel = () => {
    setEditingSegment(null);
    setEditText('');
    setEditSpeaker('');
  };

  const handleRevertChanges = (segmentId: string) => {
    const segment = localSegments.find(s => s.id === segmentId);
    if (!segment || !segment.isManuallyEdited) return;

    const updates: Partial<TranscriptSegment> = {
      text: segment.originalText || segment.text,
      speaker: segment.originalSpeaker || segment.speaker,
      isManuallyEdited: false,
      originalSpeaker: undefined,
      originalText: undefined,
      editHistory: []
    };

    const updatedSegments = localSegments.map(s => 
      s.id === segmentId ? { ...s, ...updates } : s
    );
    setLocalSegments(updatedSegments);

    onSegmentEdit?.(segmentId, updates);
  };

  const getSpeakerColor = (speaker: string) => {
    const colors = {
      'A': 'bg-blue-100 text-blue-800 border-blue-200',
      'B': 'bg-green-100 text-green-800 border-green-200',
      'Менеджер': 'bg-blue-100 text-blue-800 border-blue-200',
      'Клиент': 'bg-green-100 text-green-800 border-green-200',
      'default': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[speaker as keyof typeof colors] || colors.default;
  };

  const getSpeakerPosition = (speaker: string) => {
    // Менеджер слева, клиент справа
    return speaker === 'A' || speaker === 'Менеджер' ? 'left' : 'right';
  };

  const getSpeakerName = (segment: TranscriptSegment) => {
    if (segment.name) return segment.name;
    if (segment.role) return segment.role;
    return segment.speaker === 'A' ? 'Менеджер' : 'Клиент';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Транскрипция
          <Badge variant="secondary" className="ml-2">
            Точность: {overallConfidence ? `${(overallConfidence * 100).toFixed(0)}%` : '—'}
          </Badge>
          {localSegments.some(s => s.isManuallyEdited) && (
            <Badge variant="outline" className="ml-2 bg-orange-50 text-orange-700 border-orange-200">
              <History className="h-3 w-3 mr-1" />
              Изменено вручную
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Чат транскрипции */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {localSegments.map((segment) => {
              const isLeft = getSpeakerPosition(segment.speaker) === 'left';
              const isEditing = editingSegment === segment.id;

              return (
                <div
                  key={segment.id}
                  className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${isLeft ? 'order-1' : 'order-2'}`}>
                    {/* Имя спикера с индикатором изменений */}
                    <div className={`flex items-center gap-2 mb-1 ${isLeft ? 'justify-start' : 'justify-end'}`}>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getSpeakerColor(segment.speaker)} ${
                          segment.isManuallyEdited ? 'ring-2 ring-orange-300' : ''
                        }`}
                      >
                        {getSpeakerName(segment)}
                        {segment.isManuallyEdited && (
                          <Edit3 className="h-3 w-3 ml-1" />
                        )}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(segment.start_ms)}
                      </span>
                      {segment.isManuallyEdited && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-4 w-4 p-0 text-orange-500 hover:text-orange-700"
                          onClick={() => handleRevertChanges(segment.id)}
                          title="Отменить изменения"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    {/* Сообщение */}
                    <div className={`relative group ${isLeft ? 'text-left' : 'text-right'}`}>
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="text-sm"
                          />
                          <div className="flex gap-2">
                            <Select value={editSpeaker} onValueChange={setEditSpeaker}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A">Менеджер</SelectItem>
                                <SelectItem value="B">Клиент</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" onClick={() => handleEditSave(segment.id)}>
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleEditCancel}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`inline-block p-3 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            isLeft 
                              ? 'bg-blue-50 border border-blue-200 hover:bg-blue-100' 
                              : 'bg-green-50 border border-green-200 hover:bg-green-100'
                          } ${
                            segment.isManuallyEdited ? 'ring-2 ring-orange-300 bg-orange-50' : ''
                          }`}
                          onClick={() => handleSegmentClick(segment)}
                        >
                          <p className="text-sm leading-relaxed">{segment.text}</p>
                          
                          {/* Индикатор изменений */}
                          {segment.isManuallyEdited && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-orange-600">
                              <Edit3 className="h-3 w-3" />
                              <span>Изменено вручную</span>
                            </div>
                          )}
                          
                          {/* Кнопки редактирования */}
                          <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditStart(segment);
                              }}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <div className="flex items-center gap-1">
                              <Play className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {formatTime(segment.end_ms - segment.start_ms)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Статистика изменений */}
          {localSegments.some(s => s.isManuallyEdited) && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Изменения в транскрипции</span>
              </div>
              <div className="text-xs text-orange-700 space-y-1">
                <p>• Изменено сегментов: {localSegments.filter(s => s.isManuallyEdited).length}</p>
                <p>• Всего изменений: {localSegments.reduce((sum, s) => sum + (s.editHistory?.length || 0), 0)}</p>
                <p>• Последнее изменение: {(() => {
                  const lastEdit = localSegments
                    .flatMap(s => s.editHistory || [])
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                  return lastEdit ? new Date(lastEdit.timestamp).toLocaleString('ru-RU') : '—';
                })()}</p>
              </div>
            </div>
          )}

          {/* Метаданные */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t">
            <span className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              Модель: {modelUsed}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Время обработки: {processingTimeMs}ms
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Токены: {tokensUsed}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              Стоимость: {estimatedCost} грн
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptChat; 