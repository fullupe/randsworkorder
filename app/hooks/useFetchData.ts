import { useEffect, useState } from "react"
import { useUserContext } from "../context/userContex"
import { useChangeStatus } from "./useChangeStatus"

//const URL:string = process.env.NEXT_PUBLIC_BASE_URL_DATA as string

export const useFetchData=()=>{

  const {user}=useUserContext()

    const [fetchReflesh, setFetchReflesh] = useState<boolean>(false)

    const [activeUserBranchName,setActiveUserBranchName]=useState('')

     useEffect(()=>{
        if(user){
          setActiveUserBranchName(user.userbranch)
        }
  
  },[])

    const [DataApi, setDataApi] = useState<any>([])
    const [DataApiBranchOnly, setDataApiBranchOnly] = useState<any>([])

    async function httpGet() {

      // var xmlHttp = new XMLHttpRequest()
      // xmlHttp.open('GET', `${URL}getData`, false) // false for synchronous request
      // xmlHttp.send(null)
      // const ApiData = JSON.parse(xmlHttp.responseText)
  
  
      const ApiData =  await fetch("/api/fetchMainData").then((res)=>res.json().then(data=>data.data))
      const branchDAta = ApiData.filter((B_data:{branch:string})=>B_data.branch == activeUserBranchName)
  
      setDataApi(branchDAta)
      setDataApiBranchOnly(ApiData)
  }

  useEffect(() => {
    
    httpGet()

  }, [fetchReflesh])


  return {DataApi,fetchReflesh, DataApiBranchOnly, setFetchReflesh}

}