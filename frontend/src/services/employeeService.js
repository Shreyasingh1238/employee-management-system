
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/employees`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const getEmployees = async () => {
  const response = await api.get("/");
  return response.data.data;
};

export const createEmployee = async (employee) => {
  const response = await api.post("/", employee);
  return response.data.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await api.put(`/${id}`, employee);
  return response.data.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const getApiErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "The request timed out. Please try again.";
    }

    if (!error.response) {
      return "Cannot connect to the server. Check that the backend is running.";
    }

    return (
      error.response.data?.message ||
      "Something went wrong while processing your request."
    );
  }

  return "An unexpected error occurred.";
};
