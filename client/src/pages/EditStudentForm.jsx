import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById } from '../service/api/staff/GetApi'; 
import { editStudent } from "../service/api/staff/PutApi";
import { deleteStudent } from "../service/api/staff/DeleteApi";

import { getLibrarianStudentById } from "../service/api/librarian/GetApi";
import { editLibrarianStudent } from "../service/api/librarian/PutApi";

import StudentForm from "../Components/editForm/StudentForm";
import LibraryHistory from "../Components/editForm/LibraryHistory";
import FeesHistory from "../Components/editForm/FeesHistory";
import Modal from "../Components/editForm/Modal";
import { useSelector } from "react-redux";

const EditStudentForm = () => {
  const {role } = useSelector((state) => state.auth); // Get the role from Redux state  

  const navigate = useNavigate(); 
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    class: "",
    libraryHistory: [],
    feesHistory: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "libraryHistory" or "feesHistory"
  const [newEntry, setNewEntry] = useState({});

  const fetchStudent = async () => {
    try {
      let response ;
      if(role === "librarian") {
         response = await getLibrarianStudentById(id);
      } else {
         response = await getStudentById(id);
      }
      setStudent(response.data);
    } catch (err) {
      console.error("Error fetching student:", err);
      setError("Failed to fetch student data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let response
      if(role === "librarian") {
        response = await editLibrarianStudent(id, student);
        navigate("/librarian");
      } else {
        response = await editStudent(id, student);
        navigate("/staff");
      }
      
    } catch (err) {
      console.error("Error editing student:", err);
      setError("Failed to edit student data");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/staff");
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(id);
      navigate("/staff");
    } catch (err) {
      console.error("Error deleting student:", err);
      setError("Failed to delete student");
    }
  };

  const handleNestedChange = (e, index, field, type) => {
    const { value } = e.target;
    setStudent((prev) => {
      const updatedNested = [...prev[type]];
      updatedNested[index] = { ...updatedNested[index], [field]: value };
      return { ...prev, [type]: updatedNested };
    });
  };

  const openModal = (type) => {
    setModalType(type);
    setNewEntry(type === "libraryHistory" ? { bookTitle: "", borrowedDate: "", returnedDate: "" } : { amount: "", paidDate: "", status: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEntry({});
  };

  const handleAddNewEntry = () => {
    if (!modalType) return;
    setStudent((prev) => ({
      ...prev,
      [modalType]: [...prev[modalType], newEntry],
    }));
    setIsModalOpen(false);
    setNewEntry({});
  };

  const handleDeleteLibraryHistory = (indexToRemove) => {
    setStudent((prev) => ({
      ...prev,
      libraryHistory: prev.libraryHistory.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleDeleteFeesHistory = (indexToRemove) => {
    setStudent((prev) => ({
      ...prev,
      feesHistory: prev.feesHistory.filter((_, index) => index !== indexToRemove),
    }));
  };
    

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>No student data found.</p>;

  return (
    <div className="student-form bg-slate-500 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
      {error && <p className="text-red-500">{error}</p>}

      <StudentForm student={student} setStudent={setStudent} onSubmit={handleSubmit} />

      <LibraryHistory 
        handleDeleteLibraryHistory={handleDeleteLibraryHistory} 
        student={student} 
        openModal={openModal} 
        handleNestedChange={handleNestedChange} 
      />

      {role !== "librarian" &&
        <FeesHistory 
        handleDeleteFeesHistory={handleDeleteFeesHistory}
        student={student} 
        openModal={openModal} 
        handleNestedChange={handleNestedChange}
      />}

      {/* Modal */}
      {isModalOpen && (
        <Modal
          role={role}
          modalType={modalType}
          newEntry={newEntry}
          setNewEntry={setNewEntry}
          handleAddNewEntry={handleAddNewEntry}
          closeModal={closeModal}
        />
      )}
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        >
          Update
        </button>
        {role !== "librarian" && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-800"
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditStudentForm;
