# EPR Management System (School ERP)

A  role-based School Management System built with the MERN stack (MongoDB, Express, React, Node.js). It supports Super Admins, School Admins, Teachers, and Students, allowing administrators to manage schools, staff, and student directories effectively.

## Technologies Used
* **Frontend:** React (Vite), Tailwind CSS, React Router, Axios, React Icons
* **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth, Bcrypt

---

## Initial Setup & Installation

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Ensure you have a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost/SchoolManagement
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=7d
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend runs on `http://localhost:5000`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The frontend runs on your local Vite port (usually `http://localhost:5173`).*

---

## Role 

- **SuperAdmin**: Can create/setup schools, approve/reject pending schools.
- **SchoolAdmin**: Can manage (add, update, delete) teachers and students.
- **Teacher**: Can manage (add, update, delete) students assigned to them, and manage attendance.
- **Student**: Can view their own profile and attendance.
- *All users can update their basic profile details via the top-right profile icon.*

---

##  API Endpoints Reference

 **BASE_URL**: `http://localhost:5000/`.

### Auth Endpoints (`/api/auth`)
* `POST /register` - Register a new user
* `POST /login` - Login and receive a JWT token
* `PUT /profile` - Update the currently authenticated user's profile (name & email)

### School Endpoints (`/api/schools`)
* `POST /` - Register a new School and SchoolAdmin (SuperAdmin only)
* `POST /setup` - Setup a school (SchoolAdmin only)
* `GET /` - Get all schools (SuperAdmin only)
* `PUT /approve/:schoolId` - Approve a pending school (SuperAdmin only)
* `PUT /reject/:schoolId` - Reject a pending school (SuperAdmin only)

### Teacher Endpoints (`/api/teachers`)
* `POST /` - Add a new teacher (SchoolAdmin only)
* `GET /` - Get all teachers (SchoolAdmin only)
* `GET /:teacherId` - Get a specific teacher (SchoolAdmin only)
* `PUT /:teacherId` - Update a teacher's details (SuperAdmin, SchoolAdmin)
* `DELETE /:teacherId` - Delete a teacher (SuperAdmin, SchoolAdmin)

### Student Endpoints (`/api/students`)
* `POST /` - Enroll a new student (Teacher only)
* `GET /` - Get all students (SchoolAdmin, Teacher)
* `GET /:id` - Get a specific student (SchoolAdmin, Teacher)
* `PUT /:id` - Update a student's details (SuperAdmin, SchoolAdmin, Teacher)
* `DELETE /:id` - Delete a student (SuperAdmin, SchoolAdmin, Teacher)

---

##  What to do Initially


1. Start the Backend and Frontend servers.
2.  you may need to register an initial SuperAdmin using Postman using the `/api/schools` endpoint.
```JSON
    "name":"name",
    "email":"email",
    "password":"password",
    "role":"SuperAdmin"
```
3. create new school.
4. Once logged in as a SuperAdmin, approve newly created Schools via the UI.
5. Log in as a SchoolAdmin to start adding Teachers
6. log in as Teachers to start enrolling Students.

---


