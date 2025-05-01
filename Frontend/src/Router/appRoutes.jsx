import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../Pages/NavBar";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/users/Login";
import Signup from "../Pages/users/Signup";

import HeroSection from "../Pages/Hero";
import { Route, Routes } from "react-router";
import AboutUs from "../Pages/AboutUs";
import { setUser } from "../Redux/userSlice";
import CreateEvent from "../Pages/events/createEvent";
import UserDashboard from "../Pages/users/userdashboard";
import AdminDashboard from "../Pages/admin/admindashboard";
import UpdateProfile from "../Pages/users/updateProfile";
import AdminMessages from "../Pages/admin/messages";
import EventOptions from "../Pages/events/event_dashboard";
import ViewEvents from "../Pages/events/viewEvent";
import EventDetails from "../Pages/events/eventDescription";
import UpdateEvent from "../Pages/events/updateEvent";
import Contact from "../Pages/Contact";
import UserManagement from "../Pages/users/UserList";
import Chart from "../Pages/admin/statistics";
import Statistics from "../Pages/admin/statistics";

const AppRoutes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("access_token");

        if (storedUser && storedToken) {
            dispatch(setUser({ user: storedUser, token: storedToken }));
        }
    }, [dispatch]);

    return (
        <>
          <Navbar></Navbar>
          
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/hero" element={<HeroSection/>} />
            <Route path="/contact" element={<Contact/>} />


                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
           <Route path="/events/create" element={<CreateEvent></CreateEvent>}></Route>
           <Route path="/user-dashboard" element={<UserDashboard />} />
           <Route path="/admin-dashboard" element={<AdminDashboard/>} />
           <Route path="/update-profile" element={<UpdateProfile />} />
           <Route path="/messages" element={<AdminMessages />} />
           <Route path="/events" element={< EventOptions/>} />
           <Route path="/events/getevents" element={< ViewEvents/>} />
           <Route path="/events/:eventId" element={<EventDetails />} />
           <Route path="/events/update/:eventId" element={<UpdateEvent/>} />
           <Route path="/user/management" element={<UserManagement/>} />
           <Route path="/statics" element={<Statistics/>} />
            </Routes>

        </>
    );
};

export default AppRoutes;
