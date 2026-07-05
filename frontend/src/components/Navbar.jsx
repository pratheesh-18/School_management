import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import ProfileModal from './ProfileModal';
import { updateProfile } from '../api/authApi';
const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleUpdateProfile = async (data) => {
    try {
      const response = await updateProfile(data);
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      throw error;
    }
  };

  console.log("User from localStorage:", user);
  return (
    <header className="h-16 bg-white border-b border-slate-100 shadow-sm flex items-center justify-between px-4 lg:px-8 z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 mr-4 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 focus:outline-none lg:hidden transition-colors"
        >
          <FaBars size={20} />
        </button>
        
        
      </div>

      <div className="flex items-center space-x-4">
       
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        
        <div className="flex items-center cursor-pointer group" onClick={() => setIsProfileModalOpen(true)}>
          <div className="mr-3 text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-transparent group-hover:border-blue-200 transition-all">
            <FaUserCircle size={24} />
          </div>
        </div>
      </div>
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        user={user} 
        onUpdate={handleUpdateProfile} 
      />
    </header>
  );
};

export default Navbar;
