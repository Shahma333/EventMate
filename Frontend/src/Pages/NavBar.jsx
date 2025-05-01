import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaUser, FaBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Nav, NavDropdown, Badge } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { api } from "../axios";
import logo from "../assets/bg.jpg";
import { logout } from "../Redux/userSlice";

function Navbar() {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const role = user?.role;
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (role === "admin") {
      fetchMessages();
    }
  }, [role]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get("/messages/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (role === "admin") return "/admin-dashboard";
   
    return "/user-dashboard";
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "linear-gradient(to right,hsl(269, 84.50%, 43.10%),rgb(121, 22, 81))",
      color: "white",
      padding: "12px 18px",
      position: "fixed",
      width: "100%",
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    navbarLeft: {
      display: "flex",
      alignItems: "center",
    },
    logo: {
      width: 45,
      marginRight: 8,
      borderRadius: "50%",
    },
    title: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      color: "#f8bbd0",
    },
    navLinks: {
      listStyle: "none",
      display: isMobile ? (show ? "flex" : "none") : "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "10px" : "15px",
      padding: isMobile ? "10px 0" : 0,
      margin: 0,
      position: isMobile ? "absolute" : "static",
      top: isMobile ? 60 : "auto",
      right: 0,
      width: isMobile ? "100%" : "auto",
      background: isMobile ? "#3b2c85" : "transparent",
      zIndex: isMobile ? 999 : "auto",
      textAlign: "center",
    },
    navItem: {
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: 500,
      padding: isMobile ? "12px 0" : "8px 12px",
      transition: "color 0.3s ease-in-out, transform 0.2s ease-in-out",
    },
    navLink: {
      textDecoration: "none",
      color: "white",
    },
    notificationContainer: {
      marginTop: 10,
      position: "relative",
      cursor: "pointer",
      marginRight: 12,
    },
    bellIcon: {
      
      fontSize: 22,
      color: "#fff",
      margin :"5px"
    },
    badge: {
      position: "absolute",
      top: -5,
      right: -5,
      backgroundColor: "red",
      color: "white",
      fontSize: 11,
      fontWeight: "bold",
      borderRadius: "50%",
      padding: "3px 6px",
      minWidth: 18,
      textAlign: "center",
    },
    userText: {
      marginRight: 8,
      fontSize: "0.95rem",
      fontWeight: "bold",
      color: "#f3e5f5",
    },
    userIcon: {
      fontSize: 22,
      color: "white",
      cursor: "pointer",
    },
    hamburger: {
      display: isMobile ? "block" : "none",
      cursor: "pointer",
      fontSize: 24,
      color: "#f8bbd0",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}> Event Mate</h1>
      </div>

      <div style={styles.hamburger} onClick={() => setShow(!show)}>
        <GiHamburgerMenu size={24} />
      </div>

      <ul style={styles.navLinks}>
      <li style={styles.navItem}>
  {isHome ? (
    <ScrollLink
      to="hero"
      spy={true}
      smooth={true}
      duration={500}
      style={styles.navLink}
      onClick={() => isMobile && setShow(false)}
    >
      HOME
    </ScrollLink>
  ) : (
    <Link to="/" style={styles.navLink} onClick={() => isMobile && setShow(false)}>HOME</Link>
  )}
</li>

        <li style={styles.navItem}>
          {isHome ? (
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              style={styles.navLink}
              onClick={() => isMobile && setShow(false)}
            >
              ABOUT
            </ScrollLink>
          ) : (
            <Link to="/about" style={styles.navLink} onClick={() => isMobile && setShow(false)}>ABOUT</Link>
          )}
        </li>
        <li style={styles.navItem}>
          {isHome ? (
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              style={styles.navLink}
              onClick={() => isMobile && setShow(false)}
            >
              CONTACT
            </ScrollLink>
          ) : (
            <Link to="/contact" style={styles.navLink} onClick={() => isMobile && setShow(false)}>CONTACT</Link>
          )}
        </li>
        {user && token && (
          <li style={styles.navItem}>
            <Link to={getDashboardPath()} style={styles.navLink} onClick={() => isMobile && setShow(false)}>
              DASHBOARD
            </Link>
          </li>
        )}
      </ul>

      <Nav style={{ display: "flex", alignItems: "center" }}>
        {role === "admin" && (
          <div
            style={styles.notificationContainer}
            onClick={() => navigate("/messages")}
          >
            <FaBell style={styles.bellIcon} />
            {messages.length > 0 && (
              <Badge bg="danger" style={styles.badge}>
                {messages.length}
              </Badge>
            )}
          </div>
        )}

        {user && token && (
          <span style={styles.userText}>
            Logged in as {user.username || "User"}
          </span>
        )}

        <NavDropdown
          title={<FaUser style={styles.userIcon} />}
          id="user-dropdown"
          align="end"
        >
          {user && token ? (
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          ) : (
            <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
          )}
        </NavDropdown>
      </Nav>
    </nav>
  );
}

export default Navbar;
