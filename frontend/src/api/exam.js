import axios from "axios";

export const addExam = async (payload) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/exams/add`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllExams = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/exams/get-all-exams`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamById = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/exams/get-exam-by-id/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


export const editExamById = async (id, payload) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/exams/edit/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteExamById = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/exams/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addQuestion = async (payload) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/exams/add-question`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editQuestionById = async (id, payload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/exams/edit-question-in-exam/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteQuestionById = async (id, payload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/exams/delete-question/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
