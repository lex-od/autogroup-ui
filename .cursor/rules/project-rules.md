# Правила проекта AutoGroup UI

## Supabase

### Конфигурация и подключение
- Используй официальный @supabase/supabase-js клиент
- Создавай единый instance клиента в lib/supabase.ts
- Используй environment переменные для конфигурации
- Всегда проверяй статус подключения перед запросами

### Работа с данными
- Используй TypeScript типы для таблиц Supabase
- Генерируй типы автоматически через CLI
- Обрабатывай ошибки от Supabase явно
- Используй RLS (Row Level Security) для безопасности
- Применяй транзакции для связанных операций

### Аутентификация
- Используй Supabase Auth для всех операций с пользователями
- Проверяй сессии пользователей на каждом запросе
- Храни токены безопасно
- Реализуй автоматическое обновление токенов

## React Query (@tanstack/react-query)

### Настройка и конфигурация
- Настрой QueryClient с правильными defaults
- Используй React Query DevTools в development
- Настрой retry логику для разных типов запросов
- Конфигурируй stale time в зависимости от данных

### Паттерны использования
- Создавай кастомные хуки для каждого API запроса
- Используй query keys как массивы для иерархии
- Группируй связанные запросы по префиксам
- Используй mutations для изменения данных

### Кеширование и инвалидация
- Правильно настрой время жизни кеша
- Используй query invalidation после mutations
- Применяй optimistic updates для лучшего UX
- Настрой background refetching для актуальных данных

### Примеры хуков
```typescript
// Хук для получения групп
export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};

// Хук для создания группы
export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};
```

## Axios

### Конфигурация
- Создай base instance с общими настройками
- Настрой interceptors для auth токенов
- Добавь interceptors для обработки ошибок
- Используй timeout для всех запросов

### Обработка ошибок
- Создай централизованную обработку HTTP ошибок
- Различай типы ошибок (сеть, сервер, клиент)
- Показывай пользователю понятные сообщения
- Логируй ошибки для анализа

### Типизация
- Типизируй все request/response объекты
- Используй дженерики для переиспользуемых функций
- Создавай отдельные типы для разных API endpoints

## Zustand

### Структура Store
- Разделяй store по доменам (auth, groups, ui)
- Используй TypeScript для типизации store
- Создавай селекторы для оптимизации ререндеров
- Применяй immer для сложных обновлений состояния

### Паттерны
- Группируй связанные действия в одном store
- Используй middleware для логирования и персистентности
- Создавай computed values через селекторы
- Избегай излишней вложенности в состоянии

### Примеры store
```typescript
interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  login: async (credentials) => {
    set({ isLoading: true });
    // логика входа
    set({ user: result, isLoading: false });
  },
  logout: () => set({ user: null }),
}));
```

## Shadcn/UI

### Принципы использования
- Всегда используй существующие компоненты перед созданием новых
- Следуй дизайн-системе shadcn/ui
- Кастомизируй компоненты через CSS переменные
- Используй Radix UI примитивы как основу для новых компонентов

### Темизация
- Настрой CSS переменные для light/dark тем
- Используй next-themes для переключения тем
- Проверяй контрастность цветов для доступности
- Поддерживай системные предпочтения пользователя

### Кастомизация
- Расширяй существующие компоненты через composition
- Используй class-variance-authority для вариантов
- Применяй tailwind-merge для правильного слияния классов
- Создавай переиспользуемые варианты компонентов

## Styling и UI

### Tailwind CSS
- Используй только utility классы Tailwind
- Избегай произвольных значений без необходимости
- Применяй responsive дизайн через breakpoints
- Используй Tailwind компоненты для повторяющихся паттернов

### Lucide React (иконки)
- Используй только иконки из lucide-react
- Устанавливай одинаковый размер для связанных иконок
- Применяй семантически правильные иконки
- Используй aria-labels для accessibility

### Анимации
- Применяй CSS transitions для hover эффектов
- Используй animations для loading состояний
- Следуй принципу "меньше значит больше"
- Учитывай prefers-reduced-motion для accessibility

## Формы и валидация

### React Hook Form
- Используй React Hook Form для всех форм
- Настрай validation с помощью resolvers
- Применяй Controller для кастомных компонентов
- Используй формирование ошибок через формат

### Zod валидация
- Создавай схемы валидации для всех форм
- Используй Zod для runtime проверок API данных
- Применяй кастомные валидаторы при необходимости
- Типизируй формы через infer от Zod схем

### Примеры
```typescript
const groupSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  memberLimit: z.number().min(1).max(100),
});

type GroupFormData = z.infer<typeof groupSchema>;

const { register, handleSubmit, formState: { errors } } = useForm<GroupFormData>({
  resolver: zodResolver(groupSchema),
});
```

## Визуализация данных

### Recharts
- Используй Recharts для всех графиков и диаграмм
- Настрай responsive размеры через ResponsiveContainer
- Применяй единообразную цветовую схему
- Добавляй tooltips и legends для понятности

### Паттерны дизайна
- Используй loading скелетоны для графиков
- Показывай empty states когда нет данных
- Применяй анимации для привлечения внимания
- Делай графики доступными через ARIA атрибуты

## Уведомления и UI feedback

### Sonner (Toast)
- Используй Sonner для всех toast уведомлений
- Категоризируй уведомления по типам (success, error, info)
- Настрой правильные timeout значения
- Ограничивай количество одновременных уведомлений

### Паттерны обратной связи
- Показывай loading состояния для всех async операций
- Используй skeleton loaders для лучшего UX
- Подтверждай деструктивные действия через диалоги
- Предоставляй undo возможности где это уместно

## Работа с датами

### Date-fns
- Используй date-fns для всех операций с датами
- Применяй locale для локализации дат
- Форматируй даты консистентно по всему приложению
- Обрабатывай timezone корректно

### React Day Picker
- Используй для всех date picker компонентов
- Настрай локализацию на русский язык
- Применяй валидацию дат через min/max значения
- Интегрируй с React Hook Form правильно

## Утилиты и хелперы

### Usehooks-ts
- Используй готовые хуки вместо создания своих
- Применяй useLocalStorage для пользовательских настроек
- Используй useDebounce для поисковых запросов
- Применяй useOnClickOutside для модальных окон

### Class-variance-authority
- Создавай переиспользуемые компоненты с вариантами
- Типизируй варианты через TypeScript
- Комбинируй с clsx для условных стилей
- Применяй для создания дизайн-системы

### Clsx и Tailwind-merge
- Используй clsx для условного применения классов
- Применяй tailwind-merge для правильного объединения классов
- Создай утилиту cn() для комбинирования обеих библиотек

## Архитектура специфичных директорий

```
src/
├── stores/                      # Zustand stores
│   ├── auth.ts                 # Аутентификация
│   ├── groups.ts               # Управление группами  
│   └── ui.ts                   # UI состояние (модалы, sidebar)
├── api/                        # API слой
│   ├── supabase.ts            # Клиент Supabase
│   ├── http.ts                # Axios instance
│   ├── queries/               # React Query хуки
│   │   ├── groups.ts
│   │   └── auth.ts
│   └── mutations/             # Mutation хуки
│       ├── groups.ts
│       └── auth.ts
├── schemas/                    # Zod схемы валидации
│   ├── auth.ts
│   ├── groups.ts
│   └── api.ts
├── constants/                  # Константы приложения
│   ├── routes.ts              # Маршруты приложения
│   ├── api.ts                 # API endpoints
│   └── ui.ts                  # UI константы (размеры, цвета)
├── utils/                      # Утилиты
│   ├── auth.ts                # Хелперы для аутентификации
│   ├── date.ts                # Хелперы для дат
│   ├── format.ts              # Форматирование данных
│   └── validation.ts          # Валидационные хелперы
└── providers/                  # React провайдеры
    ├── QueryProvider.tsx      # React Query
    ├── ThemeProvider.tsx      # Темы
    └── AuthProvider.tsx       # Аутентификация
```

## Дополнительные принципы проекта

### Производительность
- Используй dynamic imports для тяжелых компонентов
- Применяй memo только там где это критично
- Оптимизируй bundle size через tree shaking
- Мониторь Core Web Vitals

### Безопасность
- Никогда не храни секреты в коде
- Валидируй все пользовательские данные
- Используй HTTPS для всех запросов
- Применяй Content Security Policy

### Тестирование (рекомендации для будущего)
- Покрывай критичные компоненты тестами
- Тестируй пользовательские сценарии
- Используй MSW для мокинга API
- Применяй E2E тесты для критичных путей