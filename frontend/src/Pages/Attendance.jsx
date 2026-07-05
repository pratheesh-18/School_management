import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import { FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import { getAllStudents } from '../api/StudentApi';
import { markAttendance } from '../api/AttendanceApi';

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

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

  useEffect(() => {
    // When selected class changes, filter students and initialize attendance data
    if (selectedClass) {
      const classStudents = students.filter(s => s.className === selectedClass);
      const initData = classStudents.map(student => ({
        id: student._id,
        name: student.userId?.name,
        rollNumber: student.rollNo,
        status: 'Present' // default
      }));
      setAttendanceData(initData);
    } else {
      setAttendanceData([]);
    }
  }, [selectedClass, students]);

  const handleStatusChange = (id, newStatus) => {
    setAttendanceData(attendanceData.map(student => 
      student.id === id ? { ...student, status: newStatus } : student
    ));
  };

  const markAll = (status) => {
    setAttendanceData(attendanceData.map(student => ({ ...student, status })));
  };

  const handleSaveAttendance = async () => {
    try {
      // Create a promise for each attendance mark
      const promises = attendanceData.map(student => 
        markAttendance({
          studentId: student.id,
          date: selectedDate,
          status: student.status
        }).catch(err => {
          // If already marked, it will throw an error, we catch it so it doesn't break the whole loop
          console.error(`Error marking for ${student.name}:`, err.response?.data?.message);
        })
      );
      
      await Promise.all(promises);
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("An error occurred while saving attendance.");
    }
  };

  const columns = [
    { header: 'Roll Number', accessor: 'rollNumber' },
    { header: 'Student Name', accessor: 'name' },
    { 
      header: 'Status', 
      render: (row) => {
        let badgeColor = '';
        let icon = null;
        
        if (row.status === 'Present') {
          badgeColor = 'bg-green-100 text-green-700 border-green-200';
          icon = <FaCheck className="mr-1" />;
        } else if (row.status === 'Absent') {
          badgeColor = 'bg-red-100 text-red-700 border-red-200';
          icon = <FaTimes className="mr-1" />;
        } else if (row.status === 'Late') {
          badgeColor = 'bg-yellow-100 text-yellow-700 border-yellow-200';
          icon = <FaClock className="mr-1" />;
        }
        
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}>
            {icon} {row.status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      render: (row) => (
        <select 
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
      )
    }
  ];

  // Extract unique classes from students list for the dropdown
  const uniqueClasses = [...new Set(students.map(s => s.className).filter(Boolean))];

  return (
    <div className="fade-in">
      <Header 
        title="Class Attendance" 
        subtitle="Mark and manage daily student attendance" 
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Select Class</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a class...</option>
              {uniqueClasses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Select Date</label>
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="md:col-span-2 flex items-end justify-end space-x-3">
            <button 
              onClick={() => markAll('Present')}
              className="px-4 py-2.5 bg-green-50 text-green-700 border border-green-200 font-semibold rounded-xl hover:bg-green-100 transition-colors text-sm"
            >
              Mark All Present
            </button>
            <button 
              onClick={handleSaveAttendance}
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95 text-sm"
            >
              Save Attendance
            </button>
          </div>
        </div>

        {selectedClass ? (
          <Table columns={columns} data={attendanceData} />
        ) : (
          <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <FaCheck className="mx-auto text-4xl text-slate-300 mb-3" />
            <p>Please select a class to mark attendance</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
