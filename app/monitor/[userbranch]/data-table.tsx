"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel

  
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import React, { useEffect, useRef, useState } from 'react'

import { ColorRing } from "react-loader-spinner"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  branch:string

}



// const scheduledTimes = ['09:30:AM', '12:30:PM', '02:30:PM', '04:30:PM',      '12:47:AM',   '07:45:PM', '08:15:PM', '10:00:PM',];

// const scheduledMilliseconds = scheduledTimes.map(time => {
//   // Convert each scheduled time to milliseconds since midnight
//   const [hours, minutes, period] = time.split(':');
//   let hours24 = parseInt(hours, 10);
//   if (period === 'PM' && hours24 !== 12) {
//     hours24 += 12; // Convert PM hours to 24-hour format
//   }
//   const milliseconds = (hours24 * 60 + parseInt(minutes, 10)) * 60 * 1000;
//   return milliseconds;
// });

// const getMillisecondsUntilNextScheduledTime = () => {
//   const now = new Date();
//   const nowMilliseconds = now.getHours() * 60 * 60 * 1000 + now.getMinutes() * 60 * 1000 + now.getSeconds() * 1000 + now.getMilliseconds();
//   const nextScheduledTime = scheduledMilliseconds.find(time => time > nowMilliseconds) || scheduledMilliseconds[0];
//   return nextScheduledTime - nowMilliseconds;
// };


function useScheduledState(scheduledTimes:any) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      setIsActive(scheduledTimes.includes(now));
      console.log("every minute",isActive,now)
    };

    const intervalId = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [scheduledTimes]);

  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => setIsActive(false), 20 * 60 * 1000); // Timeout after 20 minutes

      return () => clearTimeout(timeoutId); // Cleanup on state change
    }
  }, [isActive]);

  return isActive;
}





function MonitorDataTable<TData, TValue>({columns,data, branch}: DataTableProps<TData, TValue> ) {
  
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN!

  const [isLive, setIsLive] = useState(false);
  const [livevideoId,setLivevideoId]=useState('')



  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        // Fetch live video status from Facebook Graph API

        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,live_videos{stream_url,status,secure_stream_url,video}&access_token=${ACCESS_TOKEN}`);
        
        const data = await response.json();
        const liveStatus = data.live_videos.data[0].status === 'LIVE';

        //const videoId = data.live_videos.data[0].video.id
        setLivevideoId(data.live_videos.data[0].video.id)
        setIsLive(liveStatus);
      } catch (error) {
        console.error('Error checking live status:', error);
      }
      finally{
        //console.log("ok")
        console.log("live","running")
      }
    };

    // Check live status initially
    checkLiveStatus();

    // Poll every 30 seconds to check live status
    //const intervalId = setInterval(checkLiveStatus, 30000);

    // Clear interval on component unmount
    //return () => clearInterval(intervalId);

  }, []);










  // run diff componet 20

  
  
  const [currentComponent, setCurrentComponent] = useState(1);

  useEffect(() => {
    // Switch to Component2 after 5 minutes
    const componentSwitchTimer = setTimeout(() => {
      setCurrentComponent(2);
    }, 3 * 60 * 1000);

    // Switch back to Component1 after 2 minutes
    const switchBackTimer = setTimeout(() => {
      setCurrentComponent(1);
    }, 4 * 60 * 1000);

    // Clean up timers
    return () => {
      clearTimeout(componentSwitchTimer);
      clearTimeout(switchBackTimer);
    };
  }, [currentComponent]);



  // run diff component
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
    //getPaginationRowModel:getPaginationRowModel()
  })

  //const tableRef:React.MutableRefObject<undefined> = useRef();
  const tableBodyRef: any = useRef();

  useEffect(() => {
    const tableBody: any = tableBodyRef.current;
    const numRows: number = data.length;
    let currentRow: number = 0;

    const scrollInterval: NodeJS.Timeout = setInterval(() => {
      // Scroll to the next row
      if (tableBody && tableBody.children[currentRow]) {
        tableBody.children[currentRow].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
      
      // Increment the current row index, and loop back to the beginning if necessary
      currentRow++;
      if (currentRow >= numRows) {
        currentRow = 0;
      }
      
    }, 2000); // Adjust the scroll interval (in milliseconds) as needed
    
    //window.location.reload();
    return () => clearInterval(scrollInterval);
  },[data]);
  
 // Simulated data source change (replace with your actual data source change logic)
 const simulateDataSourceChange = () => {
  // Simulate data source change after 5 seconds
  setInterval(() => {
    // Reload the current page
  window.location.reload();
  }, 300000); // Adjust the time interval as needed
};

// Use useEffect to listen for data source changes
 useEffect(() => {
  // Call your function to listen for data source changes
  simulateDataSourceChange();
  //window.location.reload();
  
 }, []);


 return (
  <div className=" h-screen w-screen flexl items-center justify-centerj" >

    {isLive ? (
<div>

<iframe 

src={`https://web.facebook.com/plugins/video.php?href=https%3A%2F%2Fweb.facebook.com%2Fnana.gyekye.75470%2Fvideos%2F${livevideoId}%2F&width=1280`} 
width="1280" height="720" 

className="pl-5 pr-5 h-screen w-screen"
allow="autoplay" 
//@ts-ignore
webkitallowfullscreen 
mozallowfullscreen 

allowFullScreen>

</iframe>
            
</div>
       
      ) : (
    <div className="rounded-md border" >

             
             {
               currentComponent === 1 ? (

        <Table className=" mt-10" >
          <TableHeader className=" " >
            {table.getHeaderGroups().map(headerGroup=>{

              return(
                <>
                <TableRow key={headerGroup.id} className="bg-blue-700 fixed top-0   w-screen ">
                  
                    {headerGroup.headers.map(header=>{
                      return(
                        <TableHead key={headerGroup.id} className=" font-bold uppercase w-screen text-center text-white items-center justify-center  ">

                          {flexRender(header.column.columnDef.header, header.getContext())}

                        </TableHead>
                      )
                    })}
                </TableRow>

                </>
              )
            })}
        
          </TableHeader>





             
           
          <TableBody className="" ref={tableBodyRef} style={{ height: '300px', marginTop: 100, overflowY: 'scroll' }}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row=>{

                                                                                      // @ts-ignore 
                 const rowClass = row.original.status == 'Ready ✅' ? 'bg-[#00C600] text-white' : // @ts-ignore 
                                  row.original.status == 'Working On' ? 'bg-[#152E61] text-white' : // @ts-ignore 
                                  row.original.status == 'Water Entered' ? 'bg-[#877FBF] text-white' :// @ts-ignore 
                                 
                                  row.original.status == 'On Test' ? 'bg-[#315EA7] text-white' :  // @ts-ignore 
                                  // row.original.status == 'See Management' ? 'bg-red-900' :// @ts-ignore 
                                  row.original.status == 'Waiting for Part' ? 'bg-[#8EEEF7] text-whited' :// @ts-ignore 
                                  
                                  "bg-[#E7223B] text-white "; 


                                  
              

                                  

                return (

                  

                  <TableRow key={row.id} className={`container`} style={{marginTop:12}}>
                  

                    {row.getVisibleCells().map(cell=>(
                      <TableCell key={cell.id} className={`border-b-2 uppercase lg:text-2xl border-red-400 font-semibold text-center  ${rowClass}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}

                  </TableRow>
                
              )})

            ):(
              <TableRow className={` items-center justify-center w-full flexs`}>
                  <TableCell className="w-full items-center justifycenter bg-gray-200 min-h-screen">
                  <div className="text-center flex flex-col w-full items-center justify-center min-h-screen" >
                
                  <ColorRing
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{ marginTop:"20"}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  />

                  <p className="text-center text-6xl font-extrabold tracking-[10px] italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-bounce uppercase">{branch} office</p>
                              
                   
              </div>    
                  </TableCell>
              </TableRow>
            )}



          </TableBody>



      
        </Table>
              ):(
                <div>

                {/* <iframe  allow="autoplay"  className="pl-5 pr-5 h-screen w-screen" src="https://player.vimeo.com/video/923380340?h=0187f1938d?autoplay=1&loop=10&autopause=0&muted=0" > */}
                <iframe   className="pl-5 pr-5 h-screen w-screen" 
                src="https://player.vimeo.com/video/923380340?autoplay=1&loop=1&autopause=0&muted=1" 
                allow="autoplay" 
                //@ts-ignore
                webkitallowfullscreen 
                mozallowfullscreen 
                allowFullScreen >
                   
                    </iframe>


                </div>
                )}

    </div>
      )}

    {/* pagination */}
    {/* <div className="flex items-center justify-start space-x-2 py-4">
      <Button variant="light" size="md" onClick={()=>{
     
        table.previousPage()
      }} disabled ={!table.getCanPreviousPage()}>Previous</Button>

      <Button variant="light" size="md" onClick={()=>{

        table.nextPage()
      }} disabled ={!table.getCanNextPage()}>Next</Button>

    </div> */}
    
    </div>
  )
}

export default MonitorDataTable; 


