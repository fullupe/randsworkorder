"use client"
import React, { useState } from 'react'

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
   
   

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }
   

function TpmHistoryTable<TData, TValue>({columns,data}: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

   
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        onColumnFiltersChange:setColumnFilters,

        state:{
         columnFilters,
        },
      })

  return (
    <div className="rounded-md border">

        {/* <div className="flex items-center py-4">
            <Input
            placeholder="Filter agent Name"
            value={(table.getColumn("agentName")?.getFilterValue()) as string }
            onChange={(e)=>table.getColumn("agentName")?.setFilterValue(e.target.value)}
            className="max-w-sm"
            />
        </div> */}

        <Table>
            <TableHeader>
            {table.getHeaderGroups().map(headerGroup=>{
                return(
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header=>{
                            return(
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())} 

                                </TableHead>
                            )
                        })}

                    </TableRow>
                )
            })}
            </TableHeader>


            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row=>(
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell=>(
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            </TableRow>
                    ))

                ):(
                    
                null
                    
                    ) }
            </TableBody>
        </Table>


         {/* pagination */}
    <div className="flex items-center justify-start space-x-2 py-4">
      <Button variant="outline" size="sm" onClick={()=>{
          
          table.previousPage()
        }} disabled ={!table.getCanPreviousPage()}>Previous</Button>

      <Button variant="outline" size="sm" onClick={()=>{
          
          table.nextPage()
        }} disabled ={!table.getCanNextPage()}>Next</Button>

        <div className="flex w-full pr-4 justify-center">

        {!table.getRowModel().rows?.length && <p className="flex text-center font-bold font-mono">No Records fund or Terminal NOT in your Branch..</p>}
        </div>
    </div>

    </div>
  )
}

export default TpmHistoryTable