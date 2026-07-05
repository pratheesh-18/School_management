import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const markAttendance = async (attendanceData) => {
  try {
    const response = await axios.post(API_URL, attendanceData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllAttendance = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudentAttendance = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/student/${studentId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyAttendance = async () => {
  try {
    const response = await axios.get(`${API_URL}/my`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
