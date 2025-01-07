
import React, { useState, useEffect } from "react";
import { getUsers } from "../service/api/admin/GetApi";
import { createAccount } from '../service/api/admin/PostApi';
import { deleteUser } from "../service/api/admin/DeleteApi";
import { editUser } from "../service/api/admin/PutApi";
import UserForm from "../Components/admin/UserForm";
import UserTable from "../Components/admin/UserTable";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
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
        await editUser(editingUserId, form);
      } else {
        await createAccount(form);
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
        await deleteUser(id);
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
    <div>
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

        <UserForm
          form={form}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />

        <UserTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
      </main>
    </div>
  );
};

export default AdminDashboard;
