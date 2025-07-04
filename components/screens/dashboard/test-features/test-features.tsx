'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  UploadCallParams,
  useUploadCallMutation,
} from '@/services/api/calls-api';

const TestFeatures = () => {
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadCall, isPending: uploadCallPending } =
    useUploadCallMutation({
      onSuccess: () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        queryClient.invalidateQueries({ queryKey: ['calls'] });
      },
    });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const params: UploadCallParams = {
      file: selectedFile,
      managerName: 'Iryna Volkova',
      callType: 'outgoing',
      clientName: 'Сидоров Тарас Игоревич',
      phoneNumber: '0991234569',
    };
    uploadCall(params);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
      <h1>Test features</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="block w-full max-w-lg rounded-lg border border-gray-300 bg-white text-sm text-gray-900 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
        disabled={uploadCallPending}
      />

      <button
        className="w-full max-w-lg rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:bg-gray-400"
        onClick={handleUpload}
        disabled={uploadCallPending}
      >
        Загрузить файл
      </button>
    </div>
  );
};

export default TestFeatures;
