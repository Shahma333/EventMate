import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventsByUser,
  updateEvent,
  uploadEventImage
} from "../controller/eventController.mjs";
import { protect } from "../middleware/auth.mjs";
import path from "path";
import multer from "multer";
import fs from "fs";

const EventRouter = Router();

// Uploads directory setup
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 🟢 Correct field names for multipart form
EventRouter.put(
  "/update/:eventId",
  protect,
  upload.any(), // Accepts all files regardless of their field names
  updateEvent
);


EventRouter.post("/upload/:eventId", protect, upload.single("image"), uploadEventImage);
EventRouter.get("/all", getAllEvents);
EventRouter.get("/:eventId", getEventById);
EventRouter.post("/create", protect, upload.fields([
  { name: "image", maxCount: 1 },
  { name: "subtitles", maxCount: 5 },
  { name: "services", maxCount: 5 },
  { name: "highlights", maxCount: 5 }
]), createEvent);
EventRouter.put("/update/:eventId", protect, upload.fields([
  { name: "image", maxCount: 1 },
  { name: "subtitles", maxCount: 5 },
  { name: "services", maxCount: 5 },
  { name: "highlights", maxCount: 5 }
]), updateEvent);


EventRouter.delete("/delete/:eventId", protect, deleteEvent);
EventRouter.get("/user",protect,getEventsByUser)
export default EventRouter;
