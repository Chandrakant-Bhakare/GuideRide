import React, { useState, useEffect } from 'react';
import '../CssFiles/GuideAdmin.css'

const GuideAdmin = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGuide, setNewGuide] = useState({ name: '', experience: '', guide_fair: '', status: '' });
  const [editGuide, setEditGuide] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/guides/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setGuides(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (guideId) => {
    fetch(`http://localhost:8080/api/guides/${guideId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Filter out the deleted guide from the state without needing a page refresh
        setGuides(guides.filter((guide) => guide.guideId !== guideId));
      })
      .catch((error) => {
        console.error('There was a problem with the delete operation:', error);
        setError(error);
      });
  };
  
  const handleUpdate = (guideId) => {
    fetch(`http://localhost:8080/api/guides/${guideId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editGuide),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((updatedGuide) => {
        setGuides(guides.map((guide) => (guide.guideId === guideId ? updatedGuide : guide)));
        setEditGuide(null);
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error('There was a problem with the update operation:', error);
        setError(error);
      });
  };

  const handleAddGuide = () => {
    fetch('http://localhost:8080/api/guides/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGuide),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((guide) => {
        setGuides([...guides, guide]);
        setNewGuide({ name: '', experience: '', guideFair: '', guideStatus: '' });
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error('There was a problem with the add operation:', error);
        setError(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuide({ ...newGuide, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditGuide({ ...editGuide, [name]: value });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="guide-controller">
      <h1>Guides Management</h1>
      <button className="toggle-form-button" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Close Form' : 'Add New Guide'}
      </button>

      {isFormVisible && (
        <>
          <div className="overlay active"></div>
          <div className="add-guide-form">
            <h2>Add New Guide</h2>
            <input
              type="text"
              name="name"
              placeholder="Guide Name"
              value={newGuide.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={newGuide.experience}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="guide_fair"
              placeholder="Guide Fair"
              value={newGuide.guideFair}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={newGuide.guideStatus}
              onChange={handleInputChange}
            />
            <button onClick={handleAddGuide}>Add Guide</button>
            <button onClick={toggleFormVisibility}>Cancel</button>
          </div>
        </>
      )}

      {editGuide && (
        <>
          <div className="overlay active"></div>
          <div className="edit-guide-form">
            <h2>Edit Guide</h2>
            <input
              type="text"
              name="name"
              placeholder="Guide Name"
              value={editGuide.name}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={editGuide.experience}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="guide_fair"
              placeholder="Guide Fair"
              value={editGuide.guide_fair}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={editGuide.status}
              onChange={handleEditChange}
            />
            <button onClick={() => handleUpdate(editGuide.guideId)}>Update Guide</button>
            <button onClick={() => setEditGuide(null)}>Cancel</button>
          </div>
        </>
      )}

      <table className="guides-table">
        <thead>
          <tr>
            <th>Guide Name</th>
            <th>Experience</th>
            <th>Guide Fair</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.length > 0 ? (
            guides.map((guide) => (
              <tr key={guide.guideId}>
                <td>{guide.name}</td>
                <td>{guide.experience}</td>
                <td>{guide.guideFair}</td>
                <td>{guide.guideStatus}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(guide.id)}>
                    Delete
                  </button>
                  <button className="edit-button" onClick={() => setEditGuide(guide)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-guides">No guides available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GuideAdmin;