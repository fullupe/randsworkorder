"use client"


import { useFetchData } from '@/app/hooks/useFetchData'
import { useFetchDataSheet2 } from '@/app/hooks/useFetchDataSheet2'
import React from 'react'

import { columns } from './columns'
import MonitorDataTable from './data-table'



function Monitor({params}:{params:{userbranch:string}}) {

  //const {DataApi}=useFetchData()

  const {DataApi2}=useFetchDataSheet2()
  
  
     const branchInActive = DataApi2.filter((val:any)=>val.branch.toLowerCase() == params.userbranch.toLocaleLowerCase())
     //const branchInActive = branch.filter((val:{ status: string;})=>val.status !=='Already Out')

  return (
   <MonitorDataTable columns={columns} data={branchInActive} branch={params.userbranch}/>
  
  )

}

export default Monitor





