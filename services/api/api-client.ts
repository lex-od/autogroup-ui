import axios from 'axios';

// Создаем базовый экземпляр axios
export const axiosBase = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем интерсептор для запросов (добавление токена авторизации)
axiosBase.interceptors.request.use(
  (config) => {
    // Здесь можно добавить токен авторизации из localStorage или cookie
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем интерсептор для ответов (обработка ошибок)
axiosBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Перенаправляем на страницу логина при ошибке авторизации
      localStorage.removeItem('auth-token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axiosBase; 