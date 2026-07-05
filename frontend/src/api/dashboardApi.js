import axios from "axios";

const BASE_URL = "http://localhost:5000/api/dashboard";

export const getAdminDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching Admin dashboard data:", error.response.data || error.message);
    throw error;
  }
};

export const getSchoolAdminDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/school-admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching School Admin dashboard data:", error.response.data || error.message);
    throw error;
  }
};
export const getTeacherDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/teacher`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching Teacher dashboard data:", error.response.data || error.message);
    throw error;
  }
};
export const getStudentDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching Student dashboard data:", error.response.data || error.message);
    throw error;
  }
};
