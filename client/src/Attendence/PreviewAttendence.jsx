import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { File, Home } from 'lucide-react';

const PreviewAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPostSubmitOptions, setShowPostSubmitOptions] = useState(false);

  const { 
    absentStudents, 
    presentStudents, 
    subject, 
    attendanceDate,
    attendanceData
  } = location.state || {};

  const handleConfirmAttendance = async () => {

    await axiosInstance.post(`/${subject}/`, attendanceData)
      .then((res) => {
        console.log(res);
        
        toast.success("Attendance Confirmed!", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowPostSubmitOptions(true);
      })
      .catch((e) => {
        toast.error("Confirmation failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const onCancel = () => {
    navigate(-1);
  }

  const handleDownloadReport = () => {
    const csvContent = generateAttendanceCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${subject}_attendance_${attendanceDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateAttendanceCSV = () => {
    const headers = ['Roll No', 'Name' , 'Fathers Name', 'Status'];
    const presentRows = presentStudents.map(student => 
      `${student.roll_no},${student.name},${student.fathers_name},Present`
    );
    const absentRows = absentStudents.map(student => 
      `${student.roll_no},${student.name},${student.fathers_name},Absent`
    );
    
    return [
      headers.join(','),
      ...presentRows,
      ...absentRows
    ].join('\n');
  };

  if (showPostSubmitOptions) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl font-bold">Attendance Submitted Successfully</h2>
        <div className="flex space-x-4">
          <button 
            onClick={handleDownloadReport}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <File className="mr-2" /> Download Report
          </button>
          <button 
            onClick={()=> {navigate(-1)}}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Home className="mr-2" /> Back to Attendence Portal
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Preview</h2>
      <div className="mb-4">
      
        <p>
          <strong>Subject:</strong> {subject}
        </p>
        <p>
          <strong>Date:</strong> {attendanceDate}
        </p>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Present Students : {presentStudents.length}
          </h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 border">Roll No</th>
                <th className="p-2 border">Name</th>
              </tr>
            </thead>
            <tbody>
              {presentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-800">
                  <td className="p-2 border">{student.roll_no}</td>
                  <td className="p-2 border">{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Absent Students : {absentStudents.length}
          </h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 border">Roll No</th>
                <th className="p-2 border">Name</th>
              </tr>
            </thead>
            <tbody>
              {absentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-800">
                  <td className="p-2 border">{student.roll_no}</td>
                  <td className="p-2 border">{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmAttendance}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm Attendance
        </button>
      </div>
    </div>
  );
};

export default PreviewAttendance;
