import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  AlertTriangle,
  Calendar,
  TrendingDown,
  ArrowRight,
  Eye,
} from "lucide-react";
import { classData } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

interface AdminDashboardProps {
  onPageChange: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onPageChange }) => {
  const cseKData = classData["CSE-K"];
  const cseDData = classData["CSE-D"];
  const allClasses = [cseKData, cseDData];

  const overallStats = {
    totalStudents: allClasses.reduce((sum, c) => sum + c.totalStudents, 0),
    avgBri: Math.round(
      allClasses.reduce((sum, c) => sum + c.avgBri, 0) / allClasses.length
    ),
    totalHighRisk: allClasses.reduce((sum, c) => sum + c.highRiskCount, 0),
    avgAttendance: Math.round(
      allClasses.reduce((sum, c) => sum + c.avgAttendance, 0) /
        allClasses.length
    ),
    totalComplaints: allClasses.reduce((sum, c) => sum + c.complaintsCount, 0),
  };

  const recentActivity = [
    {
      id: 1,
      type: "student",
      text: "Added new student to CSE-K",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "report",
      text: "Generated weekly analytics report",
      time: "10 min ago",
    },
    {
      id: 3,
      type: "settings",
      text: "System settings updated",
      time: "30 min ago",
    },
    {
      id: 4,
      type: "staff",
      text: "Added new staff: Carol Lee",
      time: "1 hour ago",
    },
  ];

  const quickLinks = [
    {
      label: "Student Management",
      page: "students",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Staff Management",
      page: "staff",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "System Settings",
      page: "settings",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      label: "Analytics",
      page: "analytics",
      icon: <BarChart className="w-6 h-6" />,
    },
  ];

  const getBriColor = (score: number) => {
    if (score > 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getRiskLevelColor = (count: number) => {
    if (count <= 2) return "text-green-600";
    if (count <= 5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
          Admin Control Center
        </h1>
        <p className="text-lg text-gray-600">
          Executive overview, system stats, and quick management access
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {overallStats.totalStudents}
                </p>
                <p className="text-xs text-gray-500 mt-1">All classes</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card bg-gradient-to-br from-white to-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg BRI</p>
                <p
                  className={`text-3xl font-bold ${getBriColor(
                    overallStats.avgBri
                  )}`}
                >
                  {overallStats.avgBri}
                </p>
                <p className="text-xs text-gray-500 mt-1">Burnout risk</p>
              </div>
              <TrendingDown className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card bg-gradient-to-br from-white to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p
                  className={`text-3xl font-bold ${getRiskLevelColor(
                    overallStats.totalHighRisk
                  )}`}
                >
                  {overallStats.totalHighRisk}
                </p>
                <p className="text-xs text-gray-500 mt-1">Students at risk</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Attendance
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {overallStats.avgAttendance}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Class average</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card bg-gradient-to-br from-white to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Complaints</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {overallStats.totalComplaints}
                </p>
                <p className="text-xs text-gray-500 mt-1">This week</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Quick Management Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Button
                key={link.page}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => onPageChange(link.page)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li
                key={activity.id}
                className="py-3 flex justify-between items-center"
              >
                <span className="text-gray-700">{activity.text}</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card className="dashboard-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Executive Summary
          </h3>
          <ul className="list-disc pl-6 text-blue-700 space-y-1">
            <li>Student wellbeing is stable across all classes.</li>
            <li>High risk students are being monitored and supported.</li>
            <li>System settings and staff management are up to date.</li>
            <li>Analytics and reports are available for review.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
