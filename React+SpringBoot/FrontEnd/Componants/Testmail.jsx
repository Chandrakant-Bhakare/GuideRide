import React, { useState } from 'react';

const Testmail = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [addressId, setAddressId] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Simulate email sending
    setSendingEmail(true);

    setTimeout(() => {
      // Simulate successful email sending
      setSendingEmail(false);
      setConfirmationMessage('Registration successful! A confirmation email has been sent to your address.');
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
      setDob('');
      setAddressId('');
    }, 2000); // Simulate a delay for email sending
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
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
            <button type="submit" className="green_btn" disabled={sendingEmail}>
              {sendingEmail ? 'Sending...' : 'Sign Up'}
            </button>
          </form>
          {confirmationMessage && (
            <div className="confirmation_message">
              {confirmationMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testmail;
