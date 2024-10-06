import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FresherService from "../service/FresherService";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function UpdateFresherPage(){
const {id}=useParams();
const navigate =useNavigate();
const { t } = useTranslation();
const [fresher,setFresher] =useState({
    name: "",
    email: "",
    programmingLanguage: "",
    firstProject: "",
    secondProject: "",
    thirdProject: ""

});

useEffect(()=>{
    const fetchFreshers =async()=>{
        try{
            const respone=await FresherService.getFresherById(id);
            setFresher(respone);
        }catch (error){
          

            console.error("Error fetching fresher: ",error);
        }
    };
    fetchFreshers();
},[id]);

const handleChange = (e)=>{
    const {name,value}=e.target;
    setFresher((prevFresher)=>({
        ...prevFresher,
        [name]:value
    }));
};

const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
        await FresherService.updateFresher(id,fresher);
        toast.success("Update thành công", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored", 
        });
        navigate("/freshers");
    } catch (error){
        console.error("Error updating fresher: ",error);
    }
};


return (
    <div>
      <h2>{t("Update Fresher")}</h2>
      <form onSubmit={handleSubmit} className="form-update">
        <div>
          <label>{t("Name")}:</label>
          <input
            type="text"
            name="name"
            value={fresher.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={fresher.email}
            onChange={handleChange}
            style={{ width: "160px" }}

          />
        </div>
        <div>
          <label>{t("Programming Language")}:</label>
          <input
            type="text"
            name="programmingLanguage"
            value={fresher.programmingLanguage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t("Project 1")}:</label>
          <input
            type="text"
            name="firstProject"
            value={fresher.firstProject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t("Project 2")}:</label>
          <input
            type="text"
            name="secondProject"
            value={fresher.secondProject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t("Project 3")}:</label>
          <input
            type="text"
            name="thirdProject"
            value={fresher.thirdProject}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="submit">{t("Update Fresher")}</button>
      </form>
    </div>
  );




}

export default UpdateFresherPage;