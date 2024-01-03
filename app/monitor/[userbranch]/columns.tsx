import { ColumnDef } from "@tanstack/react-table"
import TimeAgo from 'react-timeago'


type  monitoType ={
  tpm:string,
  agentName:string,
  status:string,
  branch:string,
  createdAt:Date
}

export const columns: ColumnDef<monitoType>[]=[

  {
    header:"TPM",
    accessorKey:"tpm"
  },
  {
    header:"AGENT Name",
    accessorKey:"agentName"
  },
  {
    header:"STATUS",
    accessorKey:"status"
  },
  {
    header:"BRANCH OFFICE",
    accessorKey:"branch"
  },
  {
    header:"received by ",
    accessorKey:"ruser"
  },
  {
    header:"DATE",
    accessorKey:"createdAt_In",
    cell:({row})=>{
      const createdAt = row.getValue("createdAt_In");
      const formatted  = new Date(createdAt as string)
      return <div className="font-medium">
        {/* {formatted} */}
      <TimeAgo date={formatted}/>
      </div>
    }
  },
  
]