import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";
import { FaBookReader, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section id="hero" style={styles.hero}>
            <img src={bg} alt="Event Banner" style={styles.heroImage} className="img-fluid" />
            
            <div className="container">
                <div className="position-absolute top-50 start-50 translate-middle text-center" style={styles.item}>
                    <h3 style={styles.heading}>Plan Your Event</h3>
                    <h1 style={styles.title}>Make Every Event Special</h1>
                    <p style={styles.description}>
                        Manage, organize, and enjoy stress-free events with ease!
                    </p>

                    <div className="d-flex justify-content-center flex-wrap">
                        <button
                            onClick={() => {
                                const token = localStorage.getItem("access_token");
                                navigate(token ? "/events" : "/login");
                            }}
                            style={styles.getStartedButton}
                            className="btn me-2"
                            onMouseOver={(e) => e.target.style.backgroundColor = " rgb(121, 22, 81)"}
                            onMouseOut={(e) => e.target.style.backgroundColor = " rgb(232, 22, 148)"}
                        >
                            GET STARTED
                        </button>

                        <button
                            onClick={() => navigate("/events/getevents")}
                            style={styles.seeEventsButton}
                            className="btn"
                            onMouseOver={(e) => e.target.style.backgroundColor = " rgb(232, 22, 148)"}
                            onMouseOut={(e) => e.target.style.backgroundColor = " rgb(121, 22, 81)"}
                        >
                            SEE OUR EVENTS
                        </button>
                    </div>

                    <div className="mt-4 d-flex justify-content-center gap-3 fs-4">
                        <a href="#" className="text-white"><FaFacebook /></a>
                        <a href="#" className="text-white"><FaInstagram /></a>
                        <a href="#" className="text-white"><FaTwitter /></a>
                        <a href="#" className="text-white"><FaLinkedin /></a>
                    </div>
                    <div className="text-center mt-5" style={styles.heroParagraph}>
                   <h5>
                   <b>
                        Let <b>EventMate</b> make your special occasions truly memorable.
                        </b>
                   </h5>
                </div>
                </div>

               
            </div>
        </section>
    );
};

export default HeroSection;

const styles = {
    container: {
         maxWidth: "800px", 
         margin: "110px auto", 
         padding: "20px",
          textAlign: "center" 
        },
    
    hero: {
        position: "relative",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
    },
    heroImage: {
        width: "100%",
        height: "100vh",
        objectFit: "cover",
        filter: "brightness(50%)",
    },
    item: {
        zIndex: 2,
        padding: "20px",
        maxWidth: "700px",
    },
    heading: {
        color: "#rgb(17, 9, 14)",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    title: {
        fontSize: "42px",
        fontWeight: "700",
        margin: "10px 0",
    },
    description: {
        fontSize: "18px",
        color: "#f8f9fa",
        marginBottom: "20px",
    },
    getStartedButton: {
        backgroundColor: " rgb(176, 75, 136)",
        color: "white",
        padding: "12px 24px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        transition: "0.3s",
    },
    seeEventsButton: {
        backgroundColor: " rgb(121, 22, 81)",
        color: "white",
        padding: "12px 24px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        transition: "0.3s",
    },
    heroParagraph: {
        fontSize: "18px",
        fontWeight: "300",
        color: "#fff",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
    },
};
