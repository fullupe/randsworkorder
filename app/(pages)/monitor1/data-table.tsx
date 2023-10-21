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


import React, { useEffect, useRef } from 'react'
import { Button } from "@tremor/react"
import { useFetchData } from "@/app/hooks/useFetchData"


const Base_URL:string = process.env.NEXT_PUBLIC_BASE_URL_DATA as string;


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function MonitorDataTable<TData, TValue>({columns,data}: DataTableProps<TData, TValue>) {
  
  const {DataApi,fetchReflesh,setFetchReflesh}=useFetchData()
  
  
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

    return () => clearInterval(scrollInterval);
  },[data]);

  return (
    <div className="" >
    <div className="rounded-md border" >
        <Table className="" >
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
     

           
            {/* <div className="h-24 table-fixed my-12"></div> */}
            {/* const rowClass = row.original.status === 'Ready' ? 'bg-green-900' : ''; */}
           
          <TableBody className="" ref={tableBodyRef} style={{ height: '300px', marginTop: 100, overflowY: 'scroll' }}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row=>{

                // {console.log(row.original.status)}

                                                                                      // @ts-ignore 
                 const rowClass = row.original.status == 'Ready ✅' ? 'bg-[#00C600] text-white ' : // @ts-ignore 
                                  row.original.status == 'Working On' ? 'bg-[#152E61] text-white' : // @ts-ignore 
                                  row.original.status == 'Water Entered' ? 'bg-[#877FBF] text-white' :// @ts-ignore 
                                 
                                  row.original.status == 'On Test' ? 'bg-[#315EA7] text-white' :  // @ts-ignore 
                                  // row.original.status == 'See Management' ? 'bg-red-900' :// @ts-ignore 
                                  row.original.status == 'Waiting for Part' ? 'bg-[#8EEEF7] text-whited' :// @ts-ignore 
                                  
                                  "bg-[#E7223B] text-white "; 
              

                return (

                  

                  <TableRow key={row.id} className={`container`} style={{marginTop:12}}>
                  

                    {row.getVisibleCells().map(cell=>(
                      <TableCell key={cell.id} className={`border-b-2 uppercase  border-red-400 font-bold text-center  ${rowClass}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}

                  </TableRow>
                
              )})

            ):(
              <TableRow>
                  <TableCell>
                    No result
                  </TableCell>
              </TableRow>
            )}

          </TableBody>
      
        </Table>
    </div>

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


