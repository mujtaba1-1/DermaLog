import api from "./apiCreation";

export const createLog = async (logData) => {
    try {
        const response = await api.post(`/log/create`, logData);
        return response.data;
    } catch (error) {
        console.log("Error creating log:", error);
        throw error;
    }
}

export const getLogs = async () => {
    try {
        const response = await api.get(`/logs`);
        return response.data;
    } catch (error) {
        console.log("Error getting logs:", error);
        throw error;
    }
}

export const updateLog = async (id, logData) => {
    try {
        const response = await api.put(`/log/${id}`, logData);
        return response.data;
    } catch (error) {
        console.log("Error updating log:", error);
        throw error;
    }
}

export const deleteLog = async (id) => {
    try {
        const response = await api.delete(`/log/${id}`);
    } catch (error) {
        console.log("Error deleting log:", error);
        throw error;
    }
}