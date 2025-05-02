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
import Statistics from "../Pages/admin/statistics";
import { ProtectedRoute } from "./protecterRouter";

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



           <Route path="/events/create" element={<ProtectedRoute allowedRoles={["user"]}><CreateEvent></CreateEvent></ProtectedRoute>}></Route>
           <Route path="/user-dashboard" element={<ProtectedRoute allowedRoles={["user"]}><UserDashboard></UserDashboard></ProtectedRoute>} />
           <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard></AdminDashboard></ProtectedRoute>} />
           <Route path="/update-profile" element={<ProtectedRoute allowedRoles={["user"]}><UpdateProfile></UpdateProfile></ProtectedRoute>} />
           <Route path="/messages" element={<ProtectedRoute allowedRoles={["admin"]}><AdminMessages></AdminMessages></ProtectedRoute>} />
           <Route path="/events" element={<ProtectedRoute allowedRoles={["admin","user"]}><EventOptions></EventOptions></ProtectedRoute>} />
           <Route path="/events/getevents" element={< ViewEvents/>} />
           <Route path="/events/:eventId" element={<EventDetails />} />
           <Route path="/events/update/:eventId" element={<ProtectedRoute allowedRoles={["admin","user"]}><UpdateEvent></UpdateEvent></ProtectedRoute>} />
           <Route path="/user/management" element={<ProtectedRoute allowedRoles={["admin"]}><UserManagement></UserManagement></ProtectedRoute>} />
           <Route path="/statics" element={<ProtectedRoute allowedRoles={["admin"]}><Statistics></Statistics></ProtectedRoute>} />
            </Routes>

        </>
    );
};

export default AppRoutes;
