import {
  FaSchool,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardCheck,
  FaEllipsisV,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
import Table from "../components/Table";

import { getAdminDashboardData,getSchoolAdminDashboardData,getTeacherDashboardData,getStudentDashboardData } from "../api/dashboardApi";
import { getAllTeachers } from "../api/TeacherApi";
import { getAllSchools } from "../api/SchoolApi";

const Dashboard = () => {
  const navigate = useNavigate();
  console.log(localStorage.getItem("token"));
  const [dashboardData, setDashboardData] = useState({});
  console.log("Dashboard data:", dashboardData);

  const [recentTeachers, setRecentTeachers] = useState([]);
  const [recentSchoolsData, setRecentSchoolsData] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const role = user?.role || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dashboard = {};

        switch (role) {
          case "SuperAdmin":
            dashboard = await getAdminDashboardData();
            break;
          case "SchoolAdmin":
            dashboard = await getSchoolAdminDashboardData();
            break;
          case "Teacher":
            dashboard = await getTeacherDashboardData();
            break;
          case "Student":
            dashboard = await getStudentDashboardData();
            break;
        }
       console.log("Fetched dashboard data:", dashboard);
        setDashboardData(dashboard.dashboardData || {});

        if (role === "SuperAdmin") {
          const schools = await getAllSchools();
          setRecentSchoolsData(schools.schools || []);
        } else if (role === "SchoolAdmin") {
          const teachers = await getAllTeachers();
          setRecentTeachers(teachers.teachers || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (role) {
      fetchData();
    }
  }, [role]);

  let stats = [];
  if (role === "SuperAdmin") {
    stats = [
      {
        title: "Total Schools",
        value: dashboardData.totalSchools || 0,
        icon: <FaSchool size={24} />,
        colorClass: "text-blue-600 bg-blue-100",
      },
      {
        title: "Approved Schools",
        value: dashboardData.approvedSchools || 0,
        icon: <FaClipboardCheck size={24} />,
        colorClass: "text-green-600 bg-green-100",
      },
      {
        title: "Pending Schools",
        value: dashboardData.pendingSchools || 0,
        icon: <FaClipboardCheck size={24} />,
        colorClass: "text-yellow-600 bg-yellow-100",
      },
      {
        title: "Total Teachers",
        value: dashboardData.totalTeachers || 0,
        icon: <FaChalkboardTeacher size={24} />,
        colorClass: "text-emerald-600 bg-emerald-100",
      },
      {
        title: "Total Students",
        value: dashboardData.totalStudents || 0,
        icon: <FaUserGraduate size={24} />,
        colorClass: "text-purple-600 bg-purple-100",
      },
    ];
  } else if (role === "SchoolAdmin") {
    stats = [
      {
        title: "Total Teachers",
        value: dashboardData.totalTeachers || 0,
        icon: <FaChalkboardTeacher size={24} />,
        colorClass: "text-emerald-600 bg-emerald-100",
      },
      {
        title: "Total Students",
        value: dashboardData.totalStudents || 0,
        icon: <FaUserGraduate size={24} />,
        colorClass: "text-purple-600 bg-purple-100",
      },
      {
        title: "Attendance Today",
        value: dashboardData.todayAttendance || 0,
        icon: <FaClipboardCheck size={24} />,
        colorClass: "text-purple-600 bg-purple-100",
      },
      {
        title: "Today Present",
        value: dashboardData.presentToday || 0,
        icon: <FaUserGraduate size={24} />,
        colorClass: "text-purple-600 bg-purple-100",
      },
      {
        title: "Today Absent",
        value: dashboardData.absentToday || 0,
        icon: <FaUserGraduate size={24} />,
        colorClass: "text-purple-600 bg-purple-100",
      },
    ];
  } else if (role === "Teacher") {
    stats = [
      {
        title: "My Students",
        value: dashboardData.totalStudents || 0,
        icon: <FaUserGraduate size={24} />,
        colorClass: "text-purple-600 bg-purple-100",
      },
    ];
  } 

  const teacherColumns = [
    {
      header: "Name",
      render: (row) => row.userId?.name,
    },
    {
      header: "Subject",
      accessor: "subject",
    },
    {
      header: "Email",
      render: (row) => row.userId?.email,
    },
  ];

  return (
    <div>
      <Header
        title="Dashboard Overview"
        subtitle={`Welcome back ${user?.name || ""}, here's what's happening today.`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

     

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {role === "SuperAdmin" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Recent Schools</h2>

              <button className="text-sm text-blue-600 hover:underline" onClick={() => navigate('/schools')}>
                View All
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-3 text-left">School Name</th>
                    <th className="p-3 text-left">Principal</th>
                    <th className="p-3 text-left">Email</th>
                    <th className={"p-3 text-left"}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentSchoolsData.slice(0, 5).map((school) => (
                    <tr key={school._id} className="border-b">
                      <td className="p-3">{school.schoolName}</td>
                      <td className="p-3">{school.principalName}</td>
                      <td className="p-3">{school.email}</td>
                      <td className={`p-3${school.status === "Approved" ? " text-green-600" : " text-yellow-600"}`}>{school.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {role === "SchoolAdmin" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">
                Recent Teachers
              </h2>

              <button className="text-sm text-blue-600 hover:underline" onClick={() => navigate('/teachers')}>
                View All
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
               <Table
                columns={teacherColumns}
                data={recentTeachers.slice(0, 5) || []}
              />
            </div>
          </div>
        )}
      </div>


      
    </div>
  );
};

export default Dashboard;
