
import { NextResponse } from "next/server"

const URL:string = process.env.NEXT_PUBLIC_BASE_URL_DATA as string

export async function GET(req: Request, res: Response){

    const response = await fetch(`${URL}getData`,{ cache: 'no-store' })
    const Data = await response.json()
    
return new Response(JSON.stringify(Data))



}

export const revalidate =0;


// export async function POST(req: Request, res: Response){

//     const body = await req.json()

//     return new Response("hello")
// }


