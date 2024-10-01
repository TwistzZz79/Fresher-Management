import axios from 'axios';

const API_BASE_URL="http://localhost:8080/api/projects";

const projectService = {
    getAllProjects: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching all projects", error);
        throw error;
      }
    },
  
    getProjectById: async (id) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching project with id ${id}`, error);
        throw error;
      }
    },
  
    createProject: async (projectData) => {
      try {
        const response = await axios.post(`${API_BASE_URL}`, projectData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error creating project", error);
        throw error;
      }
    },
  
    updateProject: async (id, projectData) => {
      try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, projectData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error updating project with id ${id}`, error);
        throw error;
      }
    },
  
    deleteProject: async (id) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error deleting project with id ${id}`, error);
        throw error;
      }
    },
  
    getAvailableProgrammingLanguages: async () => {
      try {
        const response = await axios.get('http://localhost:8080/programming-languages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching programming languages", error);
        throw error;
      }
    },
  
    getFreshersByProject: async (projectId) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${projectId}/freshers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching freshers for project with id ${projectId}`, error);
        throw error;
      }
    },
  
    addFresherToProject: async (projectId, fresherId) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/${projectId}/add-fresher/${fresherId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error adding fresher with id ${fresherId} to project with id ${projectId}`, error);
        throw error;
      }
    },
  
    removeFresherFromProject: async (projectId, fresherId) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/${projectId}/remove-fresher/${fresherId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error removing fresher with id ${fresherId} from project with id ${projectId}`, error);
        throw error;
      }
    },
  };
  

export default projectService;