
import { NextResponse } from "next/server"

const URL:string = process.env.NEXT_PUBLIC_BASE_URL_DATA as string

export async function GET(req: Request, res: Response){

    const response = await fetch(`${URL}getDataFromSheet2`,{ cache: 'no-store' })
    const sheet2Data = await response.json()
    
return new Response(JSON.stringify(sheet2Data))

}


// export async function POST(req: Request, res: Response){

//     const body = await req.json()

//     return new Response("hello")
// }


