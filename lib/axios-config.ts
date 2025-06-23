import axios from 'axios';

export const axiosBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
});

// export const setupAxiosInterceptors = (
//   authStoreApi: AuthStoreApi,
//   queryClient: QueryClient,
// ) => {
//   axiosBase.interceptors.request.use((config) => {
//     const token = authStoreApi.getState().token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

//   axiosBase.interceptors.response.use(undefined, (error) => {
//     if (error.response?.status === 401) {
//       authStoreApi.getState().unsetToken();
//       queryClient.clear();
//     }
//     throw error;
//   });
// };
