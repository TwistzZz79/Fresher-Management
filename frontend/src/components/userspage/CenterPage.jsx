import React, { useState, useEffect } from "react";
import CenterService from "../service/CenterService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CenterPage() {
  const {t}= useTranslation();
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
      <h2>{t("Centers")}</h2>
      <button className="btn" onClick={() => navigate("/add-center")}>{t("Add Center")}</button>
      <table>
        <thead>
          <tr>
            <th>{t("Center Name")}</th>
            <th>{t("Location")}</th>
            <th>{t("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {centers?.map((center) => (
            <tr key={center.id}>
              <td>{center.name}</td>
              <td>{center.location}</td>
              <td>
                <button className="btn update-button" onClick={() => navigate(`/update-center/${center.id}`)}>
                  {t("Update")}
                </button>
                <button className="btn delete-button" onClick={() => handleDelete(center.id)}>
                  {t("Delete")}
                </button>
                <button className="btn btn view-button" onClick={() => navigate(`/center/${center.id}`)}>
                  {t("View Freshers")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CenterPage;
