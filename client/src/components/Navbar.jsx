import MaxWidthContainer from "./MaxWidthContainer"

const Navbar = () => {
  return (
    <div className="border-b border-gray-300 py-4">
       <MaxWidthContainer className="flex justify-between items-center">
        {/* left */}
         <div className="flex items-center gap-4">
           <span className="md:hidden">menu</span>
           {/* logo */}
           <div className="flex items-center gap-0.5">
             <img src="logo.png" alt="logo" className="size-8 md:size-10" />
             <div className="text-xl font-bold text-gray-800">Shop<span>Flow</span></div>
           </div>
           <div className="hidden md:block">search bar</div>
         </div>

         {/* right */}
         <div className="flex gap-6 items-center">
            {/* buttons */}
            <div className="space-x-4">
              <button>sign in</button>
              <button>sign up</button>
            </div>
            <div>cart icon</div>
         </div>
       </MaxWidthContainer>
    </div>
  )
}
export default Navbar