import axios from "axios";

const Base_URL = "http://localhost:5000/api/students";

export const getAllStudents = async () => { 
    try{
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Base_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}

export const getStudentById = async (studentId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Base_URL}/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching student by ID:", error);
        throw error;
    }

}

export const createStudent = async (studentData) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`${Base_URL}/`, studentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
}

export const deleteStudent = async (studentId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${Base_URL}/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting student:", error);
        throw error;
    }
}

export const updateStudent = async (studentId, studentData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${Base_URL}/${studentId}`, studentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating student:", error);
        throw error;
    }
}
