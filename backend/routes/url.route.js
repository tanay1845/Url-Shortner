import express from "express";
import { generateShortUrl, getUserUrls, getCurrentUser, getUserProfile, loginUser, logoutUser, routeToShortID, signupUser, editUser } from "../controllers/url.controller.js";
import { authMiddleware } from "../middleware/auth.midleware.js";


const router = express.Router();

router.post("/signup",signupUser)

router.post("/login",loginUser)

router.post("/url",authMiddleware,generateShortUrl)

router.get("/all",routeToShortID)

router.get("/current",authMiddleware,getCurrentUser)

router.get("/",authMiddleware,getUserUrls)

router.get("/logout",logoutUser)

router.put("/edituser",authMiddleware,editUser)


export default router