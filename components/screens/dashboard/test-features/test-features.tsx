'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase-config';

interface UploadData {
  file: File;
  managerName: string;
  clientName?: string;
  callType: 'incoming' | 'outgoing';
  phoneNumber?: string;
}

const TestFeatures = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadCall = async (data: UploadData) => {
    setUploading(true);
    setUploadProgress('Загрузка файла...');

    try {
      // Получаем текущий JWT токен
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Пользователь не авторизован');
      }

      // Создаем FormData
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('managerName', data.managerName);
      formData.append('callType', data.callType);

      if (data.clientName) {
        formData.append('clientName', data.clientName);
      }
      if (data.phoneNumber) {
        formData.append('phoneNumber', data.phoneNumber);
      }

      // Загружаем файл
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/upload-handler`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка загрузки');
      }

      const result = await response.json();
      setUploadProgress('Файл загружен, начата обработка...');

      return result;
    } catch {
      setUploadProgress('Ошибка загрузки файла');
    } finally {
      setUploading(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Сброс поля выбора файла
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    const data: UploadData = {
      file: selectedFile,
      managerName: 'Danya Shapovalov',
      callType: 'incoming',
      clientName: 'Привет ТОВ',
      phoneNumber: '+38 063 123 45 67',
    };
    await uploadCall(data);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
      <h1>Test features</h1>

      <div>
        <label
          htmlFor="file-upload"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Выберите аудиофайл:
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept="audio/*" // Принимаем только аудиофайлы
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full max-w-lg rounded-lg border border-gray-300 bg-white text-sm text-gray-900 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
          disabled={uploading}
        />
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-500">
            Выбран файл:{' '}
            <span className="font-semibold">{selectedFile.name}</span>
          </p>
        )}
      </div>

      <button
        className={
          'w-full max-w-lg rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:bg-gray-400'
        }
        onClick={handleUpload}
        disabled={uploading}
      >
        Загрузить файл
      </button>

      {uploading && <p>{uploadProgress}</p>}
    </div>
  );
};

export default TestFeatures;
