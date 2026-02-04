import axios from "axios";
const API = `${import.meta.env.VITE_API_URL}/auth`;

export const authService = {
    register(data: any) {
        return axios.post(`${API}/register`, data);
    },
    login(data: any) {
        return axios.post(`${API}/login`, data);
    },
};