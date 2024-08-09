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

// export const sendOtpEmail = (data)=>api.post('/api/send-otp-email',data);
// export const findUser = (data)=>api.post('/api/find-user',data);

export default api;