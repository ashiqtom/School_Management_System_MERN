import React, { useState } from "react";

const FeesHistory = ({ student, openModal, handleNestedChange, handleDeleteFeesHistory }) => {
  const [showFeesDropdown, setShowFeesDropdown] = useState(false);

  return (
    <div>
      <h3 className="text-lg font-semibold">Fees History</h3>
      <button
        type="button"
        onClick={() => setShowFeesDropdown(!showFeesDropdown)}
        className="bg-blue-500 text-white px-3 py-1 rounded-md mb-2"
      >
        {showFeesDropdown ? "Hide" : "Show"} Fees History
      </button>
      <button
        type="button"
        onClick={() => openModal("feesHistory")}
        className="bg-green-500 text-white px-3 py-1 rounded-md mb-2 ml-2"
      >
        Add Fees History
      </button>
      {showFeesDropdown &&
        student.feesHistory.map((item, index) => (
          <div
            key={index}
            className="p-4 mb-4 border rounded-md shadow-md bg-gray-50"
          >
            <h3 className="text-lg font-semibold mb-2">Fees {index + 1}</h3>
            <div className="flex flex-row items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 w-32">Amount:</label>
              <input
                type="number"
                placeholder="Amount"
                value={item.amount || ""}
                onChange={(e) => handleNestedChange(e, index, "amount", "feesHistory")}
                className="block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 w-32">Paid Date:</label>
              <input
                type="date"
                placeholder="Paid Date"
                value={item.paidDate ? item.paidDate.split("T")[0] : ""}
                onChange={(e) => handleNestedChange(e, index, "paidDate", "feesHistory")}
                className="block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 w-32">Status:</label>
              <select
                value={item.status || "Paid"}
                onChange={(e) => handleNestedChange(e, index, "status", "feesHistory")}
                className="block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDeleteFeesHistory(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-md mt-2 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default FeesHistory;
