import { jwtDecode } from "jwt-decode";
import api from "./api";

export const authService = {
    register(data: {
        name: string;
        email: string;
        password: string;
    }) {
        return api.post("/auth/register", data);
    },

    login(data: {
        email: string;
        password: string;
    }) {
        return api.post("/auth/login", data);
    },

    registerAdmin(data: {
        name: string;
        email: string;
        password: string;
        role: "admin";
    }) {
        return api.post("/auth/register-admin", data);
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
