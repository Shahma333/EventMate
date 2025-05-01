import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../axios";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
  
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("User from localStorage:", user);
  
        const res = await api.get("/events/all");
        console.log("Fetched all events:", res.data);
  
        let filteredEvents = [];
  
        if (!user) {
          // 🟢 Not logged in — show all events
          filteredEvents = res.data;
        } else if (user.role === "admin") {
          // 🟢 Admin — show all events
          filteredEvents = res.data;
        } else {
          // 🔵 Regular user — filter events by createdBy
          const userId = user._id || user.id;
          filteredEvents = res.data.filter(
            (event) =>
              event.createdBy === userId || event.createdBy?._id === userId
          );
        }
  
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <div style={{ padding: "80px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", fontWeight: "bold" }}>My Events</h2>
      <div className="container">
        <div className="row">
          {loading && <p>Loading events...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {events.length === 0 && !loading && !error && (
            <div className="text-center w-100 mt-4">
              <p>No events found.</p>
            </div>
          )}
          {events.map((event, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card" style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}>
                <img
                  src={`http://localhost:2030/uploads/${event.image || 'default.jpg'}`}
                  className="card-img-top"
                  alt="Event"
                  style={{ height: "220px", objectFit: "cover" }}
                  onError={(e) => (e.target.src = 'http://localhost:2030/uploads/default.jpg')}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold" }}>{event.title}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}<br />
                    <strong>Location:</strong> {event.location}
                  </p>
                  <button
                    className="btn w-100"
                    style={{ background: "rgb(227, 86, 171)", color: "white" }}
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;
