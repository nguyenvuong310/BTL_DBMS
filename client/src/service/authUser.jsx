import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../service/userService";
const AuthUser = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          setRole(userData.role);
        }
      } catch (error) {
        console.error("Error fetching user role", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return null;
  }
  if (role === "PATIENT") {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};
export default AuthUser;
