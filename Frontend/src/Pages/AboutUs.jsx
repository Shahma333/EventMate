import React from "react";

import aboutImage from "../assets/bg.jpg"; // Use an appropriate image for EventMate

const AboutUs = () => {
  return (
    <section
      className="about-us"
      id="about"
      style={{
        padding: "60px 20px",
        background: "linear-gradient(45deg, hsl(270, 4.90%, 31.80%), rgb(247, 242, 245))",
        color: "#fff"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          maxWidth: "1200px",
          margin: "auto"
        }}
      >
        <div
          className="about-image"
          style={{ flex: "1", maxWidth: "100%", overflow: "hidden" }}
        >
          <img
            src={aboutImage}
            alt="Event Management"
            style={{
              width: "100%",
              maxWidth: "550px",
              borderRadius: "10px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)"
            }}
          />
        </div>

        <div
          className="about-content text-center"
          style={{
            flex: "1",
            textAlign: "center",
            color: "#fff",
            padding: "10px"
          }}
        >
          <h2 style={{ fontSize: "36px", marginBottom: "20px", fontWeight: "bold" ,color:"rgb(121, 22, 81)"}}>
            Welcome to EventMate
          </h2>
          <p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "25px" }}>
            At <span style={{ fontWeight: "bold", color: "#ffcc00" }}>EventMate</span>, we simplify event planning to create memorable
            experiences. Whether it’s a <strong>wedding</strong>, <strong>conference</strong>, or a <strong>party</strong>, our platform has everything you need to plan effortlessly.
          </p>

          <h3 style={{ marginTop: "20px", fontSize: "24px", marginBottom: "15px" }}>
            What Makes Us Different?
          </h3>

          <div
            className="row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "30px",
              marginTop: "20px"
            }}
          >
            <div
              className="col-md-4"
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4 style={{ color: "#2d6bf9", fontSize: "20px" }}>📅 Seamless Scheduling</h4>
              <p style={{ fontSize: "16px", color: "#555" }}>
                Easily create and manage schedules for all your events, big or small.
              </p>
            </div>

            <div
              className="col-md-4"
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4 style={{ color: "#2d6bf9", fontSize: "20px" }}>🔗 Vendor & Resource Management</h4>
              <p style={{ fontSize: "16px", color: "#555" }}>
                Connect with trusted vendors and streamline your event resources.
              </p>
            </div>

            <div
              className="col-md-4"
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4 style={{ color: "#2d6bf9", fontSize: "20px" }}>📈 Real-Time Tracking</h4>
              <p style={{ fontSize: "16px", color: "#555" }}>
                Monitor your event’s progress in real-time for a smooth experience.
              </p>
            </div>
          </div>

          <p
            className="closing"
            style={{
              marginTop: "30px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#ffcc00",
            }}
          >
            Let’s bring your vision to life with <span style={{ fontStyle: "italic" }}>EventMate</span>! 🎉
          </p>

          <button
            style={{
              background: "linear-gradient(45deg, hsl(269, 84.5%, 43.1%), rgb(121, 22, 81))",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "12px 30px",
              fontSize: "18px",
              cursor: "pointer",
              marginTop: "20px",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => e.target.style.background = "linear-gradient(45deg, rgb(121, 22, 81), hsl(269, 84.5%, 43.1%))"}
            onMouseOut={(e) => e.target.style.background = "linear-gradient(45deg, hsl(269, 84.5%, 43.1%), rgb(121, 22, 81))"}
          >
            Start Planning Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
