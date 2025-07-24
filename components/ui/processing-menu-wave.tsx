"use client"

import * as React from "react"
import { Settings, RefreshCw, Brain, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProcessingMenuWaveProps {
  onRetranscribe?: () => void
  onRolesPostprocess?: () => void
  onReAnalyze?: () => void
  isRetranscribing?: boolean
  isPostprocessing?: boolean
  isAnalyzing?: boolean
}

export function ProcessingMenuWave({
  onRetranscribe,
  onRolesPostprocess,
  onReAnalyze,
  isRetranscribing = false,
  isPostprocessing = false,
  isAnalyzing = false,
}: ProcessingMenuWaveProps) {
  const isProcessing = isRetranscribing || isPostprocessing || isAnalyzing;

  return (
    <div className="relative">
      {/* Волновая анимация */}
      {isProcessing && (
        <div className="absolute inset-0 -m-2">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-blue-500/15 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      )}

      {/* Статус с волновым эффектом */}
      {isProcessing && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-4 py-2 rounded-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <span className="relative z-10 font-medium">
              {isRetranscribing && "🔄 Транскрипция..."}
              {isPostprocessing && "🧠 Обработка ролей..."}
              {isAnalyzing && "🤖 AI-анализ..."}
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
              "h-8 w-8 transition-all duration-300 relative",
              isProcessing && "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg",
              isProcessing && "animate-bounce"
            )}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="relative">
                <Loader2 className="h-4 w-4 animate-spin" />
                {/* Вращающиеся точки вокруг иконки */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              </div>
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
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={onRetranscribe}
            disabled={isRetranscribing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200 relative overflow-hidden",
              isRetranscribing && "bg-gradient-to-r from-blue-50 to-purple-50 border-l-2 border-blue-500",
              isProcessing && !isRetranscribing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isRetranscribing && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent animate-pulse"></div>
            )}
            {isRetranscribing ? (
              <div className="mr-2 w-4 h-4 relative">
                <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 border-2 border-purple-300 rounded-full border-b-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
              </div>
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            <span className={cn(
              "relative z-10",
              isRetranscribing && "font-medium text-blue-700"
            )}>
              Повторная транскрипция
            </span>
            {isRetranscribing && (
              <span className="ml-auto text-xs text-blue-600 font-medium relative z-10">
                Выполняется...
              </span>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={onRolesPostprocess}
            disabled={isPostprocessing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200 relative overflow-hidden",
              isPostprocessing && "bg-gradient-to-r from-blue-50 to-purple-50 border-l-2 border-blue-500",
              isProcessing && !isPostprocessing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isPostprocessing && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent animate-pulse"></div>
            )}
            {isPostprocessing ? (
              <div className="mr-2 w-4 h-4 relative">
                <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 border-2 border-purple-300 rounded-full border-b-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
              </div>
            ) : (
              <Brain className="mr-2 h-4 w-4" />
            )}
            <span className={cn(
              "relative z-10",
              isPostprocessing && "font-medium text-blue-700"
            )}>
              Обработка ролей
            </span>
            {isPostprocessing && (
              <span className="ml-auto text-xs text-blue-600 font-medium relative z-10">
                Выполняется...
              </span>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={onReAnalyze}
            disabled={isAnalyzing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200 relative overflow-hidden",
              isAnalyzing && "bg-gradient-to-r from-blue-50 to-purple-50 border-l-2 border-blue-500",
              isProcessing && !isAnalyzing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent animate-pulse"></div>
            )}
            {isAnalyzing ? (
              <div className="mr-2 w-4 h-4 relative">
                <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 border-2 border-purple-300 rounded-full border-b-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
              </div>
            ) : (
              <Brain className="mr-2 h-4 w-4" />
            )}
            <span className={cn(
              "relative z-10",
              isAnalyzing && "font-medium text-blue-700"
            )}>
              Повторный AI-анализ
            </span>
            {isAnalyzing && (
              <span className="ml-auto text-xs text-blue-600 font-medium relative z-10">
                Выполняется...
              </span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 