'use client';

import { CallDetailsFinalV2 } from '@/components/screens/dashboard/call-details/call-details-final-v2';
import { ProcessingControls } from '@/components/ui/processing-controls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Settings, ChevronDown } from 'lucide-react';

export default function CallDetailsDemoPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Заголовок демо-страницы */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Демо: Детализация звонка</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Демонстрация всех возможностей страницы детализации звонка с новыми улучшениями
        </p>
      </div>

      {/* Новые функции */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Settings className="h-5 w-5" />
            Новые функции управления обработкой
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Выпадающее меню управления
              </h4>
              <p className="text-sm text-muted-foreground">
                Управление обработкой теперь спрятано под иконку шестеренки в правом верхнем углу. 
                При нажатии открывается выпадающее меню с тремя опциями:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Повторная транскрипция</li>
                <li>• Постобработка ролей</li>
                <li>• Повторный AI-анализ</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Info className="h-4 w-4" />
                Подсказки и цветовая схема
              </h4>
              <p className="text-sm text-muted-foreground">
                Добавлена иконка информации с подсказками о цветовой схеме:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Синий - обработка</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Зеленый - успех</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Красный - ошибка</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Серый - ожидание</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Статусы операций</h4>
            <p className="text-sm text-muted-foreground">
              Каждая операция показывает свой статус с соответствующими иконками и цветами. 
              Прогресс-бар отображается только во время активной обработки.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Управление обработкой */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Управление обработкой (вверху страницы)
        </h3>
        <ProcessingControls
          callId="demo-call-123"
          currentStatus="completed"
          onRetranscribe={() => {
            console.log('Retranscribe clicked');
            alert('Запущена повторная транскрипция');
          }}
          onPostProcessRoles={() => {
            console.log('Post process roles clicked');
            alert('Запущена постобработка ролей');
          }}
          onReanalyze={() => {
            console.log('Reanalyze clicked');
            alert('Запущен повторный AI-анализ');
          }}
        />
      </div>

      {/* Основной контент */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Детализация звонка</h3>
        <CallDetailsFinalV2 callId="demo-call-123" />
      </div>

      {/* Инструкции по тестированию */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="text-green-800">Как протестировать новую функциональность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium">1. Управление обработкой</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Нажмите на иконку шестеренки в правом верхнем углу блока "Управление обработкой"</li>
              <li>• Выберите любую из трех опций в выпадающем меню</li>
              <li>• Наблюдайте за изменением статусов и прогресс-бара</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">2. Подсказки</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Наведите курсор на иконку информации (i) рядом с заголовком</li>
              <li>• Увидите подсказку с объяснением цветовой схемы</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">3. Статусы операций</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Обратите внимание на цветные индикаторы статуса каждой операции</li>
              <li>• Во время обработки отображается анимированный прогресс-бар</li>
              <li>• После завершения статус автоматически сбрасывается через 3 секунды</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 