
const employeeServices = require("../services/employeeServices");

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await employeeServices.getAllEmployees();
  res.status(200).json({ success: true, data: employees });
});

const createEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeServices.createEmployee(req.body);
  res.status(201).json({ success: true, data: employee });
});

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeServices.updateEmployee(
    req.params.id,
    req.body
  );
  res.status(200).json({ success: true, data: employee });
});

const deleteEmployee = asyncHandler(async (req, res) => {
  await employeeServices.deleteEmployee(req.params.id);
  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
