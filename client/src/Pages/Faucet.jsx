import React from "react";



import FaucetCard from "../components/faucetcard";
import NavBarFaucet from "../components/navbarFaucet";

const FaucetPage = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-black">
           <NavBarFaucet/>
           <FaucetCard/>

           {/* <Footer/> */}
          

        </div>

    )
}
export default FaucetPage;