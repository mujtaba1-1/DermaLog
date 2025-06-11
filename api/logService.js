import axios from "axios";

const API_BASE_URL = "http://192.168.0.101:8080"

export const createLog = async (logData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/log/create`, logData);
        return response.data;
    } catch (error) {
        console.log("Error creating log:", error);
        throw error;
    }
}

export const getLogs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logs`);
        return response.data;
    } catch (error) {
        console.log("Error getting logs:", error);
        throw error;
    }
}

export const updateLog = async (id, logData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/log/${id}`, logData);
        return response.data;
    } catch (error) {
        console.log("Error updating log:", error);
        throw error;
    }
}

export const deleteLog = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/log/${id}`);
    } catch (error) {
        console.log("Error deleting log:", error);
        throw error;
    }
}