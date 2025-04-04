import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
    signup,
    login,
    analyzeResume,
    mockInterview,
    jobSuggestions,
    evaluateAnswers,
    storeScore,
    protectedRoute,
    getDashboardData,
    getAccountInfo,
    updateAccountInfo,
    updateBasicInfo,
    getBasicInfo
} from "../controllers/resumeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ensure 'uploads' directory exists
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Routes
router.post("/signup", signup);  
router.post("/login", login);   
router.post("/analyze", upload.single("resume"), analyzeResume);
router.post("/mockinterview", verifyToken, mockInterview);
router.post("/job-suggestions", verifyToken, jobSuggestions);
router.post("/evaluate-answers", verifyToken, evaluateAnswers);
router.post("/store-score", verifyToken, storeScore);
router.get("/protected", verifyToken, protectedRoute);
router.get("/dashboard", verifyToken, getDashboardData);
router.get("/account-info",verifyToken,getAccountInfo);
router.put("/update-account-info",verifyToken, updateAccountInfo);
router.post("/basic-info",verifyToken, updateBasicInfo);
router.get("/basic-info",verifyToken, getBasicInfo);
export default router;