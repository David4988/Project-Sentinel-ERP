import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Users,
  TrendingDown,
  AlertTriangle,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { classData, complaints } from "@/data/mockData";

const initialStaff = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Lecturer",
    email: "alice.johnson@campus.edu",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Lab Assistant",
    email: "bob.smith@campus.edu",
  },
  {
    id: 3,
    name: "Carol Lee",
    role: "Counsellor",
    email: "carol.lee@campus.edu",
  },
  {
    id: 4,
    name: "David Brown",
    role: "Professor",
    email: "david.brown@campus.edu",
  },
];

import { useState } from "react";

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !email) return;
    setStaff([...staff, { id: Date.now(), name, role, email }]);
    setName("");
    setRole("");
    setEmail("");
  };

  const handleRemoveStaff = (id: number) => {
    setStaff(staff.filter((s) => s.id !== id));
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
          Staff Management
        </h1>
        <p className="text-gray-600">Manage campus staff members</p>
      </motion.div>

      {/* Add Staff Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <CardTitle>Add New Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col md:flex-row gap-4"
              onSubmit={handleAddStaff}
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-1/4"
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-1/4"
                required
              />
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
                Add Staff
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Staff List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Staff Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b"
                    >
                      <td className="px-4 py-2">{s.name}</td>
                      <td className="px-4 py-2">{s.role}</td>
                      <td className="px-4 py-2">{s.email}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleRemoveStaff(s.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {staff.length === 0 && (
                <div className="text-center text-gray-500 py-6">
                  No staff members found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StaffManagement;
