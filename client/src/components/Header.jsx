import { useState, useEffect, cloneElement } from "react";
import React from "react";
import { HomeIcon, LanguageIcon } from "@heroicons/react/24/outline";
import {
  Typography,
} from "@material-tailwind/react";
// import iconImage from '../../assets/icon.jpg';
import iconImage from '../assets/icon.jpg';
import { path, USER_ROLE } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getInfoUserById } from "../service/userService";
const Header = ({ role }) => {
  const [user, setUser] = useState([])
  const params = useParams();
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getInfoUser = async () => {
      if (role === "user") {
        const user_id = params.user_id;
        const data = await getInfoUserById(user_id)
        setUser(data.data)
      }
    }
    getInfoUser()
  }, []);
  // useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setOpenNav(false),
  //   );

  // }, []);
  const backAdminpage = () => {
    navigate(path.HOMEPAGEADMIN);
  }
  const backUserpage = (id) => {
    navigate("/user/" + id);
  }
  const handleNav = (event) => {
    if (event === "Book") {
      navigate("/user/" + user.id + "/findHospital")
    }
    else if (event === "History") {
      navigate("/user/" + user.id + "/history")
    }
  }

  if (role == 'main') {
    return (
      <nav class="bg-white  sticky top-0 z-50 shadow-md">
        <div class="mx-auto h-[70px]  px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
              </div>
              <div class="flex flex-rol items-center  px-3 py-2">
                <img src={iconImage} alt="Logo" className="w-[75px]" />
                <Typography variant="small" className=" font-bold text-blue-500 text-[20px] font-sans">
                  BOOKING CARE
                </Typography>
              </div>
            </div>
            <div class="mb-4 mr-[70px] mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-14">
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-[60px]">
                  <div class="text-[#636363] space-x-[50px] flex flex-rol rounded-md px-3 text-md font-semibold items-center">
                    <div>
                      Home
                    </div>
                    <div>
                      About Us
                    </div>
                    <div>
                      Service
                    </div>
                    <div>
                      Blog
                    </div>
                    <div>
                      Contact Us
                    </div>
                  </div>
                  <div class="">
                    <a
                      href="/login"
                      class="rounded-md bg-blue-700 px-5 py-2 text-md font-medium  text-white"
                      aria-current="page"
                    >
                      Log In
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  };
  if (role == 'user') {
    return (
      <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="mx-auto h-[70px]  px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
              </div>
              <div class="flex flex-rol items-center space-x-[40px] px-3 py-2 cursor-pointer " >
                <img src={iconImage} alt="Logo" className="w-[75px]" onClick={() => backUserpage(user.id)} />
                <Typography onClick={() => backUserpage(user.id)} variant="small" className=" font-bold text-blue-500 text-[20px] font-sans">
                  BOOKING CARE
                </Typography>
                <Typography onClick={() => handleNav("Book")} variant="small" className=" font-bold text-blue-500 text-[20px] hover:text-blue-700 font-sans cursor-pointer">
                  Book an appointment
                </Typography>
                <Typography onClick={() => handleNav("History")} variant="small" className=" font-bold text-blue-500 text-[20px] hover:text-blue-700 font-sans cursor-pointer">
                  History
                </Typography>
              </div>
            </div>
            <div class="mb-4 mr-[70px] mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-14">
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-[60px]">
                  <div class="flex items-center space-x-4">
                    <p className="font-bold text-blue-800 text-[20px]">{user.name}</p>
                    <a
                      href="/"
                      class="rounded-md bg-blue-500 px-4 py-2 text-md font-medium  text-white"
                      aria-current="page"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  };
  if (role == 'admin') {
    return (
      <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="mx-auto h-[70px]  px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
              </div>
              <div class="flex flex-rol items-center  px-3 py-2 cursor-pointer" onClick={() => backAdminpage()}>
                <img src={iconImage} alt="Logo" className="w-[75px]" />
                <Typography variant="small" className=" font-bold text-blue-500 text-[20px] font-sans">
                  BOOKING CARE
                </Typography>
              </div>
            </div>
            <div class="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-14">
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-[60px]">
                  <div class="flex items-center space-x-4">
                    <p className="font-bold text-blue-800 text-[20px]">Administrator</p>
                    <a
                      href="/"
                      class="rounded-md bg-blue-500 px-4 py-2 text-md font-medium  text-white"
                      aria-current="page"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  };
};
export default Header;