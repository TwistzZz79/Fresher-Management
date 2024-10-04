import React, { useEffect, useState } from 'react';
import ProjectService from './services/ProjectService';

const ProjectHistoryPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectHistory = async () => {
      try {
        const response = await ProjectService.getMyProjects();
        setProjects(response);
      } catch (error) {
        console.error('Error fetching project history: ', error);
      }
    };

    fetchProjectHistory();
  }, []);

  return (
    <div>
      <h2>Your Project History</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              {project.projectCode} - {project.name} ({project.startDate} to {project.endDate})
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
};

export default ProjectHistoryPage;
