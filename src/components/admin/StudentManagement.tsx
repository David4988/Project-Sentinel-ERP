import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { AdminCSEKStudents, AdminCSEDStudents } from "@/data/mockData";

const initialStudents = [
  ...AdminCSEKStudents.map((s, idx) => ({
    id: `CSE-K-${idx + 1}`,
    name: s.id,
    class: "CSE-K",
    briScore: s.briScore,
    riskLevel: s.riskLevel,
    email: `${s.id.replace(/\s/g, ".").toLowerCase()}@campus.edu`,
  })),
  ...AdminCSEDStudents.map((s, idx) => ({
    id: `CSE-D-${idx + 1}`,
    name: s.id,
    class: "CSE-D",
    briScore: s.briScore,
    riskLevel: s.riskLevel,
    email: `${s.id.replace(/\s/g, ".").toLowerCase()}@campus.edu`,
  })),
];

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState(initialStudents);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [email, setEmail] = useState("");

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !studentClass || !email) return;
    setStudents([
      ...students,
      {
        id: `${studentClass}-${students.length + 1}`,
        name,
        class: studentClass,
        briScore: Math.floor(Math.random() * 60) + 30,
        riskLevel: "medium",
        email,
      },
    ]);
    setName("");
    setStudentClass("");
    setEmail("");
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <motion.div
      className="space-y-8 animate-fade-in"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Student Management
        </h1>
        <p className="text-gray-600">Manage campus students</p>
      </motion.div>

      {/* Add Student Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col md:flex-row gap-4"
              onSubmit={handleAddStudent}
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-1/4"
                required
              />
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-1/4"
                required
              >
                <option value="">Select Class</option>
                <option value="CSE-K">CSE-K</option>
                <option value="CSE-D">CSE-D</option>
              </select>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-1/4"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Student
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Student List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Student Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Class</th>
                    <th className="px-4 py-2 text-left">BRI Score</th>
                    <th className="px-4 py-2 text-left">Risk Level</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b"
                    >
                      <td className="px-4 py-2">{s.name}</td>
                      <td className="px-4 py-2">{s.class}</td>
                      <td className="px-4 py-2">{s.briScore}</td>
                      <td className="px-4 py-2">{s.riskLevel}</td>
                      <td className="px-4 py-2">{s.email}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleRemoveStudent(s.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {students.length === 0 && (
                <div className="text-center text-gray-500 py-6">
                  No students found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StudentManagement;
