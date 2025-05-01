import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../axios';
import { useNavigate } from 'react-router';


const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
  });
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(null);
  const [subtitles, setSubtitles] = useState([{ title: '', content: '', image: null }]);
  const [services, setServices] = useState([{ title: '', image: null }]);
  const [highlights, setHighlights] = useState([{ title: '', description: '', image: null }]);

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleArrayChange = (setter, index, field, value) => {
    setter(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleFileArrayChange = (setter, index, file) => {
    setter(prev => {
      const updated = [...prev];
      updated[index].image = file;
      return updated;
    });
  };

  const addSubtitle = () => setSubtitles([...subtitles, { title: '', content: '', image: null }]);
  const addService = () => setServices([...services, { title: '', image: null }]);
  const addHighlight = () => setHighlights([...highlights, { title: '', description: '', image: null }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('title', eventData.title);
    formData.append('date', eventData.date);
    formData.append('location', eventData.location);
    if (mainImage) formData.append('image', mainImage);
  
    subtitles.forEach((sub, i) => {
      formData.append(`subtitleTitle${i}`, sub.title);
      formData.append(`subtitleContent${i}`, sub.content);
      if (sub.image) formData.append('subtitles', sub.image);
    });
  
    services.forEach((ser, i) => {
      formData.append(`serviceTitle${i}`, ser.title);
      if (ser.image) formData.append('services', ser.image);
    });
  
    highlights.forEach((high, i) => {
      formData.append(`highlightTitle${i}`, high.title);
      formData.append(`highlightDesc${i}`, high.description);
      if (high.image) formData.append('highlights', high.image);
    });
  
    try {
      const token = localStorage.getItem('token');
      await api.post('events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Event created successfully!');
      navigate('/events'); // 👈 Redirect to /events
    } catch (err) {
      console.error(err);
      alert('Event creation failed.');
    }
  };
  
  return (
    <div style={{ maxWidth: "800px", margin: "90px auto", padding: "20px"}}>
      
      <div className="container mt-4" style={{ maxWidth: '800px', background: '#fff', padding: '20px', boxShadow: '0 0 10px #ccc', borderRadius: '10px' }}>
        <h3 className="mb-3">Create New Event</h3>
        <form onSubmit={handleSubmit}>

          {/* Basic Info */}
          <input type="text" name="title" value={eventData.title} onChange={handleInputChange} placeholder="Event Title" className="form-control mb-2" required />
          <input type="date" name="date" value={eventData.date} onChange={handleInputChange} className="form-control mb-2" required />
          <input type="text" name="location" value={eventData.location} onChange={handleInputChange} placeholder="Location" className="form-control mb-2" required />
          <label>Main Image:</label>
          <input type="file" onChange={(e) => handleImageChange(e, setMainImage)} className="form-control mb-3" accept="image/*" />

          {/* Subtitles */}
          <h5>Subtitles</h5>
          {subtitles.map((sub, index) => (
            <div key={index} className="mb-3">
              <input type="text" placeholder="Subtitle Title" value={sub.title} onChange={(e) => handleArrayChange(setSubtitles, index, 'title', e.target.value)} className="form-control mb-2" />
              <input type="text" placeholder="Subtitle Content" value={sub.content} onChange={(e) => handleArrayChange(setSubtitles, index, 'content', e.target.value)} className="form-control mb-2" />
              <input type="file" onChange={(e) => handleFileArrayChange(setSubtitles, index, e.target.files[0])} className="form-control" accept="image/*" />
            </div>
          ))}
          <button type="button" className="btn btn-link text-primary" onClick={addSubtitle}>+ Add Subtitle</button>

          {/* Services */}
          <h5 className="mt-4">Services</h5>
          {services.map((ser, index) => (
            <div key={index} className="mb-3">
              <input type="text" placeholder="Service Title" value={ser.title} onChange={(e) => handleArrayChange(setServices, index, 'title', e.target.value)} className="form-control mb-2" />
              <input type="file" onChange={(e) => handleFileArrayChange(setServices, index, e.target.files[0])} className="form-control" accept="image/*" />
            </div>
          ))}
          <button type="button" className="btn btn-link text-primary" onClick={addService}>+ Add Service</button>

          {/* Highlights */}
          <h5 className="mt-4">Highlights</h5>
          {highlights.map((high, index) => (
            <div key={index} className="mb-3">
              <input type="text" placeholder="Highlight Title" value={high.title} onChange={(e) => handleArrayChange(setHighlights, index, 'title', e.target.value)} className="form-control mb-2" />
              <input type="text" placeholder="Highlight Description" value={high.description} onChange={(e) => handleArrayChange(setHighlights, index, 'description', e.target.value)} className="form-control mb-2" />
              <input type="file" onChange={(e) => handleFileArrayChange(setHighlights, index, e.target.files[0])} className="form-control" accept="image/*" />
            </div>
          ))}
          <button type="button" className="btn btn-link text-primary " onClick={addHighlight} >+ Add Highlight</button>

          {/* Submit */}
          <button type="submit" className="btn btn-primary mt-3 w-100" style={{background:"rgb(121, 22, 81)"}}>Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
