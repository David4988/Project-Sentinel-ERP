import React, { useState } from "react";
import { classData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";

const UploadTestsAssignments: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [docType, setDocType] = useState<"test" | "assignment">("test");
  const [viewType, setViewType] = useState<"test" | "assignment">("test");
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      name: string;
      status: "pending" | "corrected" | "error";
      scheduledDate?: string;
      attended?: number;
      notAttended?: number;
      type: "test" | "assignment";
    }>
  >([
    {
      name: "Unit Test 1 - Mathematics.pdf",
      status: "pending",
      scheduledDate: "2025-09-30",
      attended: 32,
      notAttended: 8,
      type: "test",
    },
    {
      name: "Assignment - Physics Lab.docx",
      status: "corrected",
      scheduledDate: "2025-09-25",
      attended: 35,
      notAttended: 5,
      type: "assignment",
    },
    {
      name: "Unit Test 2 - Computer Science.pdf",
      status: "pending",
      scheduledDate: "2025-10-05",
      attended: 30,
      notAttended: 10,
      type: "test",
    },
    {
      name: "Assignment - English Essay.docx",
      status: "pending",
      scheduledDate: "2025-09-28",
      attended: 36,
      notAttended: 4,
      type: "assignment",
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile && scheduleDate) {
      // Simulate attendance summary (random for demo)
      const totalStudents =
        classData["CSE-K"].totalStudents + classData["CSE-D"].totalStudents;
      const attended = Math.floor(Math.random() * totalStudents);
      setUploadedFiles([
        {
          name: selectedFile.name,
          status: "pending",
          scheduledDate: scheduleDate,
          attended,
          notAttended: totalStudents - attended,
          type: docType,
        },
        ...uploadedFiles,
      ]);
      setSelectedFile(null);
      setScheduleDate("");
      setDocType("test");
    }
  };
  const handleSchedule = (index: number, date: string) => {
    // Simulate attendance summary (random for demo)
    const totalStudents =
      classData["CSE-K"].totalStudents + classData["CSE-D"].totalStudents;
    const attended = Math.floor(Math.random() * totalStudents);
    setUploadedFiles(
      uploadedFiles.map((file, i) =>
        i === index
          ? {
              ...file,
              scheduledDate: date,
              attended,
              notAttended: totalStudents - attended,
            }
          : file
      )
    );
  };

  const handleCorrect = (index: number) => {
    setUploadedFiles(
      uploadedFiles.map((file, i) =>
        i === index ? { ...file, status: "corrected" } : file
      )
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Schedule & View Tests/Assignments
        </h1>
        <p className="text-gray-600">
          Schedule new tests/assignments and view attendance summary for
          previously scheduled ones.
        </p>
      </div>

      {/* Section 1: Schedule New Test/Assignment */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Schedule New Test/Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 rounded"
            />
            <select
              value={docType}
              onChange={(e) =>
                setDocType(e.target.value as "test" | "assignment")
              }
              className="border p-2 rounded"
            >
              <option value="test">Test</option>
              <option value="assignment">Assignment</option>
            </select>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="border p-2 rounded"
            />
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !scheduleDate}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Previously Scheduled Tests/Assignments */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Previously Scheduled
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button
              variant={viewType === "test" ? "default" : "outline"}
              onClick={() => setViewType("test")}
            >
              View Tests
            </Button>
            <Button
              variant={viewType === "assignment" ? "default" : "outline"}
              onClick={() => setViewType("assignment")}
            >
              View Assignments
            </Button>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-2">Scheduled Files</h2>
            {uploadedFiles.filter((f) => f.type === viewType).length === 0 ? (
              <p className="text-gray-500">
                No scheduled {viewType === "test" ? "tests" : "assignments"}{" "}
                yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {uploadedFiles
                  .filter((f) => f.type === viewType)
                  .map((file, idx) => (
                    <li
                      key={file.name + idx}
                      className="flex flex-col gap-2 p-3 bg-gray-50 rounded border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-800">
                            {file.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCorrect(idx)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                              Mark Corrected
                            </Button>
                          )}
                          {file.status === "corrected" && (
                            <span className="flex items-center text-green-600 font-semibold">
                              <CheckCircle className="w-4 h-4 mr-1" /> Corrected
                            </span>
                          )}
                          {file.status === "error" && (
                            <span className="flex items-center text-red-600 font-semibold">
                              <XCircle className="w-4 h-4 mr-1" /> Error
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <label className="text-sm text-gray-600">
                          Schedule Date:
                        </label>
                        <input
                          type="date"
                          value={file.scheduledDate || ""}
                          onChange={(e) => handleSchedule(idx, e.target.value)}
                          className="border p-1 rounded"
                          disabled={!!file.scheduledDate}
                        />
                        <span className="text-xs text-gray-500">
                          {file.scheduledDate}
                        </span>
                        {!file.scheduledDate && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const input = document.querySelector(
                                `#schedule-date-${idx}`
                              ) as HTMLInputElement;
                              if (input && input.value)
                                handleSchedule(idx, input.value);
                            }}
                          >
                            Schedule
                          </Button>
                        )}
                      </div>
                      {file.attended !== undefined &&
                        file.notAttended !== undefined && (
                          <div className="mt-2 text-sm text-gray-700">
                            <strong>Summary:</strong> {file.attended} students
                            attended, {file.notAttended} did not attend.
                          </div>
                        )}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadTestsAssignments;
