import User from "../models/User.js";

const createAccount=async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      const user = new User({ name, email, password, role });
      await user.save();
      res.json({ message: "User created successfully" });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Server error" });
    }
}

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select("-password"); // Exclude req.user and pssword : $ne = (Not Equal):
    res.status(200).json({ users });
  } catch (err) {
    console.log(err)

    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err)

    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user
    await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({message: "User updated successfully"});
  } catch (err) {
    console.error("Error editing user:", err);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};


export default{
  editUser,
  deleteUser,
  createAccount,
  getAllUsers
}