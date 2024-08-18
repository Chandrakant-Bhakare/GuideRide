import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CssFiles/Guides.css'; // Ensure this CSS file has styles for guide cards

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCar = location.state?.car; // Get the car data from location state

  useEffect(() => {
    // Fetch data from the API
    const fetchGuides = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/guides/');
        const data = await response.json();
        setGuides(data);
        filterAvailableGuides(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching guide data:', error);
      }
    };

    fetchGuides();
  }, []);

  const filterAvailableGuides = (guides) => {
    const availableGuides = guides.filter(guide => guide.status === 'available');
    setFilteredGuides(availableGuides);
  };
  console.log(guides)
  const handleBookClick = (guide) => {
    // Save the booked guide ID to local storage
    localStorage.setItem('guideID', guide.id);
    // Navigate to Booking page with both car and guide data
    navigate('/UserBooking', { state: { selectedCar, selectedGuide: guide } });
    alert("Guide selected");
    console.log(`Book button clicked for guide with ID: ${guide.id}`);
  };

  return (
    <div className="guide-selection">
      {selectedCar && (
        <div className="selected-car">
          <h2>Selected Car</h2>
          <div className="car-details">
          
            <p>Car Name: {selectedCar.carName}</p>
            <p>Car Number: {selectedCar.carNo}</p>
            <p>Car Owner: {selectedCar.carOwner}</p>
            <p>Car Status: {selectedCar.carStatus}</p>
            <p>Car Charges: ${selectedCar.carFair.toFixed(2)}</p>
          </div>
        </div>
      )}
      {guides.map((guide) => (
        <div key={guide.id} className="guide-card">
          <div className="guide-details">
          
            <h3 className="guide-name">{guide.name}</h3>
            <p className="guide-experience">{guide.experience} years of experience</p>
            <p className="guide-status">Status: {guide.guideStatus
}</p>
            <button onClick={() => handleBookClick(guide)} className="book-button">
              Book This Guide
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Guides;
