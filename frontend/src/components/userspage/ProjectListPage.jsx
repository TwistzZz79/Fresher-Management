import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import projectService from "../service/ProjectService";

const ProjectListPage = () => {
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
      <h1>Project List</h1>
      <button onClick={() => navigate("/projects/add")}>Add Project</button>

      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Code</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Programming Languages</th>
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
              <button onClick={() => navigate(`/projects/update/${project.id}`)}>Update</button>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
                <button onClick={() => navigate(`/projects/${project.id}`)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListPage;
