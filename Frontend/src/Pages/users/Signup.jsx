import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { api } from '../../axios';
import { setUser } from '../../Redux/userSlice';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name cannot be longer than 50 characters')
            .required('Name is required'),
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(30, 'Username cannot be longer than 30 characters')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-zA-Z0-9]/, 'Password can only contain letters and numbers')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        role: Yup.string().required('Role selection is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'user',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { confirmPassword, ...userData } = values;
                const { data } = await api.post('/users/register', userData);

                localStorage.setItem('access_token', data.token);
                localStorage.setItem('userRole', data.user.role);
                dispatch(setUser({ user: data.user, token: data.token }));

                toast.success('Account Created Successfully!');

                if (data.user.role === 'admin') {
                    navigate('/admin-dashboard');
            
                } else {
                    navigate('/events');
                }
            } catch (err) {
                toast.error(
                    err.response?.data.message || 'Signup failed. Please try again.'
                );
            }
        },
    });

    return (
        <div className="signup-container">
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <h2 className="form-title">Create an Account</h2>

                <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="signup-input"
                    placeholder="Enter full name"
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="error-message">{formik.errors.name}</div>
                )}

                <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="signup-input"
                    placeholder="Choose a username"
                />
                {formik.touched.username && formik.errors.username && (
                    <div className="error-message">{formik.errors.username}</div>
                )}

                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="signup-input"
                    placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="error-message">{formik.errors.email}</div>
                )}

                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="signup-input"
                    placeholder="Create a password"
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="error-message">{formik.errors.password}</div>
                )}

                <input
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="signup-input"
                    placeholder="Confirm password"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="error-message">{formik.errors.confirmPassword}</div>
                )}

                <select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="signup-input"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                   
                </select>
                {formik.touched.role && formik.errors.role && (
                    <div className="error-message">{formik.errors.role}</div>
                )}

                <button type="submit" className="signup-btn" >
                    Sign Up
                </button>
            </form>

            <style jsx={true}>{`
                .signup-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f7fc;
                }

                .signup-form {
                    background: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    width: 400px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }

                .form-title {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }

                .signup-input {
                    width: 100%;
                    padding: 12px;
                    margin: 10px 0;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                    font-size: 16px;
                    box-sizing: border-box;
                }

                .signup-input:focus {
                    border-color: #007bff;
                    outline: none;
                }

                .signup-btn {
                    width: 100%;
                    padding: 12px;
                    background-color:rgb(123, 24, 106);
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .signup-btn:hover {
                    background-color: #0056b3;
                }

                .error-message {
                    color: red;
                    font-size: 12px;
                    margin-top: -8px;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default Signup;
