import { Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import MainLayout from "./components/MainLayout";
import Account from "./pages/Account";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import Home from "./pages/Home/Home";
import { AddVideo } from "./pages/AddVideo";
import VideoPage from "./pages/VideoPage";

const useRoutesHook = () => {
  const routes = [
    {
      path: "app",
      element: <DashboardLayout />,
      children: [
        { path: "account", element: <Account /> },
        { path: "customers/:id", element: <UserPage /> },
        { path: "video/add", element: <AddVideo /> },
        { path: "video/:id", element: <VideoPage /> },
        { path: "video/edit/:id", element: <AddVideo /> },
        { path: "home", element: <Home /> },
        { path: "trends", element: <Home /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/login" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
  ];

  return {
    routes,
  };
};

export default useRoutesHook;
