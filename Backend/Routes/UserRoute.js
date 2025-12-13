import express from "express"
import { loginController, registerController,forgotPasswordController,verifyOtpController,resetPasswordController, logoutController, updatePasswordController } from "../Controllers/UserController.js";
import { requireSignIn } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register',registerController);
router.post("/login",loginController);
router.post("/logout", logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-otp", verifyOtpController);
router.post("/reset-password", resetPasswordController);
router.post("/update-password", requireSignIn, updatePasswordController);


export default router;



