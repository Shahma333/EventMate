import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { token, role } = useSelector((state) => state.auth);
    const isAuthenticated = !!token;  // derive from token presence

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // Redirect based on role
        if (role === "user") {
            return <Navigate to="/user-dashboard" />;
        }
        if (role === "admin") {
            return <Navigate to="/admin-dashboard" />;
        }

        // Default fallback
        return <Navigate to="/" />;
    }

    return children || <h2>Not Found</h2>; 
};
