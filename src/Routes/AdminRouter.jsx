import React from "react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminRouter;
