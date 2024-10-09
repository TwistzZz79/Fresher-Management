import React, { useState, useEffect } from "react";
import CenterService from "../service/CenterService";
import FresherService from "../service/FresherService";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CenterDetailPage() {
  const { t } = useTranslation();
  const centerId = useParams();
  const [fresherInCenter, setFresherInCenter] = useState([]);
  const [fresherAll, setFresherAll] = useState([]);
  const [selectedFresher, setSelectedFresher] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllFresher();
    fetchAllFresherInCenter();
  }, []);

  const fetchAllFresher = async () => {
    try {
      const response = await FresherService.getAllFreshers();
      setFresherAll(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllFresherInCenter = async () => {
    try {
      const response = await CenterService.getFreshersByCenter(centerId.id);
      setFresherInCenter(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFresher = async () => {
    try {
      // Check if the fresher is already in another center
      const fresherToAdd = fresherAll.find((fresher) => fresher.id == selectedFresher);
      if (!fresherToAdd) {
        console.error("Fresher not found");
        return;
      }

      // Assign fresher to the new center, automatically removing them from their previous center
      await CenterService.addFresherToCenter(centerId.id, selectedFresher);

      // Update fresher lists: add to current center and remove from available freshers
      setFresherInCenter((prev) => [...prev, fresherToAdd]);
      setFresherAll((prev) =>
        prev.filter((item) => item.id != selectedFresher)
      );
      
      // Reset the selected fresher after adding
      setSelectedFresher("");

    } catch (error) {
      console.error("Error adding fresher to center: ", error);
    }
  };

  const handleRemoveFresher = async (fresher) => {
    try {
      // Remove fresher from the current center
      await CenterService.removeFresherFromCenter(centerId.id, fresher.id);

      // Update fresher lists: remove from current center and add back to available freshers
      setFresherInCenter((prev) =>
        prev.filter((item) => item.id !== fresher.id)
      );
      setFresherAll((prev) => [...prev, fresher]);

    } catch (error) {
      console.error("Error removing fresher from center: ", error);
    }
  };

  return (
    <div className="center-detail-page">
      <h2>{t("Center Management")}</h2>

      <h3>{t("Freshers in this Center")}:</h3>
      <ul>
        {fresherInCenter.map((item) => (
          <li key={item.id}>
            <span>
              {item.name} ({item.email})
            </span>
            <button className="btn" onClick={() => handleRemoveFresher(item)}>
              {t("Remove")}
            </button>
          </li>
        ))}
      </ul>

      <div className="fresher-management">
        <h3>{t("Add a Fresher to the Center")}</h3>
        <select
          value={selectedFresher}
          onChange={(e) => setSelectedFresher(e.target.value)}
        >
          <option value="">{t("Select Fresher")}</option>
          {fresherAll.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - {item.email}
            </option>
          ))}
        </select>
        <button className="btn" onClick={handleAddFresher}>
          {t("Add Fresher")}
        </button>
      </div>

      <button className="btn back-btn" onClick={() => navigate("/centers")}>
        {t("Back to Centers")}
      </button>
    </div>
  );
}

export default CenterDetailPage;
