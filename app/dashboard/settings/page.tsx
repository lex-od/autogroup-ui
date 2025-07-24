'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Database,
  Upload,
  Download,
  RefreshCw,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

const SettingsPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Профиль', icon: User },
    { id: 'notifications', name: 'Уведомления', icon: Bell },
    { id: 'security', name: 'Безопасность', icon: Shield },
    { id: 'appearance', name: 'Внешний вид', icon: Palette },
    { id: 'system', name: 'Система', icon: Settings },
  ];

  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
        {/* Заголовок */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
          <p className="text-muted-foreground">
            Управление профилем, системными настройками и предпочтениями
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Боковая навигация */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Профиль пользователя</CardTitle>
                  <CardDescription>
                    Управление личной информацией и контактными данными
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя</Label>
                      <Input id="firstName" defaultValue="Test" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input id="lastName" defaultValue="User" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="test@autogroup.ru" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" defaultValue="+380123456789" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Отдел</Label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>Администрация</option>
                      <option>Продажи</option>
                      <option>Сервис</option>
                      <option>Запчасти</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Роль</Label>
                    <Input id="role" defaultValue="Администратор" disabled />
                    <p className="text-xs text-muted-foreground">
                      Для изменения роли обратитесь к системному администратору
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Сохранить изменения
                    </Button>
                    <Button variant="outline">
                      Отменить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                  <CardDescription>
                    Управление типами и способами получения уведомлений
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Новые звонки</p>
                        <p className="text-sm text-muted-foreground">
                          Уведомления о поступлении новых звонков
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-green-100 border-green-300">
                        ✓ Включено
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Завершение AI анализа</p>
                        <p className="text-sm text-muted-foreground">
                          Уведомления о завершении анализа звонков
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-green-100 border-green-300">
                        ✓ Включено
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Ошибки системы</p>
                        <p className="text-sm text-muted-foreground">
                          Критические ошибки и проблемы системы
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-green-100 border-green-300">
                        ✓ Включено
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Еженедельные отчеты</p>
                        <p className="text-sm text-muted-foreground">
                          Автоматические отчеты о производительности
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Отключено
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Способы уведомлений</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="bg-green-100 border-green-300">
                          ✓
                        </Button>
                        <span className="text-sm">Email уведомления</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          ○
                        </Button>
                        <span className="text-sm">SMS уведомления</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="bg-green-100 border-green-300">
                          ✓
                        </Button>
                        <span className="text-sm">Push уведомления в браузере</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Безопасность</CardTitle>
                  <CardDescription>
                    Настройки паролей, двухфакторной аутентификации и доступа
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Смена пароля</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Текущий пароль</Label>
                          <div className="relative">
                            <Input 
                              id="currentPassword" 
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Введите текущий пароль"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Новый пароль</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button size="sm">Изменить пароль</Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Двухфакторная аутентификация</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Дополнительная защита аккаунта</p>
                          <p className="text-xs text-muted-foreground">
                            Рекомендуем включить для повышения безопасности
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Настроить 2FA
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Активные сессии</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Текущая сессия</p>
                            <p className="text-xs text-muted-foreground">
                              Windows • Chrome • 192.168.1.100
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Активна</Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          Завершить все другие сессии
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle>Внешний вид</CardTitle>
                  <CardDescription>
                    Настройка темы, языка и интерфейса
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Тема</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        <div className="border rounded-lg p-3 cursor-pointer bg-primary text-primary-foreground">
                          <div className="text-sm font-medium">Светлая</div>
                          <div className="text-xs">По умолчанию</div>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer">
                          <div className="text-sm font-medium">Темная</div>
                          <div className="text-xs">Темный режим</div>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer">
                          <div className="text-sm font-medium">Авто</div>
                          <div className="text-xs">По системе</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Язык интерфейса</Label>
                      <select id="language" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="ru">Русский</option>
                        <option value="uk">Українська</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Часовой пояс</Label>
                      <select id="timezone" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="europe/kyiv">Europe/Kyiv (UTC+2)</option>
                        <option value="europe/moscow">Europe/Moscow (UTC+3)</option>
                        <option value="europe/minsk">Europe/Minsk (UTC+3)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Формат даты</Label>
                      <select id="dateFormat" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="dd.mm.yyyy">ДД.ММ.ГГГГ</option>
                        <option value="mm/dd/yyyy">ММ/ДД/ГГГГ</option>
                        <option value="yyyy-mm-dd">ГГГГ-ММ-ДД</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'system' && (
              <Card>
                <CardHeader>
                  <CardTitle>Системные настройки</CardTitle>
                  <CardDescription>
                    Управление системными параметрами и резервными копиями
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Резервное копирование</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">Автоматическое резервное копирование</p>
                            <p className="text-xs text-muted-foreground">
                              Создание резервных копий каждую неделю
                            </p>
                          </div>
                          <Button size="sm" variant="outline" className="bg-green-100 border-green-300">
                            ✓ Включено
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Скачать резервную копию
                          </Button>
                          <Button size="sm" variant="outline">
                            <Upload className="mr-2 h-4 w-4" />
                            Восстановить из копии
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Система</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Версия системы</Label>
                          <Input value="v1.2.3" disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Последнее обновление</Label>
                          <Input value="25.01.2025" disabled />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Проверить обновления
                        </Button>
                        <Button size="sm" variant="outline">
                          <Database className="mr-2 h-4 w-4" />
                          Очистить кэш
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Лимиты</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="maxFileSize">Максимальный размер файла (MB)</Label>
                          <Input id="maxFileSize" type="number" defaultValue="100" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxCalls">Максимальное количество звонков в день</Label>
                          <Input id="maxCalls" type="number" defaultValue="1000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="retentionDays">Срок хранения данных (дни)</Label>
                          <Input id="retentionDays" type="number" defaultValue="365" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Сохранить настройки
                    </Button>
                    <Button variant="outline">
                      Сбросить к умолчанию
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 