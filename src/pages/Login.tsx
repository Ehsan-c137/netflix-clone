import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { logIn } = UserAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      try {
         await logIn(email, password);
         navigate("/");
      } catch (error) {
         if (error instanceof Error) {
            console.log(error);
            setError(error.message);
         }
      }
   };

   return (
      <div className="w-full h-screen">
         <img
            className="hidden sm:block absolute w-full h-full object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/d54727b4-2ad9-4e71-bb48-0899f55f103a/d7f7b5ae-6140-45f0-86ca-53def7759606/DE-en-20230220-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="/"
         />
         <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
         <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
               <div className="max-w-[320px] mx-auto py-16">
                  <h1
                     className="text-3xl font-bold
                  "
                  >
                     Sign In
                  </h1>
                  {error.length > 1 ? (
                     <p className="p-3 bg-red-400 my-2">{error}</p>
                  ) : (
                     ""
                  )}
                  <form
                     onSubmit={handleSubmit}
                     className="w-full flex flex-col py-4"
                  >
                     <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        className="p-3 my-2 bg-gray-700 rounded transition duration-300"
                     />
                     <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        className="p-3 my-2 bg-gray-700 rounded transition duration-300"
                     />
                     <button className="bg-red-600 py-3 my-6 rounded font-bold">
                        Sign In
                     </button>
                     <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                           <input type="checkbox" className="mr-2" />
                           Remember me
                        </p>
                        <p className="text-gray-600">Need Help?</p>
                     </div>
                     <p className="py-8">
                        <span className="text-gray-600 mr-2">
                           New to Netflix?
                        </span>
                        <Link to="/login">Sign Up</Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
