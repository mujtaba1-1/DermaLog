import { createContext, useState, useEffect, useContext } from "react";
import { getLogs } from "../api/logService";

const LogContext = createContext();

export const useLogs = () => useContext(LogContext);

const groupLogsByArea = (logs) => {
    const groups = {
      "Hands": [],
      "Face": [],
      "Arms": [],
      "Legs": [],
      "Torso": [],
      "Feet": []
    };

    logs.forEach(log => {
        if (groups[log.area]) {
            groups[log.area].push(log);
        }
    })

    return groups;
}

export const LogProvider = ({children}) => {
    const [logs, setLogs] = useState([]);
    const [areaGroups, setAreaGroups] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            console.log("Loading")
            const data = await getLogs();
            setLogs(data);
            setAreaGroups(groupLogsByArea(data));
            setError(false);
        } catch (err) {
            console.log("Failed to fetch logs", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <LogContext.Provider value={{ logs, areaGroups, loading, error, refreshLogs: fetchLogs }}>
            {children}
        </LogContext.Provider>
    );
}