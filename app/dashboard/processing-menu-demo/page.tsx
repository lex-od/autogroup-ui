"use client"

import React from 'react';
import { ProcessingMenu } from '@/components/ui/processing-menu';
import { ProcessingMenuProgress } from '@/components/ui/processing-menu-progress';
import { ProcessingMenuWave } from '@/components/ui/processing-menu-wave';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ProcessingMenuDemoPage: React.FC = () => {
  // Состояние для отслеживания процесса выполнения функций
  const [isRetranscribing, setIsRetranscribing] = React.useState(false);
  const [isPostprocessing, setIsPostprocessing] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  // Обработчики для функций обработки
  const handleRetranscribe = async () => {
    setIsRetranscribing(true);
    try {
      console.log('Запуск повторной транскрипции...');
      await new Promise(resolve => setTimeout(resolve, 3000)); // Имитация задержки
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
      console.log('Запуск обработки ролей...');
      await new Promise(resolve => setTimeout(resolve, 2500)); // Имитация задержки
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
      console.log('Запуск повторного AI-анализа...');
      await new Promise(resolve => setTimeout(resolve, 4000)); // Имитация задержки
      console.log('Повторный AI-анализ завершен');
    } catch (error) {
      console.error('Ошибка при повторном AI-анализе:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Хедер */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/call-details-final">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к деталям звонка
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Демо анимаций ProcessingMenu</h1>
          <p className="text-muted-foreground">
            Тестирование различных вариантов анимации загрузки
          </p>
        </div>
      </div>

      {/* Информация о вариантах */}
      <Card>
        <CardHeader>
          <CardTitle>Варианты анимации</CardTitle>
          <CardDescription>
            Выберите любой из трех вариантов для тестирования. Каждый имеет уникальный стиль анимации.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-blue-600">1. Спиннер с пульсацией</h3>
              <p className="text-sm text-muted-foreground">
                Классический спиннер с эффектом пульсации кнопки и статус-баром
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-purple-600">2. Прогресс-бар</h3>
              <p className="text-sm text-muted-foreground">
                Анимированный прогресс-бар с процентами выполнения
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-green-600">3. Волновая анимация</h3>
              <p className="text-sm text-muted-foreground">
                Эффект волны с градиентами и множественными анимациями
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Демо вариантов */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Вариант 1: Спиннер с пульсацией */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Спиннер с пульсацией</CardTitle>
            <CardDescription>
              Классический вариант с пульсирующей кнопкой
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ProcessingMenu 
              onRetranscribe={handleRetranscribe}
              onRolesPostprocess={handleRolesPostprocess}
              onReAnalyze={handleReAnalyze}
              isRetranscribing={isRetranscribing}
              isPostprocessing={isPostprocessing}
              isAnalyzing={isAnalyzing}
            />
          </CardContent>
        </Card>

        {/* Вариант 2: Прогресс-бар */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Прогресс-бар</CardTitle>
            <CardDescription>
              С анимированным прогресс-баром и процентами
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ProcessingMenuProgress 
              onRetranscribe={handleRetranscribe}
              onRolesPostprocess={handleRolesPostprocess}
              onReAnalyze={handleReAnalyze}
              isRetranscribing={isRetranscribing}
              isPostprocessing={isPostprocessing}
              isAnalyzing={isAnalyzing}
            />
          </CardContent>
        </Card>

        {/* Вариант 3: Волновая анимация */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Волновая анимация</CardTitle>
            <CardDescription>
              С эффектом волны и градиентами
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ProcessingMenuWave 
              onRetranscribe={handleRetranscribe}
              onRolesPostprocess={handleRolesPostprocess}
              onReAnalyze={handleReAnalyze}
              isRetranscribing={isRetranscribing}
              isPostprocessing={isPostprocessing}
              isAnalyzing={isAnalyzing}
            />
          </CardContent>
        </Card>
      </div>

      {/* Инструкции */}
      <Card>
        <CardHeader>
          <CardTitle>Инструкции по тестированию</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <strong>1.</strong> Нажмите на любую кнопку шестеренки, чтобы открыть меню
          </p>
          <p className="text-sm">
            <strong>2.</strong> Выберите любую функцию (транскрипция, обработка ролей, AI-анализ)
          </p>
          <p className="text-sm">
            <strong>3.</strong> Наблюдайте за анимацией загрузки и блокировкой элементов
          </p>
          <p className="text-sm">
            <strong>4.</strong> Попробуйте разные функции одновременно для тестирования блокировки
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessingMenuDemoPage; 