import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function ProfilePage() {
  const { t } = useTranslation();
  const [profileInfo, setProfileInfo] = useState(null); // Initialize with null

  useEffect(() => {
    fetchProfileInfo();
    console.log(profileInfo);
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await UserService.getYourProfile(token);
      console.log(response);
      setProfileInfo(response.users); // Make sure this matches the backend structure
      console.log(response.users);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  // Conditionally render only if profileInfo is loaded
  if (!profileInfo) {
    return <div>Loading...</div>; // Or any loading spinner you prefer
  }

  return (
    <div className="profile-page-container">
      <h2>{t("Profile Information")}</h2>
      <p className="title-infomation">
        {t("Name")}: <span className="infomation">{profileInfo?.name}</span>
      </p>
      <p className="title-infomation">
        {t("Email")}: <span className="infomation">{profileInfo?.email}</span>
      </p>
      <p className="title-infomation">
        {t("Role")}: {profileInfo?.role} <span className="infomation"></span>
      </p>
      {profileInfo?.role === "ADMIN" && (
        <button className="btn">
          <Link to={`/update-user/${profileInfo.id}`}>
            {t("Update This Profile")}
          </Link>
        </button>
      )}
    </div>
  );
}

export default ProfilePage;
