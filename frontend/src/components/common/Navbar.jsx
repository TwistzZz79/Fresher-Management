import React from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import englishFlag from "../../images/English_flag.png";
import vietnamFlag from "../../images/Vietnam_flag.png";

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAdmin = UserService.isAdmin();

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      t("Are you sure you want to logout this user?")
    );
    if (confirmDelete) {
      navigate("/");
      UserService.logout();
      onLogout(false);
    }
  };

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "vn" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav>
      <ul>
        {!isLoggedIn && (
          <li>
            <Link to="/">{t("Fresher Management")}</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/profile">{t("Profile")}</Link>
          </li>
        )}
        {isAdmin && isLoggedIn && (
          <li>
            <Link to="/admin/user-management">{t("User Management")}</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/freshers">{t("Fresher List")}</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/centers">{t("Center List")}</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/projects">{t("Project List")}</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}

        {isLoggedIn && <li onClick={handleLogout} style={{color: 'white'}}>{t("Logout")}</li>}
        <div className="parent-language">
          <img
            src={englishFlag}
            alt="English Flag"
            onClick={() => handleLanguageChange("en")}
            style={{
              cursor: "pointer",
              width: "30px",
              height: "20px",
              marginRight: "5px",
            }} // Adjust size as needed
          />
          <img
            src={vietnamFlag}
            alt="Vietnamese Flag"
            onClick={() => handleLanguageChange("vn")}
            style={{ cursor: "pointer", width: "30px", height: "20px" }} // Adjust size as needed
          />
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
