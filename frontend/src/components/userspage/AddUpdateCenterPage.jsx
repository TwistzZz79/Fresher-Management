import React, {useState, useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import CenterService from '../service/CenterService'

function AddUpdateCenterPage(){
    const [center,setCenter]= useState({
       name:'',
       location:'' 
    });
    const {id} =useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        if(id){
            fetchCenterById(id);
        }
    },[id]);
    const fetchCenterById = async (id) =>{
        try{
            const response= await CenterService.getCenterById(id);
            setCenter(response);
        }catch(error){
            console.error("Error fetching center",error);
        }
    };

    const handleChange = (e) => {
        const {name,value}=e.target;
        setCenter((prevCenter)=>({
            ...prevCenter,
            [name]:value
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(id){
                await CenterService.updateCenter(id,center);
            }else{
                await CenterService.addCenter(center);
            }
            navigate("/centers");
        }catch(error){
            console.error("Error saving center: ", error);
        }
    };

    return (
        <div>
          <h1>{id ? "Update Center" : "Add Center"}</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={center.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={center.location} onChange={handleChange} required />
            </div>
            <button type="submit">{id ? "Update" : "Add"} Center</button>
          </form>
        </div>
      );
    }
    
export default AddUpdateCenterPage;