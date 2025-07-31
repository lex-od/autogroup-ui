'use client';

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  UploadCallParams,
  useUploadCallMutation,
} from '@/services/api/calls.api';
import {
  UploadCallForm,
  uploadCallSchema,
  UploadCallValues,
} from './upload-call-form';

const UploadCall = () => {
  const queryClient = useQueryClient();

  const { mutate: uploadCall, isPending: uploadCallPending } =
    useUploadCallMutation({
      onSuccess: () => {
        toast.success('Файл успешно загружен');
        form.reset();
        queryClient.invalidateQueries({ queryKey: ['calls'] });
      },
      onError: () => {
        toast.error('Что-то пошло не так');
      },
    });

  const form = useForm<UploadCallValues>({
    resolver: zodResolver(uploadCallSchema),
    defaultValues: {
      file: null,
      managerName: '',
      callType: '',
      phoneNumber: '',
      clientName: '',
    },
  });

  const handleSubmit = useCallback(
    (values: UploadCallValues) => {
      uploadCall(values as UploadCallParams);
    },
    [uploadCall],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
      <UploadCallForm
        form={form}
        onSubmit={handleSubmit}
        isPending={uploadCallPending}
      />
    </div>
  );
};

export default UploadCall;
