import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CssFiles/Register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');  // New state for date of birth
  const [addressId, setAddressId] = useState('');  // New state for address ID
  const [role, setRole] = useState('CUSTOMER');  // Default role is CUSTOMER
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/customers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          custName: fullName,
          cNum: phoneNumber,
          email: email,
          password: password,
          dob: dob,
          addressId: parseInt(addressId, 10),  // Ensure addressId is an integer
          role: role,
        }),
      });

      if (response.ok) {
        // Registration successful, redirect to login page or show a success message
        navigate('/login');
      } else {
        // Handle registration error
        console.error('Registration failed:', await response.text());
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sign in
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="input"
            />
            <input
              type="number"
              placeholder="Address ID"
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
              required
              className="input"
            />
            <input
              type="hidden"
              value={role}
              readOnly
            />
            <button type="submit" className="green_btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
