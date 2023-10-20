
import { NextResponse } from "next/server"

const Base_URL:string = process.env.NEXT_PUBLIC_BASE_URL_USER as string

export async function GET(req: Request, res: Response){

    const response = await fetch(`${Base_URL}getPass`,{ cache: 'no-store' })
    const sheet2Data = await response.json()
    
return new Response(JSON.stringify(sheet2Data))

}





