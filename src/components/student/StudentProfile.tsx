import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  User,
  Brain,
  TrendingUp,
  AlertTriangle,
  Calendar,
  BookOpen,
  Shield,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { studentData } from "@/data/mockData";

const StudentProfile: React.FC = () => {
  const { briScore, briHistory, dataSharing } = studentData;
  const [sharingConsent, setSharingConsent] = useState(dataSharing);

  const handleToggleConsent = () => {
    setSharingConsent(!sharingConsent);
    // In a real app, this would make an API call to update the database
  };

  // Detailed BRI breakdown
  const briFactors = [
    {
      factor: "Academic Stress",
      score: 65,
      max: 100,
      description: "Course workload and exam pressure",
    },
    {
      factor: "Social Wellbeing",
      score: 85,
      max: 100,
      description: "Peer relationships and social activities",
    },
    {
      factor: "Physical Health",
      score: 78,
      max: 100,
      description: "Sleep, exercise, and general health",
    },
    {
      factor: "Time Management",
      score: 70,
      max: 100,
      description: "Study schedule and deadline management",
    },
    {
      factor: "Financial Stress",
      score: 90,
      max: 100,
      description: "Financial stability and concerns",
    },
    {
      factor: "Family Support",
      score: 95,
      max: 100,
      description: "Family relationships and support system",
    },
  ];

  const radarData = briFactors.map((factor) => ({
    factor: factor.factor.split(" ")[0], // First word for radar chart
    score: factor.score,
  }));

  const contributingFactors = [
    {
      factor: "Upcoming Math Test",
      impact: "High",
      type: "negative",
      description: "Major exam scheduled next week",
    },
    {
      factor: "Good Study Group",
      impact: "Medium",
      type: "positive",
      description: "Active participation in study sessions",
    },
    {
      factor: "Assignment Overload",
      impact: "High",
      type: "negative",
      description: "Multiple assignments due simultaneously",
    },
    {
      factor: "Regular Exercise",
      impact: "Medium",
      type: "positive",
      description: "Maintaining daily physical activity",
    },
  ];

  const getFactorColor = (score: number) => {
    if (score < 40) return "bg-red-500";
    if (score <= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getImpactColor = (impact: string, type: string) => {
    if (type === "positive") {
      return impact === "High"
        ? "bg-green-100 text-green-800 border-green-200"
        : "bg-green-50 text-green-600 border-green-100";
    }
    return impact === "High"
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-red-50 text-red-600 border-red-100";
  };

  const getImpactIcon = (type: string) => {
    return type === "positive" ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <AlertTriangle className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Privacy & Consent Section */}
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive view of your academic performance and wellness metrics
        </p>
      </div>

      {/* Current BRI Status */}
      <Card className="dashboard-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Current Engagement Score
                </h2>
                <p className="text-blue-600">Your Score assessment</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{briScore}</div>
              <div className="text-sm text-blue-500">Out of 100</div>
              <div className="text-xs text-gray-500 mt-1">
                {briScore < 40
                  ? "High Risk"
                  : briScore <= 70
                  ? "Moderate Risk"
                  : "Low Risk"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BRI Trend and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BRI History Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>BRI Trend Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={briHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* BRI Factor Radar */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Wellbeing Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Factor Breakdown */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Detailed Factor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {briFactors.map((factor, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {factor.factor}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {factor.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-800">
                      {factor.score}
                    </span>
                    <span className="text-sm text-gray-500">/{factor.max}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getFactorColor(
                      factor.score
                    )}`}
                    style={{ width: `${(factor.score / factor.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
            <Card className="dashboard-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <CardTitle>Privacy & Consent</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 text-sm">
            Control whether your wellness and engagement data is used for
            analysis and support. You can change this setting anytime.
          </p>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                Data Sharing Status
              </h3>
              <p className="text-xs text-gray-600">
                {sharingConsent
                  ? "Your data is used for analysis and support. You can revoke this consent at any time."
                  : "Your data is private and not used for analysis."}
              </p>
            </div>
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                sharingConsent
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}
            >
              {sharingConsent ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              <span className="font-medium text-sm">
                {sharingConsent ? "Allowed" : "Denied"}
              </span>
            </div>
            <Button
              onClick={handleToggleConsent}
              className={`ml-4 px-6 py-2 text-xs ${
                sharingConsent
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {sharingConsent ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Revoke Consent
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Grant Consent
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Contributing Factors */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Current Contributing Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contributingFactors.map((factor, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${getImpactColor(
                  factor.impact,
                  factor.type
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getImpactIcon(factor.type)}
                    <div>
                      <h3 className="font-semibold">{factor.factor}</h3>
                      <p className="text-sm mt-1">{factor.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                    {factor.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="dashboard-card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            🌟 Personalized Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Academic Support
              </h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Consider study group sessions for math</li>
                <li>• Use time-blocking for assignment management</li>
                <li>• Schedule regular breaks during study sessions</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-green-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Wellbeing Activities
              </h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Continue your exercise routine</li>
                <li>• Practice mindfulness for 10 minutes daily</li>
                <li>• Maintain social connections with peers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Patterns & Academic Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Study Hours */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Weekly Study Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { day: "Mon", hours: 6, productivity: 85 },
                  { day: "Tue", hours: 5, productivity: 78 },
                  { day: "Wed", hours: 8, productivity: 92 },
                  { day: "Thu", hours: 4, productivity: 65 },
                  { day: "Fri", hours: 3, productivity: 58 },
                  { day: "Sat", hours: 7, productivity: 88 },
                  { day: "Sun", hours: 2, productivity: 45 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Performance Distribution */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={studentData.subjectMarks.map((subject) => ({
                    name: subject.subject,
                    value: subject.marks,
                    fill:
                      subject.marks >= 80
                        ? "#22c55e"
                        : subject.marks >= 70
                        ? "#3b82f6"
                        : subject.marks >= 60
                        ? "#f59e0b"
                        : "#ef4444",
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {studentData.subjectMarks.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress & Sleep Pattern */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Performance Trend */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Monthly Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={[
                  { month: "Jan", marks: 75, attendance: 82, assignments: 88 },
                  { month: "Feb", marks: 78, attendance: 85, assignments: 90 },
                  { month: "Mar", marks: 82, attendance: 79, assignments: 85 },
                  { month: "Apr", marks: 78, attendance: 85, assignments: 92 },
                  { month: "May", marks: 80, attendance: 88, assignments: 89 },
                  { month: "Jun", marks: 85, attendance: 85, assignments: 94 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Area
                  type="monotone"
                  dataKey="marks"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stackId="2"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="assignments"
                  stackId="3"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sleep & Wellness Pattern */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Sleep & Wellness Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { week: "Week 1", sleep: 7.5, stress: 6, energy: 8 },
                  { week: "Week 2", sleep: 6.8, stress: 7, energy: 7 },
                  { week: "Week 3", sleep: 7.2, stress: 5, energy: 8.5 },
                  { week: "Week 4", sleep: 6.5, stress: 8, energy: 6 },
                  { week: "Week 5", sleep: 7.8, stress: 4, energy: 9 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 10]} />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Sleep Hours"
                />
                <Line
                  type="monotone"
                  dataKey="stress"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Stress Level"
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Energy Level"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Support Resources */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Support Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">
                Counseling Services
              </h3>
              <p className="text-sm text-blue-600 mt-1">
                Book an appointment with campus counselors
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <User className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">Peer Support</h3>
              <p className="text-sm text-purple-600 mt-1">
                Connect with student mentors and support groups
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">Academic Help</h3>
              <p className="text-sm text-orange-600 mt-1">
                Access tutoring and study resources
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
