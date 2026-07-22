import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vibecheck-backend-hyhv.onrender.com/api',
});

// Auto-attach JWT token to every single backend request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('vibe_token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTVkMGY0NzllZjA3MjExOWQxZjVkOSIsImlhdCI6MTc3OTgxNDY0NCwiZXhwIjoxNzgwNDE5NDQ0fQ.6LguQAdr1qLZW4pch9VB7gw8nalL7CAMwyChNF2fhf4";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
