import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthDoctor = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;
          console.log("Decoded token:", decodedToken);
          console.log("Current time:", currentTime);
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
          } else {
            setRole(userData.role);
          }
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
  console.log("Role:", role);
  if (role === "DOCTOR") {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};
export default AuthDoctor;
