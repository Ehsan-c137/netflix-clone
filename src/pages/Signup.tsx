import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import React from "react";

const Signup = () => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");

   const { signUp } = UserAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         signUp && (await signUp(email, password));
         navigate("/");
      } catch (error) {
         console.log(error);
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
                     Sign Up
                  </h1>
                  <form
                     className="w-full flex flex-col py-4"
                     onSubmit={handleSubmit}
                  >
                     <input
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 my-2 bg-gray-700 rounded transition duration-300"
                     />
                     <input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 my-2 bg-gray-700 rounded transition duration-300"
                     />
                     <button className="bg-red-600 py-3 my-6 rounded font-bold">
                        Sign Up
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
                           Already subscribed to Netflix?
                        </span>
                        <Link to="/login">Sign In</Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Signup;
