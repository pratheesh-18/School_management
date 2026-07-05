import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';
import { getAllStudents, deleteStudent, updateStudent } from '../api/StudentApi';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import ConfirmDelete from '../components/ConfirmDelete';
import EditStudentModal from '../components/EditStudentModal';

const Students = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        setStudents(response.students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  
  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteStudent(selectedStudent._id);
      setStudents(students.filter(s => s._id !== selectedStudent._id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete student:", error);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleUpdateStudent = async (studentId, data) => {
    try {
      const response = await updateStudent(studentId, data);
      setStudents(students.map(s => s._id === studentId ? response.student : s));
    } catch (error) {
      console.error("Failed to update student:", error);
      throw error; // Let the modal handle the error
    }
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
    { header: 'Roll Number', accessor: 'rollNo' },
    { header: 'Class', accessor: 'className' },
    { header: 'Section', accessor: 'section' },
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
        title="Students Directory" 
        subtitle="Manage student profiles and academic details" 
        action={
          <button 
            onClick={() => navigate('/students/add')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <FaPlus className="mr-2" />
            Add Student
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
         
          
          <div className="flex items-center space-x-4">
            
            <div className="text-sm text-slate-500">
              Showing {students.length} results
            </div>
          </div>
        </div>

        <Table columns={columns} data={students} />
      </div>

      <ConfirmDelete 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${selectedStudent?.userId?.name}? This action cannot be undone.`}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={editingStudent}
        onUpdate={handleUpdateStudent}
      />
    </div>
  );
};

export default Students;
