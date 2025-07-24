"use client"

import * as React from "react"
import { Settings, RefreshCw, Brain, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProcessingMenuProgressProps {
  onRetranscribe?: () => void
  onRolesPostprocess?: () => void
  onReAnalyze?: () => void
  isRetranscribing?: boolean
  isPostprocessing?: boolean
  isAnalyzing?: boolean
}

export function ProcessingMenuProgress({
  onRetranscribe,
  onRolesPostprocess,
  onReAnalyze,
  isRetranscribing = false,
  isPostprocessing = false,
  isAnalyzing = false,
}: ProcessingMenuProgressProps) {
  const [progress, setProgress] = React.useState(0);
  const isProcessing = isRetranscribing || isPostprocessing || isAnalyzing;

  // Анимация прогресса
  React.useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isProcessing]);

  return (
    <div className="relative">
      {/* Прогресс-бар над кнопкой */}
      {isProcessing && (
        <div className="absolute -top-3 left-0 right-0 z-50">
          <div className="bg-white rounded-full p-1 shadow-lg border">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="text-center mt-1">
            <span className="text-xs text-blue-600 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-8 w-8 transition-all duration-300",
              isProcessing && "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg",
              isProcessing && "animate-pulse"
            )}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Settings className="h-4 w-4" />
            )}
            <span className="sr-only">Открыть меню обработки</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex items-center gap-2">
            <span>Обработка звонка</span>
            {isProcessing && (
              <div className="flex-1">
                <Progress value={progress} className="h-1" />
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={onRetranscribe}
            disabled={isRetranscribing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200",
              isRetranscribing && "bg-gradient-to-r from-blue-50 to-blue-100 border-l-2 border-blue-500",
              isProcessing && !isRetranscribing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isRetranscribing ? (
              <div className="mr-2 w-4 h-4 relative">
                <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            <span className={cn(
              isRetranscribing && "font-medium text-blue-700"
            )}>
              Повторная транскрипция
            </span>
            {isRetranscribing && (
              <span className="ml-auto text-xs text-blue-600 font-medium">
                {Math.round(progress)}%
              </span>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={onRolesPostprocess}
            disabled={isPostprocessing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200",
              isPostprocessing && "bg-gradient-to-r from-blue-50 to-blue-100 border-l-2 border-blue-500",
              isProcessing && !isPostprocessing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isPostprocessing ? (
              <div className="mr-2 w-4 h-4 relative">
                <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <Brain className="mr-2 h-4 w-4" />
            )}
            <span className={cn(
              isPostprocessing && "font-medium text-blue-700"
            )}>
              Обработка ролей
            </span>
            {isPostprocessing && (
              <span className="ml-auto text-xs text-blue-600 font-medium">
                {Math.round(progress)}%
              </span>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={onReAnalyze}
            disabled={isAnalyzing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200",
              isAnalyzing && "bg-gradient-to-r from-blue-50 to-blue-100 border-l-2 border-blue-500",
              isProcessing && !isAnalyzing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isAnalyzing ? (
              <div className="mr-2 w-4 h-4 relative">
                <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <Brain className="mr-2 h-4 w-4" />
            )}
            <span className={cn(
              isAnalyzing && "font-medium text-blue-700"
            )}>
              Повторный AI-анализ
            </span>
            {isAnalyzing && (
              <span className="ml-auto text-xs text-blue-600 font-medium">
                {Math.round(progress)}%
              </span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 