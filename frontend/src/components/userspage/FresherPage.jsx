import React, { useState, useEffect } from "react";
import FresherService from "../service/FresherService";

import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function FresherPage() {
  const [freshers, setFreshers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFreshers();
  }, [searchQuery, page, size]);

  const fetchFreshers = async () => {
    try {
      const response = await FresherService.getFreshers(
        searchQuery,
        page,
        size
      );
      setFreshers(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching freshers: ", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fresher?"
    );
    if (confirmDelete) {
      try {
        await FresherService.deleteFresher(id);
        fetchFreshers();
      } catch (error) {
        console.error("Error deleting fresher ", error);
      }
    }
  };

  return (
    <div>
      <h1>Frehser List</h1>
      <input
        type="text"
        placeholder="Enter keyword (name, email, programming)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      {UserService.isAdmin() && (
        <button onClick={() => navigate("/add-fresher")}>Add Fresher</button>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Programming Language</th>
            <th>Project 1</th>
            <th>Project 2</th>
            <th>Project 3</th>
            <th>Final</th>
            <th>Center</th> 
            <th>Projects</th> 
            {UserService.isAdmin() && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {freshers?.length === 0 ? (
            <tr>
              <td colSpan={UserService.isAdmin() ? 8 : 7}>
                No freshers found.
              </td>
            </tr>
          ) : (
            freshers?.map((fresher) => (
              <tr key={fresher.id}>
                <td>{fresher.name}</td>
                <td>{fresher.email}</td>
                <td>{fresher.programmingLanguage}</td>
                <td>{fresher.firstProject}</td>
                <td>{fresher.secondProject}</td>
                <td>{fresher.thirdProject}</td>
                <td>{fresher.finalScore}</td>
                <td>{fresher.center ? fresher.center.name : "No Center"}</td>
                <td>
                  {fresher.projects && fresher.projects.length > 0
                    ? fresher.projects.map((project) => project.name).join(", ")
                    : "No Projects"}
                </td>



                {UserService?.isAdmin() && (
                  <td>
                    <button onClick={() => handleDelete(fresher.id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/update-fresher/${fresher.id}`)}
                    >
                      Update
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <p>
        Page {page + 1} of {totalPages}
      </p>

      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page + 1 >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default FresherPage;
