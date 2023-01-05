import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("authUser");
    navigate("/login");
  }, [navigate]);

  return <></>;
};
