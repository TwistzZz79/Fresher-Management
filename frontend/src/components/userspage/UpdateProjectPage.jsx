import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import projectService from '../service/ProjectService';



const UpdateProjectPage = () => {
    const [project, setProject] = useState({
      projectName: '',
      projectCode: '',
      startDate: '',
      endDate: '',
      status: 'NOT_STARTED',
      programmingLanguageList: [],
    });
  
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      const fetchLanguages = async () => {
        try {
          const response = await projectService.getAvailableProgrammingLanguages(); 
          setAvailableLanguages(response);
        } catch (error) {
          console.error('Error fetching programming languages:', error);
        }
      };
  
      const fetchProject = async () => {
        try {
          const response = await projectService.getProjectById(id);
          setProject(response);
        } catch (error) {
          console.error('Error fetching project:', error);
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
          programmingLanguageList: [...prevProject.programmingLanguageList, value],
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
        navigate('/projects');
      } catch (error) {
        console.error('Error updating project:', error);
      }
    };
  
    return (
      <div>
        <h1>Update Project</h1>
        <form onSubmit={handleSubmit}>
          <label>Project Name:</label>
          <input
            type="text"
            name="projectName"
            value={project.projectName}
            onChange={handleChange}
            required
          />
          <br />
          <label>Project Code:</label>
          <input
            type="text"
            name="projectCode"
            value={project.projectCode}
            onChange={handleChange}
            required
          />
          <br />
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            required
          />
          <br />
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={project.endDate}
            onChange={handleChange}
            required
          />
          <br />
          <label>Status:</label>
          <select
            name="status"
            value={project.status}
            onChange={handleChange}
            required
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="ONGOING">Ongoing</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="CLOSED">Closed</option>
          </select>
          <br />
          <label>Programming Languages:</label>
          <select onChange={handleLanguageChange}>
            <option value="">Select a programming language</option>
            {availableLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          <ul>
            {project.programmingLanguageList.map((lang) => (
              <li key={lang}>
                {lang} <button type="button" onClick={() => handleRemoveLanguage(lang)}>Remove</button>
              </li>
            ))}
          </ul>
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  };
  
  export default UpdateProjectPage;
  