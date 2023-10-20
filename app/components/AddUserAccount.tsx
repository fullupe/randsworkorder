"use client"
import React, {useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from  'react-loader-spinner';
import { Select, SelectItem } from "@tremor/react";


import {CalculatorIcon } from '@heroicons/react/24/outline'
import { useFetchBrache } from '../hooks/useFetchBranch';
let CryptoJS = require("crypto-js");

const Base_URL:string = process.env.NEXT_PUBLIC_BASE_URL_USER as string
const ENCRYTION_KEY:string = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET as string


type Props = {
   
}

function AddUserAccount({}: Props) {
  // Encrypt
  
  const {BranchOffice}=useFetchBrache()
  const[Loading, SetLoading] = useState<boolean>(false);
  
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [userType, setUserType] = useState(''); // State to track the selected user type
  
  
  const cipherPass = CryptoJS.AES.encrypt(passWord, ENCRYTION_KEY).toString();
    
    
    // Handle new users
    const handleNewUserChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    
    const [userBranchOffice, setUserBranchOffice] = useState<string>('')

    
    const handleUserTypeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserType(e.target.value);
    };

    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(e.target.value);
    };



  const handleNewUser = () => {

    const newUser={
        id: uuidv4(),
        role:userType,
        passcode:cipherPass,
        //passcode:passWord,
        username:userName,
        userbranch:userBranchOffice,
        status:true,
    }

    //console.log("user",newUser)

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open('POST', `${Base_URL}addPass`, true) // false for synchronous request

    if(xmlHttp.readyState==1){
        SetLoading(true)
    }else {
        SetLoading(false)
    }

    xmlHttp.send(JSON.stringify(newUser)) // Make sure to stringify

    xmlHttp.onload = function () {
        SetLoading(false)
      // Do whatever with response
      //console.log(request)
      //alert(xmlHttp.responseText)
      toast('Records Added!', {
        icon: '🚀',
      })
      console.log(xmlHttp.responseText)
     
      setUserName("")
      setPassWord("")
      setUserType("")
      setUserBranchOffice("")


    }
    xmlHttp.onerror = function () {
      alert(xmlHttp.responseText)
      //console.log(request)
    }

    }
 //if(!selectBranch) return <SelectBranchModal setSelectbranch={setSelectbranch} selectBranch={selectBranch} label={"Enter"}/>
  return (
    <div>
     <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded-md shadow-md">
      {/* <p className="text-xl font-semibold mb-4">Reset {userType} Password</p> */}
      <ToastContainer />
      <div className="mb-4">
        <label className="block mb-1">User Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          value={userName}
          onChange={handleNewUserChange}
        />
        {/* {errorPass && <p className="text-xs p-1 italic text-red-500">{errorPass}</p>} */}
      </div>
      <div className="mb-4">
        <label className="block mb-1">PassWord</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          value={passWord}
          onChange={handlePasswordChange}
        />
        {/* {errorPass && <p className="text-xs p-1 italic text-red-500">{errorPass}</p>} */}
      </div>

              <label className="block mb-1">Select Branch Office</label>
                <Select className="z-50 pb-24 flex" value={userBranchOffice} onValueChange={setUserBranchOffice}>
                    {
                        BranchOffice.map((val:any)=>(

                    <SelectItem key={val[0]}  value={val[0]} icon={CalculatorIcon}>
                      {val[0]}
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
            value="admin"
            checked={userType === 'admin'}
            onChange={handleUserTypeChange}
          />
          <span className="ml-2">Admin</span>
        </label>

        {/* Receptionist Radio */}
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="userType"
            value="receptionist"
            checked={userType === 'receptionist'}
            onChange={handleUserTypeChange}
          />
          <span className="ml-2">Receptionist</span>
        </label>

        {/* Engineer Radio */}
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="userType"
            value="engineer"
            checked={userType === 'engineer'}
            onChange={handleUserTypeChange}
          />
          <span className="ml-2">Engineer</span>
        </label>
      </div>

      {/* Display selected user type */}
      {userType && <p className="mt-4 ">Selected User Type: {userType}</p>}




    <div className="flex justify-centerl items-centerl  w-full">
      <button
      disabled={!userType || !userBranchOffice || !userName }
        className="bg-orange-500 text-white mt-8 disabled:bg-slate-500 disabled:cursor-not-allowed py-2 flex mr-12 px-4 rounded-md hover:bg-orange-600 transition duration-300"
        onClick={handleNewUser}
      >
        Add User
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
  )
}

export default AddUserAccount