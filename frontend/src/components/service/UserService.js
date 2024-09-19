import axios from "axios"

class UserService{
    static BASE_URL="http://localhost:8080"

    static async login(email,password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async register(UserData,token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`,UserData,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            )
            return response.data;
        }catch(err){
            throw err
        }
    }
    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId,token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`,
               {
                    headers:{Authorization:`Bearer ${token}`}
               } 
            )
            return response.data;
        }catch(err){
            throw err;
        }
        
    }
    static async deleteUser(userId,userData,token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/update/${userId}`,userData,{
                headers:{Authorization:`Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId,userData,token){
        try{
            const respone=await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`,userData,{
                headers:{Authorization:`Bearer ${token}`}
            })
            return respone.data;
        }catch(err){
            throw err;
        }
    }

    static logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static isAuthenticated(){
        const token=localStorage.getItem('token');
        return !!token
 
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role==="ADMIN"
    }

    static isUser(){
        const role=localStorage.getItem('role')
        return role==="USER"
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }



}
export default UserService;
