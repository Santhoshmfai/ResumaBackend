import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const resumeData = location.state?.data; // Access the data passed from HomePage

    const [showPopup, setShowPopup] = useState(false);
    const [jobRole, setJobRole] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [jobSuggestions, setJobSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);

    useEffect(() => {
        if (showPopup) {
            fetchJobRoles();
        }
    }, [showPopup]);

    const fetchJobRoles = async () => {
        if (!resumeData) return;
        setLoadingSuggestions(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found in localStorage.");
                setLoadingSuggestions(false);
                return;
            }

            const response = await fetch("http://localhost:5000/api/resume/job-suggestions", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ resumeText: resumeData }),
            });

            if (!response.ok) {
                console.error("Failed to fetch job suggestions.");
                setLoadingSuggestions(false);
                return;
            }

            const data = await response.json();
            setJobSuggestions(data.suggestions || []);
        } catch (error) {
            console.error("Error fetching job suggestions:", error);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    const startMockInterview = () => {
        if (!jobRole || !difficulty) return alert("Please select a job role and difficulty level.");
        setShowPopup(false);
        navigate("/mock-interview", { state: { resumeText: resumeData, jobRole, difficulty } });
    };

    const renderAnalysisReport = () => {
        if (!resumeData || !resumeData.overallScore) {
            return (
                <div>
                    <h2>No resume data found. Please upload a resume first.</h2>
                    <button onClick={() => navigate("/")}>Go to Home</button>
                </div>
            );
        }
    
        return (
            <div className="report-container">
                <h1>Resume Analysis Report</h1>
                <h2>Overall Score: {resumeData.overallScore}%</h2>
    
                {[
                    { name: "Content", data: resumeData.content },
                    { name: "Format", data: resumeData.format },
                    { name: "Sections", data: resumeData.sections },
                    { name: "Skills", data: resumeData.skills },
                    { name: "Style", data: resumeData.style }
                ].map(({ name, data }, index) => (
                    <div key={index} className="category-card">
                        <h3>{name}</h3>
                        <p><strong>Score:</strong> {data?.score || 0}/20</p>
                        <p><strong>Issues:</strong> {data?.issues || "No data"}</p>
                        <p><strong>Suggestions:</strong> {data?.suggestions || "No data"}</p>
                    </div>
                ))}
            </div>
        );
    };

   return (
        <div>
            {renderAnalysisReport()}
            <button onClick={() => setShowPopup(true)}>Start Mock Interview</button>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h3>Select Interview Preferences</h3>
                        <label>Suggested Job Roles:</label>
                        {loadingSuggestions ? (
                            <p>Loading job suggestions...</p>
                        ) : (
                            jobSuggestions.length > 0 ? (
                                <div className="job-suggestions">
                                    {jobSuggestions.map((role, index) => (
                                        <button key={index} className="job-btn" onClick={() => setJobRole(role)}>
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p>No suggestions found.</p>
                            )
                        )}
                        <input 
                            type="text" 
                            placeholder="Or enter job role manually" 
                            value={jobRole} 
                            onChange={(e) => setJobRole(e.target.value)} 
                        />
                        <label>Select Difficulty:</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="">Select Difficulty</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="pro">Pro</option>
                        </select>
                        <div className="popup-buttons">
                            <button onClick={() => setShowPopup(false)}>Cancel</button>
                            <button onClick={startMockInterview}>Start Interview</button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                .popup-overlay {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .popup-box {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 350px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                }
                .job-suggestions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 10px;
                }
                .job-btn {
                    padding: 5px 10px;
                    border: 1px solid gray;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: #f0f0f0;
                }
                .popup-buttons {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                }
                .popup-buttons button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .popup-buttons button:first-child {
                    background: gray;
                    color: white;
                }
                .popup-buttons button:last-child {
                    background: green;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default ResultPage;