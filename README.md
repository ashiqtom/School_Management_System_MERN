School Management System 📚
Project Description
The School Management System is a role-based web application that allows for efficient management of students, library history, and fees history. The system provides access control based on user roles: Admin, Office Staff, and Librarian.
Each role has specific permissions:

Admin: Full control, including account management for staff and librarians.
Office Staff: Access to student details and fees management.
Librarian: View-only access for student details and library history management.
The project includes:

Authentication and Role-Based Access Control (RBAC)
CRUD operations for students, library history, and fees history
Reusable components and state management using Redux
Confirmation dialogs for critical actions like delete operations


Libraries Used 🧰
    Frontend
      React.js
      React Router
      Redux
      Tailwind CSS
    
    Backend
      Node.js
      Express.js
      MongoDB
      JWT


Setup Instructions ⚙️
Backend Setup

Navigate to the backend directory:
cd backend

Install dependencies:
npm install

Set up environment variables:
Create a .env file in the root directory.
Add the following:
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
SALT_ROUND =<number between 1 to 10>

Start the backend server:
npm start

Frontend Setup
Navigate to the frontend directory:
cd frontend
Install dependencies:
npm install

Set up environment variables:
Create a .env file in the root directory.
Add the following:
VITE_API_URL=<backend_url >

Start the frontend development server:
npm run dev

Open the browser and visit:
http://localhost:5000

login with
{
  "email": "admin@example.com",
  "password": "admin123"
}
