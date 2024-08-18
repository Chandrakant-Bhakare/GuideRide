import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { custName: username, password };

    try {
      const loginResponse = await fetch('http://localhost:8080/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const loginData = await loginResponse.json();
      const token = loginData.token;

      if (token) {
        const customersResponse = await fetch('http://localhost:8080/api/customers/');
        const customersData = await customersResponse.json();
        const customers = customersData.customers;
        const matchedCustomer = customers.find(c => c.custName === username );

        if (matchedCustomer) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(matchedCustomer));
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;