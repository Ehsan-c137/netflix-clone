import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

interface IProps {
   children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
   const { user } = UserAuth();

   if (user === null) {
      return <Navigate to="/" />;
   } else {
      return children;
   }
};

export default ProtectedRoute;
