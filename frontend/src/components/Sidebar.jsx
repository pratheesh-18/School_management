import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaSchool, 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaClipboardList, 
  FaCalendarCheck, 
  FaCog, 
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const role = user?.role || '';

  const allNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt />, roles: ['SuperAdmin', 'SchoolAdmin', 'Teacher', 'Student'] },
    { name: 'Schools', path: '/schools', icon: <FaSchool />, roles: ['SuperAdmin'] },
    { name: 'Teachers', path: '/teachers', icon: <FaChalkboardTeacher />, roles: ['SchoolAdmin'] },
    { name: 'Students', path: '/students', icon: <FaUserGraduate />, roles: ['SchoolAdmin', 'Teacher'] },
    { name: 'Attendance', path: '/attendance', icon: <FaClipboardList />, roles: ['SchoolAdmin', 'Teacher'] },
    { name: 'My Attendance', path: '/my-attendance', icon: <FaCalendarCheck />, roles: ['Teacher', 'Student'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(role));
const handleLogout = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
}
  return (
    <>
     
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden fade-in"
          onClick={toggleSidebar}
        />
      )}

      
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600 text-white">
          <span className="text-xl font-bold tracking-wider">EduERP</span>
          <button onClick={toggleSidebar} className="lg:hidden text-white hover:text-blue-200">
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`
              }
            >
              <span className="text-lg mr-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="space-y-2">
            
            <NavLink 
              to="/login"
              className="w-full flex items-center px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="text-lg mr-4" />
              Logout
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
