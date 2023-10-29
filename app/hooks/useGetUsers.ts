
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

    //const Base_URL:string = process.env.NEXT_PUBLIC_BASE_URL_USER as string


   const [passCodeFromDatabase,setPassCodeFromDatabas]= useState<passData[]>([])

   // getting the users From Database
   async  function httpGetPassCode() {
  //  async  function httpGetPassCode(URL: string | URL) {

    // var xmlHttp = new XMLHttpRequest()
    // xmlHttp.open('GET', URL, false) // false for synchronous request
    // xmlHttp.send(null)
    // const ApiPassCodeData = JSON.parse(xmlHttp.responseText)

    const ApiPassCodeData =  await fetch("/api/fetchUsers").then((res)=>res.json().then(data=>data.data))



    setPassCodeFromDatabas(ApiPassCodeData)
  }

  useEffect(()=>{
    httpGetPassCode()
    // httpGetPassCode(`${Base_URL}getPass`)
  },[])

        
      
  
    return {passCodeFromDatabase}
  
  }