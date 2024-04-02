import axios from "axios";
import Movie from "./Movie";
import React, { useEffect, useState } from "react";
import PicureSkeleton from "./Skeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface IRowProps {
   title: string;
   fetchURL: string;
   rowID: number;
}

const carouselConfig = {
   superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
   },
   desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
   },
   tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
   },
   mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
   },
};

const Row = ({ title, fetchURL, rowID }: IRowProps) => {
   const [movies, setMovies] = useState([]);

   useEffect(() => {
      axios.get(fetchURL).then((response) => {
         setMovies(response.data.results);
      });
   }, [fetchURL]);

   // const slideLeft = () => {
   //    const slider = document.getElementById("slider" + rowID) as HTMLElement;
   //    slider.scrollLeft = slider.scrollLeft - 500;
   // };
   // const slideRight = () => {
   //    const slider = document.getElementById("slider" + rowID) as HTMLElement;
   //    slider.scrollLeft = slider.scrollLeft + 500;
   // };

   return (
      <>
         <h2 className="text-white font-bol md:text-xl p-4">{title}</h2>
         <div className="relative flex items-center group">
            <Carousel
               responsive={carouselConfig}
               className="w-full h-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative"
               // autoPlay={this.props.deviceType !== "mobile" ? true : false}
               keyBoardControl={true}
               containerClass="carousel-container"
               removeArrowOnDeviceType={["tablet", "mobile"]}
               // deviceType={this.props.deviceType}
               dotListClass="custom-dot-list-style"
            >
               {movies.length > 0 ? (
                  movies.map((item, id) => <Movie item={item} key={id} />)
               ) : (
                  <div className="flex gap-4">
                     {Array.from({ length: 7 })
                        .fill(0)
                        .map((_, i) => (
                           <PicureSkeleton key={i} />
                        ))}
                  </div>
               )}
            </Carousel>
         </div>
      </>
   );
};

export default Row;
