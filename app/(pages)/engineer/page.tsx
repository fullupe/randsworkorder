
"use client"
import React, { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago'
import { ToastContainer, toast } from 'react-toastify';
import { MagnifyingGlassIcon,CalculatorIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Circles } from 'react-loader-spinner';


//import Select  from 'react-select';
import makeAnimated from"react-select/animated"
const animatedComponents = makeAnimated()

import { Select,  SelectItem } from "@tremor/react";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



import {useFetchDataSheet2} from  "../../hooks/useFetchDataSheet2"

import {useChangeStatus} from  "../../hooks/useChangeStatus"
import { useUserContext } from '@/app/context/userContex';

import TpmHistoryTable from '@/app/TpmHistory/data-table';
import {columns} from "@/app/TpmHistory/columns";
import { useFetchHistoryData } from '@/app/hooks/useFetchHistoryData';
import SelectProbelmSolution from '@/app/components/SelectProbelmSolution';


function Engineer() {

  
  const {user}=useUserContext()

  const [activeUser,setActiveUser]=useState('')
  const [activeUserBranch,setActiveUserBranch]=useState('')
 

  useEffect(()=>{
   if(user){

     setActiveUser(user.username);
     setActiveUserBranch(user.userbranch);
     
   }
  },[])

  type  tpmHistoryType ={
    tpm:string,
    agentName:string,
    branch:string,
    problem_desc:string,
    eng:string,
    dateIn:Date,
    dateOut:Date,
    received_by:string,
  }

  const [input, setInput] = useState<string>('')
  
  const [newstatus, setNewstatus] = useState<string>('')

  const [problemSolutions, setProblemSolutions] = useState<string[]>([])
  // problem description array to string 
  const pblemSolution =problemSolutions.map((val:string|any)=>val.value).toString()
  
  const [tpmInfo, setTpmInfo] = useState<any>('')
  const [tpmsearchHistory, setTpmsearchHistory] = useState<tpmHistoryType[]>([])
  
  
  const {updateSheet2_Status,addToHistory, Loading}=useChangeStatus()
  
  const {DataApi2, fetchReflesh2, setFetchReflesh2}=useFetchDataSheet2()

  const {TpmHistoryData,fetchRefleshHistory,setFetchRefleshHistory}=useFetchHistoryData()

 //useEffect(() => {
  const BranchHistoryData:tpmHistoryType[] = TpmHistoryData.filter((data: { branch: string; })=>data.branch==activeUserBranch)
  const filteredTpm = BranchHistoryData.filter((data)=>data.tpm == input)
  //setTpmsearchHistory(BranchHistoryData)
//}, [])

  
  const handleSearch =(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    setFetchReflesh2(!fetchReflesh2)

    const foundItem = DataApi2.find((val: { tpm: string }) => val.tpm == input);

    if (foundItem) {
      // Match found
      setTpmInfo(foundItem);
      //setInput('');
      
      toast('Record Found!', {
        toastId: 'success',
        icon: '🚀',
      });
    } else {
      // No match found
      toast(`Tpm ${input} is Already Out`, {
        toastId: 'error',
        icon: '🚀',
      });
    }
  
    setFetchReflesh2(!fetchReflesh2)


  }

  const handleSubmit =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
     e.preventDefault()
    const request = {
     
      ...tpmInfo,
      status:newstatus,
      createdAt_In: new Date(),
      eng:activeUser,
      }
      updateSheet2_Status(request)
      
      setInput("")
      setNewstatus("")

      setFetchReflesh2(true)

      if(newstatus == "Ready ✅"){

        const history ={
          tpm:tpmInfo.tpm,
          agentName:tpmInfo.agentName,
          branch:tpmInfo.branch,
          problem_desc:tpmInfo.problem_desc,
          eng:activeUser,
          dateIn:tpmInfo.createdAt_In,
          dateOut:new Date(),
          received_by:tpmInfo.ruser,
          createdAt:new Date(),
          solution:pblemSolution
        }

        addToHistory(history)
      }

      //SetLoading(false)
      

  }

  const statusColor = tpmInfo.status == 'Ready ✅' ? 'bg-[#00C600] text-white' : // @ts-ignore 
  tpmInfo.status == 'Working On' ? 'bg-[#152E61] text-white' : // @ts-ignore 
  tpmInfo.status == 'Water Entered' ? 'bg-[#877FBF] text-white' :// @ts-ignore 
 
  tpmInfo.status == 'On Test' ? 'bg-[#315EA7] text-white' :  // @ts-ignore 

  tpmInfo.status == 'Waiting for Part' ? 'bg-[#8EEEF7] text-whited' :// @ts-ignore 
  
  "bg-[#E7223B] text-white ";




  return (
    <div className="flex min-h-screen justify-center items-center">
    <div
      className={`py-16  px-6 bg-whitee bg-gradient-to-r from-sky-500 to-indigo-500 shadow-2xl h-[95%] md:max-w-md !important text-lg rounded-2xl relative  flex flex-col h leading- w-[98%] text-white`}
    >

      <ToastContainer />
      <div className="felx flex-col space-y-2">
 

      <div className=" justify-center  pr-2 items-end flex flex-col cursor-pointer">
        {
          input && (
        <Dialog >
          
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <ClockIcon className="w-6 h-6 mr-2 text-white border-2 border-white hover:border-gray-700 bg-gray-900 "/>
    
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>Tpm History</DialogTitle>
          <DialogDescription>
           Terminal:<p className="text-lg font-mono font-bold">{input}</p> History for this month.
          </DialogDescription>
        </DialogHeader>

        <div className=" flex w-full gap-4 py-4">
        <TpmHistoryTable columns={columns} data={filteredTpm} />
          
        </div>
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>

      <p className="text-[9px] -mt-2 text-gray-300">TPM History</p>
    </Dialog>

          )
        }
        
        
        
     
        </div>


       
        
        <div className=" h-96 bg-gray-00  items-center flex flex-col pt-8f mb-20 ">
          <p className="text-gray-900 text-2xl font-bold font-poppins border-b mb-4">
            Engineers Check
          </p>

          <form onSubmit={handleSearch}  className="flex items-center mt-3 space-x-3 mb-4">


          <div className="flex w-full bg-white border-2 border-green-900 rounded-full items-center overflow-hidden">

              <div className=" h-full bg-blue-900h mx-1 rounded-l-full ">

                <p className="text-gray-500 mx-2  text-lg">Tpm</p>
          
              </div>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={5}
                type="numeric"
              
                autoFocus={true}
                placeholder="Enter Tpm#"
                className=" px-2 pl-5 italic w-44 flex-1  rounded-full bg-gray-100 text-black outline-none placeholder:text-xs"
              />

             

              <button
                type="submit"
               
                disabled={!input}
                className="bg-transparent  hover:bg-blue-500 disabled:text-gray-800 text-white font-semibold hover:text-white py-0 ml-2 px-2  border-white hover:border-transparent"
              >
                <MagnifyingGlassIcon className=" h-8 w-8 p-1 text-black disabled:text-gray-800" />
              </button>
            </div>
           

          </form>

          <div className=" text-gray-900 items-center flex flex-col w-full ">
            <p className="border-b text-2xl text-white font-poppins ">Terminal Details</p>

            {
                tpmInfo &&
            <div className="w-full flex flex-col mt-2 mb-1 items-right space-y-4 pb-1">
              <label className="font-bold">Retailer Name</label>
              <p className=" px-4 bg-gray-900 rounded-lg text-white shadow-lg border-2 border-white opacity-60">
                {/* Retailer Name:{' '} */}
                <small className="ml-2 text-center uppercase ">
                  {tpmInfo.agentName}
                </small>
              </p>

              <div className="flex space-x-1 w-full">
                <div className="fle flex-col w-full">
              <label className="font-bold">Tpm Num</label>
                <p className=" flex-1 px-4 bg-gray-900 rounded-lg text-white shadow-lg border-2 border-white opacity-60">
                  {/* Tpm#:{' '} */}
                  <small className="ml-2 text-center ">{tpmInfo.tpm}</small>
                </p>

                </div>

                <div className="flex flex-col w-full">
                <label className="font-bold"> Tpm status</label>
                <p className={` flex-1 px-4 border-2 border-white ${statusColor} rounded-lg text-white shadow-lg opacity-60`}>
                  {/* Status:  */}
                  <small className="ml-2 text-center ">{tpmInfo.status}</small>
                </p>

                </div>

              </div>
              
              <div className="flex flex-col justify-between">
              <label className="font-bold w-full ">Duration</label>
              <p className=" px-4 -mt-1 ml-6l bg-gray-900 rounded-lg w-full  border-2 border-white text-white shadow-lg opacity-60">
              
                <small className="ml-2 text-center ">
                  <TimeAgo
                    className="text-lg text-white"
                    date={tpmInfo.createdAt_In}
                  />
                </small>
              </p>

              </div>

            </div>
            }
            {Loading &&<Circles color="#FC6238" height={50} width={80} />}
          </div>
        </div>

        <hr />

        <form className=" flex  flex-col h-full w-full bg-yellow-00 p-4 space-y-3">
         
         
         
   

    

    <label className=" font-cinzel ">Change Status</label>


      <Select className="z-50 pb-20 flex" value={newstatus} onValueChange={setNewstatus}>
        
        <SelectItem  value="Working On ✅" icon={CalculatorIcon}>
        Working On ✅
        </SelectItem>
        <SelectItem value="Ready ✅" icon={CalculatorIcon}>
        Ready ✅
        </SelectItem>
        <SelectItem value="Working On" icon={CalculatorIcon}>
        Working On
        </SelectItem>
        <SelectItem value="On Test" icon={CalculatorIcon}>
        On Test
        </SelectItem>
        <SelectItem value="See Management" icon={CalculatorIcon}>
        See Management
        </SelectItem>
        <SelectItem value="Water Entered" icon={CalculatorIcon}>
        Water Entered
        </SelectItem>
        <SelectItem value="Waiting for Part" icon={CalculatorIcon}>
        Waiting for Part
        </SelectItem>
        <SelectItem value="Card Damage by User" icon={CalculatorIcon}>
        Card Damage by User
        </SelectItem>
        <SelectItem value="Tpm Blocked" icon={CalculatorIcon}>
        Tpm Blocked
        </SelectItem>
        
      </Select>

      {
           newstatus == "Ready ✅" &&
          <div className="flex w-full dbg-red-900 my-4">
         <SelectProbelmSolution setProblemSolutions={setProblemSolutions}/>
            </div>

          }


        
          <button type="button" disabled={!input || !newstatus || !tpmInfo} onClick={handleSubmit}className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded disabled:text-gray-500">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Engineer