import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { useFetchData } from '../hooks/useFetchData';
import { ToastContainer, toast } from 'react-toastify';
import { useChangeStatus } from '../hooks/useChangeStatus';

type Props = {}

function TpmReAlocate({}: Props) {

    const [newAgent, setNewAgent] = useState('');

    const [input,setInput]=useState('');
    const [tpmInfo, setTpmInfo] = useState<any>('')
    const {DataApi,fetchReflesh,DataApiBranchOnly,setFetchReflesh}=useFetchData()

    const {updateRealocate}=useChangeStatus()

    //console.log(DataApi)

    const handleSearch =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const foundItem = DataApiBranchOnly.find((val: { tpm: string }) => val.tpm == input);


    if (foundItem) {
      // Match found
      setTpmInfo(foundItem);

      toast('Record Found!', {
        icon: '🚀',
      })
    
    } else {
      // No match found
      toast(`Tpm ${input} is Not a Valid Terminal in Your Branch`, {
        toastId: 'error',
        icon: '🚀',
      });
    }


    }
  
  
    const handleSubmit = (e:any)=>{
      e.preventDefault()
      const request = {
        tpm: tpmInfo.tpm,
        agentName: newAgent, // update here
        status: 'Working On',
        branch: tpmInfo.branch,  
        createdAt: new Date(),
        ruser:tpmInfo.ruser,
      }
  
      updateRealocate(request)
     
  
      setFetchReflesh(!fetchReflesh)


  }
  return (
    <div className="bg-white p-2 rounded-lg h-full flex flex-col ">

           <p className="text-2xl font-bold tracking-[4px] mb-4">
              
                Re-Allocation
            
             </p>
             <ToastContainer />

             <form onSubmit={handleSearch} className="flex items-center mt-3 space-x-3f mb-4">
            <div className="flex w-45 bg-white border-2 border-green-900 rounded-full items-center overflow-hidden">

              <div className=" h-full bg-blue-900h mx-1 rounded-l-full ">

                <p className="text-gray-500 mx-2  text-lg">Tpm</p>
          
              </div>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={5}
                type="numeric"
              
                autoFocus={true}
                placeholder="Enter Tpm#"
                className=" px-2 pl-5 italic w-44 flex-1  rounded-full bg-gray-100 text-black outline-none placeholder:text-xs"
              />

             

              <button
                type="submit"
               
                disabled={!input}
                className="bg-transparent  hover:bg-blue-500 disabled:text-gray-800 text-white font-semibold hover:text-white py-0 ml-2 px-2  border-white hover:border-transparent"
              >
                <MagnifyingGlassIcon className=" h-8 w-8 p-1 text-black disabled:text-gray-800" />
              </button>
            </div>
          </form>





         <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="tpmNumber" className="block text-gray-700 text-sm font-bold mb-2">
          TPM Number
        </label>
        <p className=" px-4 bg-gray-900 py-1 rounded-lg text-white shadow-lg border-2 border-white opacity-60">
                {/* Retailer Name:{' '} */}
                <small className="ml-2 text-center uppercase ">
                  {tpmInfo.tpm}
                </small>
                </p>
      </div>
      <div className="mb-4 flex w-full">

          <div className="flex flex-col w-full">
        <label htmlFor="agentName" className="block text-gray-700 text-sm font-bold mb-2">
          Agent Name
        </label>
        <p className=" px-4 py-1 bg-gray-900 rounded-lg text-white shadow-lg border-2 border-white opacity-60">
                {/* Retailer Name:{' '} */}
                <small className="ml-2 text-center uppercase ">
                  {tpmInfo.agentName}
                </small>
                </p>
        </div>

        <div className="flex flex-col w-full">
        <label htmlFor="agentName" className="block text-gray-700 text-sm font-bold mb-2">
          New Agent Name
        </label>
              <div className=" px-0 bg-gray-900d rounded-lg text-black shadow-lg border-2 border-white opacity-60">
                {/* Retailer Name:{' '} */}
                <small className="ml- text-center uppercase ">
                 
                  <input placeholder="New Agent Name" onChange={(e)=>setNewAgent(e.target.value)} className=" w-full px-3 font-bold py-1 border border-red-900 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"/>
                </small>
            </div>

        </div>

      </div>

      <div className="mb-4">
        <label htmlFor="branchOffice" className="block text-gray-700 text-sm font-bold mb-2">
          Branch Office
        </label>
        <p className=" px-4 py-1 bg-gray-900 rounded-lg text-white shadow-lg border-2 border-white opacity-60">
                {/* Retailer Name:{' '} */}
                <small className="ml-2 text-center uppercase ">
                  {tpmInfo.branch}
                </small>
                </p>
      </div>
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-400"
      >
        Update
      </button>
    </form>

    </div> 
  )
}

export default TpmReAlocate