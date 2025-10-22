import axios from "axios";
import { router } from '@/routes';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});


api.interceptors.request.use((config) => {
  // acessa o meta da rota atual
  const requiresAuth = router.currentRoute.value.meta.requiresAuth;

  if (requiresAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as any;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Não autorizado, redirecionar para login");
    }
    return Promise.reject(error);
  }
);

export default api;
