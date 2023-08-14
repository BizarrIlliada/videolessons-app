import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://http-requests-practice-d4f8e-default-rtdb.europe-west1.firebasedatabase.app',
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', error)
    return Promise.reject(error);
  }
)

export default apiClient;
