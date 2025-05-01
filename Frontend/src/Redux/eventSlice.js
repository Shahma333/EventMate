import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Set all events (e.g., after fetching from backend)
    setEvents: (state, action) => {
      state.events = action.payload;
    },

    // Add a new event
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },

    // Delete an event by its _id
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event._id !== action.payload);
    },

    // Optional: Update event by _id (useful if editing is needed)
    updateEvent: (state, action) => {
      const index = state.events.findIndex(event => event._id === action.payload._id);
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...action.payload };
      }
    },
  },
});

export const { setEvents, addEvent, deleteEvent, updateEvent } = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
