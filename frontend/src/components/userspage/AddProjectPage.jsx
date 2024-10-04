import React, { useState, useEffect } from 'react';
import projectService from '../service/ProjectService';

import { useNavigate, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';


const AddProjectPage = () => {
  const { t } = useTranslation();
  const [project, setProject] = useState({
    projectName: '',
    projectCode: '',
    startDate: '',
    endDate: '',
    status: 'NOT_STARTED',
    programmingLanguageList: [], // Add this line
    
  });

  const [availableLanguages, setAvailableLanguages] = useState([]); // For available programming languages
  
  const [customLanguage, setCustomLanguage] = useState(''); // For new programming language input

  const navigate = useNavigate(); // Replaced useHistory with useNavigate
  const { id } = useParams(); // For update case

  useEffect(() => {
    if (id) {
      // Fetch project details for update
      projectService.getProjectById(id)
        .then(response => setProject(response))
        .catch(error => console.error('Error fetching project:', error));
    }
    // Fetch available programming languages
    projectService.getAvailableProgrammingLanguages()
      .then(languages => setAvailableLanguages(languages))
      .catch(error => console.error('Error fetching languages:', error));
  }, [id]);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleLanguageChange = (language) => {
    setProject((prevState) => {
      const { programmingLanguageList } = prevState;
      if (programmingLanguageList.includes(language)) {
        // Remove language
        return {
          ...prevState,
          programmingLanguageList: programmingLanguageList.filter(lang => lang !== language),
        };
      } else {
        // Add language
        return {
          ...prevState,
          programmingLanguageList: [...programmingLanguageList, language],
        };
      }
    });
  };

  const handleCustomLanguageChange = (e) => {
    setCustomLanguage(e.target.value);
  };

  const addCustomLanguage = () => {
    if (customLanguage && !project.programmingLanguageList.includes(customLanguage)) {
      setProject((prevState) => ({
        ...prevState,
        programmingLanguageList: [...prevState.programmingLanguageList, customLanguage],
      }));
      setCustomLanguage(''); // Clear input field
    }
  };

  const removeCustomLanguage = (language) => {
    setProject((prevState) => ({
      ...prevState,
      programmingLanguageList: prevState.programmingLanguageList.filter(lang => lang !== language),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update project
      projectService.updateProject(id, project)
        .then(() => navigate('/projects'))
        .catch(error => console.error('Error updating project:', error));
    } else {
      // Add new project
      projectService.createProject(project)
        .then(() => navigate('/projects'))
        .catch(error => console.error('Error creating project:', error));
    }
  };

  return (
    <div>
      <h1>{id ? t('Update Project') : t('Add Project')}</h1>
      <form onSubmit={handleSubmit}>
        <label>{t('Project Name')}:</label>
        <input
          type="text"
          name="projectName"
          value={project.projectName}
          onChange={handleChange}
          required
        />
        <br />
        <label>{t('Project Code')}:</label>
        <input
          type="text"
          name="projectCode"
          value={project.projectCode}
          onChange={handleChange}
          required
        />
        <br />
        <label>{t('Start Date')}:</label>
        <input
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
          required
        />
        <br />
        <label>{t('End Date')}:</label>
        <input
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
          required
        />
        <br />
        <label>{t('Status')}:</label>
        <select
          name="status"
          value={project.status}
          onChange={handleChange}
          required
        >
          <option value="NOT_STARTED">{t('Not Started')}</option>
          <option value="ONGOING">{t('Ongoing')}</option>
          <option value="CANCELLED">{t('Cancelled')}</option>
          <option value="CLOSED">{t('Closed')}</option>
        </select>
        <br />
        <label>{t('Programming Languages')}:</label>
        <div>
          {availableLanguages.map((language) => (
            <div key={language}>
              <input
                type="checkbox"
                checked={project.programmingLanguageList.includes(language)}
                onChange={() => handleLanguageChange(language)}
              />
              {language}
            </div>
          ))}
          <input
            type="text"
            value={customLanguage}
            onChange={handleCustomLanguageChange}
            placeholder={t('Add custom programming language')}
          />
          <button type="button" onClick={addCustomLanguage}>{t('Add')}</button>
        </div>
        <h4>{t('Selected Languages')}:</h4>
        <ul>
          {project.programmingLanguageList.map((language) => (
            <li key={language}>
              {language} 
              <button type="button" onClick={() => removeCustomLanguage(language)}>{t('Remove')}</button>
            </li>
          ))}
        </ul>
        <br />
        <button type="submit">{id ? t('Update') : t('Add')}</button>
      </form>
    </div>
  );
};

export default AddProjectPage;
