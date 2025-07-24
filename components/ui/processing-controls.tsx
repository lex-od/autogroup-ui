"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, 
  RotateCcw, 
  Users, 
  Brain, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Info,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProcessingControlsProps {
  callId: string;
  currentStatus: string;
  onRetranscribe?: () => void;
  onPostProcessRoles?: () => void;
  onReanalyze?: () => void;
}

interface ProcessingStatus {
  retranscribe: 'idle' | 'processing' | 'success' | 'error';
  postProcessRoles: 'idle' | 'processing' | 'success' | 'error';
  reanalyze: 'idle' | 'processing' | 'success' | 'error';
}

export function ProcessingControls({
  callId,
  currentStatus,
  onRetranscribe,
  onPostProcessRoles,
  onReanalyze
}: ProcessingControlsProps) {
  const [status, setStatus] = useState<ProcessingStatus>({
    retranscribe: 'idle',
    postProcessRoles: 'idle',
    reanalyze: 'idle'
  });

  const [progress, setProgress] = useState(0);

  const handleAction = async (
    action: keyof ProcessingStatus,
    actionFunction?: () => void
  ) => {
    if (!actionFunction) return;

    setStatus(prev => ({ ...prev, [action]: 'processing' }));
    setProgress(0);

    // Симуляция прогресса
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await actionFunction();
      setStatus(prev => ({ ...prev, [action]: 'success' }));
    } catch (error) {
      setStatus(prev => ({ ...prev, [action]: 'error' }));
    } finally {
      clearInterval(interval);
      setProgress(0);
      // Сброс статуса через 3 секунды
      setTimeout(() => {
        setStatus(prev => ({ ...prev, [action]: 'idle' }));
      }, 3000);
    }
  };

  const getStatusIcon = (status: ProcessingStatus[keyof ProcessingStatus]) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: ProcessingStatus[keyof ProcessingStatus]) => {
    switch (status) {
      case 'processing':
        return 'Обработка...';
      case 'success':
        return 'Готово';
      case 'error':
        return 'Ошибка';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Управление обработкой</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <div className="space-y-2">
                    <p className="font-medium">Цветовая схема:</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Синий - обработка</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Зеленый - успех</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Красный - ошибка</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span>Серый - ожидание</span>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                onClick={() => handleAction('retranscribe', onRetranscribe)}
                disabled={status.retranscribe === 'processing'}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Повторная транскрипция</span>
                {getStatusIcon(status.retranscribe)}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => handleAction('postProcessRoles', onPostProcessRoles)}
                disabled={status.postProcessRoles === 'processing'}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>Постобработка ролей</span>
                {getStatusIcon(status.postProcessRoles)}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => handleAction('reanalyze', onReanalyze)}
                disabled={status.reanalyze === 'processing'}
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                <span>Повторный AI-анализ</span>
                {getStatusIcon(status.reanalyze)}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Статус текущего звонка */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Текущий статус:</span>
          <Badge variant={currentStatus === 'completed' ? 'default' : 'secondary'}>
            {currentStatus === 'completed' ? 'Завершен' : 'В обработке'}
          </Badge>
        </div>

        {/* Прогресс-бар для активной операции */}
        {(status.retranscribe === 'processing' || 
          status.postProcessRoles === 'processing' || 
          status.reanalyze === 'processing') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Прогресс обработки:</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Статусы операций */}
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              <span className="text-sm">Транскрипция</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.retranscribe)}
              <span className="text-xs text-muted-foreground">
                {getStatusText(status.retranscribe)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Роли спикеров</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.postProcessRoles)}
              <span className="text-xs text-muted-foreground">
                {getStatusText(status.postProcessRoles)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="text-sm">AI-анализ</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.reanalyze)}
              <span className="text-xs text-muted-foreground">
                {getStatusText(status.reanalyze)}
              </span>
            </div>
          </div>
        </div>

        {/* Информация о звонке */}
        <div className="text-xs text-muted-foreground">
          ID звонка: {callId}
        </div>
      </CardContent>
    </Card>
  );
} 