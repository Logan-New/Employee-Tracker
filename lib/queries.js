const db = require('../db/connection.js'); // Adjust the path to your database connection file

// Get all departments
const getDepartments = async () => {
    const result = await db.query('SELECT * FROM departments');
    return result.rows;
};

// Get all roles
const getRoles = async () => {
    const result = await db.query(`
        SELECT roles.id, roles.title, roles.salary, departments.name AS department
        FROM roles
        JOIN departments ON roles.department_id = departments.id
    `);
    return result.rows;
};

// Get all employees
const getEmployees = async () => {
    const result = await db.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, departments.name AS department, roles.salary, manager.first_name AS manager
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id
    `);
    return result.rows;
};

// Add a department
const addDepartment = async (name) => {
    const result = await db.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
};

// Add a role
const addRole = async (title, salary, departmentId) => {
    const result = await db.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
    return result.rows[0];
};

// Add an employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const result = await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
    return result.rows[0];
};

// Update an employee role
const updateEmployeeRole = async (employeeId, roleId) => {
    const result = await db.query('UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *', [roleId, employeeId]);
    return result.rows[0];
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
