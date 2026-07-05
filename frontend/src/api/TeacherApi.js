import axios from "axios";

const Base_URL = "http://localhost:5000/api/teachers";

export const getAllTeachers = async () => { 
    try{
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Base_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching teachers:", error.response?.data || error.message);
        throw error;
    }
}

export const getTeacherById = async (teacherId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Base_URL}/${teacherId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching teacher by ID:", error);
        throw error;
    }

}

export const createTeacher = async (teacherData) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`${Base_URL}/`, teacherData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error creating teacher:", error.response?.data || error.message);
        throw error;
    }
}

export const updateTeacher = async (teacherId, teacherData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${Base_URL}/${teacherId}`, teacherData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating teacher:", error.response?.data || error.message);
        throw error;
    }
}

