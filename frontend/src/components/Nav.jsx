import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { TbReceiptDollarFilled } from "react-icons/tb";

function Nav() {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/auth/signout`,
        { withCredentials: true },
        dispatch(setUserData(null)),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 z-9999 flex h-20 w-full items-center justify-center bg-[#fff9f6] px-3 sm:px-5">
      <div className="flex w-full max-w-5xl items-center justify-center gap-2 md:justify-between md:gap-8">
        {showSearch && userData.role == "user" && (
          <div className="h-14 flex fixed md:hidden top-20 left-[5%] w-[90%] items-center gap-4  rounded-lg bg-white shadow-xl ">
            <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400 ">
              <FaLocationDot size={25} className=" text-primary" />
              <div className="w-[80%] truncate text-gray-600">
                {city || "Detecting Location..."}
              </div>
            </div>
            <div className="w-[80%] flex items-center gap-2.5">
              <IoIosSearch size={25} className=" text-primary " />
              <input
                className="px-2.5 text-gray-700 outline-0 w-full"
                type="text"
                placeholder="search delicious food..."
              />
            </div>
          </div>
        )}
        <h1 className="shrink-0 text-3xl font-bold text-primary">Vingo</h1>
        {userData.role == "user" && (
          <div className="h-14 md:flex hidden w-full max-w-70 rounded-lg bg-white shadow-xl md:max-w-105 lg:max-w-120">
            <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400 ">
              <FaLocationDot size={25} className=" text-primary" />
              <div className="w-[80%] truncate text-gray-600">
                {city || "Detecting Location..."}
              </div>
            </div>
            <div className="w-[80%] flex items-center gap-2.5">
              <IoIosSearch size={25} className=" text-primary " />
              <input
                className="px-2.5 text-gray-700 outline-0 w-full"
                type="text"
                placeholder="search delicious food..."
              />
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center gap-3 sm:gap-5 md:ml-0">
          {userData.role == "user" &&
            (showSearch ? (
              <RxCross1
                size={25}
                className="cursor-pointer text-primary"
                onClick={() => {
                  setShowSearch((prev) => !prev);
                }}
              />
            ) : (
              <IoIosSearch
                size={25}
                className=" text-primary md:hidden cursor-pointer"
                onClick={() => {
                  setShowSearch((prev) => !prev);
                }}
              />
            ))}

          {userData.role == "owner" ? (
            <>
              <button className=" hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-primary/10 text-primary">
                <FaPlus size={20} />
                <span>Add food Item</span>
              </button>
              <button className=" md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-primary/10 text-primary">
                <FaPlus size={20} />
              </button>
              <div className="flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium">
                <TbReceiptDollarFilled size={20} />
                <span className="hidden md:flex">My orders</span>
                <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-primary rounded-full px-1.5 py-px  ">0</span>
              </div>
            </>
          ) : (
            <>
              <div className="relative cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 ">
                <FiShoppingCart size={25} className=" text-primary " />
                <span className="absolute -right-2.25 -top-3 text-primary ">
                  0
                </span>
              </div>

              <div>
                <button className="hidden md:block p-2  rounded-lg bg-primary/10 text-primary text-sm font-medium cursor-pointer">
                  My order
                </button>
              </div>
            </>
          )}

          <div
            onClick={() => {
              setShowInfo((prev) => !prev);
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          >
            {userData?.fullName.slice(0, 1)}
          </div>
          {showInfo && (
            <div className="fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-45 bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999">
              <div className="text-[17px] font-semibold ">
                {userData.fullName}
              </div>
              <div className="md:hidden text-primary font-semibold cursor-pointer">
                My orders
              </div>
              <div
                className="text-primary font-semibold cursor-pointer"
                onClick={handleLogOut}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
