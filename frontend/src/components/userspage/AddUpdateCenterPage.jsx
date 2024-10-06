import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CenterService from "../service/CenterService";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AddUpdateCenterPage() {
  const { t } = useTranslation();
  const [center, setCenter] = useState({
    name: "",
    location: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCenterById(id);
    }
  }, [id]);
  const fetchCenterById = async (id) => {
    try {
      const response = await CenterService.getCenterById(id);
      setCenter(response);
    } catch (error) {
      console.error("Error fetching center", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCenter((prevCenter) => ({
      ...prevCenter,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await CenterService.updateCenter(id, center);
        toast.success("Update thành công", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      } else {
        await CenterService.addCenter(center);
        toast.success("Create thành công", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      }
      navigate("/centers");
    } catch (error) {
      console.error("Error saving center: ", error);
    }
  };

  return (
    <div className="form-update-center">
      <h2>{id ? t("Update Center") : t("Add Center")}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("Name")}:</label>
          <input
            type="text"
            name="name"
            value={center.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{t("Location")}:</label>
          <input
            type="text"
            name="location"
            value={center.location}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn" type="submit">
          {id ? t("Update") : t("Add")} {t("Center")}
        </button>
      </form>
    </div>
  );
}

export default AddUpdateCenterPage;
