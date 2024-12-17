import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../service/api/staff/GetApi";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("studentDetails");
  const [studentDetails, setStudentDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      const response = await getStudents(); 
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) return <div className="text-center text-gray-500">Loading...</div>;

    switch (activeTab) {
      case "studentDetails":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Student Details</h3>
            <ul className="list-disc pl-5">
              {studentDetails.map((student) => (
                <li key={student._id} className="mb-2">
                  <Link to={`/student/${student._id}`} className="font-medium">
                    {student.name} - Class: {student.class}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      case "feesHistory":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Fees History</h3>
            <ul className="list-disc pl-5">
              {studentDetails.map((student) =>
                student.feesHistory.map((fees) => (
                  <li key={fees._id} className="mb-2">
                    <span className="font-medium">{student.name} {" "}</span>: {fees.amount} on{" "}
                    {new Date(fees.paidDate).toLocaleDateString()} - Status: {fees.status}
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      case "libraryRecords":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Library Records</h3>
            <ul className="list-disc pl-5">
              {studentDetails.map((student) =>
                student.libraryHistory.map((record) => (
                  <li key={record._id} className="mb-2">
                    <span className="font-medium">{student.name} - {record.bookTitle}</span> - Borrowed on{" "}
                      {new Date(record.borrowedDate).toLocaleDateString()}
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="staff-dashboard p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Staff Dashboard</h1>
      <div className="tabs flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "studentDetails" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("studentDetails")}
        >
          Student Details
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "feesHistory" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("feesHistory")}
        >
          Fees History
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "libraryRecords" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("libraryRecords")}
        >
          Library Records
        </button>
      </div>
      <div className="content bg-white p-6 rounded-md shadow-md">{renderContent()}</div>
    </div>
  );
};

export default StaffDashboard;
