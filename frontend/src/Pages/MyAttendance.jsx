import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import { FaCheck, FaTimes, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { getMyAttendance } from '../api/AttendanceApi';

const MyAttendance = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    total: 0,
    percentage: 0
  });

  useEffect(() => {
    const fetchMyAttendance = async () => {
      try {
        const response = await getMyAttendance();
        const data = response.attendance || [];
       
        const formattedData = data.map(record => ({
          id: record._id,
          date: record.date,
          status: record.status,
          teacher: record.teacherId?.userId?.name || 'Unknown'
        }));
        
        setAttendanceHistory(formattedData);
        
       
        let present = 0;
        let absent = 0;
        let late = 0;
        
        formattedData.forEach(record => {
          if (record.status === 'Present') present++;
          if (record.status === 'Absent') absent++;
          if (record.status === 'Late') late++;
        });
        
        const total = formattedData.length;
        const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
        
        setStats({ present, absent, late, total, percentage });
        
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    
    fetchMyAttendance();
  }, []);

  const columns = [
    { header: 'Date', accessor: 'date' },
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
    { header: 'Marked By (Teacher)', accessor: 'teacher' },
  ];

  return (
    <div className="fade-in">
      <Header 
        title="My Attendance" 
        subtitle="View your attendance history and statistics" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Overall Attendance</p>
            <h3 className="text-3xl font-bold text-blue-600">{stats.percentage}%</h3>
            <p className="text-xs mt-2 text-slate-400">Total Classes: {stats.total}</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-r-transparent flex items-center justify-center transform rotate-45">
            <div className="w-12 h-12 rounded-full bg-blue-50 transform -rotate-45 flex items-center justify-center">
              <FaCalendarAlt className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Days Present</p>
            <h3 className="text-3xl font-bold text-green-600">{stats.present}</h3>
            <p className="text-xs mt-2 text-slate-400">Total Present</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <FaCheck className="text-green-600 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Days Absent</p>
            <h3 className="text-3xl font-bold text-red-600">{stats.absent}</h3>
            <p className="text-xs mt-2 text-slate-400">Total Absent</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <FaTimes className="text-red-600 text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Attendance History</h2>
        <Table columns={columns} data={attendanceHistory} />
      </div>
    </div>
  );
};

export default MyAttendance;
