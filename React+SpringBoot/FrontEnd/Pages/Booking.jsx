import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CssFiles/Booking.css'; // Import the CSS file for styling

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCar, selectedGuide } = location.state || {}; // Get car and guide data from location state

  const [tripId, setTripId] = useState(null); // State to store the matched trip ID
  const [tripData, setTripData] = useState(null); // State to store trip data
  const [user, setUser] = useState(null); // State to store user details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token is found
        navigate('/login');
        return;
      }
      
      // Fetch user details from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        // Redirect to login if user details are not found
        navigate('/login');
        return;
      }
      
      setUser(storedUser);
    };

    const fetchTrips = async () => {
      try {
        console.log('Fetching trips from API...');
        const response = await fetch('http://localhost:8080/api/trips/');
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const trips = await response.json();

        console.log('Trips fetched from API:', trips);

        // Retrieve trip data from localStorage
        const savedTrip = JSON.parse(localStorage.getItem('tripData')) || {};
        console.log('Retrieved saved trip data from localStorage:', savedTrip);

        // Find the trip ID matching the saved trip data
        const matchingTrip = trips.find(t =>
          t.startLocation === savedTrip.startLocation &&
          t.endLocation === savedTrip.endLocation 
        );

        if (matchingTrip) {
          setTripId(matchingTrip.id);
          setTripData(matchingTrip);
          console.log('Matching trip found:', matchingTrip);
        } else {
          console.error('No matching trip found.');
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchTrips();
  }, [navigate]);
  
  const handleBooking = async () => {
    if (!tripId) {
      alert('No trip ID found. Please ensure trip data is available.');
      return;
    }

    const bookingData = {
      customer: {
        custId: user.custId,
      },
      car: {
        carId: selectedCar.carId,
      },
      guide: {
        id: selectedGuide.id,
      },
      bookingDate: new Date().toISOString(),
      isPaid: false, // Assuming the booking isn't paid yet
      trip: {
        id: tripId, // Include the matched trip ID
      },
    };

    try {
      console.log('Sending booking data to API...');
      const response = await fetch('http://localhost:8080/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
        
        
      });
      console.log("data",  bookingData);
      if (response.ok) {
        alert('Booking successful!');
      } else {
        alert('Booking failed.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred during booking.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="booking-page">
      {/* User Details Section */}
      <div className="user-details">
        <h2>User Details</h2>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.custName}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.cNum}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>

      {/* Selected Car Section */}
      {selectedCar && (
        <div className="selected-car">
          <h2>Selected Car</h2>
          <div className="car-details">
            <img 
              src={selectedCar.image || 'path/to/default-car-image.png'} 
              alt={selectedCar.carName} 
              className="car-image" 
            />
            <p><strong>Car Name:</strong> {selectedCar.carName}</p>
            <p><strong>Car Number:</strong> {selectedCar.carNo}</p>
            <p><strong>Car Owner:</strong> {selectedCar.carOwner}</p>
            <p><strong>Car Status:</strong> {selectedCar.carStatus}</p>
            <p><strong>Car Charges:</strong> ${selectedCar.carFair.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Selected Guide Section */}
      {selectedGuide && (
        <div className="selected-guide">
          <h2>Selected Guide</h2>
          <div className="guide-details">
            <img 
              src={selectedGuide.image || 'path/to/default-guide-image.png'} 
              alt={selectedGuide.name} 
              className="guide-image" 
            />
            <p><strong>Guide Name:</strong> {selectedGuide.name}</p>
            <p><strong>Experience:</strong> {selectedGuide.experience} years</p>
            <p><strong>Status:</strong> {selectedGuide.status}</p>
          </div>
        </div>
      )}

      {/* Trip Data Section */}
      {tripData && (
        <div className="trip-data">
          <h2>Trip Details</h2>
          <p><strong>Start Location:</strong> {tripData.startLocation}</p>
          <p><strong>End Location:</strong> {tripData.endLocation}</p>
          <p><strong>Number of Km:</strong> {tripData.numberOfKm}</p>
          <p><strong>Number of People:</strong> {tripData.numberOfPeople}</p>
        </div>
      )}

      {/* Booking Button */}
      <button onClick={handleBooking} className="booking-button">
        Book Now
      </button>
    </div>
  );
};

export default Booking;
