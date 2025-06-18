# 📞 Call Analytics AI

> Веб-приложение для анализа телефонных звонков автомобильного холдинга с использованием искусственного интеллекта

## 🎯 Описание проекта

**Call Analytics AI** - это аналитический портал, который позволяет бизнес-пользователям загружать записи телефонных звонков и мгновенно получать:

- 🎤 **Транскрипцию** (многоязычную, с определением спикеров)
- 🤖 **AI анализ** (sentiment, темы, намерения, action items)  
- 📊 **Визуализацию трендов** и производительности агентов
- 📈 **Аналитику** по времени, менеджерам и клиентам

## 🛠️ Технологический стек

### Frontend (этот репозиторий)
- **Framework**: Next.js 15 с App Router
- **UI**: React 19 + TypeScript 5
- **Стилизация**: TailwindCSS 4
- **Компоненты**: Radix UI + собственная библиотека
- **Состояние**: Zustand для глобального состояния
- **Данные**: TanStack React Query v5 + Axios
- **Формы**: React Hook Form + Zod валидация
- **Иконки**: Lucide React

### Backend (требуется реализация)
- **API**: FastAPI (Python 3.12)
- **База данных**: PostgreSQL + SQLAlchemy + Alembic
- **Хранилище**: S3-compatible (MinIO) для аудиофайлов
- **AI**: Whisper-large-v3 + OpenAI GPT-4o
- **Очереди**: Celery + Redis
- **Аутентификация**: JWT + Google OAuth2

## 🏗️ Архитектура проекта

```
autogroup-ui/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Публичные страницы
│   ├── api/                      # API routes (mock)
│   ├── auth/                     # Страницы аутентификации
│   └── dashboard/                # Основное приложение
│       ├── calls/                # Журнал звонков
│       └── page.tsx              # Главная дашборда
├── components/                   # React компоненты
│   ├── client-layouts/           # Лайауты
│   ├── core/                     # Основные компоненты
│   ├── screens/                  # Экраны приложения
│   │   ├── auth/                 # Компоненты аутентификации
│   │   └── dashboard/            # Компоненты дашборда
│   └── ui/                       # UI библиотека
├── services/                     # API клиенты
│   └── api/queries/              # React Query хуки
├── stores/                       # Zustand хранилища
├── lib/                          # Утилиты и валидация
└── docs/                         # Документация
```

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ 
- npm или yarn

### Установка и запуск

1. **Клонирование репозитория**
```bash
git clone <repository-url>
cd autogroup-ui
```

2. **Установка зависимостей**
```bash
npm install
```

3. **Запуск в режиме разработки**
```bash
npm run dev
```

4. **Открыть в браузере**
```
http://localhost:3000
```

### Доступные команды

```bash
npm run dev          # Запуск в режиме разработки с Turbopack
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен сборки
npm run lint         # Проверка кода ESLint
```

## 📱 Основные экраны

### 🔐 Аутентификация
- **Login**: `/auth/login` - вход через email/пароль или Google OAuth

### 📊 Дашборд
- **Главная**: `/dashboard` - KPI метрики и сводка
- **Журнал звонков**: `/dashboard/calls` - управление и анализ звонков
- **Детали звонка**: `/dashboard/calls/[id]` - транскрипция + AI анализ

## 🎨 UI Библиотека

Проект использует собственную библиотеку UI компонентов в `components/ui/`:

- **Button, Input, Badge** - базовые элементы
- **Card, Table** - структурные компоненты  
- **DropdownMenu, Collapsible** - интерактивные элементы
- **DateRangePicker** - выбор периода дат
- **UserInfo** - информация о пользователе

Все компоненты следуют дизайн-системе и поддерживают темную тему.

## 🔌 Интеграция с Backend

### Готовые API клиенты
Проект содержит полностью готовые React Query хуки для всех операций:

```typescript
// Получение звонков с фильтрацией
const { data, isLoading } = useCalls({
  limit: 20,
  search: 'Михаил',
  dateFrom: '2025-01-01',
  sentiment: 'positive'
});

// Удаление звонка
const deleteCall = useDeleteCall();
await deleteCall.mutateAsync(callId);

// Экспорт данных
const exportCalls = useExportCalls();
await exportCalls.mutateAsync({ format: 'csv' });
```

### Mock API
В режиме разработки используются mock данные из `app/api/`. Для подключения реального backend измените `baseURL` в `services/api/api-client.ts`.

## 📋 Готовность к продакшену

### ✅ Реализовано
- [x] Полный UI/UX с адаптивным дизайном
- [x] Аутентификация (интерфейс + логика)
- [x] Журнал звонков с фильтрацией и поиском
- [x] Детальный просмотр звонков
- [x] Экспорт данных (интерфейс)
- [x] Real-time обновления (WebSocket готовность)
- [x] Валидация форм (Zod схемы)
- [x] Обработка ошибок и loading состояний
- [x] TypeScript типизация
- [x] Responsive дизайн

### 🔄 Требует backend интеграции
- [ ] API endpoints (см. `docs/API_INTEGRATION.md`)
- [ ] Загрузка и обработка аудиофайлов
- [ ] AI транскрипция и анализ
- [ ] База данных
- [ ] Аутентификация сервер

## 🧪 Тестирование

### Mock данные
Для демонстрации используются реалистичные mock данные:
- Различные типы звонков (входящие/исходящие)
- Статусы (завершенные/пропущенные/в процессе)
- AI анализ с sentiment и темами
- Транскрипции с временными метками

### Пользователи для тестирования
```typescript
// Администратор
email: admin@autogroup.ru
password: admin123

// Менеджер  
email: manager@autogroup.ru
password: manager123
```

## 📖 Документация

- **[API Integration Guide](docs/API_INTEGRATION.md)** - подробная спецификация для backend
- **[Component Library](components/ui/)** - документация UI компонентов
- **[Architecture](docs/ARCHITECTURE.md)** - архитектурные решения (TODO)

## 🎯 Roadmap

### Phase 1 - Backend Integration ⏳
- [ ] Подключение к реальному API
- [ ] Загрузка аудиофайлов
- [ ] WebSocket интеграция

### Phase 2 - Advanced Features 🔮
- [ ] Дашборд с графиками и метриками
- [ ] Управление пользователями
- [ ] Расширенная аналитика
- [ ] Интеграция с CRM

### Phase 3 - Enterprise 🚀
- [ ] Multi-tenancy поддержка
- [ ] Advanced permissions
- [ ] API для интеграций
- [ ] Mobile приложение

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Создайте Pull Request

## 📄 Лицензия

Этот проект создан для автомобильного холдинга AUTOGROUP.

---

**Статус проекта**: 🟢 Готов к backend интеграции

Для вопросов по интеграции обращайтесь к документации в `docs/API_INTEGRATION.md`
