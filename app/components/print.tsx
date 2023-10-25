import React from 'react'

type Tprops={
    tpm:string,
    problem:string[],
    receivedBy:string,
    componentRef:any,
    agentName:string
}

type value={
item:string
}
function PrintProDesc({tpm,problem,agentName, receivedBy,componentRef}:Tprops) {

  let currentData = new Date().toDateString()

  return (

    <div style={{display: 'none'}}>
        <div ref={componentRef} className="w-full flex flex-col space-y-2 justify-center items-center border-2 border-black border-dotted text-black">
        <p className="flex font-bold uppercase underline">R$S Lotto Office</p>

        <p>TPM: {tpm}</p>
        <p>Agent Name: {agentName}</p>

        <div className="flex flex-col  items-center">
        <p className="text-xs underline italic font-bold">Problem Description</p>
        <div  className="flex flex-col items-start w-full ">
        {
            problem.map((item:any,i:number)=>(
                <p className="font-bold italic">({i+1}) {item.value}</p> 
                ))
            }
            </div>
        </div>

        <p className="text-sm">Received BY : <span>{receivedBy}</span></p>
        <p className="text-sm">Date: <span>{currentData}</span></p>
        </div>
        
        
    </div>
  )
}

export default PrintProDesc