import React, { useState, useEffect } from 'react';

const BookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [totalFairs, setTotalFairs] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/api/bookings/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleGetBill = () => {
    setShowBill(true);
    bookings.forEach((booking) => {
      fetch(`http://localhost:8080/api/bookings/payment/${booking.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setTotalFairs((prevTotalFairs) => ({ ...prevTotalFairs, [booking.id]: data.totalFair }));
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="booking-controller">
      <h1>Bookings Management</h1>
      <button onClick={handleGetBill}>Get Bill</button>

      <table className="bookings-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Car Name</th>
            <th>Car Owner</th>
            <th>Guide Name</th>
            <th>Guide Experience</th>
            <th>Start Location</th>
            <th>End Location</th>
            <th>Number of KM</th>
            <th>Number of People</th>
            <th>Car Fare</th>
            <th>Guide Fare</th>
            <th>Trip Fare</th>
            <th>Booking Date</th>
            <th>Paid</th>
            {showBill && <th>Total Payment</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.customer.custName}</td>
                <td>{booking.car.carName}</td>
                <td>{booking.car.carOwner}</td>
                <td>{booking.guide.name}</td>
                <td>{booking.guide.experience}</td>
                <td>{booking.trip.startLocation}</td>
                <td>{booking.trip.endLocation}</td>
                <td>{booking.trip.numberOfKm}</td>
                <td>{booking.trip.numberOfPeople}</td>
                <td>{`₹${booking.car.carFair}`}</td>
                <td>{`₹${booking.guide.guideFair}`}</td>
                <td>{`₹${booking.trip.tripFair}`}</td>
                <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                <td>{booking.paid ? 'Yes' : 'No'}</td>
                {showBill && (
                  <td>
                    {`₹${totalFairs[booking.id]}`}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" className="no-bookings">No bookings available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingAdmin;