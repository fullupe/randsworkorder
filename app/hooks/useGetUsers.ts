
import { useEffect, useState } from "react"
interface passData {
    id:string,
    role:string,
    passcode:string,
    username:string,
    userbranch:string,
    status:boolean
    }


export const useGetUsers=()=>{

    const Base_URL:string = process.env.NEXT_PUBLIC_BASE_URL_USER as string


   const [passCodeFromDatabase,setPassCodeFromDatabas]= useState<passData[]>([])

   // getting the users From Database
    function httpGetPassCode(URL: string | URL) {

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', URL, false) // false for synchronous request
    //xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.send(null)
    const ApiPassCodeData = JSON.parse(xmlHttp.responseText)

    //const Data =  await fetch("/api/fetchUsers").then((res)=>res.json().then(data=>data.data))



    setPassCodeFromDatabas(ApiPassCodeData.data)
  }

  useEffect(()=>{
    httpGetPassCode(`${Base_URL}getPass`)
  },[])

        
      
  
    return {passCodeFromDatabase}
  
  }