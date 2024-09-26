import React, { useState, useEffect } from "react";
import CenterService from "../service/CenterService";
import { useNavigate } from "react-router-dom";
function CenterPage() {
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCenters();
  }, []);

  const loadCenters = async () => {
    try {
      const response = await CenterService.getCenters();
      setCenters(response);
    } catch (error) {
      console.error("Error loading centers: ", error);
    }
  };

  const fetchCenters = async () => {
    try {
      const response = await CenterService.getCenters();
      setCenters(response);
    } catch (error) {
      console.error("Error fetching centers ", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this center?"
    );
    if (confirmDelete) {
      try {
        await CenterService.deleteCenter(id);
        fetchCenters();
      } catch (error) {
        console.error("Error deleting center: ", error);
      }
    }
  };

  const handleAddFresherToCenter = async (centerId, fresherId) => {
    try {
      await CenterService.addFresherToCenter(centerId, fresherId);
      loadCenters();
    } catch (error) {
      console.error("Error adding fresher to center: ", error);
    }
  };

  const handleRemoveFresherFromCenter = async (centerId, fresherId) => {
    try {
      await CenterService.removeFresherFromCenter(centerId, fresherId);
      loadCenters();
    } catch (error) {
      console.error("Error removing fresher from center: ", error);
    }
  };

  return (
    <div>
      <h1>Centers</h1>
      <button onClick={() => navigate("/add-center")}>Add Center</button>
      <table>
        <thead>
          <tr>
            <th>Center Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {centers?.map((center) => (
            <tr key={center.id}>
              <td>{center.name}</td>
              <td>{center.location}</td>
              <button onClick={() => navigate(`/update-center/${center.id}`)}>
                Update
              </button>
              <button onClick={() => handleDelete(center.id)}>Delete</button>
              <button onClick={() => navigate(`/center/${center.id}`)}>
                View Freshers
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CenterPage;
