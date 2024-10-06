import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import projectService from "../service/ProjectService";
import { useTranslation } from "react-i18next";

const UpdateProjectPage = () => {
  const { t } = useTranslation();

  const [project, setProject] = useState({
    projectName: "",
    projectCode: "",
    startDate: "",
    endDate: "",
    status: "NOT_STARTED",
    programmingLanguageList: [],
  });

  const [availableLanguages, setAvailableLanguages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response =
          await projectService.getAvailableProgrammingLanguages();
        setAvailableLanguages(response);
      } catch (error) {
        console.error("Error fetching programming languages:", error);
      }
    };

    const fetchProject = async () => {
      try {
        const response = await projectService.getProjectById(id);
        setProject(response);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchLanguages();
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    if (value && !project.programmingLanguageList.includes(value)) {
      setProject((prevProject) => ({
        ...prevProject,
        programmingLanguageList: [
          ...prevProject.programmingLanguageList,
          value,
        ],
      }));
    }
  };

  const handleRemoveLanguage = (lang) => {
    setProject((prevProject) => ({
      ...prevProject,
      programmingLanguageList: prevProject.programmingLanguageList.filter(
        (language) => language !== lang
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await projectService.updateProject(id, project);
      navigate("/projects");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="form-update-project">
      <h2>{t("Update Project")}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t("Project Name")}:</label>
        <input
          type="text"
          name="projectName"
          value={project.projectName}
          onChange={handleChange}
          required
        />

        <label>{t("Project Code")}:</label>
        <input
          type="text"
          name="projectCode"
          value={project.projectCode}
          onChange={handleChange}
          required
        />

        <label>{t("Start Date")}:</label>
        <input
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
          required
        />

        <label>{t("End Date")}:</label>
        <input
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
          required
        />

        <label>{t("Status")}:</label>
        <select
          name="status"
          value={project.status}
          onChange={handleChange}
          required
        >
          <option value="NOT_STARTED">{t("Not Started")}</option>
          <option value="ONGOING">{t("Ongoing")}</option>
          <option value="CANCELLED">{t("Cancelled")}</option>
          <option value="CLOSED">{t("Closed")}</option>
        </select>

        <label>{t("Programming Languages")}:</label>
        <select onChange={handleLanguageChange}>
          <option value="">{t("Select a programming language")}</option>
          {availableLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <ul>
          {project.programmingLanguageList.map((lang) => (
            <li key={lang}>
              {lang}{" "}
              <button
                className="btn"
                type="button"
                onClick={() => handleRemoveLanguage(lang)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button className="btn" type="submit">
          {t("Update")}
        </button>
      </form>
    </div>
  );
};

export default UpdateProjectPage;
