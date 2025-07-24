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

interface ProcessingMenuProps {
  onRetranscribe?: () => void
  onRolesPostprocess?: () => void
  onReAnalyze?: () => void
  isRetranscribing?: boolean
  isPostprocessing?: boolean
  isAnalyzing?: boolean
}

export function ProcessingMenu({
  onRetranscribe,
  onRolesPostprocess,
  onReAnalyze,
  isRetranscribing = false,
  isPostprocessing = false,
  isAnalyzing = false,
}: ProcessingMenuProps) {
  // Определяем, идет ли какая-либо обработка
  const isProcessing = isRetranscribing || isPostprocessing || isAnalyzing;

  return (
    <div className="relative">
      {/* Статус-бар процесса */}
      {isProcessing && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-pulse">
            {isRetranscribing && "🔄 Транскрипция..."}
            {isPostprocessing && "🧠 Обработка ролей..."}
            {isAnalyzing && "🤖 AI-анализ..."}
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
              // Анимация пульсации при обработке
              isProcessing && "animate-pulse bg-blue-50 border border-blue-200 shadow-md",
              // Дополнительная анимация для кнопки
              isProcessing && "scale-105"
            )}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            ) : (
              <Settings className="h-4 w-4" />
            )}
            <span className="sr-only">Открыть меню обработки</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56"
        >
          <DropdownMenuLabel className="flex items-center gap-2">
            <span>Обработка звонка</span>
            {isProcessing && (
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={onRetranscribe}
            disabled={isRetranscribing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200",
              isRetranscribing && "bg-blue-50 border-l-2 border-blue-500",
              isProcessing && !isRetranscribing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isRetranscribing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-600" />
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
                Выполняется...
              </span>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={onRolesPostprocess}
            disabled={isPostprocessing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200",
              isPostprocessing && "bg-blue-50 border-l-2 border-blue-500",
              isProcessing && !isPostprocessing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isPostprocessing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-600" />
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
                Выполняется...
              </span>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={onReAnalyze}
            disabled={isAnalyzing || isProcessing}
            className={cn(
              "cursor-pointer transition-all duration-200",
              isAnalyzing && "bg-blue-50 border-l-2 border-blue-500",
              isProcessing && !isAnalyzing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isAnalyzing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-600" />
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
                Выполняется...
              </span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 