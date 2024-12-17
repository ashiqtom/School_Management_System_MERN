import React, { useState, useEffect } from "react";
import { getUsers } from "../service/api/admin/GetApi";
import { createAccount } from '../service/api/admin/PostApi'
import { deleteUser } from "../service/api/admin/DeleteApi";
import { editUser } from "../service/api/admin/PutApi";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await editUser(editingUserId,form);
      } else {
        const res = await createAccount(form)
        console.log(res)
      }
      fetchUsers();
      setForm({ name: "", email: "", password: "", role: "" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEditing(true);
    setEditingUserId(user._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try { 
        await deleteUser(id)
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div >
      

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

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
            {!isEditing && <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="border p-2 rounded"
              autoComplete="new-password"
              required={!isEditing}
            />}
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
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update User" : "Create User"}
          </button>
        </form>

        {/* User List */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
