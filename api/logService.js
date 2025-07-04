import api from "./apiCreation";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createLog = async (logData) => {
    try {
        const userString = await AsyncStorage.getItem('user');
        const userId = JSON.parse(userString).id;

        const response = await api.post(`/log/create/${userId}`, logData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getLogs = async () => {
    try {
        const userString = await AsyncStorage.getItem('user');
        const userId = JSON.parse(userString).id;

        const response = await api.get(`/logs/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateLog = async (id, logData) => {
    try {
        const userString = await AsyncStorage.getItem('user');
        const userId = JSON.parse(userString).id;

        const response = await api.put(`/log/${userId}/${id}`, logData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteLog = async (id) => {
    try {
        const response = await api.delete(`/log/${id}`);
    } catch (error) {
        throw error;
    }
}