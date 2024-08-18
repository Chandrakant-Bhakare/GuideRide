import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CssFiles/UserProfile.css';

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paid,setPaid]=useState("pay");
  const user = localStorage.getItem('user'); // Replace 'user' with the actual key if different
  if (!user) {
    setError('User not found in local storage');
    return;
  }

  const parsedUser = JSON.parse(user); // Assuming user data is stored as a JSON string
  const userId = parsedUser.custId; // Replace 'custId' with the correct field name if different

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsResponse = await axios.get(`http://localhost:8080/api/bookings/customer/${userId}`); // Fetch bookings for the user
        setBookings(bookingsResponse.data);
      } catch (err) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const handlePayment = async (bookingId, totalFair) => {
    const options = {
      key: 'rzp_test_eIr8P7YioWEitG', // Replace with your Razorpay Test Key ID
      amount: totalFair * 100, // Amount in paise (e.g., 50000 paise = 500 INR)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      handler: async function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        try {
          // Update the payment status in the backend
          await axios.patch(`http://localhost:8080/api/bookings/${bookingId}`, { paid: true });
          // Update the bookings state to reflect the payment status
          setBookings(bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, paid: true } : booking
          ));
        } catch (error) {
          console.error('Error updating payment status:', error);
        }
      },
      prefill: {
        name: 'Test User',
        email: 'testuser@example.com',
        contact: '9921136958',
      },
      notes: {
        address: 'Test Address',
      },
      theme: {
        color: '#3399cc',
      },
    };
      setPaid("paid");
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="booking-container">
      {bookings.map((booking) => {
        const billDetails = {
          carFair: booking.car.carFair,
          guideFair: booking.guide.guideFair,
          tripFair: booking.trip.tripFair,
          totalFair: booking.car.carFair + booking.guide.guideFair + booking.trip.tripFair,
        };

        return (
          <div key={booking.id} className="booking-card">
            <div className='up'>
              <div className="car-details">
                <img src={booking.car.imgUrl} alt="Car" className="car-image" />
                <div className="carinfo">
                  <h3>Car Details</h3>
                  <p><strong>Name:</strong> {booking.car.carName}</p>
                  <p><strong>Number:</strong> {booking.car.carNo}</p>
                  <p><strong>Owner:</strong> {booking.car.carOwner}</p>
                </div>
              </div>

              <div className="trip-details">
                <h3>Trip Details</h3>
                <p><strong>Start Location:</strong> {booking.trip.startLocation}</p>
                <p><strong>End Location:</strong> {booking.trip.endLocation}</p>
                <p><strong>Number of KM:</strong> {booking.trip.numberOfKm}</p>
                <p><strong>Number of People:</strong> {booking.trip.numberOfPeople}</p>
              </div>

              <div className="guide-details">
                <h3>Guide Details</h3>
                <p><strong>Name:</strong> {booking.guide.name}</p>
                <p><strong>Experience:</strong> {booking.guide.experience}</p>
                <p><strong>Guide Ratings:</strong> {booking.guide.guideRatings}</p>
              </div>
            </div>
            <div className="bill-details">
              <h3>Bill Details</h3>
              <p><strong>Car Cost:</strong> ${billDetails.carFair}</p>
              <p><strong>Guide Cost:</strong> ${billDetails.guideFair}</p>
              <p><strong>Trip Cost:</strong> ${billDetails.tripFair}</p>
              <p><strong>Total Cost:</strong> ${billDetails.totalFair}</p>
              <button
                className="pay-button"
                onClick={() => handlePayment(booking.id, billDetails.totalFair)}
                disabled={booking.paid} // Disable the button if already paid
              >
                {paid}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserProfile;
