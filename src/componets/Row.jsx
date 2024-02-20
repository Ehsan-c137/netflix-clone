import axios from "axios";
import Movie from "./Movie";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchURL, rowID }) => {
   const [movies, setMovies] = useState([]);

   useEffect(() => {
      axios.get(fetchURL).then((response) => {
         setMovies(response.data.results);
      });
   }, [fetchURL]);

   const slideLeft = () => {
      let slider = document.getElementById("slider" + rowID);
      slider.scrollLeft = slider.scrollLeft - 500;
   };
   const slideRight = () => {
      let slider = document.getElementById("slider" + rowID);
      slider.scrollLeft = slider.scrollLeft + 500;
   };

   return (
      <>
         <h2 className="text-white font-bol md:text-xl p-4">{title}</h2>
         <div className="relative flex items-center group">
            <MdChevronLeft
               onClick={slideLeft}
               size={40}
               className="bg-white rounded-full left-0 absolute opacity-50 hover:opacity-100 cursor-pointer right-8 z-[100] hidden group-hover:block"
            />
            <div
               id={"slider" + rowID}
               className="w-full h-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative"
            >
               {movies.map((item, id) => {
                  return <Movie item={item} key={id} />;
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

export default Row;
