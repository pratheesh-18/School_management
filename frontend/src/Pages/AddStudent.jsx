import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaSave, FaTimes } from 'react-icons/fa';
import { createStudent } from '../api/StudentApi';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    class: '',
    section: '',
    rollNumber: '',
    phone: '',
    gender: 'Male',
    parentName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        ...formData,
        className: formData.class,
        rollNo: formData.rollNumber
      };
      const response = await createStudent(studentData);
      console.log('Student created:', response);
      navigate('/students');
    } catch (error) {
      console.error('Error creating student:', error);
      alert(error.response?.data?.message || 'Error creating student');
    }
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <Header 
        title="Enroll New Student" 
        subtitle="Register a new student and parent information" 
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Student Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. Alex Carter"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Roll Number</label>
              <input 
                type="text" 
                name="rollNumber"
                required
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. ST-2023-001"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Class/Grade</label>
              <select 
                name="class"
                required
                value={formData.class}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
              >
                <option value="">Select class</option>
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Section</label>
              <select 
                name="section"
                required
                value={formData.section}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
              >
                <option value="">Select section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Parent/Guardian Name</label>
              <input 
                type="text" 
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. Michael Carter"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Parent Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. +1 (555) 111-2222"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Student Email</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. alex.c@student.edu"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="Secure password"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Gender</label>
              <div className="flex space-x-6 mt-2">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Male" 
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-slate-700">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Female" 
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-slate-700">Female</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Other" 
                    checked={formData.gender === 'Other'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-slate-700">Other</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end space-x-4">
            <button 
              type="button"
              onClick={() => navigate('/students')}
              className="flex items-center px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
            <button 
              type="submit"
              className="flex items-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 hover:shadow-md active:scale-95"
            >
              <FaSave className="mr-2" />
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
