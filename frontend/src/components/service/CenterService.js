import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080/centers";

const CenterService = {
  getCenters: async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching centers: ", error);
      throw error;
    }
  },
  getCenterById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching center: ", error);
      throw error;
    }
  },
  addCenter: async (center) => {
    try {
      const response = await axios.post(API_BASE_URL, center, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding center ", error);
      throw error;
    }
  },

  updateCenter: async (id, center) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, center, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating center", error);
      throw error;
    }
  },
  deleteCenter: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Error deleting center: ", error);
      throw error;
    }
  },

  addFresherToCenter: async (centerId, fresherId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${centerId}/add-fresher/${fresherId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding fresher to center: ", error);
      throw error;
    }
  },
  getFreshersByCenter: async (centerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${centerId}/freshers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching freshers for center: ", error);
      throw error;
    }
  },


  removeFresherFromCenter: async (centerId, fresherId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/${centerId}/remove-fresher/${fresherId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error removing fresher from center: ", error);
      throw error;
    }
  },
};

export default CenterService;