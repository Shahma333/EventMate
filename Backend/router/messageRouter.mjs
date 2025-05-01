import express from "express";
import { getMessagesForAdmin, sendMessage } from "../controller/messageController.mjs";
import { adminOnly, protect } from "../middleware/auth.mjs";


const messageRouter = express.Router();

messageRouter.post("/send", sendMessage);
messageRouter.get("/get", protect,adminOnly, getMessagesForAdmin);

export default messageRouter;