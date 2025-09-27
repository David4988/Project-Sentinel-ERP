import React, { useState } from "react";
import ClassAnalytics from "./ClassAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  AlertTriangle,
  TrendingDown,
  MessageSquare,
  Eye,
  UserX,
  Phone,
  Mail,
  Shield,
} from "lucide-react";
import { classData, complaints } from "@/data/mockData";

// Cleaned: No props, no duplicate declaration

const classes = [
  { name: "CSE-K", color: "from-blue-100 to-blue-300" },
  { name: "CSE-D", color: "from-yellow-100 to-yellow-300" },
];

const AdminClassAnalytics: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<"CSE-K" | "CSE-D" | null>(
    null
  );

  if (selectedClass) {
    return <ClassAnalytics className={selectedClass} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Class Analytics
        </h1>
        <p className="text-gray-600">Select a class to view analytics</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {classes.map((cls) => (
          <Card
            key={cls.name}
            className={`cursor-pointer bg-gradient-to-br ${cls.color} hover:shadow-lg transition-all`}
            onClick={() => setSelectedClass(cls.name as "CSE-K" | "CSE-D")}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {cls.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <p className="text-gray-600 mb-2">
                  Average BRI:{" "}
                  <span className="font-semibold">
                    {classData[cls.name].avgBri}
                  </span>
                </p>
                <p className="text-gray-600 mb-2">
                  High Risk Students:{" "}
                  <span className="font-semibold">
                    {classData[cls.name].highRiskCount}
                  </span>
                </p>
                <p className="text-gray-600">
                  Attendance:{" "}
                  <span className="font-semibold">
                    {classData[cls.name].avgAttendance}%
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminClassAnalytics;
