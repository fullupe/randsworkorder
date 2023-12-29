
import { useState } from "react"
import { toast } from "react-toastify";


type Props = {
    tpm: string;
    agentName: string;
    status: string;
    branch: string;
    createdAt: Date;

}

type HistoryProps = {
  tpm: string;
  agentName: string;
  branch: string;
  problem_desc:string;
  eng:string,
  dateIn:Date;
  dateOut:Date;
  received_by:string;
}

type DeletProps={
  tpm:string
}

const Base_URL:string = process.env.NEXT_PUBLIC_BASE_URL_DATA as string;

export const useChangeStatus=()=>{


  const [Loading, SetLoading] = useState<boolean>(false);

  const add_To_Sheet2=  (request:Props)=>{
    
    const xmlHttp = new XMLHttpRequest()
      xmlHttp.open('POST', `${Base_URL}addDataToSheet2`, true) // false for synchronous request
   
    if(xmlHttp.readyState==1){
      SetLoading(true)
    }else {
      SetLoading(false)
    }

     xmlHttp.send(JSON.stringify(request)) // Make sure to stringify
    
    xmlHttp.onload = function (){
    
        SetLoading(false)
    

      toast('Records Updated!', {
        icon: '🚀',
      })
    }
    
    xmlHttp.onerror = function () {
   
      //console.log(xmlHttp.responseText)
    }
   

 }

 const addToHistory=  (history:HistoryProps)=>{
    
  const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('POST', `${Base_URL}addTpmHistory`, true) // false for synchronous request
 
  if(xmlHttp.readyState==1){
    SetLoading(true)
  }else {
    SetLoading(false)
  }

   xmlHttp.send(JSON.stringify(history)) // Make sure to stringify
  
  xmlHttp.onload = function (){
  
      SetLoading(false)
  

    toast('Records Updated!', {
      icon: '🚀',
    })
  }
  
  xmlHttp.onerror = function () {
 
    //console.log(xmlHttp.responseText)
  }
 

}




  const delete_From_Sheet2= (request:DeletProps)=>{
    
    const xmlHttp = new XMLHttpRequest()
      xmlHttp.open('POST', `${Base_URL}deleteDataFromSheet2`, true) // false for synchronous request
   
    if(xmlHttp.readyState==1){
      SetLoading(true)
    }else {
      SetLoading(false)
    }

     xmlHttp.send(JSON.stringify(request)) // Make sure to stringify
    
    xmlHttp.onload = function (){
    
        SetLoading(false)
    

      toast('Records Updated!', {
        icon: '🚀',
      })
      
    }
    
    xmlHttp.onerror = function () {
   
      //console.log(xmlHttp.responseText)
    }
   

 }
 
  const updateSheet2_Status=  (request:Props)=>{
    
    const xmlHttp = new XMLHttpRequest()
      xmlHttp.open('POST', `${Base_URL}upDateSheet2`, true) // false for synchronous request
   
    if(xmlHttp.readyState==1){
      SetLoading(true)
    }else {
      SetLoading(false)
    }

     xmlHttp.send(JSON.stringify(request)) // Make sure to stringify
    
    xmlHttp.onload = function (){
    
      SetLoading(false)
      toast('Records Updated!', {
        icon: '🚀',
      })
      
    }
    
    xmlHttp.onerror = function () {
   
      //console.log(xmlHttp.responseText)
    }
   

 }
  const updateRealocate=  (request:Props)=>{
    
    const xmlHttp = new XMLHttpRequest()
      xmlHttp.open('POST', `${Base_URL}upDate`, true) // false for synchronous request
   
    if(xmlHttp.readyState==1){
      SetLoading(true)
    }else {
      SetLoading(false)
    }

     xmlHttp.send(JSON.stringify(request)) // Make sure to stringify
    
    xmlHttp.onload = function (){
    
      SetLoading(false)
      toast('Records Updated!', {
        icon: '🚀',
      })
      
    }
    
    xmlHttp.onerror = function () {
   
      //console.log(xmlHttp.responseText)
    }
   

 }



    return { Loading,SetLoading,add_To_Sheet2,delete_From_Sheet2,updateSheet2_Status,updateRealocate,addToHistory}

}