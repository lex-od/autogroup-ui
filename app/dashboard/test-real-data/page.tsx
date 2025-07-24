"use client"

import React from 'react';
import { ProcessingMenuProgress } from '@/components/ui/processing-menu-progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TestRealDataPage: React.FC = () => {
  // Состояние для отслеживания процесса выполнения функций
  const [isRetranscribing, setIsRetranscribing] = React.useState(false);
  const [isPostprocessing, setIsPostprocessing] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  // Обработчики для функций обработки с реальными API вызовами
  const handleRetranscribe = async () => {
    setIsRetranscribing(true);
    try {
      console.log('🔄 Запуск повторной транскрипции...');
      
      // Здесь будет реальный вызов API
      // const response = await fetch('/api/calls/retranscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ callId: 'test-id' })
      // });
      
      // Имитация реальной задержки
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('✅ Повторная транскрипция завершена');
      // Здесь можно добавить обновление данных на странице
      
    } catch (error) {
      console.error('❌ Ошибка при повторной транскрипции:', error);
      // Здесь можно добавить уведомление об ошибке
    } finally {
      setIsRetranscribing(false);
    }
  };

  const handleRolesPostprocess = async () => {
    setIsPostprocessing(true);
    try {
      console.log('🧠 Запуск обработки ролей...');
      
      // Здесь будет реальный вызов API
      // const response = await fetch('/api/calls/roles-postprocess', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ callId: 'test-id' })
      // });
      
      // Имитация реальной задержки
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      console.log('✅ Обработка ролей завершена');
      // Здесь можно добавить обновление данных на странице
      
    } catch (error) {
      console.error('❌ Ошибка при обработке ролей:', error);
      // Здесь можно добавить уведомление об ошибке
    } finally {
      setIsPostprocessing(false);
    }
  };

  const handleReAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      console.log('🤖 Запуск повторного AI-анализа...');
      
      // Здесь будет реальный вызов API
      // const response = await fetch('/api/calls/re-analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ callId: 'test-id' })
      // });
      
      // Имитация реальной задержки
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      console.log('✅ Повторный AI-анализ завершен');
      // Здесь можно добавить обновление данных на странице
      
    } catch (error) {
      console.error('❌ Ошибка при повторном AI-анализе:', error);
      // Здесь можно добавить уведомление об ошибке
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
            Назад к эталонной странице
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Тест на реальных данных</h1>
          <p className="text-muted-foreground">
            Проверка ProcessingMenuProgress с имитацией реальных API вызовов
          </p>
        </div>
      </div>

      {/* Информация о тестировании */}
      <Card>
        <CardHeader>
          <CardTitle>Тестирование реальных функций</CardTitle>
          <CardDescription>
            Эта страница имитирует реальные API вызовы для функций обработки звонков.
            Откройте консоль браузера (F12) для просмотра логов.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <h3 className="font-semibold text-blue-600">🔄 Повторная транскрипция</h3>
              <p className="text-sm text-muted-foreground">
                Имитация вызова API для повторной транскрипции (3 сек)
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-purple-50">
              <h3 className="font-semibold text-purple-600">🧠 Обработка ролей</h3>
              <p className="text-sm text-muted-foreground">
                Имитация вызова API для обработки ролей (2.5 сек)
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-green-50">
              <h3 className="font-semibold text-green-600">🤖 AI-анализ</h3>
              <p className="text-sm text-muted-foreground">
                Имитация вызова API для повторного AI-анализа (4 сек)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Тестовый компонент */}
      <Card>
        <CardHeader>
          <CardTitle>ProcessingMenuProgress</CardTitle>
          <CardDescription>
            Нажмите на кнопку шестеренки и выберите функцию для тестирования
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

      {/* Инструкции */}
      <Card>
        <CardHeader>
          <CardTitle>Инструкции по тестированию</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <strong>1.</strong> Откройте консоль браузера (F12 → Console)
          </p>
          <p className="text-sm">
            <strong>2.</strong> Нажмите на кнопку шестеренки и выберите любую функцию
          </p>
          <p className="text-sm">
            <strong>3.</strong> Наблюдайте за анимацией прогресс-бара и логами в консоли
          </p>
          <p className="text-sm">
            <strong>4.</strong> Проверьте блокировку элементов во время обработки
          </p>
          <p className="text-sm">
            <strong>5.</strong> Попробуйте запустить несколько функций одновременно
          </p>
        </CardContent>
      </Card>

      {/* Ссылки на другие страницы */}
      <Card>
        <CardHeader>
          <CardTitle>Другие страницы для тестирования</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/call-details-final">
                Эталонная страница
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/processing-menu-demo">
                Демо всех анимаций
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/calls/test-id">
                Боевая страница
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestRealDataPage; 