
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useUserContext } from '../context/userContex';


const URL:string = process.env.NEXT_PUBLIC_BASE_URL_DATA as string

type Props = {}

function TpmNewAlocate({}: Props) {

  const {user,setUser}=useUserContext()

// @ts-ignore
  const userbranch = user.userbranch

  const [tpmNumber, setTpmNumber] = useState('');
  const [agentName, setAgentName] = useState('');
  const [branchOffice, setBranchOffice] = useState('');
  const [loading,setLoading]=useState(false)


  useEffect(() => {
    setBranchOffice(userbranch)
   
  }, [user])

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const request = {
      tpm: tpmNumber,
      agentName: agentName,
      status: 'Already Out',
      branch: userbranch,
      ruser:"office",
      createdAt: new Date(),
      
    }

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open('POST', `${URL}addData`, true) // false for synchronous request

    if(xmlHttp.readyState==1){
      setLoading(true)
    }else {
      setLoading(false)
    }

    xmlHttp.send(JSON.stringify(request)) // Make sure to stringify

    xmlHttp.onload = function () {
      setLoading(false)
      // Do whatever with response
      //console.log(request)
      //alert(xmlHttp.responseText)
      toast('Records Added!', {
        icon: '🚀',
      })
      console.log(xmlHttp.responseText)
      setTpmNumber("")
      setAgentName("")
      //setBranchOffice("")
      
    }
    xmlHttp.onerror = function () {
      alert(xmlHttp.responseText)
      //console.log(request)
      
    }

      
  }
   

    //setFetchReflesh(!fetchReflesh)


  
  return (
   <div className="bg-white p-2 rounded-lg h-full flex flex-col ">

           <p className="text-2xl font-bold tracking-[4px] mb-4">
              
                    New Allocation
               </p>
               <ToastContainer />

         <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="tpmNumber" className="block text-gray-700 text-sm font-bold mb-2">
          TPM Number
        </label>
        <div className=" px-0 bg-gray-900d rounded-lg text-black shadow-lg border-2 border-white opacity-60">
              
                <small className="ml- text-center uppercase ">
               
                  <input maxLength={5}
                type="numeric"
                 value={tpmNumber} placeholder="Tpm Number" onChange={(e)=>setTpmNumber(e.target.value)} className=" w-full px-3 font-bold py-1 border border-red-900 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"/>
                </small>
            </div>
      </div>
      <div className="mb-4">
        <label htmlFor="agentName" className="block text-gray-700 text-sm font-bold mb-2">
          Agent Name
        </label>
        <div className=" px-0 bg-gray-900d rounded-lg text-black shadow-lg border-2 border-white opacity-60">
            
                <small className="ml- text-center uppercase ">
            
                  <input value={agentName} placeholder="New Agent Name" onChange={(e)=>setAgentName(e.target.value)} className=" w-full px-3 font-bold py-1 border border-red-900 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"/>
                </small>
            </div>
      </div>
      <div className="mb-4">
        <label htmlFor="branchOffice" className="block text-gray-700 text-sm font-bold mb-2">
          Branch Office
        </label>
        <div className=" px-0 bg-gray-900d rounded-lg text-black shadow-lg border-2 border-white opacity-60">
              
                <small className="ml- text-center uppercase ">
               
                  <input readOnly value={branchOffice} placeholder="Branch Office" onChange={(e)=>setBranchOffice(e.target.value)} className=" w-full px-3 font-bold py-1 border border-red-900 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 bg-gray-400"/>
                </small>
            </div>
      </div> 
      <button
        type="submit"
        disabled={!tpmNumber || !agentName || !branchOffice }
        className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-orange-400"
      >
        Submit
      </button>
    </form>

    </div> 
  )
}

export default TpmNewAlocate