# Правила использования инструментов проекта

## Supabase

### Основное

- Supabase API - это основной api проекта, его папка сервиса - `services/api`
- Для запросов к Supabase API всегда используй экземпляр официального клиента `supabase` (импортируй из `lib/supabase.ts`), если для этого нет технических ограничений
- Если есть технические ограничения для использования клиента `supabase`, то используй `fetch`, с проверкой текущей сессии, как показано в примере, в разделе React Query
- Никогда не используй axios, он выводится из проекта

## React Query (@tanstack/react-query)

### Основное

- `QueryClient` и `QueryClientProvider` уже настроены и работают

### Паттерны использования

- Создавай кастомные хуки для каждого API запроса
- Все запросы располагай в папке соответствующего сервиса
- Внутри папки сервиса, запросы разделяй по файлам с крупными сущностями
- Например, call comments относи к calls, а users - выделяй в отдельную сущность
- Новые файлы сущностей именуй по паттерну `users.api.ts`
- Мутации размещай в одном файле с queries
- Саму отправку запроса клиентом размещай также в хуке, не выноси в отдельную функцию
- Выкидывай ошибку (`throw`) в функции запроса, если клиент не делает этого самостоятельно
- Делай инвалидацию при использовании хука запроса в компоненте, а не при объявлении в сервисе
- Внутри папки сервиса не создавай дополнительных вложенных папок
- Содержимое папки `services/api/queries` (если она существует) в новом функционале не используй

### Примеры хуков

```typescript
export interface CallDetailsResponse {
  // ...
}

export const useCallDetailsQuery = (
  id: string,
  queryOptions?: Partial<UseQueryOptions<CallDetailsResponse, PostgrestError>>,
) => {
  return useQuery({
    queryKey: ['call-details', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calls')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    ...queryOptions,
  });
};

// Upload Call Mutation
// Invalidate: ['calls']

export interface UploadCallParams {
  file: File;
  // ...
}

export const useUploadCallMutation = (
  mutationOptions?: UseMutationOptions<void, Error, UploadCallParams>,
) => {
  return useMutation({
    mutationFn: async (params) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No active session');
      }
      const formData = new FormData();
      formData.append('file', params.file);
      // ...

      const response = await fetch(
        `${supabaseUrl}/functions/v1/upload-handler`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
    },
    ...mutationOptions,
  });
};
```

## Zustand

### Основное

- Данные которые относятся к аутентификации размещаются в Auth store, все остальные данные - в Global store
- `AuthStoreProvider` и `GlobalStoreProvider` уже настроены и работают
- Используй стор Zustand только если для этого есть обоснованная необходимость
- В стандартном случае, для передачи данных в рамках одной страницы, используй состояние компонента и пропсы
- Никогда не создавай новые сторы
- В Global store используется разделение данных на слайсы по сущностям, к которым они относятся
- Самостоятельно не изменяй Auth store
- Если есть необходимость изменить Auth store - запроси разрешение пользователя

## Shadcn/UI

### Основное

- Всегда используй компоненты из Shadcn/ui, если они подходят в данном случае
- Исключения (не ипользуй): `ScrollArea`
- Для условного применения классов используй утилиту `cn` из `lib/utils`

## Styling и UI

### Tailwind CSS

- Для стилизации используй utility классы Tailwind
- Избегай произвольных значений без необходимости
- Никогда не создавай отдельные `.css` файлы
- Если есть обоснованная необходимость в создании `.css` файла - запроси разрешение пользователя

### Lucide React (иконки)

- Используй только иконки из lucide-react

## Формы и валидация

### React Hook Form

- Основной подход для форм - использование Shadcn/ui-компонентов из `components/ui/form.tsx`

### Zod валидация

- Основной подход для валидации форм - использование Zod

## Визуализация данных

### Recharts

- Используй Recharts для всех графиков и диаграмм
- Не добавляй новые библиотеки для графиков

## Уведомления и UI feedback

### Sonner (Toast)

- Используй Sonner для всех toast уведомлений

### Паттерны обратной связи

- Основной подход для показа loading-статуса при загрузке данных - использование skeleton loaders
- Для создания skeleton loaders используй компонент `Skeleton` из `components/ui/skeleton.tsx`

## Утилиты и хелперы

### Usehooks-ts

- Из Usehooks-ts можешь использовать только `useDebounceCallback` и `useDebounceValue`
- Самостоятельно не используй другие хуки из Usehooks-ts
- Если нужно использовать другие хуки из Usehooks-ts - запроси разрешение пользователя
