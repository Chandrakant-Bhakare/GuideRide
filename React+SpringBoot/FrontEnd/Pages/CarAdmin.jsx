// CarAdmin.jsx
import React, { useState, useEffect } from "react";
import "../CssFiles/CarAdmin.css"; // Ensure this CSS file is created

const CarAdmin = () => {
  const [cars, setCars] = useState([]);
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carStatus, setCarStatus] = useState("available");
  const [carId, setCarId] = useState(null);
  const [showCarForm, setShowCarForm] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars/");
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Check API response
          setCars(data);
        } else {
          console.error("Error fetching cars:", response.status);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // ...

  return (
    <div className="cars-page">
      <h1>Manage Cars</h1>

      {showCarForm && <div className="form-container"></div>}

      <div className="table-container">
        <h2>Cars</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {cars.map((car) => (
    <tr key={car.carId} > {/* Unique key for each row */}
      <td>{car.name}</td>
      <td>{car.model}</td>
      <td>{car.status}</td>
      <td>
        <button onClick={() => handleEditCar(car)}>Edit</button>
        <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default CarAdmin;
