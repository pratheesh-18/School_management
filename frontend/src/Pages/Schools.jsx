import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { getAllSchools, approveSchool, rejectSchool } from '../api/SchoolApi';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import ConfirmDelete from '../components/ConfirmDelete';

const Schools = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await getAllSchools();
        setSchools(response.schools || []);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    fetchSchools();
  }, []);

  const filteredSchools = schools.filter(school => 
    school.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (school) => {
    setSelectedSchool(school);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setSchools(schools.filter(s => s._id !== selectedSchool._id));
    // In a real app, make API call here
  };

  const handleApproveSchool = async (school) => {
    try {
      const response = await approveSchool(school._id);
      setSchools(schools.map(s => s._id === school._id ? response.school : s));
    } catch (error) {
      console.error("Failed to approve school:", error);
    }
  };

  const handleRejectSchool = async (school) => {
    try {
      const response = await rejectSchool(school._id);
      setSchools(schools.map(s => s._id === school._id ? response.school : s));
    } catch (error) {
      console.error("Failed to reject school:", error);
    }
  };

  const columns = [
    { header: 'School Name', accessor: 'schoolName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          row.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {row.status}
        </span>
      ) 
    },
    {
      header: 'Actions',
      render: (row) => (
      <div className="flex space-x-3 items-center">
          {user?.role === 'SuperAdmin' && row.status === 'Pending' && (
            <>
              <button 
                className="text-green-500 hover:text-green-700 transition-colors" 
                title="Approve"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApproveSchool(row);
                }}
              >
                <FaCheck size={18} />
              </button>
              <button 
                className="text-red-400 hover:text-red-600 transition-colors" 
                title="Reject"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRejectSchool(row);
                }}
              >
                <FaTimes size={18} />
              </button>
            </>
          )}
          <button className="text-blue-500 hover:text-blue-700 transition-colors" title="View">
            <FaEye size={18} />
          </button>
          <button className="text-slate-500 hover:text-slate-700 transition-colors" title="Edit">
            <FaEdit size={18} />
          </button>
          <button 
            className="text-red-500 hover:text-red-700 transition-colors" 
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(row);
            }}
          >
            <FaTrash size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="fade-in">
      <Header 
        title="Schools Management" 
        subtitle="Manage all registered schools in the system" 
        action={
          <button 
            onClick={() => navigate('/schools/add')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <FaPlus className="mr-2" />
            Add School
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <SearchBar 
            placeholder="Search schools by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>Showing {filteredSchools.length} results</span>
          </div>
        </div>

        <Table columns={columns} data={filteredSchools} />
      </div>

      <ConfirmDelete 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete School"
        message={`Are you sure you want to delete ${selectedSchool?.name}? This action will permanently remove all associated data.`}
      />
    </div>
  );
};

export default Schools;
