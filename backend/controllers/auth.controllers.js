import User from "../models/user.model.js";
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
    if (mobile.length < 6) {
      return res.status(400).json({
        message: "Mobile must be atleast 6 number. ",
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

    return res.status(200).json({
      message: "User created Successfully",
    });
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

export const signOut = async () => {
  try {
    res.clearCookie("token");
  } catch (error) {
    res.status(500).json(`sign out error ${err}`);
  }
};
