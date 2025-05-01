import { configureStore } from "@reduxjs/toolkit";
  
import { eventReducer } from "./eventSlice"; 
import { authReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, 
    events: eventReducer, 
  },
});

export default store;
