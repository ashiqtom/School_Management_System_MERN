import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../service/api/librarian/GetApi";
import { editStudent } from "../service/api/librarian/PutApi";

const EditStudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    class: "",
    libraryHistory: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLibraryDropdown, setShowLibraryDropdown] = useState(false);
  const [showFeesDropdown, setShowFeesDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "libraryHistory" or "feesHistory"
  const [newEntry, setNewEntry] = useState({});

  const fetchStudent = async () => {
    try {
      const response = await getStudentById(id);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, index, field, type) => {
    const { value } = e.target;
    setStudent((prev) => {
      const updatedNested = [...prev[type]];
      updatedNested[index] = { ...updatedNested[index], [field]: value };
      return { ...prev, [type]: updatedNested };
    });
  };

  const handleCancel = () => {
    navigate("/librarian");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await editStudent(id, student);
      navigate("/librarian");
    } catch (err) {
      console.error("Error editing student:", err);
      setError("Failed to edit student data");
    } finally {
      setLoading(false);
    }
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

  const openModal = (type) => {
    setModalType(type);
    setNewEntry( { bookTitle: "", borrowedDate: "", returnedDate: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEntry({});
  };

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>No student data found.</p>;

  return (
    <div className="student-form bg-slate-500 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {/* Class */}
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
            Class:
          </label>
          <input
            type="text"
            id="class"
            name="class"
            value={student.class || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {/* Library History */}
        <div>
          <h3 className="text-lg font-semibold">Library History</h3>
          <button
            type="button"
            onClick={() => setShowLibraryDropdown(!showLibraryDropdown)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md mb-2"
          >
            {showLibraryDropdown ? "Hide" : "Show"} Library History
          </button>
          <button
            type="button"
            onClick={() => openModal("libraryHistory")}
            className="bg-green-500 text-white px-3 py-1 rounded-md mb-2 ml-2"
          >
            Add Library History
          </button>
          {showLibraryDropdown &&
            student.libraryHistory.map((item, index) => (
              <div
                key={index}
                className="p-4 mb-4 border rounded-md shadow-md bg-gray-50"
              >
                <h3 className="text-lg font-semibold mb-2">Book {index + 1}</h3>
                <div className="space-y-2">
                  {/* Book Title */}
                  <div className="flex flex-row items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 w-32">Book Title:</label>
                    <input
                      type="text"
                      placeholder="Book Title"
                      value={item.bookTitle || ""}
                      onChange={(e) =>
                        handleNestedChange(e, index, "bookTitle", "libraryHistory")
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>            
                  {/* Borrowed Date */}
                  <div className="flex flex-row items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Borrowed Date:
                    </label>
                    <input
                      type="date"
                      placeholder="Borrowed Date"
                      value={item.borrowedDate ? item.borrowedDate.split("T")[0] : ""}
                      onChange={(e) =>
                        handleNestedChange(e, index, "borrowedDate", "libraryHistory")
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
            
                  {/* Returned Date */}
                  <div className="flex flex-row items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 w-32">
                      Returned Date:
                    </label>
                    <input
                      type="date"
                      placeholder="Returned Date"
                      value={item.returnedDate ? item.returnedDate.split("T")[0] : ""}
                      onChange={(e) =>
                        handleNestedChange(e, index, "returnedDate", "libraryHistory")
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            ))}            
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add { "Library" } History</h3>
            {modalType === "libraryHistory" && (
              <div>
                <input
                  type="text"
                  placeholder="Book Title"
                  value={newEntry.bookTitle || ""}
                  onChange={(e) => setNewEntry({ ...newEntry, bookTitle: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm mb-2"
                />
                <input
                  type="date"
                  placeholder="Borrowed Date"
                  value={newEntry.borrowedDate || ""}
                  onChange={(e) => setNewEntry({ ...newEntry, borrowedDate: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm mb-2"
                />
                <input
                  type="date"
                  placeholder="Returned Date"
                  value={newEntry.returnedDate || ""}
                  onChange={(e) => setNewEntry({ ...newEntry, returnedDate: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            )}
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={handleAddNewEntry}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditStudentForm;
