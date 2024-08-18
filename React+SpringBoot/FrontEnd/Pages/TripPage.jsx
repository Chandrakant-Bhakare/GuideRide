import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = () => {
    axios.get('http://localhost:8080/api/trips/')
      .then((response) => {
        setTrips(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch trip data');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      axios.delete(`http://localhost:8080/api/trips/${id}`)
        .then(() => {
          alert('Trip deleted successfully');
          fetchTrips(); // Refresh the trip list after deletion
        })
        .catch((error) => {
          alert('Failed to delete trip');
          console.error(error);
        });
    }
  };

  const handleEdit = (id) => {
    const updatedStartLocation = prompt("Enter new start location:");
    const updatedEndLocation = prompt("Enter new end location:");
    const updatedNumberOfKm = prompt("Enter new number of Km:");
    const updatedNumberOfPeople = prompt("Enter new number of people:");

    if (updatedStartLocation && updatedEndLocation && updatedNumberOfKm && updatedNumberOfPeople) {
      axios.put(`http://localhost:8080/api/trips/${id}`, {
        startLocation: updatedStartLocation,
        endLocation: updatedEndLocation,
        numberOfKm: parseFloat(updatedNumberOfKm),
        numberOfPeople: parseInt(updatedNumberOfPeople, 10)
      })
        .then(() => {
          alert('Trip updated successfully');
          fetchTrips(); // Refresh the trip list after editing
        })
        .catch((error) => {
          alert('Failed to update trip');
          console.error(error);
        });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="trip-page">
      <h1>Trips Information</h1>
      {trips.length === 0 ? (
        <p>No trips available.</p>
      ) : (
        <div className="trip-list">
          {trips.map((trip) => (
            <div key={trip.id} className="trip-card">
              <h2>Trip ID: {trip.id}</h2>
              <p><strong>Start Location:</strong> {trip.startLocation}</p>
              <p><strong>End Location:</strong> {trip.endLocation}</p>
              <p><strong>Number of Km:</strong> {trip.numberOfKm}</p>
              <p><strong>Number of People:</strong> {trip.numberOfPeople}</p>
              {trip.booking && (
                <>
                  <p><strong>Booking ID:</strong> {trip.booking.id}</p>
                  <p><strong>Booking Status:</strong> {trip.booking.status}</p>
                </>
              )}
              <div className="trip-card-buttons">
                <button onClick={() => handleEdit(trip.id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(trip.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripPage;
