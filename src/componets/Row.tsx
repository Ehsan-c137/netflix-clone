import axios from "axios";
import Movie from "./Movie";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface IRowProps {
   title: string;
   fetchURL: string;
   rowID: number;
}

const Row = ({ title, fetchURL, rowID }: IRowProps) => {
   const [movies, setMovies] = useState([]);

   useEffect(() => {
      axios.get(fetchURL).then((response) => {
         setMovies(response.data.results);
      });
   }, [fetchURL]);

   const slideLeft = () => {
      const slider = document.getElementById("slider" + rowID) as HTMLElement;
      slider.scrollLeft = slider.scrollLeft - 500;
   };
   const slideRight = () => {
      const slider = document.getElementById("slider" + rowID) as HTMLElement;
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
               {movies.length > 0 ? (
                  movies.map((item, id) => {
                     return <Movie item={item} key={id} />;
                  })
               ) : (
                  <div className="flex gap-4">
                     {Array.from({ length: 7 })
                        .fill(0)
                        .map(() => (
                           <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-[100px] p-2 bg-white opacity-30 text-yellow-50 animate-pulse"></div>
                        ))}
                  </div>
               )}
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
