import React from "react";

const Modal = ({ role, modalType, newEntry, setNewEntry, handleAddNewEntry, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add {modalType === "libraryHistory" ? "Library" : "Fees"} History</h3>
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
            {modalType === "feesHistory" && role !=='librarian' && (
              <div>
                <input
                  type="number"
                  placeholder="Amount"
                  value={newEntry.amount || ""}
                  onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm mb-2"
                />
                <input
                  type="date"
                  placeholder="Paid Date"
                  value={newEntry.paidDate || ""}
                  onChange={(e) => setNewEntry({ ...newEntry, paidDate: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm mb-2"
                />
                <select
                  value={newEntry.status || ""}
                  onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
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
  );
};

export default Modal;
