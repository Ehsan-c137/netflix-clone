const PageNotFound = () => {
   return (
      <div className="w-full h-full absolute flex justify-center items-center">
         <img
            className="hidden sm:block absolute w-full h-full object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/d54727b4-2ad9-4e71-bb48-0899f55f103a/d7f7b5ae-6140-45f0-86ca-53def7759606/DE-en-20230220-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="/"
         />
         <div className="bg-black/80 w-full h-full fixed"></div>
         <h1 className="text-3xl text-white z-[100]">PAGE NOT FOUND</h1>;
      </div>
   );
};

export default PageNotFound;
