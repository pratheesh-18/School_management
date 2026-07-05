import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaSave, FaTimes } from 'react-icons/fa';
import { createSchoolAdmin} from '../api/SchoolApi';

const AddSchool = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    principalName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await createSchoolAdmin(formData);
      console.log('School admin created:', response);
      navigate('/schools');
    }
    catch (error) {
      console.error('Error creating school admin:', error);
    }
   
    
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <Header 
        title="Add New School" 
        subtitle="Register a new educational institution" 
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">School Name</label>
              <input 
                type="text" 
                name="schoolName"
                required
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. Greenwood High"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Principal Name</label>
              <input 
                type="text" 
                name="principalName"
                required
                value={formData.principalName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. Dr. Jane Smith"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. contact@school.edu"
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
                placeholder="Enter password"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                placeholder="e.g. +1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Full Address</label>
              <textarea 
                name="address"
                required
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 resize-none"
                placeholder="Enter complete physical address"
              ></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end space-x-4">
            <button 
              type="button"
              onClick={() => navigate('/schools')}
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
              Save School
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchool;
