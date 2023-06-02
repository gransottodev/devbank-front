"use client"
import { Form } from '@/components/Form'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'




export default function Home() {
  const {'bank.Token' : token} = parseCookies()
  const route = useRouter()

  async function redirect(){
    if(token){
      route.push('/dashboard')
    }
  }

  redirect()

  return (
    <main className='flex h-screen justify-center items-center'>
      <Form />
    </main>
  )
}