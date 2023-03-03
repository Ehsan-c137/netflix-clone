import SavedShows from "../componets/SavedShows";

const Account = () => {
   return (
      <>
         <div className="w-full text-white">
            <img
               className=" w-full h-[400px] object-cover"
               src="https://assets.nflxext.com/ffe/siteui/vlv3/d54727b4-2ad9-4e71-bb48-0899f55f103a/d7f7b5ae-6140-45f0-86ca-53def7759606/DE-en-20230220-popsignuptwoweeks-perspective_alpha_website_small.jpg"
               alt="/"
            />
            <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
            <div className="absolute top-[20%] p-4 md:-8">
               <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
            </div>
         </div>
         <SavedShows />
      </>
   );
};

export default Account;
