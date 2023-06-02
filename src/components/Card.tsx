"use client"

import { DeleteCount } from '@/services/api';
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useState } from 'react';

interface CardProps {
  id: string
  text: string;
  hours: number;
  createdAt: string;
}




export function Card(props: CardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {"bank.Token" : token} = parseCookies()
  const router = useRouter()
  const id = props.id

  function handleRedirectPage(){
    router.push(`/dashboard/${props.id}`)
  }

  function openOption(){
    if(isOpen){
      setIsOpen(false)
      return
    }
    setIsOpen(true)
  }

  function handleDelete(){
    DeleteCount(id, token).then(response => {
      window.location.reload()
    })
  }


  return (
    <div className="lg:w-52 lg:h-44 bg-cardbg rounded-lg cursor-pointer">
      <div className='bg-infocard h-10 rounded-t-2xl flex  flex-col justify-center items-end p-2 relative'>
        <MoreHorizontal onClick={openOption} className='text-white'/>
        {isOpen && (
          <ul onClick={handleDelete} className='bg-white p-2 w-20 absolute top-8 right-0'>
            <li>Excluir</li>
          </ul>
        )}
      </div>
      <div className="flex flex-col p-2 gap-3 text-zinc-100" onClick={() => handleRedirectPage()}>
        <div className='flex'>
          {props.text}
        </div>
        <div>
          <h1 className='text-5xl font-sans'>{props.hours}Hrs</h1>
        </div>
        <span className='text-xs mt-3 text-zinc-500'>{props.createdAt}</span>
      </div>
    </div>
  )
}