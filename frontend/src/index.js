import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import MockInterviewPage from "./pages/MockInterviewPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AccountInfo from "./pages/AccountInfo";
import BasicInfo from "./pages/BasicInfo";


        const App = () => {
            return (
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/homepage" element={<HomePage />} />
                        <Route path="/result" element={<ResultPage />} />
                        <Route path="/mock-interview" element={<MockInterviewPage />} />
                        <Route path="/dashboard"element={<Dashboard/>}/>
                        <Route path="/AccountInfo"element={<AccountInfo/>}/>
                        <Route path="/BasicInfo"element={<BasicInfo/>}/>
                    </Routes>
                </Router>
            );
        };
        
        const rootElement = document.getElementById("root");
        if (rootElement) {
            const root = ReactDOM.createRoot(rootElement);
            root.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            );
        } else {
            console.error("Root element not found");
        }