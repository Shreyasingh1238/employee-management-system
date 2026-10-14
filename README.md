# Employee Directory Management System

## 1. Project Overview

The Employee Directory Management System is a full-stack web application that allows users to manage employee records through a user-friendly interface. It supports creating, viewing, updating, and deleting employee information.

The application uses React for the frontend, Node.js and Express.js for the backend, and PostgreSQL for database storage.

## 2. Technologies Used

### Frontend
- React.js
- JavaScript (JSX)
- Tailwind CSS
- Axios for API requests
- SweetAlert2 for confirmation dialogs and user notifications
- Vite for development and build tooling

### Backend
- Node.js
- Express.js
- PostgreSQL
- REST APIs
- Environment variables for database configuration

## 3. Features Implemented

- **Employee CRUD Operations:** Create, read, update, and delete employee records.
- **Employee Listing:** Retrieve and display employees from the PostgreSQL database.
- **Search Functionality:** Search employee records by relevant employee details.
- **Pagination:** Display employee records in pages to make the directory easier to navigate.
- **Add Employee Form:** Enter employee name, email, and role.
- **Edit Employee:** Load existing employee details into the form and save changes.
- **Delete Confirmation:** Ask the user to confirm before deleting an employee.
- **User Feedback:** Use SweetAlert2 for operation feedback and confirmation dialogs.
- **API Integration:** Connect the React frontend to the Express backend using Axios.
- **Database Integration:** Persist employee records in PostgreSQL.
- **Input Validation:** Use form validation to help prevent incomplete or invalid submissions.

## 4. Employee Data Fields

Each employee record contains:
- ID
- Name
- Email
- Role
- Created timestamp, if configured in the database

## 5. REST API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Retrieve employee records |
| POST | `/employees` | Create a new employee |
| PUT | `/employees/:id` | Update an existing employee |
| DELETE | `/employees/:id` | Delete an employee by ID |

## 6. Project Structure

```text
shreya_empM/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── README.md
```

## 7. Prerequisites

Install the following before running the application:
- Node.js and npm
- PostgreSQL
- A PostgreSQL database configured for the application

## 8. Environment Configuration

Configure the backend environment variables in `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_directory
DB_USER=postgres
DB_PASSWORD= 
```

```env
VITE_API_URL=http://localhost:5000
```

## 9. How to Run the Project

### Step 1: Start the Backend

Open a terminal in the backend directory:

```bash
cd backend
npm install
npm run dev
```

If your backend uses a different development script, run the script configured in `backend/package.json`.

### Step 2: Start the Frontend

Open a separate terminal in the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser, usually `http://localhost:5173`.

## 10. API Testing

The REST APIs can be tested using Postman.

Recommended test cases:
1. Retrieve the employee list using GET.
2. Create an employee using POST.
3. Update an existing employee using PUT.
4. Delete an employee using DELETE.
5. Verify that database changes are reflected in the frontend.
6. Test invalid input and nonexistent employee IDs.
7. Check search and pagination behavior in the UI.

## 11. Design Decisions

- The application separates frontend, backend, and database responsibilities.
- The frontend communicates with the backend through HTTP APIs.
- The backend handles requests and database operations.
- PostgreSQL provides persistent storage for employee records.
- REST-style HTTP methods are used for CRUD operations.
- Search and pagination improve the usability of the employee directory.

## 12. Future Improvements

- Server-side pagination for larger datasets.
- More comprehensive backend validation and error handling.
- Automated API and frontend tests.
- Authentication and role-based access control, if required.
- Improved accessibility and responsive design.
