import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CssFiles/TripForm.css';

const TripForm = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    startLocation: '',
    endLocation: '',
    numberOfKm: '',
    numberOfPeople: '',
    tripFair: '',
  });
  const [errors, setErrors] = useState({
    numberOfKmError: null,
    numberOfPeopleError: null,
  });

  useEffect(() => {
    // Calculate trip fare whenever numberOfKm or numberOfPeople changes
    if (trip.numberOfPeople && trip.numberOfKm) {
      const tripFair = trip.numberOfPeople * trip.numberOfKm;
      setTrip(prevTrip => ({ ...prevTrip, tripFair }));
    }
  }, [trip.numberOfPeople, trip.numberOfKm]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      numberOfKmError: null,
      numberOfPeopleError: null,
    };

    if (!trip.numberOfKm || trip.numberOfKm <= 0) {
      newErrors.numberOfKmError = 'Number of Km must be a positive number.';
      valid = false;
    }

    if (!trip.numberOfPeople || trip.numberOfPeople <= 0) {
      newErrors.numberOfPeopleError = 'Number of People must be a positive number.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip(prevTrip => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    // Save trip data to local storage
    localStorage.setItem('tripData', JSON.stringify(trip));

    try {
      const response = await fetch('http://localhost:8080/api/trips/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip),
      });

      if (response.ok) {
        alert('Trip data saved successfully!');
        navigate('/BookCar'); // Redirect after successful submission
      } else {
        alert('Failed to save trip data.');
      }
    } catch (error) {
      console.error('Error saving trip data:', error);
      alert('An error occurred while saving trip data.');
    }
    console.log(trip);
  };

  return (
    <div className="trip-form-container">
      <h1>Create Trip</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startLocation">Start Location:</label>
          <input
            type="text"
            id="startLocation"
            name="startLocation"
            value={trip.startLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="endLocation">End Location:</label>
          <input
            type="text"
            id="endLocation"
            name="endLocation"
            value={trip.endLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="numberOfKm">Number of Km:</label>
          <input
            type="number"
            id="numberOfKm"
            name="numberOfKm"
            value={trip.numberOfKm}
            onChange={handleChange}
            step="0.1"
            required
          />
          {errors.numberOfKmError && <p className="error-message">{errors.numberOfKmError}</p>}
        </div>

        <div>
          <label htmlFor="numberOfPeople">Number of People:</label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            value={trip.numberOfPeople}
            onChange={handleChange}
            required
          />
          {errors.numberOfPeopleError && <p className="error-message">{errors.numberOfPeopleError}</p>}
        </div>

        <div>
          <label htmlFor="tripFair">Trip Fare:</label>
          <input
            type="text"
            id="tripFair"
            name="tripFair"
            value={trip.tripFair}
            readOnly
          />
        </div>

        <button type="submit">Save Trip Data</button>
      </form>
    </div>
  );
};

export default TripForm;
