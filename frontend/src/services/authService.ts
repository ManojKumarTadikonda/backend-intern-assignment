import axios from "axios";
import { jwtDecode } from "jwt-decode";
import api from "./api";
const API = `${import.meta.env.VITE_API_URL}/auth`;

export const authService = {
    register(data: any) {
        return axios.post(`${API}/register`, data);
    },
    login(data: any) {
        return axios.post(`${API}/login`, data);
    },
    registerAdmin: (data: {
        name: string;
        email: string;
        password: string;
        role: "admin";
    }) => {
        return api.post(`${API}/register-admin`, data);
    },

};

interface DecodedToken {
    userId: string;
    role: "user" | "admin";
    exp: number;
}

export function getUserRole(token: string): "user" | "admin" | null {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.role;
    } catch {
        return null;
    }
}