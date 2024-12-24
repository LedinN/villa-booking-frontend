import { LoginCredentials, RegistrationData } from "@/types/authTypes";
import apiClient from "./api";
import axios from "axios";

class AuthService {
    static async register(userData: RegistrationData) {
        try {
            const response = await apiClient.post("/auth/register", userData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
        console.error("Error during registration: ", error.response?.data || error.message);
            } else {
                console.error("Unexpected error: ", error)
            }
        throw error;
        }
    }

    static async login(credentials: LoginCredentials) {
        try {
            const response = await apiClient.post("/auth/login", credentials);
            return response.data;
        } catch(error) {
            if(axios.isAxiosError(error)) {
            console.error("Error during login: ", error.response?.data || error.message);
            } else {
                console.error("Unexpected error: ", error)
            }
            throw error;
        }
    }
}

export default AuthService;