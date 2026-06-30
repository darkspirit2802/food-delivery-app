import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";

function Home() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-screen min-h-screen pt-25 flex  items-center bg-[#fff9f6] ">
      {userData.role == "user" && <UserDashboard />}
      {userData.role == "owner" && <UserDashboard />}
      {userData.role == "deliveryBoy" && <UserDashboard />}
    </div>
  );
}

export default Home;
