import express from "express";
import { changeUserRole, getAllUsers, loginUser, registerUser, toggleUserStatus, updateUserProfile } from "../controller/userController.mjs";
import { adminOnly, protect } from "../middleware/auth.mjs";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/profile/update", protect, updateUserProfile);
userRouter.get("/all", protect,adminOnly,  getAllUsers);
userRouter.put("/status/:userId", protect, adminOnly, toggleUserStatus);
userRouter.put("/role/:userId", protect, adminOnly, changeUserRole);

export default userRouter;


