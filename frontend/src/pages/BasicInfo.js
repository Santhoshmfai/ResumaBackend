import React, { useState, useEffect } from "react";
import axios from "axios";

const BasicInfo = () => {
    const [user, setUser] = useState({
        username: "",
        gender: "",
        location: "",
        birthday: "",
        summary: "",
        githubLink: "",
        linkedinLink: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchBasicInfo();
    }, []);

    const fetchBasicInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/resume/basic-info", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.user);
        } catch (error) {
            console.error("Error fetching basic info:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:5000/api/resume/basic-info", user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage("Basic info updated successfully!");
        } catch (error) {
            console.error("Error updating basic info:", error);
            setMessage("Failed to update basic info.");
        }
    };

    return (
        <div>
            <h1>Basic Information</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={user.username} readOnly />
                </div>
                <div>
                    <label>Gender:</label>
                    <input type="text" name="gender" value={user.gender} onChange={handleChange} />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" name="location" value={user.location} onChange={handleChange} />
                </div>
                <div>
                    <label>Birthday:</label>
                    <input type="date" name="birthday" value={user.birthday} onChange={handleChange} />
                </div>
                <div>
                    <label>Summary:</label>
                    <textarea name="summary" value={user.summary} onChange={handleChange} />
                </div>
                <div>
                    <label>GitHub link:</label>
                    <input type="url" name="githubLink" value={user.githubLink} onChange={handleChange} />
                </div>
                <div>
                    <label>LinkedIn Link:</label>
                    <input type="url" name="linkedinLink" value={user.linkedinLink} onChange={handleChange} />
                </div>
                <button type="submit">Save</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BasicInfo;