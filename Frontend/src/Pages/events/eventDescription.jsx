import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSelector } from 'react-redux';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await api.get(`/events/${eventId}`);
        setEvent(res.data);
      } catch (err) {
        setError("Error loading event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/delete/${eventId}`);
        alert("Event deleted successfully!");
        navigate("/events");
      } catch (err) {
        alert("Failed to delete event.");
      }
    }
  };

  const navigateToUpdate = () => {
    navigate(`/events/update/${eventId}`);
  };


  if (loading) return <div className="text-center mt-5">Loading event details...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;
  if (!event) return <div className="text-center mt-5">Event not found.</div>;

  const getImageUrl = (path) =>
    path ? `http://localhost:2030/uploads/${path}` : "http://localhost:2030/uploads/default.jpg";


  console.log("User: ", user);
  console.log("Event: ", event);
  const userId = user?._id || user?.id;
const eventCreatorId = event?.createdBy?._id || event?.createdBy;
const canEditOrDelete = user?.role === "admin" || userId === eventCreatorId;

  console.log("Can Edit or Delete: ", canEditOrDelete);  // Log to see if the condition is true
  

  return (
    <div className="container- my-5" style={{ maxWidth: "1300px", margin: "110px auto", padding: "20px", textAlign: "center"}}>
      <div className="card shadow">
        
      <h2 className="event-title">{event.title}</h2>
                <p className="event-meta">
                    📅 {new Date(event.date).toDateString()} | 📍 {event.location}
                </p>
        <img
          src={getImageUrl(event.image)}
          className="card-img-top"
          alt="Main Event"
          style={{ maxHeight: "600px", objectFit: "cover" }}
        />
        <div className="card-body">
          {/* Subtitles Carousel */}
          <h4 className="fw-bold mb-3">Subtitles</h4>
          {event.subtitles.length > 0 && (
            <div id="subtitleCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
              <div className="carousel-inner">
                {event.subtitles.map((subtitle, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={getImageUrl(subtitle.image)}
                      className="d-block w-100"
                      alt={subtitle.title}
                      style={{ height: "500px", objectFit: "cover" }}
                    />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                      <h5>{subtitle.title}</h5>
                      <p>{subtitle.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#subtitleCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#subtitleCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}

          {/* Highlights */}
          <h3 className="fw-bold mt-4 mb-3">Event Highlights</h3>
          {event.highlights && (
            <div>
              {event.highlights.map((highlight, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '15px'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h5>{highlight.title}</h5>
                    <p>{highlight.description}</p>
                  </div>
                  <div
                    style={{
                      flexShrink: '0',
                      width: '400px',
                      height: '400px',
                      backgroundImage: `url(${getImageUrl(highlight.image)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '8px'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          )}

          {/* Services */}
          <h4 className="fw-bold mb-3 mt-4">Services</h4>
          <div className="row">
            {event.services.map((service, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100">
                  <img
                    src={getImageUrl(service.image)}
                    className="card-img-top"
                    alt={service.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
  {/* Edit/Delete Buttons */}
          {canEditOrDelete && (
            <div className="d-flex gap-4 mt-4 justify-content-center" >
              <button className="btn btn-warning" onClick={navigateToUpdate}>
                Update Event
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Event
              </button>
            </div>
          )}
          {/* Back Button */}
          <button className="btn  mt-4"  style={{background:"rgb(227, 86, 171)",color:"white"}} onClick={() => navigate("/events/getevents")}>
            Back to All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
