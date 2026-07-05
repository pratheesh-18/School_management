const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const AuthRoute = require('./routes/AuthRoute');
const SchoolRoute = require('./routes/SchoolRoute');
const TeacherRoute = require('./routes/TeacherRoute');
const StudentRoute = require('./routes/StudentRoute');
const AttendanceRoute = require('./routes/AttendanceRoute');
const DashboardRoute = require('./routes/DashboardRoute');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send(' API Running');
});

app.use('/api/auth', AuthRoute);
app.use('/api/schools', SchoolRoute);
app.use('/api/teachers', TeacherRoute);
app.use('/api/students', StudentRoute);
app.use('/api/attendance', AttendanceRoute);
app.use('/api/dashboard', DashboardRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
