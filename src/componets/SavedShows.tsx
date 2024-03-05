import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { IUser } from "../models/movie";

const SavedShows: React.FC = () => {
   const [movies, setMovies] = useState([]);
   const userContext = UserAuth();
   if (!userContext) return null;
   const { user } = userContext;

   const slideLeft = () => {
      let slider = document.getElementById("slider") as HTMLElement;
      slider.scrollLeft = slider.scrollLeft - 500;
   };
   const slideRight = () => {
      let slider = document.getElementById("slider") as HTMLElement;
      slider.scrollLeft = slider.scrollLeft + 500;
   };

   useEffect(() => {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
         console.log(doc.data());
         setMovies(doc.data()?.savedShow);
      });
   }, [user?.email]);

   const movieRef = doc(db, "users", `${user?.email}`);

   const deleteShow = async (passedId: number) => {
      try {
         const result = movies.filter((item: IUser) => item.id !== passedId);

         await updateDoc(movieRef, {
            savedShow: result,
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <h2 className="text-white font-bol md:text-xl p-4">My Shows</h2>
         <div className="relative flex items-center group">
            <MdChevronLeft
               onClick={slideLeft}
               size={40}
               className="bg-white rounded-full left-0 absolute opacity-50 hover:opacity-100 cursor-pointer right-8 z-[100] hidden group-hover:block"
            />
            <div
               id={"slider"}
               className="w-full h-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative"
            >
               {movies?.map((item: IUser, id) => {
                  return (
                     <div
                        key={id}
                        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                     >
                        <img
                           className="w-full h-auto"
                           src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                           alt={item?.title}
                        />
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white transition">
                           <p
                              className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center
               "
                           >
                              {item?.title}
                           </p>
                           <p
                              onClick={() => deleteShow(item.id)}
                              className="top-4 right-4 text-gray-300 absolute"
                           >
                              <AiOutlineClose />
                           </p>
                        </div>
                     </div>
                  );
               })}
            </div>
            <MdChevronRight
               onClick={slideRight}
               size={40}
               className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-[100] hidden group-hover:block"
            />
         </div>
      </>
   );
};

export default SavedShows;
