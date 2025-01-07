// src/components/UserForm.js
import React from "react";

const UserForm = ({ form, handleInputChange, handleSubmit, isEditing }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-6" autoComplete="off">
      {/* Hidden Decoy Fields */}
      <input type="text" name="dummy-field" style={{ display: "none" }} autoComplete="off" />
      <input type="password" name="dummy-password" style={{ display: "none" }} autoComplete="off" />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border p-2 rounded"
          autoComplete="off"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border p-2 rounded"
          autoComplete="off"
          required
        />
        {!isEditing && (
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="border p-2 rounded"
            autoComplete="new-password"
            required={!isEditing}
          />
        )}
        <select
          name="role"
          value={form.role}
          onChange={handleInputChange}
          className="border p-2 rounded"
          autoComplete="off"
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="staff">Office Staff</option>
          <option value="librarian">Librarian</option>
        </select>
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        {isEditing ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default UserForm;
