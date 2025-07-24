import axios from 'axios';
import { supabase } from './supabase';

export const axiosBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
});

// Интерцептор для добавления токена аутентификации
axiosBase.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

// Интерцептор для обработки ошибок аутентификации
axiosBase.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    // Перенаправляем на страницу входа при ошибке аутентификации
    window.location.href = '/auth/login';
  }
  throw error;
});
