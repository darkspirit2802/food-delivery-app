import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [err,setErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      setErr("")
      setStep(2);
    } catch (error) {
      setErr(error.response.data.message)
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      setErr("")
      setStep(3);
    } catch (error) {
      setErr(error.response.data.message)
    }
  };
  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newPassword,
        },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      setErr("");
      setStep(3);
      navigate("/signin");
    } catch (error) {
      setErr(error.response.data.message)
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer "
            onClick={() => {
              navigate("/signin");
            }}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d] ">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className=" mb-6">
              <label
                htmlFor="Email"
                className="block text-gray-700 font-medium mb-1 "
              >
                {" "}
                Email
              </label>
              <input
                className="w-full border border-gray-200  rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                required
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 mb-4 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={() => {
                // console.log("error");
                handleSendOtp();
              }}
            >
              Send OTP
            </button>
            <p className="text-red-500 text-center my-2.5">{err}</p>
          </div>
        )}

        {step == 2 && (
          <div>
            <div className=" mb-6">
              <label
                htmlFor="Email"
                className="block text-gray-700 font-medium mb-1 "
              >
                OTP
              </label>
              <input
                className="w-full border border-gray-200  rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="text"
                required
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 mb-4 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
            <p className="text-red-500 text-center my-2.5">{err}</p>
          </div>
        )}
        {step == 3 && (
          <div>
            <div className=" mb-6">
              <label
                htmlFor="New Password"
                className="block text-gray-700 font-medium mb-1 "
              >
                New Password
              </label>
              <input
                className="w-full border border-gray-200  rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="text"
                required
              />
            </div>
            <div className=" mb-6">
              <label
                htmlFor="Confirm Password"
                className="block text-gray-700 font-medium mb-1 "
              >
                Confirm Password
              </label>
              <input
                className="w-full border border-gray-200  rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="text"
                required
              />
            </div>

            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 mb-4 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
            <p className="text-red-500 text-center my-2.5">{err}</p>
          </div>
        )}
      </div>
    </div>
  );
};
