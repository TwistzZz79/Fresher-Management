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
      await CenterService.addFresherToCenter(centerId.id, selectedFresher);
      setFresherAll((prev) =>
        prev.filter((item) => item.id != selectedFresher)
      );
      fetchAllFresherInCenter();
    } catch (error) {
      console.error("Error adding fresher to center: ", error);
    }
  };

  const handleRemoveFresher = async (fresher) => {
    try {
      await CenterService.removeFresherFromCenter(centerId.id, fresher.id);
      setFresherAll((prev) => [...prev, fresher]);
      fetchAllFresherInCenter();
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
