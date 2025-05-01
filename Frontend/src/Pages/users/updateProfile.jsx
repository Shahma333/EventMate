import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../axios";
import { updateUser } from "../../Redux/userSlice";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth) || {}; // Add fallback to avoid destructuring error
    const [loading, setLoading] = useState(true); // Loading state to show loader while data is being fetched
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        newPassword: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                username: user.username || "",
                newPassword: "",
            });
            setLoading(false); // Set loading to false once user data is fetched
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put("/users/profile/update", formData);
            dispatch(updateUser(response.data.user)); // Update user data in Redux
            setMessage("✅ Profile updated successfully!");
            setTimeout(() => navigate("/user-dashboard"), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Something went wrong.");
        }
    };

   
    // Main form rendering when user data is available
    if (!user) {
        return (
            <div className="container" style={styles.container}>
                <div className="alert alert-danger text-center">User data not found. Please log in again.</div>
            </div>
        );
    }

    return (
        <div className="container" style={styles.container}>
            <div className="card shadow-lg p-4">
                <h2 className="mb-4 text-center " style={{color:"rgb(141, 11, 89)"}}>Update Profile</h2>

                {message && <div className="alert alert-info text-center">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        <small className="text-muted">Leave empty if you don’t want to change the password.</small>
                    </div>

                    <button type="submit" className="btn  w-100 " style={{background:"rgb(121, 22, 81)",color:"white"}}>Update Profile</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "500px",
        margin: "100px auto",
        padding: "20px",
    },
};

export default UpdateProfile;
