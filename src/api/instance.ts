import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('isLogin');
      
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    // Генеруємо повний URL за допомогою вбудованого методу Axios
    const fullUrl = api.getUri(config);
    
    console.log(`🚀 Виконується запит на: ${fullUrl}`);
    console.log('Параметри запиту:', config.params);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;