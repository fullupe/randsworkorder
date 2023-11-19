"use client"
import React, { useState} from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TpmNewAlocate from './TpmNewAlocate'
import TpmReAlocate from './TpmReAlocate'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'


type Props={
   
    setOpenModal:(openModal:boolean)=>void;
    input:string
}

function TpmReAlocateModal({setOpenModal,input}:Props):React.JSX.Element | null {


  
    
    const handleClose =(e:any)=>{
        if(e.target.id === "wrap") {
          
            setOpenModal(false)
        }
       
    }
    

  
    return (
    <div onClick={handleClose} id="wrap" className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center flex">
        
        <div className="w-full flex flex-col justify-center items-center">

         {/* <button   className=" place-self-end text-2xl text-white">x</button> */}

         <div className="bg-white/20 p-1 text-white rounded-lg h-60 w-[80%] md:w-[50%] mx-4 flex flex-col  ">

                  <div className="flex items-center gap-2 mx-3 my-2">
                  <ExclamationCircleIcon className="w-8 text-red-500 h-8"/>
                  <p>Message</p>
                  </div>

                  <div className="flex  space-y-8 flex-col w-full justify-center items-center h-full">

                  <p className="italic font-extrabold">TPM : {input} Already Out  </p>

                  <button className="bg-red-500 px-8 p-1 rounded-md font-bold  shadow-xl" onClick={()=>setOpenModal(false)}>OK</button>

                  </div>



        </div>
        
        </div>

       </div>
  )
}

export default TpmReAlocateModal