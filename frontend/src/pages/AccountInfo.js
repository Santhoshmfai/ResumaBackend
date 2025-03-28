import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountInfo = () => {
    const [user, setUser] = useState({ username: "", email: "", phoneNumber: "" });
    const [editMode, setEditMode] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchAccountInfo();
    }, []);

    const fetchAccountInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/resume/account-info", {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Ensure all fields have default values (empty strings if null/undefined)
            setUser({
                username: response.data.user.username || "",
                email: response.data.user.email || "",
                phoneNumber: response.data.user.phoneNumber || "",
            });
        } catch (error) {
            console.error("Error fetching account info:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                "http://localhost:5000/api/resume/update-account-info",
                { ...user, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("Account updated successfully!");
            setEditMode(false);
            setNewPassword("");
        } catch (error) {
            console.error("Error updating account info:", error);
            setMessage("Failed to update account.");
        }
    };

    return (
        <div className="account-info">
            <h1>Account Information</h1>
            {message && <p className="message">{message}</p>}
            <div>
                <label>Username:</label>
                {editMode ? (
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                ) : (
                    <span>{user.username}</span>
                )}
            </div>
            <div>
                <label>Email:</label>
                {editMode ? (
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                ) : (
                    <span>{user.email}</span>
                )}
            </div>
            <div>
                <label>Phone Number:</label>
                {editMode ? (
                    <input
                        type="text"
                        value={user.phoneNumber}
                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                    />
                ) : (
                    <span>{user.phoneNumber || "Not provided"}</span>
                )}
            </div>
            {editMode && (
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
            )}
            <div>
                {editMode ? (
                    <button onClick={handleUpdate}>Save Changes</button>
                ) : (
                    <button onClick={() => setEditMode(true)}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default AccountInfo;




