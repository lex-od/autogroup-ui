# Call Analytics AI - Backend Integration Guide

## 📋 Обзор проекта

**Call Analytics AI** - это веб-приложение для анализа телефонных звонков автомобильного холдинга с использованием искусственного интеллекта.

### Основные возможности:
- Транскрипция звонков (многоязычная, с определением спикеров)
- AI анализ (sentiment, темы, намерения, action items)  
- Визуализация трендов и производительности агентов
- Управление звонками и экспорт данных

### Технологический стек Frontend:
- **Framework**: Next.js 15 App Router
- **UI**: React 19 + TypeScript 5
- **Styling**: TailwindCSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query v5 + Axios
- **Forms**: React Hook Form + Zod validation

---

## 🏗️ Архитектура данных

### Основные сущности

#### 1. Users (Пользователи)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'analyst';
  avatar?: string;
  created_at: string;
  updated_at: string;
}
```

#### 2. Calls (Звонки)
```typescript
interface Call {
  id: string;
  type: 'incoming' | 'outgoing';
  status: 'completed' | 'missed' | 'in-progress';
  phoneNumber: string;
  clientName?: string;
  managerName: string;
  managerId: string;
  duration: number; // в секундах
  date: string; // ISO 8601
  recordingUrl?: string;
  created_at: string;
  updated_at: string;
  
  // Связанные данные
  transcript?: Transcript[];
  aiAnalysis?: AIAnalysis;
}
```

#### 3. Transcripts (Транскрипции)
```typescript
interface Transcript {
  id: string;
  call_id: string;
  start_ms: number;
  end_ms: number;
  speaker: 'A' | 'B'; // A - клиент, B - менеджер
  text: string;
  confidence?: number; // 0-1
  created_at: string;
}
```

#### 4. AI Analysis (ИИ Анализ)
```typescript
interface AIAnalysis {
  id: string;
  call_id: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentiment_score: number; // -1 до 1
  topics: string[]; // максимум 5 тем
  summary: string; // не более 120 слов
  action_items: string[]; // список задач
  language: string; // ru, en, etc.
  processing_status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}
```

---

## 🔌 API Endpoints

### Аутентификация

#### POST `/api/auth/login`
```json
// Request
{
  "email": "admin@autogroup.ru",
  "password": "password123"
}

// Response 200
{
  "user": {
    "id": "uuid",
    "name": "Администратор",
    "email": "admin@autogroup.ru", 
    "role": "admin"
  },
  "token": "jwt_token",
  "expires_in": 3600
}
```

#### POST `/api/auth/logout`
```json
// Request (с Bearer token в headers)
{}

// Response 200
{
  "message": "Successfully logged out"
}
```

### Звонки

#### GET `/api/calls`
**Параметры запроса:**
```typescript
interface CallsQuery {
  limit?: number; // default: 20, max: 100
  offset?: number; // default: 0
  search?: string; // поиск по номеру, имени клиента, менеджеру
  status?: 'all' | 'completed' | 'missed' | 'in-progress';
  type?: 'all' | 'incoming' | 'outgoing';
  sentiment?: 'all' | 'positive' | 'negative' | 'neutral';
  manager?: string; // имя менеджера или 'all'
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string; // YYYY-MM-DD
  sort?: 'date_desc' | 'date_asc' | 'duration_desc' | 'duration_asc';
}
```

**Ответ:**
```json
{
  "calls": [
    {
      "id": "uuid",
      "type": "incoming",
      "status": "completed",
      "phoneNumber": "+7 (495) 123-45-67",
      "clientName": "Михаил Козлов", 
      "managerName": "Анна Смирнова",
      "managerId": "uuid",
      "duration": 420,
      "date": "2025-06-17T16:54:00Z",
      "recordingUrl": "https://storage.example.com/recordings/uuid.wav",
      "aiAnalysis": {
        "sentiment": "positive",
        "sentiment_score": 0.7,
        "topics": ["покупка автомобиля", "тест-драйв"],
        "summary": "Клиент интересуется покупкой нового автомобиля...",
        "action_items": ["Назначить тест-драйв", "Подготовить коммерческое предложение"]
      }
    }
  ],
  "total": 248,
  "has_next": true,
  "has_prev": false
}
```

#### GET `/api/calls/{id}`
```json
{
  "id": "uuid",
  "type": "incoming",
  "status": "completed", 
  "phoneNumber": "+7 (495) 123-45-67",
  "clientName": "Михаил Козлов",
  "managerName": "Анна Смирнова",
  "managerId": "uuid",
  "duration": 420,
  "date": "2025-06-17T16:54:00Z",
  "recordingUrl": "https://storage.example.com/recordings/uuid.wav",
  "transcript": [
    {
      "id": "uuid",
      "start_ms": 0,
      "end_ms": 5000,
      "speaker": "A",
      "text": "Здравствуйте, меня интересует покупка автомобиля",
      "confidence": 0.95
    }
  ],
  "aiAnalysis": {
    "id": "uuid",
    "sentiment": "positive",
    "sentiment_score": 0.7,
    "topics": ["покупка автомобиля", "тест-драйв"],
    "summary": "Клиент интересуется покупкой нового автомобиля...",
    "action_items": ["Назначить тест-драйв", "Подготовить коммерческое предложение"],
    "language": "ru",
    "processing_status": "completed"
  }
}
```

#### POST `/api/calls`
**Загрузка аудиофайла (multipart/form-data):**
```
POST /api/calls
Content-Type: multipart/form-data

audio: File (wav, mp3, m4a, до 100MB, до 60 минут)
clientName?: string
managerName: string
type: 'incoming' | 'outgoing'
```

**Ответ:**
```json
{
  "id": "uuid",
  "status": "processing",
  "message": "Файл успешно загружен, начата обработка"
}
```

#### DELETE `/api/calls/{id}`
```json
// Response 200
{
  "message": "Звонок успешно удален"
}
```

#### POST `/api/calls/batch-delete`
```json
// Request
{
  "ids": ["uuid1", "uuid2", "uuid3"]
}

// Response 200  
{
  "deleted_count": 3,
  "message": "Звонки успешно удалены"
}
```

### Экспорт данных

#### POST `/api/calls/export`
```json
// Request
{
  "format": "csv" | "xlsx",
  "calls": ["uuid1", "uuid2"], // опционально, если не указано - экспорт всех
  "filters": {
    "dateFrom": "2025-01-01",
    "dateTo": "2025-12-31",
    "status": "completed"
  }
}

// Response 200
{
  "download_url": "https://api.example.com/downloads/export_uuid.csv",
  "expires_at": "2025-06-17T18:00:00Z"
}
```

### Аналитика и метрики

#### GET `/api/dashboard/stats`
```json
{
  "total_calls": 248,
  "today_calls": 4,
  "completed_calls": 180,
  "missed_calls": 15,
  "avg_duration": 312,
  "avg_sentiment": 0.3,
  "top_managers": [
    {
      "name": "Анна Смирнова",
      "calls_count": 45,
      "avg_sentiment": 0.6
    }
  ],
  "sentiment_trend": [
    {
      "date": "2025-06-17",
      "positive": 12,
      "neutral": 8,
      "negative": 3
    }
  ]
}
```

#### GET `/api/calls/{id}/ai-analysis`
```json
{
  "id": "uuid",
  "call_id": "uuid", 
  "sentiment": "positive",
  "sentiment_score": 0.7,
  "topics": ["покупка автомобиля", "тест-драйв", "кредит"],
  "summary": "Клиент интересуется покупкой нового автомобиля седан класса...",
  "action_items": [
    "Назначить тест-драйв на завтра",
    "Подготовить коммерческое предложение с вариантами кредита",
    "Отправить каталог моделей на email"
  ],
  "language": "ru",
  "processing_status": "completed",
  "created_at": "2025-06-17T16:55:00Z",
  "updated_at": "2025-06-17T16:56:30Z"
}
```

---

## 🔄 WebSocket Events (для real-time обновлений)

### Подключение
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/calls');
```

### События от сервера:
```json
// Обработка звонка завершена
{
  "type": "call_processed",
  "data": {
    "call_id": "uuid",
    "status": "completed",
    "has_analysis": true
  }
}

// Ошибка обработки
{
  "type": "call_processing_failed", 
  "data": {
    "call_id": "uuid",
    "error": "Unsupported audio format"
  }
}

// Новый звонок добавлен
{
  "type": "call_created",
  "data": {
    "call": { /* объект Call */ }
  }
}
```

---

## 🛡️ Аутентификация и авторизация

### JWT Token
- **Header**: `Authorization: Bearer <token>`
- **Expires**: 1 час
- **Refresh**: автоматический refresh через interceptors

### Роли доступа:
- **admin**: полный доступ ко всем данным
- **manager**: доступ только к своим звонкам  
- **analyst**: только чтение данных

---

## 📝 Валидация данных (Zod схемы)

```typescript
// Схема для создания звонка
const CreateCallSchema = z.object({
  type: z.enum(['incoming', 'outgoing']),
  clientName: z.string().optional(),
  managerName: z.string().min(1),
  phoneNumber: z.string().regex(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/)
});

// Схема для фильтров
const CallFiltersSchema = z.object({
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  search: z.string().optional(),
  status: z.enum(['all', 'completed', 'missed', 'in-progress']).default('all'),
  type: z.enum(['all', 'incoming', 'outgoing']).default('all'),
  sentiment: z.enum(['all', 'positive', 'negative', 'neutral']).default('all'),
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});
```

---

## 🚀 Требования к backend

### Обязательные возможности:
1. **Загрузка файлов**: поддержка wav, mp3, m4a (до 100MB)
2. **Транскрипция**: Whisper-large-v3 с диаризацией спикеров
3. **AI анализ**: интеграция с OpenAI GPT-4o для анализа
4. **Поиск**: full-text search по транскрипциям
5. **Экспорт**: генерация CSV/Excel файлов
6. **WebSocket**: real-time уведомления о статусе обработки

### База данных:
- **PostgreSQL** с индексами на created_at, user_id
- **Full-text search** индексы на transcript.text
- **Миграции**: Alembic
- **ORM**: SQLAlchemy

### Хранилище:
- **S3-compatible** (MinIO) для аудиофайлов
- Только URL и метаданные в БД

### Обработка:
- **Celery + Redis** для фоновых задач
- **Pipeline**: загрузка → транскрипция → анализ → сохранение

---

## 🔧 Настройка окружения

### Environment Variables:
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/call_analytics

# Storage
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=call-recordings

# AI Services  
OPENAI_API_KEY=your_openai_key
WHISPER_MODEL_PATH=/models/whisper-large-v3

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=3600

# CORS
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

---

## 📊 Мониторинг и логирование

### Метрики для отслеживания:
- Время обработки звонков
- Точность транскрипции  
- Использование AI API
- Размер загруженных файлов
- Ошибки обработки

### Логи:
- Все API запросы
- Ошибки обработки файлов
- AI анализ результаты
- WebSocket соединения

---

## 🧪 Тестирование

### Seed данные:
Создать скрипт для генерации тестовых данных:
- 2 демо пользователя (admin, manager)
- 10-20 тестовых звонков с транскрипциями
- Образцы аудиофайлов для тестирования

### Unit тесты:
- Все API endpoints
- Логика обработки звонков
- Валидация данных
- Аутентификация

---

Этот документ служит основой для реализации backend части проекта Call Analytics AI. Все API endpoints должны быть задокументированы в FastAPI Swagger UI по адресу `/docs`. 