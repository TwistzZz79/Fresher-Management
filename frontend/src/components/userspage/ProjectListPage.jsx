import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import projectService from "../service/ProjectService";
import { useTranslation } from "react-i18next";


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
      setProjects(response);
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
    <div>
      <h1>{t("Project List")}</h1>
      <button onClick={() => navigate("/projects/add")}>{t("Add Project")}</button>

      <table>
        <thead>
          <tr>
            <th>{t("Project Name")}</th>
            <th>{t("Project Code")}</th>
            <th>{t("Start Date")}</th>
            <th>{t("End Date")}</th>
            <th>{t("Status")}</th>
            <th>{t("Programming Languages")}</th>
            <th>{t("Actions")}</th> {/* Added Actions column header */}
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
                {project.programmingLanguageList.join(", ")}{" "}
                {/* Display languages */}
              </td>
              <td>
                <button onClick={() => navigate(`/projects/update/${project.id}`)}>{t("Update")}</button>
                <button onClick={() => handleDelete(project.id)}>{t("Delete")}</button>
                <button onClick={() => navigate(`/projects/${project.id}`)}>{t("View Details")}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListPage;
