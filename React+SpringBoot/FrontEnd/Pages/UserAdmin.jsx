import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserController = () => {
    const [customers, setCustomers] = useState([]); // Ensure initial state is an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customers/');
                
                // Log the response to verify its structure
                console.log('API Response:', response.data);

                // Check and handle various response structures
                if (Array.isArray(response.data)) {
                    console.log('Data is an array:', response.data);
                    setCustomers(response.data);
                } else if (response.data && Array.isArray(response.data.customers)) {
                    console.log('Data is inside "customers" property:', response.data.customers);
                    setCustomers(response.data.customers);
                } else {
                    throw new Error('Unexpected data format');
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Customers List</h1>
            {customers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Address ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.custId}>
                                <td>{customer.custId}</td>
                                <td>{customer.custName}</td>
                                <td>{customer.cNum}</td>
                                <td>{customer.email}</td>
                                <td>{customer.dob}</td>
                                <td>{customer.addressId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No customers found.</p>
            )}
        </div>
    );
};

export default UserController;
