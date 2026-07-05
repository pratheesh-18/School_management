import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';
import { getAllTeachers, updateTeacher } from '../api/TeacherApi';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import ConfirmDelete from '../components/ConfirmDelete';
import EditTeacherModal from '../components/EditTeacherModal';

const Teachers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getAllTeachers();
        setTeachers(response.teachers || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

 

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleUpdateTeacher = async (teacherId, data) => {
    try {
      const response = await updateTeacher(teacherId, data);
      setTeachers(teachers.map(t => t._id === teacherId ? response.teacher : t));
    } catch (error) {
      console.error("Failed to update teacher:", error);
      throw error;
    }
  };

  const handleDeleteClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setTeachers(teachers.filter(t => t._id !== selectedTeacher._id));
   
  };

  const columns = [
    { 
      header: 'Photo', 
      render: (row) => (
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden border-2 border-white shadow-sm">
          {row.photo ? (
            <img src={row.photo} alt={row.userId?.name} className="w-full h-full object-cover" />
          ) : (
            <FaUserCircle size={40} className="text-slate-400" />
          )}
        </div>
      ) 
    },
    { header: 'Name', render: (row) => row.userId?.name },
    { header: 'Email', render: (row) => row.userId?.email },
    { 
      header: 'Subject', 
      render: (row) => (
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
          {row.subject}
        </span>
      )
    },
    { header: 'Qualification', accessor: 'qualification' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex space-x-3">
          <button className="text-blue-500 hover:text-blue-700 transition-colors" title="View">
            <FaEye size={18} />
          </button>
          <button 
            className="text-slate-500 hover:text-slate-700 transition-colors" 
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(row);
            }}
          >
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
        title="Teachers Directory" 
        subtitle="Manage teaching staff profiles and details" 
        action={
          <button 
            onClick={() => navigate('/teachers/add')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <FaPlus className="mr-2" />
            Add Teacher
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>Showing {teachers.length} results</span>
          </div>
        </div> 

         <Table columns={columns} data={teachers} />
        
      
       
      </div>

      <ConfirmDelete 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Teacher"
        message={`Are you sure you want to delete ${selectedTeacher?.userId?.name}? This action cannot be undone.`}
      />

      <EditTeacherModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        teacher={editingTeacher}
        onUpdate={handleUpdateTeacher}
      />
    </div>
  );
};

export default Teachers;
