import React from "react";

const Footer = () => {
  const footerStyle = {
    background: "linear-gradient(135deg, hsl(269, 84.50%, 43.10%), rgb(121, 22, 81))", // Corrected background gradient
    color: "white",
    padding: "20px 0",
    textAlign: "center",
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <div className="row text-center">
          {/* Brand */}
          <div className="col-12 mb-3">
            <h1>EventMate</h1>
            <p>Your event, our priority.</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <p>&copy; {new Date().getFullYear()} EventMate. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
