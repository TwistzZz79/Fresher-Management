import React, { useState, useEffect } from "react";
import CenterService from "../service/CenterService";
import FresherService from "../service/FresherService";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function CenterDetailPage() {
  const { t } = useTranslation();
  const centerId = useParams();
  const [center, setCenter] = useState({});
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
  // useEffect(() => {
  //   fetchCenterDetails();
  //   fetchAllFreshers(); // Fetch all freshers regardless of their center assignment
  // }, [centerId]);

  // const fetchCenterDetails = async () => {
  //   try {
  //     const centerData = await CenterService.getCenterById(centerId);
  //     setCenter(centerData);
  //     const freshersInCenter = await CenterService.getFreshersByCenter(
  //       centerId
  //     );
  //     setFreshersAll(freshersInCenter);
  //   } catch (error) {
  //     console.error("Error fetching center details: ", error);
  //   }
  // };

  // const fetchAllFreshers = async () => {
  //   try {
  //     const response = await FresherService.getAllFreshers(); // Fetch all freshers
  //     setFreshersAll(response);
  //     setAvailableFreshers(response);
  //   } catch (error) {
  //     console.error("Error fetching freshers: ", error);
  //   }
  // };

  const handleAddFresher = async () => {
    try {
      await CenterService.addFresherToCenter(centerId.id, selectedFresher);
      setFresherAll(prev => prev.filter(item => item.id != selectedFresher))
      fetchAllFresherInCenter();
    } catch (error) {
      console.error("Error adding fresher to center: ", error);
    }
  };

  const handleRemoveFresher = async (fresher) => {
    try {
      await CenterService.removeFresherFromCenter(centerId.id, fresher.id);
      setFresherAll(prev => [...prev, fresher])
      fetchAllFresherInCenter(); 
    } catch (error) {
      console.error("Error removing fresher from center: ", error);
    }
  };

  return (
    <div>
      <h1>{center.name} - {t('Center Management')}</h1>
      <h2>{t('Freshers in this Center')}:</h2>

      <ul>
        {fresherInCenter.map((item) => (
          <li key={item.id}>
            {item.name} ({item.email})
            <button onClick={() => handleRemoveFresher(item)}>
              {t('Remove')}
            </button>
          </li>
        ))}
      </ul>

      <h3>{t('Add a Fresher to the Center')}</h3>

      <select
        value={selectedFresher}
        onChange={(e) => setSelectedFresher(e.target.value)}
      >
        <option value="">{t('Select Fresher')}</option>
        {fresherAll?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} - {item.email}
          </option>
        ))}
      </select>
      <button onClick={handleAddFresher}>{t('Add Fresher')}</button>

      <button onClick={() => navigate("/centers")}>{t('Back to Centers')}</button>
    </div>
  );
}

export default CenterDetailPage;
