import axios from 'axios';

const api = axios.create(
    {
        withCredentials:true,
        baseURL:import.meta.env.VITE_BACKEND_URL,
        headers:{
            'Content-Type':'application/json',
            Accept: 'application/json',
        }
    }
);

//list of all endpoints

export const executeCode = (language, sourceCode, inputValue) => api.post('/api/run', { language, code: sourceCode, inputValue });
export const submitQuestion = (questionData) => api.post('/api/submit-question', questionData);

export default api;