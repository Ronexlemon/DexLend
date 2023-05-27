import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import  {useContractWrite,useContractRead} from "wagmi"
import {ethers} from "ethers"
import { LendingYieldContract } from "../ContractAddress/Address";
import LendingAbi from "../Abis/LendingV2.json"
import IERC20 from "../Abis/IERC20.json"

const FaucetCard = () => {
  const details = [{loan:1,collateralAmount:2,tokenAmountToBorrow:2000,duration:234566,lended:false}]
  const [request, setRequest] = useState(false);
  const [hidebutton,setHide] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [indexValue,setIndexValue] = useState();
  const [loanamount,setLoanAmount] = useState();
  const [showLendingModal, setShowLendingModal] = useState(false);
  const [duration,setDuration]= useState();
  const [tokenAmount,setTokenAmount] = useState();
  const [collateralAmount,setCollateralAmount] = useState();
  const [interestAmount,setInterestAmount] = useState();
  const matic = "0x0000000000000000000000000000000000001010";
  const maticPricefeed = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada"
  const link = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
  const linkPriceFeed = "0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408"
  const usdcPriceFeed = "0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0"
  //
  //approve matic to loan out
  const {
        
    writeAsync: approveloan
    
  } = useContractWrite({
    address:link,//its usdc
    abi:IERC20,
    functionName: "approve",
    args: [LendingYieldContract,loanamount]
  })
  const approveLoan = async()=>{
    try{

      await approveloan();

    }catch(e){
      console.log("the approve error is",e);
    }
  }
  //confirm loan
  const {
        
    writeAsync: confirmLoan
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "lend",
    args: [indexValue],
    value: loanamount
  })
  const confirmLending = async()=>{
    try{

      await confirmLoan();

    }catch(e){
      console.log("the lend error is",e);
    }
  }


  const {
        
    writeAsync: approveCollateral
    
  } = useContractWrite({
    address:link,
    abi:IERC20,
    functionName: "approve",
    args: [LendingYieldContract,collateralAmount]
  })
  const approve = async()=>{
    try{

      await approveCollateral();

    }catch(e){
      console.log("the approve error is",e);
    }
  }
  
  const {
        
    writeAsync: add
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "allowToken",
    args: [matic,maticPricefeed]
  })
  const {
        
    writeAsync: addCollateral
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "allowCollateralToken",
    args: [link,linkPriceFeed]
  })
  const allowToken = async()=>{
    try{
      await add();

    }catch(e){
      console.log("the error is",e);
    }
  }
  //create request
  const {
        
    writeAsync: createRequest
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "createRequest",
    args: [duration,tokenAmount,collateralAmount,matic,link,interestAmount],
   
  })
  const createRequests = async()=>{
    try{
     
      await createRequest();

    }catch(e){
      console.log("the error is",e);
    }
  }
  const allowCollatateral = async()=>{
    try{
      await addCollateral();

    }catch(e){
      console.log("the error is",e);
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
  

  const [selectedOptionCollateral, setSelectedOptionCollateral] = useState('LINK'); // Initialize the state with an empty string

  const handleOptionChangeCollateral = (event) => {
    setSelectedOptionCollateral(event.target.value); // Update the state with the selected option value
  };
  const [selectedOptionToken, setSelectedOptionToken] = useState('MATIC'); // Initialize the state with an empty string

  const handleOptionChangeToken = (event) => {
    setSelectedOptionToken(event.target.value); // Update the state with the selected option value
  };
  const [selectedOptionInterest, setSelectedOptionInterest] = useState('MATIC'); // Initialize the state with an empty string

  const handleOptionChangeInterest = (event) => {
    setSelectedOptionInterest(event.target.value); // Update the state with the selected option value
  };
 
  console.log("amount",collateralAmount);
  console.log("tamount",loanamount);
  console.log("index value",indexValue);
 

  const handleCreateRequest = () => {
    setShowModal(true);
  };
  const handleLending = (_index,_amount) => {
    setIndexValue(_index)
    setLoanAmount(_amount);
    setShowLendingModal(true);
  };
  const handleLendingCancel =()=>{
    setShowLendingModal(false);
  }
  const handleLendApprove =async ()=>{
    await approveLoan();
    setTimeout(() => {
      setHide(false);
    }, 5000);

  }
  const handleLendSend =async()=>{
   await  confirmLending();
    setShowLendingModal(false);
  }
  const handleApproveRequest = async()=>{
await approve();
setTimeout(() => {
  setHide(false);
}, 5000);
  }

  const handleSendRequest =async () => {
    // Logic for sending the request
    await createRequests();

    setShowModal(false);
  };

  const handleCancelRequest = () => {
    setShowModal(false);
  };
  //contract reads
  const {data:requests,isError} =  useContractRead({
    address:LendingYieldContract,
    abi: LendingAbi,
    functionName: "getAllRequest"
  })
  
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
  // 
  console.log("data is", requests);

  return (
    <div className="inset-0 flex justify-center mt-10 h-3/4">
      <div className="w-1/4 p-6 border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" id="open-btn">
        <div className="text-white text-sm h-96 w-full flex flex-col justify-center items-center">
          <input type="text" placeholder="Amount" className="mb-4"/>
          <button className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded">Mint</button>
        </div>
      </div>
    </div>
  );
};

export default FaucetCard;