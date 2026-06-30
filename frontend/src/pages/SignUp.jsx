import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64343";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true },
      );
      console.log(result);
      dispatch(setUserData(result.data));

      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile) {
      return setErr("mobile number is required");
    }
    try {
      const provider = new GoogleAuthProvider();
      const googleResult = await signInWithPopup(auth, provider);
      const result = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: googleResult.user.displayName,
          email: googleResult.user.email,
          role,
          mobile,
        },
        { withCredentials: true },
      );
      console.log(result);
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border `}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2    `}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className="text-gray-300 mb-8  mr-3">
          {" "}
          Create your account to get started with delicious food deliveries
        </p>
        {/* fullName */}

        <div className=" mt-3 ">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1 "
          >
            {" "}
            Full Name
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
            placeholder="Enter your Full Name"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            required
          />
        </div>
        {/* Email */}

        <div className=" mt-3">
          <label
            htmlFor="Email"
            className="block text-gray-700 font-medium mb-1 "
          >
            {" "}
            Email
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
            placeholder="Enter your Email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            type="text"
          />
        </div>
        {/* Mobile Number */}

        <div className=" mt-3">
          <label
            htmlFor="Mobile"
            className="block text-gray-700 font-medium mb-1 "
          >
            {" "}
            Mobile No.
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
            placeholder="Enter your phone number"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            type="text"
            required
          />
        </div>
        {/* Password */}

        <div className=" mt-3 mb-4">
          <label
            htmlFor="Password"
            className="block text-gray-700 font-medium mb-1 "
          >
            {" "}
            Password
          </label>
          <div className="relative">
            <input
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
              className="absolute right-3 cursor-pointer top-2.5 text-gray-500 "
            >
              {!showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        {/* Role */}

        <div className=" mt-3 mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1 "
          >
            {" "}
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-color cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 mb-4 bg-primary text-white hover:bg-[#e64323] cursor-pointer`}
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
        </button>

        <p className="text-red-500 text-center my-2.5">{err}</p>
        <span className="items-center justify-center flex">OR</span>
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-200 cursor-pointer"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>
        <p
          className="text-center cursor-pointer mt-2"
          onClick={() => navigate("/signin")}
        >
          Already have an account
          <span className="text-primary">Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
