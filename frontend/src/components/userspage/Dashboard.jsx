import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Ensure you have the CSS file imported

const Dashboard = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/dashboard";
    const [centerStats, setCenterStats] = useState([]);
    const [scoreStats, setScoreStats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCenterStats();
        fetchScoreStats();
    }, []);

    const fetchCenterStats = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/center-statistics`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCenterStats(response.data);
        } catch (error) {
            console.error("Error fetching center stats", error);
            setError("Error fetching center stats");
        }
    };

    const fetchScoreStats = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/score-statistics`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setScoreStats(response.data);
        } catch (error) {
            console.error("Error fetching score stats", error);
            setError("Error fetching score stats");
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            {error && <div className="error">{error}</div>}

            <section className="statistics-section">
                <h2>Center Statistics</h2>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Center</th>
                            <th>Freshers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centerStats.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat[0]}</td>
                                <td>{stat[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="statistics-section">
                <h2>Score Statistics</h2>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Fresher Grade</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreStats.map((stat, index) => (
                            <tr key={index}>
                                <td>
                                    {stat[0]} 
                                    <span className="grade-description">
                                        {stat[0] === 'Excellent' && ' (score > 8)'}
                                        {stat[0] === 'Good' && ' (score > 6)'}
                                        {stat[0] === 'Needs improvement' && ' (score < 6)'}
                                    </span>
                                </td>
                                <td>{stat[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Dashboard;
