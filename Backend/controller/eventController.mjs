import { eventCollection } from "../models/eventModel.mjs";
import { userCollection } from "../models/userModel.mjs";
import fs from "fs";
import path from "path";


export const createEvent = async (req, res) => {
  try {
    const { title, date, location } = req.body;
    const userId = req.user.id;

    const user = await userCollection.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle uploaded files
    const mainImage = req.files?.image?.[0]?.filename || "";

    const subtitleImages = req.files?.subtitles || [];
    const serviceImages = req.files?.services || [];
    const highlightImages = req.files?.highlights || [];

    const subtitles = subtitleImages.map((file, index) => ({
      title: req.body[`subtitleTitle${index}`],
      image: file.filename,
      content: req.body[`subtitleContent${index}`],
    }));

    const services = serviceImages.map((file, index) => ({
      title: req.body[`serviceTitle${index}`],
      image: file.filename,
    }));

    const highlights = highlightImages.map((file, index) => ({
      title: req.body[`highlightTitle${index}`],
      description: req.body[`highlightDesc${index}`],
      image: file.filename,
    }));

    const newEvent = await eventCollection.create({
      title,
      image: mainImage,
      subtitles,
      services,
      highlights,
      date,
      location,
      createdBy: userId,
    });

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error("Event creation error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

  export const getAllEvents = async (req, res) => {
    try {
      const events = await eventCollection.find().populate("createdBy", "name email  username") .exec();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal Server Error" });
    }
  };
  
  export const getEventById = async (req, res) => {
    try {
      const { eventId } = req.params;
      const event = await eventCollection.findById(eventId).populate("createdBy", "name email");
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal Server Error" });
    }
  };
  

  export const updateEvent = async (req, res) => {
    try {
      console.log("req.body:", req.body);
      console.log("req.files:", req.files);
  
      const eventId = req.params.eventId;
  
      // Prepare the updated event data
      const updatedData = {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        // Add any additional fields from req.body here
      };
  
      // If there are files, handle them
      if (req.files) {
        // Handle the main image upload
        const mainImage = req.files.find((f) => f.fieldname === "image");
        if (mainImage) {
          updatedData.image = mainImage[0].filename;  // Assuming mainImage is an array
        }
  
        // Handle subtitles upload
        if (req.files.subtitles) {
          updatedData.subtitles = req.files.subtitles.map((file, index) => ({
            title: req.body.subtitles[index].title,
            content: req.body.subtitles[index].content,
            image: file.filename,
          }));
        }
  
        // Handle services upload
        if (req.files.services) {
          updatedData.services = req.files.services.map((file, index) => ({
            title: req.body.services[index].title,
            image: file.filename,
          }));
        }
  
        // Handle highlights upload
        if (req.files.highlights) {
          updatedData.highlights = req.files.highlights.map((file, index) => ({
            title: req.body.highlights[index].title,
            description: req.body.highlights[index].description,
            image: file.filename,
          }));
        }
      }
  
      // Update event in the database
      const updatedEvent = await eventCollection.findByIdAndUpdate(eventId, updatedData, {
        new: true,
      });
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event updated", event: updatedEvent });
  
    } catch (error) {
      console.error("Update Event Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  export const deleteEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await eventCollection.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
     
      if (!event.createdBy.equals(req.user.id)) {
        return res.status(403).json({ message: "Unauthorized! You can only delete your own event" });
      }
  
      await eventCollection.findByIdAndDelete(eventId);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal Server Error" });
    }
  };
  

 

  export const uploadEventImage = async (req, res) => {
    const { eventId } = req.params;
  
    // Ensure an image file is uploaded
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  
    try {
      const event = await eventCollection.findById(eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });
  
      // If an existing image is there, delete it
      if (event.image) {
        const oldImagePath = path.join("uploads", event.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
  
      // Save the new image filename
      event.image = req.file.filename;
      await event.save();
  
      res.status(200).json({ message: "Event image uploaded", image: req.file.filename });
    } catch (err) {
      console.error("Error uploading image:", err);
      res.status(500).json({ message: err.message });
    }
  };


// GET /events/user
export const getEventsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const userEvents = await eventCollection.find({ createdBy: userId }).populate("createdBy", "name email");

    res.status(200).json({ events: userEvents });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
