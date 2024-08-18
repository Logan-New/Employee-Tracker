const inquirer = require('inquirer');
const {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} = require('./lib/queries');

const mainMenu = () => {
    const menuOptions = [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
    ];

    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: menuOptions,
    }).then(({ action }) => {
        switch (action) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                promptAddDepartment();
                break;
            case 'Add a role':
                promptAddRole();
                break;
            case 'Add an employee':
                promptAddEmployee();
                break;
            case 'Update an employee role':
                promptUpdateEmployeeRole();
                break;
            case 'Exit':
                process.exit();
        }
    });
};

const viewDepartments = async () => {
    try {
        const departments = await getDepartments();
        console.table(departments);
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
    mainMenu();
};

const viewRoles = async () => {
    try {
        const roles = await getRoles();
        console.table(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
    }
    mainMenu();
};

const viewEmployees = async () => {
    try {
        const employees = await getEmployees();
        console.table(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
    mainMenu();
};

const promptAddDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
    }).then(async ({ name }) => {
        try {
            const department = await addDepartment(name);
            console.log(`Added ${department.name} to the database`);
        } catch (error) {
            console.error("Error adding department:", error);
        }
        mainMenu();
    });
};

const promptAddRole = async () => {
    try {
        const departments = await getDepartments();
        const departmentChoices = departments.map(({ id, name }) => ({
            name,
            value: id,
        }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select the department for the role:',
                choices: departmentChoices,
            },
        ]).then(async ({ title, salary, department_id }) => {
            try {
                const role = await addRole(title, salary, department_id);
                console.log(`Added ${role.title} to the database`);
            } catch (error) {
                console.error("Error adding role:", error);
            }
            mainMenu();
        });
    } catch (error) {
        console.error("Error fetching departments:", error);
        mainMenu();
    }
};

const promptAddEmployee = async () => {
    try {
        const roles = await getRoles();
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

        const employees = await getEmployees();
        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));
        managerChoices.unshift({ name: 'None', value: null });

        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Enter the employee's first name:",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Enter the employee's last name:",
            },
            {
                type: 'list',
                name: 'role_id',
                message: "Select the employee's role:",
                choices: roleChoices,
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Select the employee's manager:",
                choices: managerChoices,
            },
        ]).then(async ({ first_name, last_name, role_id, manager_id }) => {
            try {
                const employee = await addEmployee(first_name, last_name, role_id, manager_id);
                console.log(`Added ${employee.first_name} ${employee.last_name} to the database`);
            } catch (error) {
                console.error("Error adding employee:", error);
            }
            mainMenu();
        });
    } catch (error) {
        console.error("Error fetching roles or employees:", error);
        mainMenu();
    }
};

const promptUpdateEmployeeRole = async () => {
    try {
        const employees = await getEmployees();
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));

        const roles = await getRoles();
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Select the employee to update:',
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the new role for the employee:',
                choices: roleChoices,
            },
        ]).then(async ({ employee_id, role_id }) => {
            try {
                const employee = await updateEmployeeRole(employee_id, role_id);
                console.log(`Updated ${employee.first_name} ${employee.last_name}'s role`);
            } catch (error) {
                console.error("Error updating employee role:", error);
            }
            mainMenu();
        });
    } catch (error) {
        console.error("Error fetching employees or roles:", error);
        mainMenu();
    }
};

// Start the application
mainMenu();