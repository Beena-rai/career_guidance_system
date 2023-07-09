import axios from "axios";

export const addReport = async (payload) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/reports/add-report`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllReports = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/reports/get-all-reports`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllReportsByUser = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/reports/get-all-reports-by-user`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
