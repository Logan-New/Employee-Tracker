# Employee Management Command-Line Application

A command-line application to manage a company's employee database using Node.js, Inquirer, and PostgreSQL. This application allows business owners to view and manage departments, roles, and employees within their company.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database Schema](#database-schema)
- [Walkthrough Video](#walkthrough-video)
- [Contributing](#contributing)
- [License](#license)

## Description

This application provides a text-based interface for managing employee data. It supports the following functionalities:

- Viewing all departments, roles, and employees
- Adding new departments, roles, and employees
- Updating an employee's role

## Installation

To set up and run this application on your local machine, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone git@github.com:Logan-New/Employee-Tracker.git
   cd employee-management
# Install Dependencies

Make sure you have Node.js and PostgreSQL installed. Then, install the required npm packages:

# bash
Copy code
npm install
Set Up the Database

Create a PostgreSQL database.

Configure your database connection in db.js.

Run the schema script to set up the database tables:

# bash
Copy code
psql -U yourusername -d yourdatabase -f seeds.sql
Configure Environment Variables

Ensure that your db.js file contains the correct database connection settings. Update it with your PostgreSQL username, password, and database name.

# Usage
To start the application and interact with the command-line interface:

# bash
Copy code
npm start
Follow the prompts to choose an option and manage the employee database.

# Features
View All Departments: Display a table of all departments with their IDs and names.
View All Roles: Show a table of all roles with job titles, IDs, department names, and salaries.
View All Employees: Present a table of employees including IDs, first names, last names, job titles, departments, salaries, and managers.
Add a Department: Prompt for a new department name and add it to the database.
Add a Role: Prompt for a role's name, salary, and department, then add it to the database.
Add an Employee: Prompt for an employee's first name, last name, role, and manager, then add them to the database.
Update Employee Role: Prompt to select an employee and update their role.
Database Schema
The database schema includes three tables:

department: Stores department information.

id (SERIAL PRIMARY KEY)
name (VARCHAR(30) UNIQUE NOT NULL)
role: Stores role information.

id (SERIAL PRIMARY KEY)
title (VARCHAR(30) UNIQUE NOT NULL)
salary (DECIMAL NOT NULL)
department_id (INTEGER NOT NULL, FOREIGN KEY REFERENCES department(id))
employee: Stores employee information.

id (SERIAL PRIMARY KEY)
first_name (VARCHAR(30) NOT NULL)
last_name (VARCHAR(30) NOT NULL)
role_id (INTEGER NOT NULL, FOREIGN KEY REFERENCES role(id))
manager_id (INTEGER, FOREIGN KEY REFERENCES employee(id))

# Walkthrough Video
A video demonstration of the application's functionality can be viewed here.
https://drive.google.com/file/d/1Z2b_KfECFa9OSrRkEeUEuymo3pO7RisK/view

# Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request. Ensure that your changes are well-documented and tested.

# License
This project is licensed under the MIT License - see the LICENSE file for details.