/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
   const { user, logOut } = UserAuth();

   const navigate = useNavigate();
   const handleLogout = async () => {
      try {
         logOut && (await logOut());
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="flex item-center justify-between p-4 z-[100] w-full absolute">
         <Link to="/">
            <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
               NETFLIX
            </h1>
         </Link>
         {user?.email ? (
            <div>
               <Link to="/account">
                  <button className="text-white mr-4">Account</button>
               </Link>

               <button
                  className="bg-red-600 rounded px-6 py-2 cursor-pointer text-white"
                  onClick={handleLogout}
               >
                  Logout
               </button>
            </div>
         ) : (
            <div>
               <Link to="/login">
                  <button className="text-white mr-4">Sign In</button>
               </Link>
               <Link to="/signup">
                  <button className="bg-red-600 rounded px-6 py-2 cursor-pointer text-white">
                     Sign Up
                  </button>
               </Link>
            </div>
         )}
      </div>
   );
};

export default Navbar;
