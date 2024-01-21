import { ColumnDef } from "@tanstack/react-table"
import TimeAgo from 'react-timeago'

type  tpmHistoryType ={
    tpm:string,
    agentName:string,
    branch:string,
    problem_desc:string,
    eng:string,
    dateIn:Date,
    dateOut:Date,
    received_by:string,
  }

  export const columns: ColumnDef<tpmHistoryType>[]=[

    {
      header:"TPM",
      accessorKey:"tpm"
    },
    {
      header:"AGENT NAME",
      accessorKey:"agentName"
    },
    {
      header:"BRANCH OFFICE",
      accessorKey:"branch"
    },
    {
      header:"PROBLEM DESC",
      accessorKey:"problem_desc"
    },
    {
      header:"SOLUTION",
      accessorKey:"solution"
    },
    {
      header:"ENGINEER",
      accessorKey:"eng"
    },
    {
        header:"DATE IN",
        accessorKey:"dateIn",
        cell:({row})=>{
            const createdAt = row.getValue("dateIn");
            const formatted  = new Date(createdAt as string)
            return <div className="font-medium">
          {/* {formatted} */}
        <TimeAgo date={formatted}/>
        </div>
      }
    },
    {
        header:"DATE OUT",
        accessorKey:"dateOut",
        cell:({row})=>{
            const createdAt = row.getValue("dateOut");
            const formatted  = new Date(createdAt as string)
            return <div className="font-medium">
          {/* {formatted} */}
        <TimeAgo date={formatted}/>
        </div>
      }
    },
    {
      header:"RECEIVED BY",
      accessorKey:"received_by"
    },
  ]