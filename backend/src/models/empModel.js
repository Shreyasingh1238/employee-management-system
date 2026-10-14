
const pool = require("../config/db");

const getAllEmployees = async () => {
  const result = await pool.query(
    "SELECT id, name, email, role, created_at FROM employees ORDER BY id DESC"
  );
  return result.rows;
};

const createEmployee = async ({ name, email, role }) => {
  const result = await pool.query(
    `INSERT INTO employees (name, email, role)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role, created_at`,
    [name, email, role]
  );
  return result.rows[0];
};

const updateEmployee = async (id, { name, email, role }) => {
  const result = await pool.query(
    `UPDATE employees
     SET name = $1, email = $2, role = $3
     WHERE id = $4
     RETURNING id, name, email, role, created_at`,
    [name, email, role, id]
  );
  return result.rows[0] || null;
};

const deleteEmployee = async (id) => {
  const result = await pool.query(
    "DELETE FROM employees WHERE id = $1 RETURNING id",
    [id]
  );
  return result.rows[0] || null;
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
