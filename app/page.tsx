"use client"
import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify';

import AgentCheckModal from "../app/components/AgentCheckModal"
import TimeAgo from "react-timeago"

import Image from 'next/image';
import { useFetchDataSheet2 } from './hooks/useFetchDataSheet2';

type Ttpminfo={
  tpm:string,
  agentName:string,
  branch:string,
  status:string,
  createdAt:string,
  ruser:string,
}


function Agent() {

  const [input, setInput] = useState<string>('')

  const {DataApi2,fetchReflesh2,setFetchReflesh2}=useFetchDataSheet2()

  const [tpmInfo, setTpmInfo] = useState<Ttpminfo | null>(null)

  const[openModat,setOpenModal]=useState<boolean>(false)

  interface val  { 
    tpm:string
  }

  
  //console.log(DataApi)
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const foundItem:Ttpminfo = DataApi2.find((val: { tpm: string }) => val.tpm == input);

    if (foundItem) {
      // Match found
      setTpmInfo(foundItem);
      setInput('');
      
      toast('Record Found!', {
        toastId: 'success',
        icon: '🚀',
      });
      setOpenModal(false)
    } else {
      // No match found
      toast(`Tpm ${input} Already Out`, {
        toastId: 'error',
        icon: '🚀',
      });

      setOpenModal(true)

    }

    setFetchReflesh2(!fetchReflesh2)

    
   }


  const statusColor:string = tpmInfo?.status == 'Ready ✅' ? 'bg-[#00C600] text-white' : 
  tpmInfo?.status == 'Working On' ? 'bg-[#152E61] text-white' : 
  tpmInfo?.status == 'Water Entered' ? 'bg-[#877FBF] text-white' :
 
  tpmInfo?.status == 'On Test' ? 'bg-[#315EA7] text-white' :
  
  tpmInfo?.status == 'Waiting for Part' ? 'bg-[#8EEEF7] text-whited' :
  
  "bg-[#E7223B] text-white ";

  return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#F7CAD5] to-indigo-300 ">
    <div
    className={`py-2  px-6 bg-whitee bg-gradient-to-r from-sky-500 to-indigo-500 shadow-2xl h-[85%] md:max-w-md !important text-lg rounded-2xl relativee  flex flex-col h leading- w-[98%]  text-white mt-8 mb-12 overflow-hidden absolute`}
  >
    
    <ToastContainer />
    <div className="felx flex-col space-y-2">
      <div className=" h- bg-gray-00  items-center flex flex-col mt-6 ">
        <p className="text-gray-900 text-2xl font-bold border-b mb-6 font-poppins italic ">
      
          Maintenance Check 📮 {' '}
        </p>

        <form onSubmit={handleSearch} className="flex items-center mt-3 space-x-3 mb-4">

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

        <div className=" text-gray-900 items-center flex flex-col w-full">
          <p className="border-b text-white text-2xl italic font-poppins font-bold ">Terminal Details</p>
          {
                tpmInfo &&
          <div className="w-full flex flex-col mt-2 items-right space-y-4">
          <label className="font-bold">Retailer Name</label>
              <p className=" px-4 bg-gray-900 rounded-lg text-white shadow-lg border-2 border-white opacity-60">
                
                <small className="ml-2 text-center uppercase ">
                  {tpmInfo.agentName}
                </small>
              </p>

              <div className="flex space-x-1 w-full">
                <div className="fle flex-col w-full">
              <label className="font-bold">Tpm Num</label>
                <p className=" flex-1 px-4 bg-gray-900 rounded-lg text-white shadow-lg border-2 border-white opacity-60">
                  
                  <small className="ml-2 text-center ">{tpmInfo.tpm}</small>
                </p>

                </div>
                <div className="flex flex-col w-full">
                <label className="font-bold"> Tpm status</label>
                <p className={` flex-1 px-4 border-2 border-white ${statusColor} rounded-lg text-white shadow-lg opacity-60`}>
                 
                  <small className="ml-2 text-center ">{tpmInfo.status}</small>
                </p>
                </div>
              </div>
              <label className="font-bold ">Duration</label>
              <p className=" px-4 -mt-2 bg-gray-900 rounded-lg border-2 border-white text-white shadow-lg opacity-60">
              
                <small className="ml-2 text-center ">
                  <TimeAgo
                    className="text-lg text-white"
                    date={tpmInfo.createdAt}
                  />
                </small>
              </p>
          </div>
             }

        </div>
      </div>
       <div className="flex justify-center py-0 my-0">
         <p className="uppercase italic text-slate-300">{tpmInfo?.branch}</p>
       </div>
      <hr />

      <div className=" flex flex-col  w-full bg-yellow-00 p-1">

        
          <div className=" flex flex-col pb-4 w-full justify-center  items-center bg-red-00">
              <p className="animate-bounce capitalize font-cinzel ">Safety-Tips</p>


        <p className="text-sm text-gray-300 font-tapestry italic">  *️⃣ Do Not hold paper whiles Printing ✊ </p>
             
             <Image width={90} height={90} className="mb-8" src="/logo.png" alt="log"/>


          </div>

      </div>
    </div>
  </div>

  {
      openModat && 
    <AgentCheckModal setOpenModal={setOpenModal} input={input}/>
    }
  
  </div>
  )
}

export default Agent
