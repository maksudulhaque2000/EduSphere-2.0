import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return children;
  }
  return (
    <Navigate to={"/auth/signin"} state={{ from: location }} replace></Navigate>
  );
};
export default PrivateRouter;
