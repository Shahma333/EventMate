import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, 

    subtitles: [
      {
        title: { type: String, required: true },
        image: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],

    services: [
      {
        title: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],

    highlights: [
      {
        title: { type: String, required: true },
        description: { type: String, required: false },
        image: { type: String, required: true },
      },
    ],

    date: { type: Date, required: false },
    location: { type: String, required: false },

    createdBy: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  {
    timestamps: true,
  }
);

export const eventCollection = model("Events", EventSchema);
