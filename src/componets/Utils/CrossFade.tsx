import React, { useRef, useEffect, useState } from "react";
/* eslint-disable */

const usePrevious = <T extends any>(value: T) => {
   const ref = useRef<T>();

   useEffect(() => {
      ref.current = value;
   }, [value]);

   return ref.current;
};

const useRequestAnimationFrame = (): [(cb: () => void) => void, Function] => {
   const handles = useRef<number[]>([]);
   const _raf = (cb: () => void) => {
      handles.current.push(requestAnimationFrame(cb));
   };
   const _resetRaf = () => {
      handles.current.forEach((id) => cancelAnimationFrame(id));
      handles.current = [];
   };

   return [_raf, _resetRaf];
};

type ImageProps = {
   src: string;
   alt?: string;
   transitionDuration?: number;
   curve?: string;
};

const CrossFadeImage = (props: ImageProps) => {
   const { src, alt, transitionDuration = 0.35, curve = "ease" } = props;
   const oldSrc = usePrevious(src);
   const [topSrc, setTopSrc] = useState<string>(src);
   const [bottomSrc, setBottomSrc] = useState<string>("");
   const [bottomOpacity, setBottomOpacity] = useState(0);
   const [display, setDisplay] = useState(false);
   const [raf, resetRaf] = useRequestAnimationFrame();

   useEffect(() => {
      if (src !== oldSrc) {
         resetRaf();
         setTopSrc("");
         setBottomSrc("");

         raf(() => {
            setTopSrc(src);
            setBottomSrc(oldSrc!);
            setBottomOpacity(99);

            raf(() => {
               setBottomOpacity(0);
            });
         });
      }
   }, [src, oldSrc, raf, resetRaf]);

   return (
      <div
         className="imgContainer w-full"
         style={{
            position: "relative",
            height: "100%",
         }}
      >
         {topSrc.length > 0 && (
            <img
               style={{
                  position: "absolute",
                  opacity: display ? "100%" : 0,
                  transition: `opacity ${transitionDuration}s ${curve}`,
               }}
               onLoad={() => setDisplay(true)}
               src={topSrc}
               alt={alt}
            />
         )}
         {!topSrc && (
            <img
               style={{
                  position: "absolute",
                  opacity: bottomOpacity + "%",
                  transition: `opacity ${transitionDuration}s ${curve}`,
               }}
               src={"./blankimage.png"}
               alt={alt}
            />
         )}
         {bottomSrc?.length > 0 && (
            <img
               style={{
                  position: "absolute",
                  opacity: bottomOpacity + "%",
                  transition: `opacity ${transitionDuration}s ${curve}`,
               }}
               src={"./blankimage.png"}
               alt={alt}
            />
         )}
      </div>
   );
};

export default CrossFadeImage;
