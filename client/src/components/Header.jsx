import { useState, useEffect } from "react";
import React from "react";
import { HomeIcon, HeartIcon, DocumentIcon } from "@heroicons/react/24/outline";

import {
  Typography,
  Button,
  Input,
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
// import iconImage from '../../assets/icon.jpg';
import iconImage from "../assets/icon.jpg";
import { path } from "../utils/constant";
import { useNavigate } from "react-router-dom";

import { FaHistory, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../service/userService";

const Header = ({ role, type }) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getInfoUser = async () => {
      console.log("role", role);
      if (role !== "main") {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
      }
    };
    getInfoUser();
  }, []);

  const backHomepage = () => {
    navigate(path.HOME);
  };
  const backUserpage = (id) => {
    navigate("/user/" + id);
  };

  const handleNavLogin = () => {
    navigate("/login");
  };

  const profileMenuItems = [
    {
      label: "Lịch sử đặt hẹn",
      icon: FaHistory,
    },
    {
      label: "Quản lý bảo hiểm y tế",
      icon: HeartIcon,
    },

    {
      label: "Đăng xuất",
      icon: FaSignOutAlt,
    },
  ];

  const profileMenuDoctorItems = [
    {
      label: "Tạo lịch hẹn",
      icon: FaHistory,
    },
    {
      label: "Lịch hẹn của tôi",
      icon: HeartIcon,
    },
    {
      label: "Đăng xuất",
      icon: FaSignOutAlt,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  if (role == "main") {
    return (
      <nav className="sticky  top-0 z-50 bg-white shadow-md">
        <div className="mx-auto h-[70px]  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="flex flex-row items-center">
                <img src={iconImage} alt="Logo" className="w-[75px]" />
                <Typography
                  variant="h1"
                  className="pt-2 font-sans text-[25px] font-bold text-blue-500"
                  onClick={backHomepage}
                >
                  BOOKING CARE
                </Typography>
              </div>
            </div>
            <div className="mb-4 mr-[70px] mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-14">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-[60px]">
                  {type !== "search" && (
                    <div className="flex-rol text-md flex items-center space-x-[50px] rounded-md px-3 font-semibold text-[#636363]">
                      {type !== "search" && (
                        <div
                          className="w-72 cursor-pointer"
                          onClick={() => navigate("/search")}
                        >
                          <Input
                            label="Tìm kiếm"
                            className="cursor-pointer"
                            icon={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                              </svg>
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <Button color="blue" onClick={handleNavLogin}>
                    Đăng nhập
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  if (role == "PATIENT") {
    return (
      <nav className="sticky  top-0 z-50 bg-white shadow-md">
        <div className="mx-auto h-[70px]  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="flex flex-row items-center">
                <img src={iconImage} alt="Logo" className="w-[75px]" />
                <Typography
                  variant="h1"
                  className="pt-2 font-sans text-[25px] font-bold text-blue-500"
                  onClick={() => backUserpage(user.id)}
                >
                  BOOKING CARE
                </Typography>
              </div>
            </div>
            <div className="mb-4 mr-[70px] mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-14">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-[60px]">
                  <div className="flex-rol text-md flex items-center space-x-[50px] rounded-md px-3 font-semibold text-[#636363]">
                    {type !== "search" && (
                      <div
                        className="w-72 cursor-pointer"
                        onClick={() => navigate("/search")}
                      >
                        <Input
                          label="Tìm kiếm"
                          className="cursor-pointer"
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <Typography
                      variant="h1"
                      className="font-sans text-base  font-bold text-black"
                    >
                      {user.name}
                    </Typography>
                    <Menu
                      open={isMenuOpen}
                      handler={setIsMenuOpen}
                      placement="bottom-end"
                    >
                      <MenuHandler>
                        <Button
                          variant="text"
                          color="blue-gray"
                          className="flex items-center rounded-full p-0"
                        >
                          <Avatar
                            variant="circular"
                            size="md"
                            alt="tania andrew"
                            withBorder={true}
                            color="blue-gray"
                            className=" p-0.5"
                            src="https://cdn-icons-png.flaticon.com/512/17002/17002124.png"
                          />
                        </Button>
                      </MenuHandler>
                      <MenuList className="p-1">
                        {profileMenuItems.map(({ label, icon }, key) => {
                          const isLastItem =
                            key === profileMenuItems.length - 1;
                          return (
                            <MenuItem
                              key={label}
                              onClick={closeMenu}
                              className={`flex items-center gap-2 rounded ${
                                isLastItem
                                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                  : ""
                              }`}
                              onClick={async () => {
                                if (label === "Đăng xuất") {
                                  navigate(path.HOME);
                                  await logout();
                                }
                                if (label === "Lịch sử đặt hẹn") {
                                  navigate(`/user/history`);
                                }
                                if (label === "Quản lý bảo hiểm y tế") {
                                  navigate(`/user/health-insurance`);
                                }
                              }}
                            >
                              {React.createElement(icon, {
                                className: `h-4 w-4 ${
                                  isLastItem ? "text-red-500" : ""
                                }`,
                                strokeWidth: 2,
                              })}
                              <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                              >
                                {label}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  if (role == "DOCTOR") {
    return (
      <nav className="sticky  top-0 z-50 bg-white shadow-md">
        <div className="mx-auto h-[70px]  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="flex flex-row items-center">
                <img src={iconImage} alt="Logo" className="w-[75px]" />
                <Typography
                  variant="h1"
                  className="pt-2 font-sans text-[25px] font-bold text-blue-500"
                  onClick={() => navigate("/doctors")}
                >
                  BOOKING CARE
                </Typography>
              </div>
            </div>
            <div className="mb-4 mr-[70px] mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-14">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-[60px]">
                  {/* <div className="flex-rol text-md flex items-center space-x-[50px] rounded-md px-3 font-semibold text-[#636363]">
                    <div className="w-72">
                      <Input
                        label="Tìm kiếm"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                          </svg>
                        }
                      />
                    </div>
                  </div> */}
                  <div className="flex flex-row items-center gap-4">
                    <Typography
                      variant="h1"
                      className="font-sans text-base  font-bold text-black"
                    >
                      {user.name}
                    </Typography>
                    <Menu
                      open={isMenuOpen}
                      handler={setIsMenuOpen}
                      placement="bottom-end"
                    >
                      <MenuHandler>
                        <Button
                          variant="text"
                          color="blue-gray"
                          className="flex items-center rounded-full p-0"
                        >
                          <Avatar
                            variant="circular"
                            size="md"
                            alt="tania andrew"
                            withBorder={true}
                            color="blue-gray"
                            className=" p-0.5"
                            src="https://cdn-icons-png.flaticon.com/512/17002/17002124.png"
                          />
                        </Button>
                      </MenuHandler>
                      <MenuList className="p-1">
                        {profileMenuDoctorItems.map(({ label, icon }, key) => {
                          const isLastItem =
                            key === profileMenuDoctorItems.length - 1;
                          return (
                            <MenuItem
                              key={label}
                              onClick={closeMenu}
                              className={`flex items-center gap-2 rounded ${
                                isLastItem
                                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                  : ""
                              }`}
                              onClick={async () => {
                                if (label === "Đăng xuất") {
                                  navigate(path.HOME);
                                  await logout();
                                }
                                if (label === "Tạo lịch hẹn") {
                                  navigate(`/doctors`);
                                }
                                if (label === "Lịch hẹn của tôi") {
                                  navigate(`/doctors/my-appointment`);
                                }
                              }}
                            >
                              {React.createElement(icon, {
                                className: `h-4 w-4 ${
                                  isLastItem ? "text-red-500" : ""
                                }`,
                                strokeWidth: 2,
                              })}
                              <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                              >
                                {label}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};
export default Header;
