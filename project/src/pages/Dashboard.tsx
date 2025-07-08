import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { 
  BookOpen, 
  Calendar, 
  Award, 
  Bell, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Star
} from 'lucide-react';

interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
  };
  registeredCourses: Array<{
    _id: string;
    title: string;
    instructor: string;
    progress: number;
    registeredAt: string;
    image: string;
    category: string;
  }>;
  grades: Array<{
    courseId: string;
    grade: string;
    marks: number;
    totalMarks: number;
    assignmentName: string;
    gradedAt: string;
  }>;
  attendance: Array<{
    courseId: string;
    date: string;
    present: boolean;
    topic: string;
  }>;
  totalCourses: number;
  overallProgress: number;              // ✅ Add this
  averageGrade: string;                 // ✅ Add this
  attendancePercentage: number;  
}

interface Announcement {
  _id: string;
  title: string;
  message: string;
  date: string;
  important: boolean;
  courseName: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
    fetchAnnouncements();
    console.log("📦 Dashboard Data:", dashboardData);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/student/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/student/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load dashboard</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  const calculateOverallProgress = () => {
    if (dashboardData.registeredCourses.length === 0) return 0;
    const totalProgress = dashboardData.registeredCourses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / dashboardData.registeredCourses.length);
  };

  const calculateAverageGrade = () => {
    if (dashboardData.grades.length === 0) return 0;
    const totalPercentage = dashboardData.grades.reduce((sum, grade) => {
      return sum + (grade.marks / grade.totalMarks) * 100;
    }, 0);
    return Math.round(totalPercentage / dashboardData.grades.length);
  };

  const calculateAttendanceRate = () => {
    if (dashboardData.attendance.length === 0) return 0;
    const presentCount = dashboardData.attendance.filter(record => record.present).length;
    return Math.round((presentCount / dashboardData.attendance.length) * 100);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {dashboardData.user.name}!
              </h1>
              <p className="text-gray-600">Track your learning progress and stay updated</p>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{dashboardData.totalCourses}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Enrolled Courses</h3>
            <p className="text-sm text-gray-600">Active learning paths</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{calculateOverallProgress()}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
            <p className="text-sm text-gray-600">Average completion</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{dashboardData?.averageGrade ?? 'N/A'}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Average Grade</h3>
            <p className="text-sm text-gray-600">Academic performance</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{dashboardData?.attendancePercentage ?? 0}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Attendance</h3>
            <p className="text-sm text-gray-600">Class participation</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'courses', label: 'My Courses' },
                { id: 'grades', label: 'Grades' },
                { id: 'attendance', label: 'Attendance' },
                { id: 'announcements', label: 'Announcements' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              
              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {dashboardData.registeredCourses.slice(0, 3).map(course => (
                    <div key={course._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img src={course.image} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-gray-900">{course.title}</p>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600">{course.progress}% Complete</p>
                        <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Assignments */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Upcoming Assignments</h3>
                <div className="space-y-3">
                  {dashboardData.grades.slice(0, 3).map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <Award className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{grade.assignmentName}</p>
                          <p className="text-sm text-gray-600">Grade: {grade.grade}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">{grade.marks}/{grade.totalMarks}</p>
                        <p className="text-xs text-gray-500">{new Date(grade.gradedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.registeredCourses.map(course => (
                  <div key={course._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow" onClick={() => navigate(`/course/${course._id}/video`)}>
                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium mb-2">
                        {course.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">{course.progress}% Complete</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Registered: {new Date(course.registeredAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Grades & Assessments</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Assignment</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Score</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Percentage</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.grades.map((grade, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{grade.assignmentName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            grade.grade === 'A' ? 'bg-green-100 text-green-600' :
                            grade.grade === 'B' ? 'bg-blue-100 text-blue-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            {grade.grade}
                          </span>
                        </td>
                        <td className="py-3 px-4">{grade.marks}/{grade.totalMarks}</td>
                        <td className="py-3 px-4">{Math.round((grade.marks / grade.totalMarks) * 100)}%</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(grade.gradedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendance Record</h2>
              <div className="space-y-4">
                {dashboardData.attendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${record.present ? 'bg-green-100' : 'bg-red-100'}`}>
                        {record.present ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.topic}</p>
                        <p className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.present ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {record.present ? 'Present' : 'Absent'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Announcements</h2>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    announcement.important ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          announcement.important ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <Bell className={`h-5 w-5 ${
                            announcement.important ? 'text-red-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{announcement.title}</h3>
                          <p className="text-gray-600 mb-2">{announcement.message}</p>
                          <p className="text-sm text-gray-500">
                            {announcement.courseName} • {new Date(announcement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {announcement.important && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                          Important
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;