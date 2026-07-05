import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Schools from '../pages/Schools';
import AddSchool from '../pages/AddSchool';
import Teachers from '../pages/Teachers';
import AddTeacher from '../pages/AddTeacher';
import Students from '../pages/Students';
import AddStudent from '../pages/AddStudent';
import Attendance from '../pages/Attendance';
import MyAttendance from '../pages/MyAttendance';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      
      
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        <Route path="/schools" element={<Schools />} />
        <Route path="/schools/add" element={<AddSchool />} />
        
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/add" element={<AddTeacher />} />
        
        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudent />} />
        
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/my-attendance" element={<MyAttendance />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
