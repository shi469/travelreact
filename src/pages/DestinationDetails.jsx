import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [showModal, setShowModal] = useState(false); // ✅ Modal state

  useEffect(() => {
    getDestination();
  }, []);

  async function getDestination() {
    try {
      const response = await api.get(`/destinations/${id}`);
      setDestination(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    if (window.confirm(`Delete ${destination.name}?`)) {
      try {
        await api.delete(`/destinations/${id}`);
        navigate("/destinations");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleEdit() {
    navigate(`/destinations/${id}/edit`);
  }

  function handleView() {
    setShowModal(true); // ✅ Open modal
  }

  function handleCloseModal() {
    setShowModal(false); // ✅ Close modal
  }

  if (!destination) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <img src={destination.image} alt={destination.name} />
      <h1>{destination.name}</h1>

      <div className="detail-actions">
        <button className="view-btn" onClick={handleView}>
          👁 View
        </button>
        <button className="edit-btn" onClick={handleEdit}>
          ✏ Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          🗑 Delete
        </button>
      </div>

      <p>{destination.description}</p>
      {/* ... rest of your detail fields ... */}

      {/* ✅ Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>✖</button>

            <img src={destination.image} alt={destination.name} className="modal-img" />
            <h2>{destination.name}</h2>
            <p>{destination.description}</p>

            <div className="modal-grid">
              <div><strong>Country:</strong> {destination.country}</div>
              <div><strong>Category:</strong> {destination.category}</div>
              <div><strong>Best Time:</strong> {destination.bestTimeToVisit}</div>
              <div><strong>Duration:</strong> {destination.duration}</div>
              <div><strong>Weather:</strong> {destination.weather}</div>
              <div><strong>Language:</strong> {destination.language}</div>
              <div><strong>Currency:</strong> {destination.currency}</div>
              <div><strong>Budget:</strong> ₹ {destination.price}</div>
              <div><strong>Rating:</strong> {destination.rating}</div>
              <div><strong>Famous For:</strong> {destination.famousFor}</div>
            </div>

            <h3>Top Attractions</h3>
            <ul>
              {destination.attractions && destination.attractions.map((place, index) => (
                <li key={index}>{place}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationDetails;