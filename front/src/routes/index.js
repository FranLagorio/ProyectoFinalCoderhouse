import { Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages/Authentication/pages";
import { LogoutPage } from "../pages/Authentication/pages/LogoutPage";
import { Home } from "../pages/Home/Home";

const authProtectedRoutes = [
  { path: "/home", component: Home },
  { path: "/", exact: true, component: () => <Navigate to="/home" /> },
];

const publicRoutes = [
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/register", component: RegisterPage },
];

export { authProtectedRoutes, publicRoutes };
