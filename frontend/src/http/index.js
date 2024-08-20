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
export const judge = (language, code, testcases) => api.post('api/judge',{language, code, testcases});
export const judgeContest = (language, code, testcases) => api.post('api/judge-contest',{language, code, testcases});
export const judgeCustomTest = (language, code, correctCode, cases) => api.post('api/judgeCustomTest',{language, code, correctCode, testcases:cases})
export const getQuestion = (qid)=> api.post('/api/getQuestion',{qid});
export const submitQuestion = (questionData) => api.post('/api/submit-question', questionData);
export const createContest = (contestData) => api.post('/api/create-contest', contestData);
export const getAllQuestion = () => api.get('/api/get-all-question');
export const getAllContest = ()=> api.get('/api/get-all-contest');
export const getContest = (_id)=> api.post('/api/get-contest',{_id});
export const saveLeaderboard = (data)=> api.post('/api/saveLeaderboard',data);

export default api;