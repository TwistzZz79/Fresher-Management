import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FresherService from "../service/FresherService";
import { useTranslation } from "react-i18next";

function AddFresherPage() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [firstProject, setFirstProject] = useState("");
  const [secondProject, setSecondProject] = useState("");
  const [thirdProject, setThirdProject] = useState("");
  const [finalScore, setFinalScore] = useState("");
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFresher = {
      name,
      email,
      programmingLanguage,
      firstProject,
      secondProject,
      thirdProject,
      finalScore,
    };

    try {
      await FresherService.addFresher(newFresher);
      navigate("/freshers"); // Navigate back to the fresher list page
    } catch (error) {
      console.error(t("Error adding fresher: "), error);
    }
  };

  return (
    <div className="form-add-fresher">
      <h2>{t('addFresher')}</h2> {/* Use translation for the title */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('nameLabel')}:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t('emailLabel')}:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "160px" }}
          />
        </div>
        <div>
          <label>{t('programmingLanguageLabel')}:</label>
          <input
            type="text"
            value={programmingLanguage}
            onChange={(e) => setProgrammingLanguage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t('project1Label')}:</label>
          <input
            type="text"
            value={firstProject}
            onChange={(e) => setFirstProject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t('project2Label')}:</label>
          <input
            type="text"
            value={secondProject}
            onChange={(e) => setSecondProject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t('project3Label')}:</label>
          <input
            type="text"
            value={thirdProject}
            onChange={(e) => setThirdProject(e.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit">{t('addFresherButton')}</button> {/* Use translation for the button */}
      </form>
    </div>
  );
}

export default AddFresherPage;
