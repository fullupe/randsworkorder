
import { useEffect, useState } from "react"

export const useFetchHistoryData=()=>{

    const [fetchRefleshHistory, setFetchRefleshHistory] = useState<boolean>(false)

    const [TpmHistoryData, setTpmHistoryData] = useState<any>([])

    async  function httpGet() {


    const ApiData =  await fetch("/api/fetchTpmHistoryData").then((res)=>res.json().then(data=>data.data))

    setTpmHistoryData(ApiData)
    
    
  }

  useEffect(() => {
    
    httpGet()

  },[fetchRefleshHistory])


  return {TpmHistoryData,fetchRefleshHistory, setFetchRefleshHistory}

}