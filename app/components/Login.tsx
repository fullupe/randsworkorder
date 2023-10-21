"use client"

import React, {useState } from 'react'

import {useRouter } from 'next/navigation'
import { useGetUsers } from '../hooks/useGetUsers';
import {useUserContext} from "../../app/context/userContex"
import { ColorRing } from  'react-loader-spinner';

let CryptoJS = require("crypto-js");
const ENCRYTION_KEY:string = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET as string

type Props ={
    role?:string
    setRole?:(role:string)=>void
}
type user={
    id: string;
    role:string;
    passcode:string;
    username:string;
    userbranch:string;
    status: string;
}

function Login({}:Props) {

    // Decrypt
    const decrypt=(userPass:string)=>{
        const bytes  = CryptoJS.AES.decrypt(userPass, ENCRYTION_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        return originalText;

    }


    const {setUser,setIsAuth,isAuth}=useUserContext()

    const{passCodeFromDatabase}=useGetUsers()

    const router = useRouter()

    const [providedPass, setProvided]=useState('')
    const [providedUser, setProvidedUser]=useState('')

    //console.log(user.username)

  const [error, setError]=useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

      const user:user | any = passCodeFromDatabase.find((user) => user.username.toLowerCase() === providedUser.toLowerCase() && decrypt(user.passcode) === providedPass);

      
      if(user?.role == "receptionist" && user.status){ 
          setIsAuth(true)
          setUser(user)
          
          router.push("/receiptionist")
          
        }else if(user?. role == "engineer" && user.status) {
            setIsAuth(true)
            setUser(user)
            router.push("/engineer")
            
        }else if(user?.role == "admin" && user.status ){ 
            setIsAuth(true)
            setUser(user)
            router.push("/admin")
            
        } else
        
        if(!providedPass && !user?.passcode){
            setError("Please Enter Password and UserName")
        } else
        if(providedPass !== user?.passcode ){
            
            setError("Wrong Password Or User")
        }
        else if(!user?.status){
            setError(" Account is Inactive")
        }
    
    }


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-8 shadow-md rounded max-w-md w-full">
        <div className="flex  items-center justify-between">
        <h1 className="text-2xl font-bold mb-6 capitalize flex-1 ">Login As <span className="text-xs border-b pb-1 border-gray-300 text-gray-600 ">
            </span></h1>

           


        </div>
        <form onSubmit={handleLogin}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    User Name
                </label>
                <input value={providedUser} onChange={(e)=>setProvidedUser(e.target.value)} className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                    id="username" type="text" placeholder="Enter your Username"/>

            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input value={providedPass} onChange={(e)=>setProvided(e.target.value)} className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                    id="password" type="password" placeholder="Enter your password"/>
            <p className=" flex mt-2  text-center w-full items-center justify-center text-xs text-red-900">{error}</p>

            </div>

            <div className="flex w-full items-center justify-center">
            {isAuth && 
            <ColorRing
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{ marginTop:"0"}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
                }
            </div>

            <div className="flex gap-2">
            <button type="button"   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Login
            </button>

            </div>

        </form>
    </div>
</div>
  )
}

export default Login

