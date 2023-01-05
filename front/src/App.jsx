import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { publicRoutes, authProtectedRoutes } from "./routes";

const ProtectedRoute = ({ isAuthProtected, component: Component }) => {
  if (isAuthProtected && !localStorage.getItem("authUser")) {
    console.log("You have to log in first");
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export const App = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={<route.component />} />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <ProtectedRoute
                component={route.component}
                isAuthProtected={true}
              />
            }
          />
        ))}
        {/* <Route path={"/login"} element={<LoginPage />} /> */}
      </Routes>
    </>
  );
};
