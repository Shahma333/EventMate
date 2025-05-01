import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "dotenv";
import { userCollection } from "../models/userModel.mjs";
env.config();

const generateToken = (user) => {
  console.log("🔑 Generating Token for User Role:", user.role);  // Debugging
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userCollection.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: role && ["admin",  "user"].includes(role) ? role : "user",
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};


export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userCollection.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      if (user.status === "suspended") {
        return res.status(403).json({ message: "Your account has been suspended. Contact admin for reactivation." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const token = generateToken(user);
  
      console.log("✅ User Role During Login:", user.role); 
  
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role, 
          status: user.status,
        },
        token,
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  };
  export const updateUserProfile = async (req, res) => {
    try {
      const { name, email, username, newPassword } = req.body;
  
      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
  
      const user = await userCollection.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.username = username || user.username;
  
      if (newPassword) {
        if (newPassword.length < 6) {
          return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
  
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      }
  
      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  };
  export const getAllUsers = async (req, res) => {
    try {
      const users = await userCollection.find().select("-password").lean();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  };
  // Toggle Active/Inactive
export const toggleUserStatus = async (req, res) => {
  try {
    const userId = req.params.userId; // 🔥 Use correct param name

    const user = await userCollection.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle status
    user.status = user.status === "active" ? "suspended" : "active";
    await user.save();

    res.status(200).json({ message: "User status updated", status: user.status });
  } catch (error) {
    console.error("Error in changeUserStatus:", error);
    res.status(500).json({ message: "Failed to update user status" });
  }
};

// Change Role
// Updated changeUserRole controller
export const changeUserRole = async (req, res) => {
  try {
    const { newRole } = req.body;  // Assuming newRole is passed in the body
    const userId = req.params.userId;  // Correctly extracting the userId from params

    // Find user by ID
    const user = await userCollection.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update the role
    user.role = newRole;
    await user.save();

    // Return success response
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.error(error);  // Log any errors for debugging
    res.status(500).json({ message: "Failed to update user role" });
  }
};
