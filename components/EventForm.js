import React from 'react';

const EventForm = ({ event, onChange, onSubmit }) => {
  return (
    <form className="create-event-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={event.name}
        onChange={onChange}
        placeholder="Event Name"
        required
      />
      <input
        type="date"
        name="date"
        value={event.date}
        onChange={onChange}
        required
      />
      <textarea
        name="description"
        value={event.description}
        onChange={onChange}
        placeholder="Event Description"
        required
      />
      <input
        type="text"
        name="location"
        value={event.location}
        onChange={onChange}
        placeholder="Event Location"
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
