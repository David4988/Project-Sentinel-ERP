import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import ClassAnalytics from './ClassAnalytics';
import StaffStudentMonitor from './StaffStudentMonitor';
import StaffReports from './StaffReports';
import AdminDashboard from './AdminDashboard';
import StaffManagement from './StaffManagement';
import StudentManagement from './StudentManagement';
import SystemSettings from './SystemSettings';
import AdminClassAnalytics from './AdminClassAnalytics';

const AdminLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard onPageChange={setCurrentPage} />;
      case "analytics":
        return <AdminClassAnalytics />;
      case "students":
        return <StudentManagement />;
      case "staff":
        return <StaffManagement />;
      case "settings":
        return <SystemSettings />;
      
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation
        userType="admin"
        userName="Admin001"
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>

      <ChatBot />
    </div>
  );
};

export default AdminLayout;