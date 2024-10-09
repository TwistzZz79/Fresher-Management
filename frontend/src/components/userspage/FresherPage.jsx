import React, { useState, useEffect } from "react";
import FresherService from "../service/FresherService";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useTranslation } from "react-i18next";

function FresherPage() {
  const { t } = useTranslation();
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
    const confirmDelete = window.confirm(t("confirmDelete")); // Use translation for confirmation message
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
      <h2>{t("fresherList")}</h2>
      <input
        className="inputFresher"
        type="text"
        placeholder={t("searchPlaceholder")} // Use translation for placeholder
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {UserService.isAdmin() && (
        <button className="btn btn addFresher" onClick={() => navigate("/add-fresher")}>
          {t("addFresher")}
        </button> // Use translation for button text
      )}
      <table>
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("email")}</th>
            <th>{t("programmingLanguage")}</th>
            <th>{t("project1")}</th>
            <th>{t("project2")}</th>
            <th>{t("project3")}</th>
            <th>{t("final")}</th>
            <th>{t("center")}</th>
            <th>{t("projects")}</th>
            {UserService.isAdmin() && <th>{t("actions")}</th>}{" "}
            {/* Use translation for actions header */}
          </tr>
        </thead>
        <tbody>
          {freshers?.length === 0 ? (
            <tr>
              <td colSpan={UserService.isAdmin() ? 8 : 7}>
                {t("noFreshersFound")}{" "}
                {/* Use translation for no freshers found message */}
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
                <td>
                  {fresher.center ? fresher.center.name : t("noCenter")}
                </td>{" "}
                {/* Use translation for no center */}
                <td>
                  {fresher.projects && fresher.projects.length > 0
                    ? fresher.projects.map((project) => project.name).join(", ")
                    : t("noProjects")}{" "}
                  {/* Use translation for no projects */}
                </td>
                {UserService?.isAdmin() && (
                  <td>
                    <button
                    className="btn delete-button"
                    onClick={() => handleDelete(fresher.id)}
                    >
                      {t("delete")}{" "}
                      {/* Use translation for delete button text */}
                    </button>
                    <button
                    className="btn update-button"
                    onClick={() => navigate(`/update-fresher/${fresher.id}`)}
                    >
                      {t("update")}{" "}
                      {/* Use translation for update button text */}
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <p>
        {t("page")} {page + 1} {t("of")} {totalPages}{" "}
        {/* Use translation for pagination */}
      </p>
      <div className="parent-btn-table">
        <button
          className="btn"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          {t("previous")} {/* Use translation for previous button text */}
        </button>
        <button
          className="btn"
          onClick={() => setPage(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          {t("next")} {/* Use translation for next button text */}
        </button>
      </div>
    </div>
  );
}

export default FresherPage;
