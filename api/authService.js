import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./apiCreation";

export const login = async (userData) => {
    try {
        const response = await api.post('/login', userData);
        await AsyncStorage.setItem('jwt', response.data);
    } catch (error) {
        console.log("Error logging in: ", error);
        throw error;
    }
}

export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData)
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
}

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('jwt')
    } catch (error) {
        throw error
    }
}