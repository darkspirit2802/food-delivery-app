import express from "express";
import {
  googleAuth,
  resetPassword,
  sendOtp,
  signIn,
  signOut,
  signUp,
  verifyOtp,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/google-auth", googleAuth);
authRouter.get("/signout", signOut);

export default authRouter;
