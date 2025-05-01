import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";  
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

import { api } from '../../axios';
import { setUser } from '../../Redux/userSlice';
import Navbar from '../NavBar';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,  
        onSubmit: async (values) => {
            try {
                const { data } = await api.post("/users/login", values);
        
                localStorage.setItem("access_token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch(setUser({ user: data.user, token: data.token }));
                toast.success("Logged In Successfully");
        
                if (data.user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/user-dashboard");
                }
        
            } catch (err) {
                if (err.response?.status === 403) {
                    toast.error("Your account is suspended. Please contact the admin.");
                } else {
                    toast.error(err.response?.data?.message || "Invalid email or password");
                }
                console.error("Login Error:", err);
            }
        }
        
    });

    return (
        <div>
            <Navbar />
            <div style={styles.loginContainer}>
                <form onSubmit={formik.handleSubmit} style={styles.loginForm}>
                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        style={styles.loginInput}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p style={styles.errorMessage}>{formik.errors.email}</p>
                    )}

                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        style={styles.loginInput}
                        type="password"
                        name="password"
                        placeholder="Enter password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p style={styles.errorMessage}>{formik.errors.password}</p>
                    )}

                    <button style={styles.loginButton} type="submit">Login</button>

                    <button
                        type="button"
                        style={styles.signupButton}
                        onClick={() => navigate("/signup")}
                    >
                        Don't have an account? Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

// ✅ Inline CSS styles
const styles = {
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
    },
    loginForm: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px", // Mobile max-width
        display: "flex",
        flexDirection: "column",
    },
    loginInput: {
        padding: "12px",
        marginBottom: "15px",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "6px",
        width: "100%",
    },
    loginButton: {
        padding: "12px",
        backgroundColor: "rgb(163, 17, 105)",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "1rem",
        marginBottom: "10px",
        width: "100%",
    },
    signupButton: {
        padding: "12px",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "1rem",
        width: "100%",
    },
    errorMessage: {
        color: "red",
        fontSize: "0.875rem",
        marginBottom: "10px",
    },
};


