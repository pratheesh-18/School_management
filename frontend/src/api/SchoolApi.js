import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/schools';

export const getAllSchools = async () => {
  try{
      const token = localStorage.getItem("token");

  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
  }
  catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
  
};

export const createSchoolAdmin = async (userData) => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  }
  catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Request Data:", userData);
    throw error;
  }
}

export const approveSchool = async (schoolId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${BASE_URL}/approve/${schoolId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error approving school:", error);
    throw error;
  }
}

export const rejectSchool = async (schoolId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${BASE_URL}/reject/${schoolId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error rejecting school:", error);
    throw error;
  }
}