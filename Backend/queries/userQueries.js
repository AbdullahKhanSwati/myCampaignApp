import UserModel from "../Models/UserModel.js";

// ✅ Find user by email
export const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        data: null,
        message: "User not found",
      };
    }
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
};

// ✅ Find user by ID
export const findUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return {
        success: false,
        data: null,
        message: "User not found",
      };
    }
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error in findUserById:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
};

// ✅ Create new user
export const createUser = async (userData) => {
  try {
    const user = new UserModel(userData);
    const savedUser = await user.save();
    return {
      success: true,
      data: savedUser,
    };
  } catch (error) {
    console.error("Error in createUser:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
};

export const updateUserPassword = async (email, hashedPassword) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return { success: false, message: "User not found." };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error("Error in updateUserPassword:", error);
    return { success: false, message: error.message };
  }
};

export const createOtp = async (email, otp, expiresAt) => {
  try {
    // Assuming you have an OtpModel, create it if not.
    // For now, let's just update the user model with OTP and expiry.
    // In a real application, you might want a separate OTP model.
    const user = await UserModel.findOneAndUpdate(
      { email },
      { otp, otpExpires: expiresAt },
      { new: true }
    );
    if (!user) {
      return { success: false, message: "User not found." };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error("Error in createOtp:", error);
    return { success: false, message: error.message };
  }
};

export const findOtpByEmailAndCode = async (email, otp) => {
  try {
    const user = await UserModel.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });
    if (!user) {
      return { success: false, message: "Invalid or expired OTP." };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error("Error in findOtpByEmailAndCode:", error);
    return { success: false, message: error.message };
  }
};

export const deleteOtp = async (email) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { $unset: { otp: 1, otpExpires: 1 } },
      { new: true }
    );
    if (!user) {
      return { success: false, message: "User not found." };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error("Error in deleteOtp:", error);
    return { success: false, message: error.message };
  }
};