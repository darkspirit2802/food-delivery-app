import User from "../models/user.model.js";
import { sendOtpMail } from "../utils/mail.js";
import genToken from "../utils/token.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    //find if user already exist
    if (user) {
      return res.status(400).json({
        message: "User already exist. ",
      });
    }
    //check pass length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be atleast 6 characters. ",
      });
    }

    //check mobile length
    if (mobile.length < 10) {
      return res.status(400).json({
        message: "Mobile number must be atleast 10 number. ",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(`signup error ${err}`);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    //find if user already exist
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist. ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(`signin error ${err}`);
  }
};

export const signOut = async (req,res) => {
  try {
    res.clearCookie("token");
  } catch (error) {
    res.status(500).json(`sign out error ${error}`);
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail({ to: email, otp });
    return res.status(200).json({
      message: "Otp sent successfully",
    });
  } catch (error) {
    return res.status(500).json(`send otp error ${error}`);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "Invalid or Expired OTP",
      });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "OTP verify successfully",
    });
  } catch (error) {
    return res.status(500).json(`otp not verified error ${error}`);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({
        message: "otp verification required",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();

    res.status(200).json({
      message: "password reset successfuly",
    });
  } catch (error) {
    res.status(400).json(`reset password error ${error}`);
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
      });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(`Google Auth error ${error}`);
  }
};
