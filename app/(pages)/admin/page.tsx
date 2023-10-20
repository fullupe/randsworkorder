"use client"
import React, { useState } from 'react'
import { Cog8ToothIcon, ComputerDesktopIcon, ChartPieIcon, UsersIcon } from '@heroicons/react/24/outline'
import Account from '@/app/components/Account'
import BranchDash from '@/app/components/BranchDash'
import Link from 'next/link'
import { useUserContext } from '@/app/context/userContex'
import TpmReAlocateModal from '@/app/components/TpmReAlocateModal'

function Admin() {

  const {user}=useUserContext()

  const [isActiveComponet, setIsActiveComponet]=useState('')

  const[openModat,setOpenModal]=useState<boolean>(false)


  if(isActiveComponet =="account") return <Account/>
  if(isActiveComponet =="admin") return <BranchDash/>

    const branch = user?.userbranch

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
   
    <div className="bg-white p-8 shadow-md rounded max-w-xl md:max-w-2xl w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Select option</h1>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <button onClick={()=>setIsActiveComponet("account")}  className=" items-center justify-center flex flex-col bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0 w-full">
  
          <Cog8ToothIcon className="h-12 w-12 md:h-24 md:w-24"/>
            Settings
        </button>
        <button  onClick={()=>setIsActiveComponet("admin")} className=" items-center justify-center flex flex-col bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0 w-full">
            <ChartPieIcon className="h-12 w-12 md:h-24 md:w-24"/>
            Admin DashBoard
        </button>
        <button  onClick={()=>setOpenModal(true)} className=" items-center justify-center flex flex-col bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0 w-full">
            <UsersIcon className="h-12 w-12 md:h-24 md:w-24"/>
            Tpm Re-Alocate
        </button>

        <Link href={`/monitor/${branch}`} className=" items-center justify-center flex flex-col bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
        <ComputerDesktopIcon className="h-12 w-12 md:h-24 md:w-24"/>
            Go Live
        </Link>
        </div>

    </div>

    {
      openModat && 
    <TpmReAlocateModal setOpenModal={setOpenModal}/>
    }
    </main>
  )
}

export default Admin