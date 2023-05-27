import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import  {useContractWrite,useContractRead} from "wagmi"
import {ethers} from "ethers"

import usdcAbi from "../Abis/UsdcFaucet.json"
import { UsdcFaucetContract } from "../ContractAddress/Address";
import { useAccount } from "wagmi";


const FaucetCard = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
  
  const [request, setRequest] = useState(false);
  const [hidebutton,setHide] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userAddress,setAddress] = useState();
  const [usdcAmount,setUsdcAmount] = useState();
  const [showLendingModal, setShowLendingModal] = useState(false);
  const [duration,setDuration]= useState();
  const [tokenAmount,setTokenAmount] = useState();
  const [collateralAmount,setCollateralAmount] = useState();
  const [interestAmount,setInterestAmount] = useState();
  
  //
  //approve matic to loan out
  const {
        
    writeAsync: mintUsdc
    
  } = useContractWrite({
    address:UsdcFaucetContract,//its usdc
    abi:usdcAbi,
    functionName: "mintTokens",
    args: [address,usdcAmount]
  })
  const mintToken = async()=>{
    try{
        if(usdcAmount !== undefined){

      await mintUsdc();

        }


    }catch(e){
      console.log("the approve error is",e);
    }
  }
  
  //convert to seconds
  const convertToSeconds = (timeValue) => {
    const selectedTime = new Date(timeValue); // Create a Date object from the selected time
    const currentTime = new Date(); // Create a Date object for the current time
  
    const differenceInSeconds = Math.floor((selectedTime - currentTime) / 1000); // Calculate the difference in seconds
  
    return differenceInSeconds;
  };
  const handleDurationChange = (event) => {
    const timeValue = event.target.value;
    const seconds = convertToSeconds(timeValue);
  
    setDuration(parseInt(seconds)); // Convert the duration to an integer and update the state
  };  
  

  
  //return current time in seconds
  const currentTimeInSeconds = ()=>{
    const current_time_seconds = Math.floor(Date.now() / 1000);
    return current_time_seconds;
  }
  
  const convertSecondsToDHMS = (seconds) => {
    const secondsInDay = 24 * 60 * 60;
    const secondsInHour = 60 * 60;
    const secondsInMinute = 60;
  
    const days = Math.floor(seconds / secondsInDay);
    seconds %= secondsInDay;
  
    const hours = Math.floor(seconds / secondsInHour);
    seconds %= secondsInHour;
  
    const minutes = Math.floor(seconds / secondsInMinute);
    seconds %= secondsInMinute;
  
    return {
      days,
      hours,
      minutes,
      seconds
    };
  };
  const handleAmount = (event) => {
    setUsdcAmount(ethers.parseEther(event.target.value)); // Update the state with the selected option value
  };
  const handleAddress = (event) => {
    setAddress(event.target.value); // Update the state with the selected option value
  };
  
console.log("amount is",usdcAmount);

console.log("address is",address);
  return (
    <div className="inset-0 flex justify-center mt-10 h-3/4">
      <div className="w-1/4 p-6 border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" id="open-btn">
        <div className="text-white text-sm h-96 w-full flex flex-col justify-center items-center">
        <input type="text" placeholder="address"  onChange={handleAddress} className="mb-4 text-center text-black"/>
            
          <input type="text" placeholder="Amount"  onChange={handleAmount} className="mb-4 text-center text-black"/>
          <button  onClick={()=>{mintToken()}} className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded">Mint</button>
        </div>
      </div>
    </div>
  );
};

export default FaucetCard;
