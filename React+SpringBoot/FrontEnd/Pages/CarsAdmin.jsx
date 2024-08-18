import React, { useState, useEffect } from 'react';
import '../CssFiles/CarAdmin.css'; // Your existing CSS file

const CarAdmin = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCar, setNewCar] = useState({ carName: '', carNo: '', carOwner: '', carStatus: '', carFair: '', imgUrl: '' });
  const [editCar, setEditCar] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/cars/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (carId) => {
    fetch(`http://localhost:8080/api/cars/${carId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setCars(cars.filter((car) => car.carId !== carId));
      })
      .catch((error) => {
        console.error('There was a problem with the delete operation:', error);
        setError(error);
      });
  };

  const handleUpdate = (carId) => {
    console.log('Updating car with ID:', carId);
    console.log('Data being sent to backend:', editCar);

    fetch(`http://localhost:8080/api/cars/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editCar),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((updatedCar) => {
        setCars(cars.map((car) => (car.carId === carId ? updatedCar : car)));
        setEditCar(null);
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error('There was a problem with the update operation:', error);
        setError(error);
      });
  };

  const handleAddCar = () => {
    console.log('Adding new car');
    console.log('Data being sent to backend:', newCar);

    fetch('http://localhost:8080/api/cars/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((car) => {
        setCars([...cars, car]);
        setNewCar({ carName: '', carNo: '', carOwner: '', carStatus: '', carFair: '', imgUrl: '' });
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error('There was a problem with the add operation:', error);
        setError(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCar({ ...editCar, [name]: value });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="car-admin">
      <h1>Cars Management</h1>
      <button className="toggle-form-button" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Close Form' : 'Add New Car'}
      </button>

      {isFormVisible && (
        <>
          <div className="overlay active"></div>
          <div className="add-car-form">
            <h2>Add New Car</h2>
            <input
              type="text"
              name="carName"
              placeholder="Car Name"
              value={newCar.carName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="carNo"
              placeholder="Car Number"
              value={newCar.carNo}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="carOwner"
              placeholder="Car Owner"
              value={newCar.carOwner}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="carStatus"
              placeholder="Car Status"
              value={newCar.carStatus}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="carFair"
              placeholder="Car Charges"
              value={newCar.carFair}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="imgUrl"
              placeholder="Car Image URL"
              value={newCar.imgUrl}
              onChange={handleInputChange}
            />
            <button onClick={handleAddCar}>Add Car</button>
            <button onClick={toggleFormVisibility}>Cancel</button>
          </div>
        </>
      )}

      {editCar && (
        <>
          <div className="overlay active"></div>
          <div className="edit-car-form">
            <h2>Edit Car</h2>
            <input
              type="text"
              name="carName"
              placeholder="Car Name"
              value={editCar.carName}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="carNo"
              placeholder="Car Number"
              value={editCar.carNo}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="carOwner"
              placeholder="Car Owner"
              value={editCar.carOwner}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="carStatus"
              placeholder="Car Status"
              value={editCar.carStatus}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="carFair"
              placeholder="Car Charges"
              value={editCar.carFair}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="imgUrl"
              placeholder="Car Image URL"
              value={editCar.imgUrl}
              onChange={handleEditChange}
            />
            <button onClick={() => handleUpdate(editCar.carId)}>Update Car</button>
            <button onClick={() => setEditCar(null)}>Cancel</button>
          </div>
        </>
      )}

      <table className="cars-table">
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Car Number</th>
            <th>Car Owner</th>
            <th>Car Status</th>
            <th>Car Charges</th>
            <th>Car Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <tr key={car.carId}>
                <td>{car.carName}</td>
                <td>{car.carNo}</td>
                <td>{car.carOwner}</td>
                <td>{car.carStatus}</td>
                <td>{car.carFair}</td>
                <td>
                  {car.imgUrl ? (
                    <img src={car.imgUrl} alt={car.carName} className="car-image" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(car.carId)}>
                    Delete
                  </button>
                  <button className="edit-button" onClick={() => setEditCar(car)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-cars">No cars available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarAdmin;
