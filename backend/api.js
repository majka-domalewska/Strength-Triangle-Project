import axios from "axios";

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const signupUser = async (email, password) => {
    try {
        const response = await api.post("/signup", { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Signup failed");
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        return response.data;
    } catch(error) {
        throw new Error(error.response?.data?.error || "Login failed" );
    }
};
