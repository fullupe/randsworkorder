"use client"
import React, { useEffect, useState } from 'react';
import {CalculatorIcon } from '@heroicons/react/24/outline'
import { useUserContext } from '@/app/context/userContex'

import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from  'react-loader-spinner';


import { useGetUsers } from '../hooks/useGetUsers';
import { Select, SelectItem } from "@tremor/react";

const Base_URL:string = process.env.NEXT_PUBLIC_BASE_URL_USER as string


type Props = {
   
}

function ManageUserAccount({}: Props) {

    const{passCodeFromDatabase}=useGetUsers()

    const[Loading, SetLoading] = useState<boolean>(false);


    const [errorPass,setErrorPass]=useState<string>()

    const {user}=useUserContext()
    const [activeUserBranch,setActiveUserBranch]=useState('')
    
    const [userSelected,setUserSelected]=useState('');

    const [newStatus, setNewStatus] = useState(''); // State to track the selected user type

  const handleUserTypeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewStatus(e.target.value);
  };


useEffect(()=>{

  if(user){

    setActiveUserBranch(user.userbranch);
  }

},[])




  const handleResetPassword = () => {

    const user = passCodeFromDatabase.find((user:any) => user.username === userSelected);
        const request = {
            id:user?.id,
            role: user?.role,
            passcode: user?.passcode,
            username:user?.username,
            userbranch:user?.userbranch,
            status:newStatus

          }
        
          var xmlHttp = new XMLHttpRequest()
          xmlHttp.open('POST', `${Base_URL}updatePass`, true) // false for synchronous request
      
          if(xmlHttp.readyState==1){
            SetLoading(true)
          }else {
            SetLoading(false)
          }
      
          xmlHttp.send(JSON.stringify(request)) // Make sure to stringify
      
          xmlHttp.onload = function () {
            SetLoading(false)
            // Do whatever with response
            //console.log(request)
            //alert(xmlHttp.responseText)
            toast('Records Updated!', {
              icon: '🚀',
            })
            console.log(xmlHttp.responseText)
            
            setUserSelected("")
            setNewStatus('')
            setErrorPass("")
            //setReflesh(!reflesh)
          }
          xmlHttp.onerror = function () {
            alert(xmlHttp.responseText)
            console.log(request)
          }
   
  }

  return (
    <div>
     <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded-md shadow-md">
      
      <ToastContainer />
      <label className="block mb-1">Select User</label>
                <Select className="z-50 pb-24 flex" value={userSelected} onValueChange={setUserSelected}>
                    {
                        passCodeFromDatabase.filter((val)=>val.userbranch==activeUserBranch).map((val:any)=>(

                    <SelectItem key={val.id}  value={val.username} icon={CalculatorIcon} className="flex" >
                      <div className=" flex ml-4 items-center">
                      <p className=" text-lg uppercase">{val.username}</p>
                      ={'>'}
                        
                      <p className=" flex text-xs italic text-gray-500  ">{val.userbranch}</p>
                      </div>
                    </SelectItem>

                        ))

                    }

                </Select>
   

          <div className="space-x-4">
        {/* Admin Radio */}
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="userType"
            value="true"
            checked={newStatus === 'true'}
            onChange={handleUserTypeChange}
          />
          <span className="ml-2">Active</span>
        </label>

        {/* Receptionist Radio */}
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="userType"
            value='false'
            checked={newStatus === 'false'}
            onChange={handleUserTypeChange}
          />
          <span className="ml-2">InActive</span>
        </label>

      
    <div className="flex justify-centerl items-centerl  w-full">
      <button
      disabled={!newStatus || !userSelected }
        className="bg-orange-500 text-white mt-8 disabled:bg-slate-500 disabled:cursor-not-allowed py-2 flex mr-12 px-4 rounded-md hover:bg-orange-600 transition duration-300"
        onClick={handleResetPassword}
      >
        Action
      </button>
      {Loading && 

    <ColorRing
    visible={true}
    height="60"
    width="60"
    ariaLabel="blocks-loading"
    wrapperStyle={{ marginTop:"20"}}
    wrapperClass="blocks-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />

  
  }

</div>
</div>   
 </div>
    </div>
  )
}

export default ManageUserAccount