import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../features/favoriteSlice";

function DestinationCard({ destination, onDelete }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleFavorite() {
    dispatch(addFavorite(destination));
  }

 function handleEdit() {
  navigate(`/edit-destination/${destination.id}`); // ✅ fixed
}

  function handleDelete() {
    if (window.confirm(`Delete ${destination.name}?`)) {
      onDelete(destination.id);
    }
  }

  return (
    <div className="card">
      <img src={destination.image} alt={destination.name} />
      <h2>{destination.name}</h2>
      <p>{destination.country}</p>

      <div className="card-actions">
        <button className="view-btn" onClick={() => setShowModal(true)}>
          👁 View
        </button>
        <button className="favorite-btn" onClick={handleFavorite}>
          ❤ Favorite
        </button>
        <button className="edit-btn" onClick={handleEdit}>
          ✏ Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          🗑 Delete
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✖</button>
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

export default DestinationCard;