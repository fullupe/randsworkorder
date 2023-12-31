"use client"

import '../../postcss.config'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'




import { useUserContext } from '../context/userContex'
import Login from '../components/Login'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'R & S LOTTO MAINTENANCE',
//   description: 'Generated by create next app',
// }

export default function RootLayout({children,}: {children: React.ReactNode}) {

  const {isAuth}=useUserContext()
  //const router = useRouter()

 

if(!isAuth)  return <>
<Login/>
</>

//  if(text){
//   router.push("/monitor")
// } 
 
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}
