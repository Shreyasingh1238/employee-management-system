
const empModel = require("../models/empModel");

const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateEmployee = ({ name, email, role }) => {
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof role !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !role.trim()
  ) {
    throw makeError("Name, email and role are required", 400);
  }

  if (name.trim().length > 100 || role.trim().length > 100) {
    throw makeError("Name and role must not exceed 100 characters", 400);
  }

  if (email.trim().length > 150) {
    throw makeError("Email must not exceed 150 characters", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw makeError("Enter a valid email address", 400);
  }

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role.trim(),
  };
};

const validateId = (id) => {
  const employeeId = Number(id);

  if (!Number.isInteger(employeeId) || employeeId <= 0) {
    throw makeError("Invalid employee ID", 400);
  }

  return employeeId;
};

const handleDatabaseError = (error) => {
  if (error.code === "23505") {
    throw makeError("An employee with this email already exists", 409);
  }
  throw error;
};

const getAllEmployees = () => empModel.getAllEmployees();

const createEmployee = async (data) => {
  const employee = validateEmployee(data);

  try {
    return await empModel.createEmployee(employee);
  } catch (error) {
    handleDatabaseError(error);
  }
};

const updateEmployee = async (id, data) => {
  const employeeId = validateId(id);
  const employee = validateEmployee(data);

  try {
    const updated = await empModel.updateEmployee(employeeId, employee);

    if (!updated) throw makeError("Employee not found", 404);

    return updated;
  } catch (error) {
    if (error.statusCode) throw error;
    handleDatabaseError(error);
  }
};

const deleteEmployee = async (id) => {
  const employeeId = validateId(id);
  const deleted = await empModel.deleteEmployee(employeeId);

  if (!deleted) throw makeError("Employee not found", 404);

  return deleted;
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
