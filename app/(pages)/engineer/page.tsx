
"use client"
import React, { useState } from 'react';
import TimeAgo from 'react-timeago'
import { ToastContainer, toast } from 'react-toastify';
import { MagnifyingGlassIcon,CalculatorIcon } from '@heroicons/react/24/outline'
import { Circles } from 'react-loader-spinner';

import { Select, SelectItem } from "@tremor/react";
//import { CalculatorIcon } from "@heroicons/react/outline";


import {useFetchData} from  "../../hooks/useFetchData"

import {useChangeStatus} from  "../../hooks/useChangeStatus"

function Engineer() {

  const {updateRecords, Loading,SetLoading}=useChangeStatus()
  
  //const URL:string = process.env.NEXT_PUBLIC_BASE_URL as string
  //const URLUpdate:string = process.env.NEXT_PUBLIC_BASE_URL_UPDATE as string
  
  //const[Loading, SetLoading] = useState<boolean>(false)

  const {DataApi, fetchReflesh, setFetchReflesh}=useFetchData()

    const [input, setInput] = useState<string>('')

    const [newstatus, setNewstatus] = useState<string>('')

   const [tpmInfo, setTpmInfo] = useState<any>('')


  const handleSearch =(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    DataApi.filter((val: { tpm: string }) => {
      if (!input) {
        return val
      } else if (val.tpm == input) {
        //return val
        setTpmInfo(val)
        toast('Record Found!', {
          icon: '🚀',
        })
        setFetchReflesh(!fetchReflesh)
      }
    })


  }

  const handleSubmit =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
     e.preventDefault()
    const request = {
      // tpm:tpmInfo.tpm,
      // agentName:tpmInfo.agentName,
      // status:newstatus,
      // branch:tpmInfo.branch,
      // createdAt: new Date(),
      ...tpmInfo,
      status:newstatus,
      createdAt: new Date(),
      }
      updateRecords(request)
      
      setInput("")
      setNewstatus("")
      setFetchReflesh(!fetchReflesh)

      SetLoading(false)
      

  }

  const statusColor = tpmInfo.status == 'Ready ✅' ? 'bg-[#00C600] text-white' : // @ts-ignore 
  tpmInfo.status == 'Working On' ? 'bg-[#152E61] text-white' : // @ts-ignore 
  tpmInfo.status == 'Water Entered' ? 'bg-[#877FBF] text-white' :// @ts-ignore 
 
  tpmInfo.status == 'On Test' ? 'bg-[#315EA7] text-white' :  // @ts-ignore 
  // row.original.status == 'See Management' ? 'bg-red-900' :// @ts-ignore 
  tpmInfo.status == 'Waiting for Part' ? 'bg-[#8EEEF7] text-whited' :// @ts-ignore 
  
  "bg-[#E7223B] text-white ";




  return (
    <div className="flex min-h-screen justify-center items-center">
    <div
      className={`py-12  px-6 bg-whitee bg-gradient-to-r from-sky-500 to-indigo-500 shadow-2xl h-[95%] md:max-w-md !important text-lg rounded-2xl relative  flex flex-col h leading- w-4/5 text-white mt-6  overflow-hidden`}
    >
      <ToastContainer />
      <div className="felx flex-col space-y-2">
       
        
        <div className=" h-96 bg-gray-00  items-center flex flex-col pt-8 mb-20 ">
          <p className="text-gray-900 text-2xl font-bold font-poppins border-b mb-4">
            Engineer's Check
          </p>

          <form onSubmit={handleSearch}  className="flex items-center mt-3 space-x-3 mb-4">


          <div className="flex w-full bg-white border-2 border-green-900 rounded-full items-center overflow-hidden">

              <div className=" h-full bg-blue-900h mx-1 rounded-l-full ">

                <p className="text-gray-500 mx-2  text-lg">Tpm</p>
          
              </div>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={4}
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
            {Loading &&<Circles color="#FC6238" height={50} width={80} />}
          </div>
        </div>

        <hr />

        <form className=" flex flex-col h-full w-full bg-yellow-00 p-4 space-y-3">
         
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
        
      </Select>


        
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