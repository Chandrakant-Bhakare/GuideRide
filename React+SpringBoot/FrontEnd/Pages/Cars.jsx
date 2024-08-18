import React, { useState, useEffect } from 'react';
import '../CssFiles/Cars.css';
import CarPlaceholder from '../Assets/tripLogo.png'; // Placeholder image for loading
import { useNavigate } from 'react-router-dom';

const Cars = () => {
  const [cars, setCars] = useState([]); // State to hold car data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://localhost:8080/api/cars/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCars(data); // Set the car data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error); // Set the error state
        setLoading(false); // Stop loading
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleBookClick = (car) => {
    localStorage.setItem('carID', car.carId);
    alert("Car selected");
    console.log(`Book button clicked for car with ID: ${car.carId}`);
    
    // Navigate to the booking page with the selected car data
    navigate('/BookGuide', { state: { car } });
  };
  
  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Error state
  }

  const availableCars = cars.filter((car) => car.carStatus === 'Available');

  return (
    <div className="car-selection">
      {availableCars.length > 0 ? (
        availableCars.map((car) => (
          <div key={car.carId} className="car_card">
            <img src={CarPlaceholder} alt={car.carName} className="car-image" />
            <div className="car-details">
              <h3>{car.carId}</h3>
              <h3 className="car-name">Car Name: {car.carName}</h3>
              <p className="car-number">Car Number: {car.carNo}</p>
              <p className="car-owner">Car Owner: {car.carOwner}</p>
              <p className="car-status">Car Status: {car.carStatus}</p>
              <p className="car-fair">Car Charges: ${car.carFair.toFixed(2)}</p>
              <button
                className="book-button"
                onClick={() => handleBookClick(car)}
              >
                Book
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No available cars</div> // Handle case when there are no available cars
      )}
    </div>
  );
};

export default Cars;
