import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import projectService from "../service/ProjectService";
import { useTranslation } from "react-i18next";
import UserService from "../service/UserService";

const ProjectListPage = () => {
  const { t } = useTranslation();

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAllProjects();
      if (Array.isArray(response)) {
        setProjects(response);
      } else {
        console.error("Error: Response is not an array");
      }
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Project?"
    );
    if (confirmDelete) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter((project) => project.id !== id));
      } catch (error) {
        console.error("Error deleting project: ", error);
      }
    }
  };

  return (
    <div className="form-listProject">
      <h2>{t("Project List")}</h2>
      {UserService.isAdmin() && (
        <button className="btn" onClick={() => navigate("/projects/add")}>
          {t("Add Project")}
        </button>
      )}

      <table>
        <thead>
          <tr>
            <th>{t("Project Name")}</th>
            <th>{t("Project Code")}</th>
            <th>{t("Start Date")}</th>
            <th>{t("End Date")}</th>
            <th>{t("Status")}</th>
            <th>{t("Programming Languages")}</th>
            {UserService.isAdmin() && <th>{t("Actions")}</th>}{" "}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>{project.projectCode}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td>{project.status}</td>
              <td>
                {Array.isArray(project.programmingLanguageList)
                  ? project.programmingLanguageList.join(", ")
                  : t("No programming languages")}
              </td>
              {UserService.isAdmin() && (
                <td>
                  <button
                    className="btn update-button"
                    onClick={() => navigate(`/projects/update/${project.id}`)}
                  >
                    {t("Update")}
                  </button>
                  <button
                    className="btn delete-button"
                    onClick={() => handleDelete(project.id)}
                  >
                    {t("Delete")}
                  </button>
                  <button
                    className="btn view-button"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    {t("View Details")}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListPage;
