import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FresherService from "../service/FresherService";

function AddFresherPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [firstProject, setFirstProject] = useState("");
  const [secondProject, setSecondProject] = useState("");
  const [thirdProject, setThirdProject] = useState("");
  const [finalScore, setFinalScore] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFresher = {
      name,
      email,
      programmingLanguage,
      firstProject,
      secondProject,
      thirdProject,
      finalScore,
    };

    try {
      await FresherService.addFresher(newFresher);
      navigate("/freshers"); // Navigate back to the fresher list page
    } catch (error) {
      console.error("Error adding fresher: ", error);
    }
  };

  return (
    <div>
      <h1>Add Fresher</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "160px" }}

          />
        </div>
        <div>
          <label>Programming Language:</label>
          <input
            type="text"
            value={programmingLanguage}
            onChange={(e) => setProgrammingLanguage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project 1:</label>
          <input
            type="text"
            value={firstProject}
            onChange={(e) => setFirstProject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project 2:</label>
          <input
            type="text"
            value={secondProject}
            onChange={(e) => setSecondProject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project 3:</label>
          <input
            type="text"
            value={thirdProject}
            onChange={(e) => setThirdProject(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Fresher</button>
      </form>
    </div>
  );
}

export default AddFresherPage;