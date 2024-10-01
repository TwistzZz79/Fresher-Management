import React, { useState, useEffect } from "react";
import ProjectService from "../service/ProjectService";
import FresherService from "../service/FresherService";
import { useNavigate, useParams } from "react-router-dom";

function ProjectDetailPage() {
    const { id: projectId } = useParams(); // Destructure to get the projectId
    // console.log(projectId);
  const [project, setProject] = useState({});
  const [freshersInProject, setFreshersInProject] = useState([]);
  const [allFreshers, setAllFreshers] = useState([]);
  const [selectedFresher, setSelectedFresher] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectDetails();
    fetchAllFreshersInProject();
    fetchAllFreshers();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const response = await ProjectService.getProjectById(projectId);
      console.log("Project Details:", response); // Log project details

      setProject(response);
    } catch (error) {
      console.error("Error fetching project details: ", error);
    }
  };

  const fetchAllFreshersInProject = async () => {
    try {
      const response = await ProjectService.getFreshersByProject(projectId);
      console.log("Freshers in Project:", response); // Log freshers in project

      setFreshersInProject(response);
    } catch (error) {
      console.error("Error fetching freshers in project: ", error);
    }
  };

  const fetchAllFreshers = async () => {
    try {
      const response = await FresherService.getAllFreshers();
      console.log("All Freshers:", response); // Log all freshers

      setAllFreshers(response);
    } catch (error) {
      console.error("Error fetching freshers: ", error);
    }
  };

  const handleAddFresher = async () => {
    if (!selectedFresher) {
        console.error("No fresher selected");
        return;
    }

    try {
        await ProjectService.addFresherToProject(projectId, selectedFresher);

        // Ensure selectedFresher is a number if f.id is a number
        const fresherToAdd = allFreshers.find(f => f.id === parseInt(selectedFresher, 10));

        if (fresherToAdd) {
            setFreshersInProject(prev => [...prev, fresherToAdd]);
            setAllFreshers(prev => prev.filter(f => f.id !== parseInt(selectedFresher, 10)));
            setSelectedFresher(""); // Reset the selected fresher
        } else {
            console.error("Selected fresher not found in allFreshers list");
        }
    } catch (error) {
        console.error("Error adding fresher to project: ", error);
    }
};

  const handleRemoveFresher = async (fresher) => {
    if (!fresher || !fresher.id) {
      console.error("Invalid fresher object");
      return;
  }

  try {
      await ProjectService.removeFresherFromProject(projectId, fresher.id);
      setFreshersInProject((prev) =>
          prev.filter((item) => item.id !== fresher.id)
      );
      setAllFreshers((prev) => [...prev, fresher]);
  } catch (error) {
      console.error("Error removing fresher from project: ", error);
  }
};


  return (
    <div>
      <h1>{project?.name} - Project Management</h1>
      <h2>Freshers in this Project:</h2>

      <ul>
        {freshersInProject?.map((item, index) => (
          <li key={index}>
            {item?.name} ({item?.email})
            <button onClick={() => handleRemoveFresher(item)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Add a Fresher to the Project</h3>
      <select
        value={selectedFresher}
        onChange={(e) => setSelectedFresher(e.target.value)}
      >
        <option value="">Select Fresher</option>
        {allFreshers?.map((item) => (
          <option key={item?.id} value={item?.id}>
            {item?.name} - {item?.email}
          </option>
        ))}
      </select>
      <button onClick={handleAddFresher}>Add Fresher</button>

      <button onClick={() => navigate("/projects")}>Back to Projects</button>
    </div>
  );
}

export default ProjectDetailPage;
