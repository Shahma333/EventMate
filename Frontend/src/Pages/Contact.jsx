import React, { useState } from "react";
import { api } from "../axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/messages/send", formData);
      setResponseMessage(data.success ? "Message sent successfully!" : data.message || "Failed to send message.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "An error occurred. Try again.");
    }
  };

  return (
    <section id="contact" className="py-5 bg-light" style={{ background: "linear-gradient(45deg, hsl(270, 21.40%, 94.50%), rgb(145, 140, 143))",}}>
      <div className="container">
        <h2 className="text-center mb-5">Contact Us</h2>

        {/* Info boxes */}
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-3">
            <div className="p-4 shadow-sm bg-white rounded">
              <h5>Address</h5>
              <p>Malappuram, Kerala</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 shadow-sm bg-white rounded">
              <h5>Call Us</h5>
              <p>+91-9876543210</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 shadow-sm bg-white rounded">
              <h5>Mail Us</h5>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="p-4 bg-white shadow rounded">
              {responseMessage && (
                <div className="alert alert-success" role="alert">
                  {responseMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-control"
                    rows="5"
                  ></textarea>
                </div>
                <div className="text-center">
  <button
    type="submit"
    className="btn text-white px-4"
    style={{ backgroundColor: "rgb(121, 22, 81)" }}
  >
    Send Message
  </button>
</div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
