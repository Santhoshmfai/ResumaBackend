import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/resume/dashboard", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Fix: Use backticks for template literals
                    },
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch dashboard data.");
                }
    
                const data = await response.json();
                setDashboardData(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchDashboardData();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            {dashboardData.length > 0 ? (
                dashboardData.map((item, index) => (
                    <div key={index}>
                        <h3>{item.jobRole}</h3>
                        <p>Correct Answers: {item.correctAnswers}</p>
                        <p>Resume Analysis Score: {item.resumeAnalysisScore}%</p>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
            <button onClick={() => navigate("/")}>Go Home</button>
        </div>
    );
};

export default Dashboard;