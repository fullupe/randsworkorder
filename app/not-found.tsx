import { Button } from '@/components/ui/button'
import Link from 'next/link';
import Image from 'next/image'
import React from 'react'

interface Props {
    
}

export default function NotFound (props: Props) {
    return (

        <main className=" flex flex-col justify-center items-center h-screen">

        <div className="flex inset-0 -z-10 blur-md aria-hidden:true absolute ">
                <div
                className=""
                />

        <div className="flex  flex-col w-full mx-auto justify-center md:flex-row items-center h-screen md:h-[80%] md:w-[80%]">




           <div className="flex h-[50%] w-full items-center bg-red-900 bg-[url('/404.svg')] bg-center bg-cover ">
               
           </div>


           <div className="flex h-[50%] w-full items-center bg-blue-800 bg-[url('/dollar.svg')] bg-center bg-cover">
               
               
            </div>

        </div>

        </div>

        <div className="flex  flex-col w-full justify-center md:flex-row items-center h-screen md:h-[80%] md:w-[80%]">




           <div className="flex flex-col justify-center  h-[50%] w-full  items-center bg-red-900/10 ">
               <div className="flex animate-ping">
               <Image width={90} height={90} className="mb-8" src="/logo.png" alt="log"/>
               </div>

               <div className="flex text-2xl justify-center items-center  py-2 bg-black/10">
                    <p className=" justify-center items-center text-center capitalize text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 animate-bounce flex ">sorry the page You are Looking for  does NOT Exist</p>
               </div>
           </div>


           <div className="flex h-[50%] w-full items-center justify-center bg-blue-800/10">

           <div className="flex">
               <Button variant="ghost">
                    <Link className="text-2xl" href="/">Home</Link>
               </Button>
            </div>
               
            </div>

        </div>


    </main>
    )
}
