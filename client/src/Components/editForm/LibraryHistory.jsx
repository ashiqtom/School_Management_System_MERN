import React, { useState } from "react";

const LibraryHistory = ({ student, openModal, handleNestedChange, handleDeleteLibraryHistory }) => {
  const [showLibraryDropdown, setShowLibraryDropdown] = useState(false);

  return (
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
            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDeleteLibraryHistory(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-md mt-2 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))} 
    </div>
  );
};

export default LibraryHistory;
