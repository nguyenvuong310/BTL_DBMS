import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../utils/constant";

const checkAndRefreshToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return false;
  }
  try {
    const response = await axios.post(
      `${backendURL}/api/auth/refresh`,
      {},
      { withCredentials: true },
    );
    const newAccessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
  } catch (error) {
    console.error("Refresh token failed", error);
    localStorage.removeItem("accessToken");
    return false;
  }
  return true;
};

export const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const isValid = await checkAndRefreshToken();
        if (!isValid) {
          navigate("/login");
        } else {
          setIsAuthenticated(true);
        }
      };

      checkAuth();
    }, [navigate]);

    if (!isAuthenticated) {
      return null; // or a loading spinner
    }

    return null;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthenticatedComponent;
};
