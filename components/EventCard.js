import React from 'react';

const EventCard = ({ event, onDelete }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <div className="event-actions">
        <button>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(event.name)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
