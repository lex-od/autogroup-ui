import { z } from 'zod';

export const uploadCallSchema = z.object({
  file: z
    .instanceof(File)
    .nullable()
    .refine((file) => file, { message: 'Обязательно' })
    .refine((file) => file?.type.startsWith('audio/'), {
      message: 'Должен быть аудиофайлом',
    })
    .refine((file) => file && file.size <= 50 * 1024 * 1024, {
      message: 'Размер не должен превышать 50MB',
    }),
  managerName: z.string().trim().min(5, { message: 'Минимум 5 символов' }),
  callType: z.string().nonempty({ message: 'Обязательно' }),
  phoneNumber: z.string().min(10, { message: 'Минимум 10 символов' }),
  clientName: z.string().trim().min(5, { message: 'Минимум 5 символов' }),
});
