// import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
// import UserModel from "../Models/UserModel.js";
// import JWT from "jsonwebtoken";
// const registerController = async(req,res)=>{

// try {
//     const{ name , email ,password , phone , address ,role ,answer} = req.body;
//     if(!name || !email || !password || !phone || !address || !answer){
//      return res.send({message:"some fields are missing"});
//     }
//     const existingUser = await UserModel.findOne({email})
//     if(existingUser){
//        return res.status(200).send({
//         success:false,
//         message:"User already exist please login."
//     })
//     }

//     const hashedPassword = await hashPassword(password);

//     const user = await new UserModel({
//         name,
//         email,
//         password:hashedPassword,
//         phone,
//         address,
//         role,
//         answer
//     }).save()

//     return res.status(201).send({
//         success:true,
//         message:"User registered successfully",
//         user
//     })
// } catch (error) {
//     return res.status(500).send({
//         success:false,
//         message:"error in registration",
//         error
//     })
// }
// }

// export {registerController}


import { findUserByEmail ,createUser, updateUserPassword, createOtp, findOtpByEmailAndCode, deleteOtp, findUserById} from "../queries/userQueries.js";
import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
const registerController = async (req, res) => {
  const { email, name, password  } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser.success && existingUser.data) {
    return res.status(200).json({
      success: false,
      message: "User already exists",
    });
  }
const hashedPassword = await hashPassword(password);
  const newUser = await createUser({ name, email, password:hashedPassword  });
  if (!newUser.success) {
    return res.status(500).json({
      success: false,
      message: newUser.message,
    });
  }

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser.data,
  });
};




const loginController = async (req, res) => {
  try {
    console.log("🔐 Login attempt received");
    const { email, password } = req.body;
    console.log("📧 Email:", email ? "provided" : "missing");
    console.log("🔑 Password:", password ? "provided" : "missing");

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 🔍 Use query to find user
    console.log("🔍 Searching for user with email:", email);
    const userResponse = await findUserByEmail(email);
    console.log("📊 User search response:", userResponse.success ? "User found" : "User not found");
    
    if (!userResponse.success || !userResponse.data) {
      console.log("❌ User not found");
      return res.status(404).json({
        success: false,
        message: "User not found, please register first",
      });
    }

    const user = userResponse.data;

    // 🔑 Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 🪙 Generate JWT
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }
    
    const token = JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login successful for user:", user.email);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        userId: user._id,
      },
      token,
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    console.error("Error stack:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Login error",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
console.log("Email received for forgot password:", email);
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const userResponse = await findUserByEmail(email);
    if (!userResponse.success || !userResponse.data) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    const otpCreationResponse = await createOtp(email, otp, otpExpires);
    if (!otpCreationResponse.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to create OTP",
        error: otpCreationResponse.message,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Please use the following One-Time Password (OTP) to proceed:</p>
          <p style="font-size: 24px; font-weight: bold; color: #0056b3;">${otp}</p>
          <p>This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
          <p>Thank you,</p>
          <p>Your Application Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Forgot password error",
      error: error.message,
    });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpVerificationResponse = await findOtpByEmailAndCode(email, otp);
    if (!otpVerificationResponse.success || !otpVerificationResponse.data) {
      return res.status(400).json({
        success: false,
        message: otpVerificationResponse.message,
      });
    }

    // OTP is valid, but we don't delete it yet to allow for a small window to reset password
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Verify OTP error",
      error: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    const otpVerificationResponse = await findOtpByEmailAndCode(email, otp);
    if (!otpVerificationResponse.success || !otpVerificationResponse.data) {
      return res.status(400).json({
        success: false,
        message: otpVerificationResponse.message,
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    const updatePasswordResponse = await updateUserPassword(email, hashedPassword);

    if (!updatePasswordResponse.success) {
      return res.status(500).json({
        success: false,
        message: updatePasswordResponse.message,
      });
    }

    // Delete the OTP after successful password reset
    await deleteOtp(email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Reset password error",
      error: error.message,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    // Since JWT tokens are stateless, we don't need to invalidate them on the server
    // The token will naturally expire after its expiration time
    // However, we can log the logout for analytics/audit purposes
    
    // If you want to implement token blacklisting, you would need a token blacklist store (Redis, DB, etc.)
    // For now, we'll just return success as the client will discard the token
    
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Logout error",
      error: error.message,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    // Find user by ID
    const userResponse = await findUserById(userId);
    if (!userResponse.success || !userResponse.data) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userResponse.data;

    // Verify current password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    const updateResponse = await updateUserPassword(user.email, hashedPassword);
    if (!updateResponse.success) {
      return res.status(500).json({
        success: false,
        message: updateResponse.message || "Failed to update password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).json({
      success: false,
      message: "Update password error",
      error: error.message,
    });
  }
};

export {registerController,loginController, forgotPasswordController, verifyOtpController, resetPasswordController, logoutController, updatePasswordController}