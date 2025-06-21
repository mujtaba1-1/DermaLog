import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./apiCreation";

export const login = async (userData) => {
    try {
        const response = await api.post('/login', userData);
        await AsyncStorage.setItem('jwt', response.data["jwtToken"]);
        
        const user = {
            id: response.data["id"],
            username: response.data["username"],
            email: response.data["email"],
            createdAt: response.data["createdAt"],
        }
        console.log(user)
        await AsyncStorage.setItem('user', JSON.stringify(user));


    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData)
    } catch (error) {
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