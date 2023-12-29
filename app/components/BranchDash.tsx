"use client"
import React, { useEffect, useState } from 'react'

import { BarList, Card, Title, Bold, Flex, Text, Metric, CategoryBar, Legend,DonutChart,} from "@tremor/react";
import { useFetchData } from '../hooks/useFetchData';
import { useUserContext } from '../context/userContex';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useFetchDataSheet2 } from '../hooks/useFetchDataSheet2';
import { useFetchHistoryData } from '../hooks/useFetchHistoryData';

function Dashboard() {

  const {user,setUser}=useUserContext()

 // @ts-ignore
    //const branchName = user.userbranch


  const [reloadpage, setReloadpage]=useState(false)

  const [activeUserBranch,setActiveUserBranch]=useState('')

  const [filtedBrach, SetFiltedBrach]=useState([])

  const [filtedBrach_Problem, SetfiltedBrach_Problem]=useState([])
  const [dailyTpmReceived, setDailyTpmReceived] = useState<string[]>([])
  const [dailyTpmRepaired, setDailyTpmRepaired] = useState<string[]>([])

  const {DataApi}=useFetchData()

  const {DataApi2}=useFetchDataSheet2()
  const {TpmHistoryData}=useFetchHistoryData()

  

  useEffect(()=>{

      const getUserBranch= async ()=>{

      const filted =  await DataApi.filter((val:{branch:string})=>val.branch == activeUserBranch)
      SetFiltedBrach(filted);
      const filtedSheet2DataByBranch = await  DataApi2.filter((val:{branch:string})=>val.branch === activeUserBranch)
      const filtedHistoryDataByBranch = await TpmHistoryData.filter((val:{branch:string})=>val.branch === activeUserBranch)
      
      SetfiltedBrach_Problem(filtedSheet2DataByBranch)

      //const currentDate = new Date().toISOString().split('T')[0];
      const currentDate = new Date();

      // Merge two arrays
          const mergedArray = [...filtedSheet2DataByBranch, ...filtedHistoryDataByBranch];
          // Filter by the current date
          const filteredArray = mergedArray.filter((item) => new Date(item.createdAt).toLocaleDateString() == currentDate.toLocaleDateString());
          

        const filteredArrayHistory = filtedHistoryDataByBranch.filter((item:any) => new Date(item.createdAt).toLocaleDateString() == currentDate.toLocaleDateString());

         // Remove duplicates based on the 'id' property
         const uniqueArray = Array.from(new Set(filteredArray.map((item) => item.tpm))).map(
           (tpm) => filteredArray.find((item) => item.tpm == tpm)
         );

          setDailyTpmReceived(uniqueArray);
          setDailyTpmRepaired(filteredArrayHistory)
    }
  
    getUserBranch()
   },[reloadpage])
 

   useEffect(()=>{

    if(user){
  
      setActiveUserBranch(user.userbranch);
    }
  
  },[])


  //groupBy problem
  const result2 = filtedBrach_Problem.reduce(function(r: { [x: string]: any[]; }, a: { status: string | number; }){
    r[a.status]=r[a.status] || [];
    r[a.status].push(a);
    return r;

  },Object.create(null));

   const newdata2 = Object.entries(result2)



 // total Tpm 
  const TotalTpm = filtedBrach.length;


  //   working tpm
 const TotalWorkingTpm = filtedBrach.filter((record: { status: string; })=>{

 return record.status=="Already Out"

})

const Active = TotalWorkingTpm.length
const Inactive = TotalTpm - TotalWorkingTpm.length;


 const problems1 = newdata2.map((val)=>{
  return {
    name:val[0],
    value:val[1].length,
    href:"false",
    icon:function uyo(){
      return null
    }
  }
 })

  

  const activities = [
    {
      active: "Active",
      count: Active,
    },
    {
      inactive: "Inactive",
      count: Inactive,
    },
  ]


  return (
    <div className="flex flex-col min-h-screen w-full items-center m-auto bg-[#16113A]">
  
    <div className="flex flex-col w-full ">


      <div className="flex  md:flex w-full min-h-screen ">

    
   
   
        <div className="w-full flex flex-col">


    <p className="flex justify-center items-center uppercase  mt-4  text-white">{activeUserBranch} <span className="mx-2 uppercase text-white ">office</span></p>
    <hr className="flex bg-gray-300 h-0.5 mt-2 "/>
    <div className="flex flex-wrap md:flex-rowd w-full justify-center items-center md:items-baseline text-white  ">

    <Card className="max-w-sm m-3 h-[400px] bg-[#262951]">
    <Text className="text-white text-[10px] font-bold">{activeUserBranch} - {new Date().toLocaleDateString()} <span className="decoration-inherit">(Tpm Maintenance)</span> </Text>
    

    <Metric className="text-white text-[16px] mt-10 font-mono font-light">   Received: <small className="text-bold text-3xl mr-4">{dailyTpmReceived.length}</small>ToDay</Metric>
    <Metric className="text-white text-[16px] mt-10 font-mono font-light"> Repaired: <small className="text-bold text-3xl mr-4">{dailyTpmRepaired.length}</small>ToDay</Metric>
    <Metric className="text-white text-[16px] mt-10 font-mono font-light"> In Maint: <small className="text-bold text-3xl mr-4">{dailyTpmReceived.length-dailyTpmRepaired.length}</small>ToDay</Metric>
       
   

  </Card>


  <Card  className="max-w-sm m-3 text-4xl font-extrabold   h-[400px] bg-[#262952]">
    <Title className="text-white">Problem Descriptions</Title>

    <Flex color={'violet'} className="my-1">
      <Text >
        <Bold className="text-gray-400">Problem</Bold>
      </Text>
      <Text >
        <Bold className=" text-gray-400">Qnt</Bold>
      </Text>
      </Flex>
    <BarList  data={problems1}  color="orange" className=" uppercase italic text-black "/>
  </Card>
    </div>
      <hr className="flex bg-gray-300 h-0.5 mt-2 "/>

    <div className="flex flex-col-reverse w-full justify-center items-center py-2">

      <p className="text-white text-xs  capitalize ">reload</p>
      <ArrowPathIcon  onClick={()=>setReloadpage(!reloadpage)} className="w-8 h-8 text-white hover:rotate-90 transition duration-300 hover:text-orange-400 cursor-pointer"/>

    </div>


    </div>
    </div>
      </div>
      </div>
  
  )
}

export default Dashboard
