import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/freshers'; // Adjust according to your backend URL

const FresherService = {
    getFreshers: async (search = '', page = 1, size = 25) => {
        try {
            console.log(localStorage.getItem('token'));
            const response = await axios.get(API_BASE_URL, {
                params: {
                    search,
                    page,
                    size,
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token for authentication
                }
            });
            return response.data; // This will be the paginated list of Freshers
        } catch (error) {
            console.error('Error fetching freshers:', error);
            throw error; // Rethrow the error for further handling
        }
    },
    
    getFresherById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data; 
        } catch (error) {
            console.error('Error fetching fresher by ID:', error);
            throw error; 
        }
    },

    deleteFresher: async (id)=>{
        try{
            await axios.delete(`${API_BASE_URL}/${id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }catch (error){
            console.error("Error deleting fresher: ", error);
        }
    },
    addFresher: async (fresher)=>{
        try {
            const response=await axios.post(API_BASE_URL,fresher,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        }catch (error){
            console.error("Error adding fresher: ",error);
        }
    },
    updateFresher: async(id,fresher)=>{
        try{
            const response = await axios.put(`${API_BASE_URL}/${id}`, fresher,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        }catch(error){
            console.error("error updating fresher",error);
            
        }
    },
    getAllFreshers: async () => {
        try {
            console.log(localStorage.getItem('token'));
            const response = await axios.get(`${API_BASE_URL}/all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token for authentication
                }
            });
            return response.data; // This should return the list of all freshers
        } catch (error) {
            console.error('Error fetching all freshers:', error);
            throw error; // Rethrow the error for further handling
        }
    }


};

export default FresherService;
