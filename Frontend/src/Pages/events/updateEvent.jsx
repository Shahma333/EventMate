import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { api } from "../../axios";
import { updateEvent } from "../../Redux/eventSlice";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token);

  const [event, setEvent] = useState({
    title: "",
    image: "",
    date: "",
    location: "",
    subtitles: [{ title: "", image: "", content: "" }],
    services: [{ title: "", image: "" }],
    highlights: [{ title: "", description: "", image: "" }],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        toast.error("Failed to load event.");
        setLoading(false);
      });
  }, [eventId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...event[field]];
    const { name, value, files } = e.target;

    updatedArray[index][name] = files && files[0] ? files[0] : value;
    setEvent({ ...event, [field]: updatedArray });
  };

  const handleAddField = (field, defaultObj) => {
    setEvent({ ...event, [field]: [...event[field], defaultObj] });
  };

  const handleRemoveField = (field, index) => {
    const updatedArray = [...event[field]];
    updatedArray.splice(index, 1);
    setEvent({ ...event, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", event.title);
    formData.append("location", event.location);
    formData.append("date", event.date);
    if (typeof event.image === "object") formData.append("image", event.image);

    event.subtitles.forEach((item, index) => {
      formData.append(`subtitles[${index}][title]`, item.title);
      formData.append(`subtitles[${index}][content]`, item.content);
      formData.append(`subtitles[${index}][image]`, item.image);
    });

    event.services.forEach((item, index) => {
      formData.append(`services[${index}][title]`, item.title);
      formData.append(`services[${index}][image]`, item.image);
    });

    event.highlights.forEach((item, index) => {
      formData.append(`highlights[${index}][title]`, item.title);
      formData.append(`highlights[${index}][description]`, item.description);
      formData.append(`highlights[${index}][image]`, item.image);
    });

    try {
      const response = await api.put(`/events/update/${eventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(updateEvent(response.data.updatedEvent));
      toast.success("Event updated successfully!");
      navigate("/events/getevents");
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("Failed to update event.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5 " style={{  maxWidth: "800px", margin: "110px auto", padding: "20px", textAlign: "center"}}>
      <h2 className="text-center mb-4">Update Event</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          {/* Title */}
          <div className="col-12 col-md-6">
            <h5>Event Name</h5>
            <input
              name="title"
              value={event.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Event Title"
              required
            />
          </div>

          {/* Date */}
          <div className="col-12 col-md-6">
          <h5>Event Date</h5>
            <input
              type="date"
              name="date"
              value={event.date ? new Date(event.date).toISOString().split("T")[0] : ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Location */}
          <div className="col-12 col-md-6">
          <h5>Event Location</h5>
            <input
              name="location"
              value={event.location}
              onChange={handleChange}
              className="form-control"
              placeholder="Location"
              required
            />
          </div>

       
          <div className="text-center mb-3">
  <label className="form-label fw-bold"></label>
  {typeof event.image === "string" && (
    <div className="mb-2">
      <img
        src={`http://localhost:2030/uploads/${event.image}`}
        alt="Event"
        className="img-fluid rounded shadow"
        style={{ maxWidth: "300px", height: "auto", border: "1px solid #ccc", padding: "5px" }}
      />
    </div>
  )}
  <input
    type="file"
    name="image"
    className="form-control mx-auto"
    style={{ maxWidth: "400px" }}
    onChange={(e) => setEvent({ ...event, image: e.target.files[0] })}
  />


          </div>

          {/* Subtitles Section */}
          <div className="col-12 mt-4">
            <h5>Subtitles</h5>
            {event.subtitles.map((subtitle, index) => (
              <div key={index} className="border p-3 mb-3 rounded bg-light">
                <input
                  name="title"
                  value={subtitle.title}
                  onChange={(e) => handleArrayChange(e, index, "subtitles")}
                  placeholder="Subtitle Title"
                  className="form-control mb-2"
                />
                <input
                  name="content"
                  value={subtitle.content}
                  onChange={(e) => handleArrayChange(e, index, "subtitles")}
                  placeholder="Content"
                  className="form-control mb-2"
                />
                {typeof subtitle.image === "string" && (
                  <img
                    src={`http://localhost:2030/uploads/${subtitle.image}`}
                    alt="subtitle"
                    className="img-fluid mb-2"
                    style={{ maxWidth: "100px", borderRadius: "6px" }}
                  />
                )}
                <input type="file" name="image" onChange={(e) => handleArrayChange(e, index, "subtitles")} className="form-control mb-2" />
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveField("subtitles", index)}>
                  Remove Subtitle
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-secondary" onClick={() => handleAddField("subtitles", { title: "", content: "", image: "" })}>
              Add Subtitle
            </button>
          </div>

          {/* Highlights Section */}
          <div className="col-12 mt-4">
            <h5>Highlights</h5>
            {event.highlights.map((highlight, index) => (
              <div key={index} className="border p-3 mb-3 rounded bg-light">
                <input
                  name="title"
                  value={highlight.title}
                  onChange={(e) => handleArrayChange(e, index, "highlights")}
                  placeholder="Highlight Title"
                  className="form-control mb-2"
                />
                <input
                  name="description"
                  value={highlight.description}
                  onChange={(e) => handleArrayChange(e, index, "highlights")}
                  placeholder="Description"
                  className="form-control mb-2"
                />
                {typeof highlight.image === "string" && (
                  <img
                    src={`http://localhost:2030/uploads/${highlight.image}`}
                    alt="highlight"
                    className="img-fluid mb-2"
                    style={{ maxWidth: "100px", borderRadius: "6px" }}
                  />
                )}
                <input type="file" name="image" onChange={(e) => handleArrayChange(e, index, "highlights")} className="form-control mb-2" />
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveField("highlights", index)}>
                  Remove Highlight
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-secondary" onClick={() => handleAddField("highlights", { title: "", description: "", image: "" })}>
              Add Highlight
            </button>
          </div>

          {/* Services Section */}
          <div className="col-12 mt-4">
            <h5>Services</h5>
            {event.services.map((service, index) => (
              <div key={index} className="border p-3 mb-3 rounded bg-light">
                <input
                  name="title"
                  value={service.title}
                  onChange={(e) => handleArrayChange(e, index, "services")}
                  placeholder="Service Title"
                  className="form-control mb-2"
                />
                {typeof service.image === "string" && (
                  <img
                    src={`http://localhost:2030/uploads/${service.image}`}
                    alt="service"
                    className="img-fluid mb-2"
                    style={{ maxWidth: "100px", borderRadius: "6px" }}
                  />
                )}
                <input type="file" name="image" onChange={(e) => handleArrayChange(e, index, "services")} className="form-control mb-2" />
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveField("services", index)}>
                  Remove Service
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-secondary" onClick={() => handleAddField("services", { title: "", image: "" })}>
              Add Service
            </button>
          </div>

          {/* Submit Button */}
          <div className="col-12 mt-4">
            <button type="submit" className="btn  w-100 py-2"  style={{background:"rgb(227, 86, 171)",color:"white"}}>
              Update Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
